"use client"

import * as React from "react";
import { useId } from "react";

import { FieldError } from "react-hook-form";
import { cn } from "@/utils/ui/cn";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

//TODO: Fix select validation

interface SelectOption {
    value: string | number;
    label: string;
}

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    options?: SelectOption[]
    as?: 'input' | 'select' | 'place'
    rightIcon?: React.ReactNode
    leftIcon?: React.ReactNode
    isInputButton?: boolean
    error?: FieldError,
    label?: string,
    onPhoneCodeChange?: (phoneCode: number) => void,
    fixedPhoneValue?: string
}

/**
 * Longueur (nombre de chiffres) attendue pour le numéro LOCAL (sans le code pays)
 * selon le code pays (indicatif téléphonique, sans le "+").
 *
 * ⚠️ Table de départ à compléter selon la liste réelle des pays renvoyés par
 * useCountries(). Si un code pays n'est pas présent ici, une longueur générique
 * (par défaut GENERIC_MAX_LENGTH) est utilisée à la place.
 */
const PHONE_LENGTH_BY_CODE: Record<string, number> = {
    "237": 9, // Cameroun
    "33": 9,  // France (numéro local sans le 0 initial)
    "1": 10,  // USA / Canada
    "44": 10, // Royaume-Uni
};

const GENERIC_MAX_LENGTH = 15; // recommandation E.164 : 15 chiffres max au total

/**
 * Liste statique des indicatifs supportés pour les inputs de type "tel".
 * TODO backend.hermannfomo.dev : remplacer par GET /location/country quand
 * l'API portfolio sera disponible (ex-hook useCountries).
 */
const SUPPORTED_PHONE_CODES: {
    isoCode: string;
    name: string;
    phoneCode: string;
}[] = [
    { isoCode: "CM", name: "Cameroun", phoneCode: "237" },
    { isoCode: "FR", name: "France", phoneCode: "33" },
    { isoCode: "US", name: "USA / Canada", phoneCode: "1" },
    { isoCode: "GB", name: "Royaume-Uni", phoneCode: "44" },
];

function getPhoneRegex(phoneCode?: string) {
    const length = phoneCode ? PHONE_LENGTH_BY_CODE[phoneCode] : undefined;
    const max = length ?? GENERIC_MAX_LENGTH;
    return new RegExp(`^\\d{0,${max}}$`);
}

