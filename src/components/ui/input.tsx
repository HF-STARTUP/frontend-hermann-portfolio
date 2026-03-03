"use client"

import * as React from "react";
import {useId} from "react";

import {FieldError} from "react-hook-form";
import {cn} from "@/utils/ui/cn";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {ChevronDownIcon, WarningIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {useCountries} from "@/hooks/location/useCountry/useCountry";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
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
         fixedPhoneValue,
         onPhoneCodeChange,
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

        const onTogglePasswordViewMode = () => {
            setPasswordMasked(!passwordMasked)
            setInputType(inputType === "text" ? "password" : "text")
        }

        const onPhoneChange = (phone: string) => {
            onPhoneCodeChange && onPhoneCodeChange(+phone)
        }

        const classes = cn(
            // 1. Layout & Taille
            "block w-full rounded-xl px-5 py-2.5",
            "text-base leading-tight font-normal transition-all duration-200",
            
            // 2. Look & Couleurs (Default)
            "bg-transparent border border-solid border-neutral-300/60 text-neutral-700",
            "placeholder:text-vaTextPrimary/50 bg-clip-padding",
            
            // 3. Focus & Interactions
            "focus:outline-none focus:ring focus:ring-vaBlue focus:border-none",
            
            // 4. États Conditionnels (Erreur vs Normal)
            error 
                ? "border-yRed/30 hover:border-yRed/80 focus:ring-yRed" 
                : "border-black/5 hover:border-yPrimary/30 focus:ring-yPrimary",
            
            // 5. Ajustements dynamiques
            leftIcon && "pl-[50px]",
            className
        );


        return (
            <div className={`relative group w-full`}>
                <div>
                    {label && <label
                        htmlFor={_id}
                        className={`text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary line-clamp-1 mb-2`}
                        title={label}
                    >{label}</label>}
                    <div className={`relative`}>
                        {as === 'select' ? (<>
                                <select
                                    value={value}
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
                                        onPhoneChange={onPhoneChange}
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
                                    value={_isPhoneInput ? value : value}
                                    className={cn(
                                        classes,
                                        _isPhoneInput && "pl-[80px]"
                                    )}
                                    ref={ref as React.Ref<HTMLInputElement>}
                                    {...props}
                                />
                                <div
                                    className={cn(
                                        `absolute h-full flex items-center justify-center right-[12px] -z-30  group-hover:text-yPrimary group-hover:scale-[1.05]`,
                                        _isInputButton && `top-0 right-[6px] z-30`
                                    )}>
                                    {!_isPasswordInput && rightIcon}
                                    {_isPasswordInput && (
                                        <button type={"button"} onClick={onTogglePasswordViewMode}>
                                            {!passwordMasked ? <EyeOffIcon/> : <EyeIcon/>}
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

export const InputErrorMessage: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className={`text-yRed font-yMulish text-[14px] flex items-center justify-start mt-1 gap-1`}>
            <div>
                <WarningIcon/>
            </div>
            <span className={"line-clamp-1"}>{children}</span>
        </div>
    )
}

export function CountrySelect({onPhoneChange}: { onPhoneChange: (phone: string) => void }) {

    const [isOpen, setIsOpen] = React.useState(false)
    const {data: countries, isLoading} = useCountries()
    const [activeValue, setActiveValue] = React.useState("237")

    const onCountriesSelect = () => {
        setIsOpen(true)
    }

    const onValueChange = (v: string) => {
        setActiveValue(v)
        onPhoneChange(v)
    }

    return (
        <div className={"relative"}>
            <button type={"button"} onClick={(e) => {
                //e.stopPropagation();
                onCountriesSelect()
            }} className={"flex gap-1"}>
                <div>{cleanPhoneNumber(`+${activeValue}`)}</div>
                <ChevronDownIcon/>
            </button>
            <Select
                open={isOpen}
                onOpenChange={setIsOpen}
                defaultValue={"237"}
                onValueChange={onValueChange}
            >
                <SelectTrigger className="size-0 absolute -z-10 opacity-0">
                    <SelectValue className={"hidden overflow-hidden"} placeholder="pays"/>
                </SelectTrigger>
                <SelectContent>
                    {countries && <SelectGroup>
                        {countries.map((c, k) => (
                            <SelectItem key={k} value={c.phoneCode}>
                                <div className={"flex items-center gap-2"}>
                                    <Image width={30} height={30} className={"w-[30px] h-auto"}
                                           src={`https://flagsapi.com/${c.isoCode}/flat/32.png`} alt=""/>
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


export {Input};