const Input = React.forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
    ({
        className,
        placeholder,
        rightIcon,
        leftIcon,
        isInputButton,
        type,
        as = 'input',
        options,
        value,
        error,
        label,
        required,
        fixedPhoneValue,
        onPhoneCodeChange,
        onChange,
        ...props
    },
        ref
    ) => {

        const [passwordMasked, setPasswordMasked] = React.useState(false)
        const [inputType, setInputType] = React.useState(type)
        const _id = useId()

        const _isPasswordInput = type === "password"
        const _isPhoneInput = type === "tel"

        const _isInputButton = isInputButton || rightIcon || leftIcon || _isPasswordInput

        // --- Gestion combinée code pays + numéro local pour les inputs de type "tel" ---
        const countries = SUPPORTED_PHONE_CODES

        const [phoneCode, setPhoneCode] = React.useState<string>(
            fixedPhoneValue ? fixedPhoneValue.replace(/\D/g, "") : "237"
        )
        const [localNumber, setLocalNumber] = React.useState<string>("")

        // Émet vers le formulaire (react-hook-form via onChange) la valeur combinée
        // "codeNumero" (ex: "237699887766"), sans "+".
        const emitCombinedChange = React.useCallback((code: string, local: string) => {
            if (!onChange) return
            const combined = `${code}${local}`
            const fakeEvent = {
                target: { name: (props as { name?: string }).name, value: combined },
            } as React.ChangeEvent<HTMLInputElement>
            onChange(fakeEvent)
        }, [onChange, props])

        // Si une valeur externe (déjà combinée, ex: en mode édition) arrive depuis le
        // formulaire, on la découpe en { phoneCode, localNumber } pour l'affichage.
        React.useEffect(() => {
            if (!_isPhoneInput) return

            const incoming = value != null ? String(value) : ""
            const currentCombined = `${phoneCode}${localNumber}`
            if (incoming === currentCombined) return // déjà synchronisé, on évite une boucle

            if (!incoming) {
                setLocalNumber("")
                return
            }

            if (countries && countries.length > 0) {
                // on cherche l'indicatif le plus long qui correspond au début de la valeur
                const sorted = [...countries].sort(
                    (a, b) => String(b.phoneCode).length - String(a.phoneCode).length
                )
                const match = sorted.find((c) => incoming.startsWith(String(c.phoneCode)))
                if (match) {
                    setPhoneCode(String(match.phoneCode))
                    setLocalNumber(incoming.slice(String(match.phoneCode).length))
                    return
                }
            }

            // pays non trouvé (ou liste des pays pas encore chargée) : on garde le code
            // pays actuel et on affiche tout le reste comme numéro local
            setLocalNumber(incoming)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, countries, _isPhoneInput])

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const digits = e.target.value.replace(/\D/g, "")
            if (!getPhoneRegex(phoneCode).test(digits)) {
                // dépasse la longueur autorisée pour ce pays : on ignore la frappe
                return
            }
            setLocalNumber(digits)
            emitCombinedChange(phoneCode, digits)
        }

        const onPhoneChange = (code: string) => {
            setPhoneCode(code)
            onPhoneCodeChange && onPhoneCodeChange(+code)
            emitCombinedChange(code, localNumber)
        }
        // --- fin gestion téléphone ---

        const onTogglePasswordViewMode = () => {
            setPasswordMasked(!passwordMasked)
            setInputType(inputType === "text" ? "password" : "text")
        }

        const classes = cn(
            // 1. Layout & Taille
            "block w-full rounded-xl px-5 py-2.5",
            "text-base leading-tight font-normal transition-all duration-200",

            // 2. Look & Couleurs (Default) — tokens, lisibles clair ET sombre
            "bg-transparent border border-input text-foreground",
            "placeholder:text-muted-foreground bg-clip-padding",

            // 3. Focus & Interactions
            "focus-visible:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30",

            // 4. États Conditionnels (Erreur vs Normal)
            error
                ? "border-destructive/60 hover:border-destructive focus:ring-destructive/40"
                : "hover:border-primary/50",

            // 5. Ajustements dynamiques
            leftIcon && "pl-8",
            className
        );


        return (
            <div className={`relative group w-full`}>
                <div>
                    {label && <label
                        htmlFor={_id}
                        className={`text-[14px] leading-[24.57px] tracking-[-2%] font-medium line-clamp-1 mb-2`}
                        title={label}
                    >{label} {required && <span className="text-red-500">*</span>}</label>}
                    <div className={`relative`}>
                        {as === 'select' ? (<>
                            <select
                                value={value}
                                onChange={onChange}
                                className={classes}
                                ref={ref as React.Ref<HTMLSelectElement>}
                                {...props}
                            >
                                <option disabled selected>{placeholder ?? label}</option>
                                {options?.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {/*<ChevronDownIcon*/}
                            {/*    className={`absolute top-[30%] right-[12px] -z-30 group-hover:text-yPrimary group-hover:scale-[1.05]`}/>*/}
                        </>)
                            :
                            (<>
                                <div
                                    className={cn(
                                        `absolute w-fit h-full flex items-center justify-center left-[12px] -z-30  group-hover:text-yPrimary group-hover:scale-[1.05]`,
                                        `top-0 right-[6px] z-30`
                                    )}>
                                    {leftIcon ?? (_isPhoneInput && !fixedPhoneValue && <CountrySelect
                                        countries={countries}
                                        activeValue={phoneCode}
                                        onValueChange={onPhoneChange}
                                    />)}
                                    {fixedPhoneValue &&
                                        <div className={"h-full px-2 flex items-center justify-center font-bold"}>
                                            {fixedPhoneValue}
                                        </div>}
                                </div>
                                <input
                                    id={_id}
                                    placeholder={placeholder}
                                    type={inputType}
                                    value={_isPhoneInput ? localNumber : value}
                                    onChange={_isPhoneInput ? handlePhoneChange : onChange}
                                    inputMode={_isPhoneInput ? "numeric" : undefined}
                                    className={cn(
                                        classes,
                                        _isPhoneInput && "pl-[80px]"
                                    )}
                                    ref={ref as React.Ref<HTMLInputElement>}
                                    required={required}
                                    {...props}
                                />
                                <div
                                    className={cn(
                                        `absolute h-full flex items-center justify-center right-[12px] -z-30  group-hover:text-yPrimary group-hover:scale-[1.05]`,
                                        _isInputButton && `top-0 right-[6px] z-30`
                                    )}>
                                    {!_isPasswordInput && rightIcon}
                                    {_isPasswordInput && (
                                        <button type={"button"} className="text-vaTextPrimary" onClick={onTogglePasswordViewMode}>
                                            {!passwordMasked ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                        </button>
                                    )}
                                </div>
                            </>)
                        }
                    </div>
                </div>
                {error && (
                    <InputErrorMessage>{error ? `${error.message}` : ''}</InputErrorMessage>
                )}
            </div>

        )
    }
);

Input.displayName = "Input";

export const InputErrorMessage: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {

    return (
        <div className={`text-yRed font-yMulish text-[14px] flex items-center justify-start mt-1 gap-1`}>
            <div>
                <AlertTriangle size={16} />
            </div>
            <span className={"line-clamp-1"}>{children}</span>
        </div>
    )
}

interface CountrySelectProps {
    countries?: { isoCode: string; name: string; phoneCode: string | number }[]
    activeValue: string
    onValueChange: (phone: string) => void
}

export function CountrySelect({ countries, activeValue, onValueChange }: CountrySelectProps) {

    const [isOpen, setIsOpen] = React.useState(false)

    const onCountriesSelect = () => {
        setIsOpen(true)
    }

    return (
        <div className={"relative"}>
            <button type={"button"} onClick={(e) => {
                //e.stopPropagation();
                onCountriesSelect()
            }} className={"flex gap-1"}>
                <div>{cleanPhoneNumber(`+${activeValue}`)}</div>
                <ChevronDown size={16} />
            </button>
            <Select
                open={isOpen}
                onOpenChange={setIsOpen}
                value={activeValue}
                onValueChange={onValueChange}
            >
                <SelectTrigger className="size-0 absolute -z-10 opacity-0">
                    <SelectValue className={"hidden overflow-hidden"} placeholder="pays" />
                </SelectTrigger>
                <SelectContent>
                    {countries && <SelectGroup>
                        {countries.map((c, k) => (
                            <SelectItem key={k} value={String(c.phoneCode)}>
                                <div className={"flex items-center gap-2"}>
                                    <Image width={30} height={30} className={"w-[30px] h-auto"}
                                        src={`https://flagsapi.com/${c.isoCode}/flat/32.png`} alt="" />
                                    <div>{c.name}({cleanPhoneNumber('+' + c.phoneCode)})</div>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>}
                </SelectContent>
            </Select>
        </div>
    )
}

function cleanPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(/\++/g, '+');
}

function extractPhoneDetails(phoneNumber: string) {
    // Nettoyer la chaîne pour supprimer les espaces et autres caractères non numériques, sauf le signe plus (+)
    const cleanNumber = phoneNumber.replace(/[\s()-]/g, '');

    // Expression régulière pour extraire le code du pays et le numéro
    // Assumant que le numéro commence par un + ou directement avec des chiffres pour le code du pays
    const pattern = /^(?:\+?(\d{1,3}))(\d+)$/;
    const match = cleanNumber.match(pattern);

    if (match) {
        return {
            phoneCode: match[1],
            phone: match[2]      // Capture le numéro de téléphone après le code du pays
        };
    } else {
        return {
            phoneCode: 237,
            phone: phoneNumber
        };
    }
}


export { Input };



export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean
}

export function Label({
    children,
    className,
    required = false,
    ...props
}: LabelProps) {
    return (
        <label
            className={cn(
                "text-sm text-foreground font-semibold",
                className
            )}
            {...props}
        >
            {children}
            {required && <span className="text-vaRed font-bold ml-1">*</span>}
        </label>
    )
}