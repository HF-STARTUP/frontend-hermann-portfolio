"use client"

import React, { DetailedHTMLProps, Fragment, TextareaHTMLAttributes, useId, useState } from "react";
import cardNumber from "@/assets/img/pay/card-number.png"
import Image from "next/image";
import {
    AddIcon,
    CheckIcon,
    ChevronDownIcon,
    FilterIcon,
    SearchIcon,
    TrashIcon
} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import { usePathname } from "next/navigation";
import { isDashboardContext } from "@/utils/urlValidation";
import { Combobox, Switch, Transition } from "@headlessui/react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import useAppStore from "@/stores/global/useAppStore";
import VImageProvider from "@/components/helpers/VImageProvider";
import { cn } from "@/utils/ui/cn";
import { BiChevronRight } from "react-icons/bi";

export type VSelectProp = {
    label: string,
    value: string
}

type TextFieldProps = {
    label?: string,
    inputType?: React.HTMLInputTypeAttribute
    fit?: boolean,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    variant?: 'square' | 'rounded',
    size?: 'default' | 'sm' | 'md',
    name?: 'card_number' | 'expire_date' | 'card_cvc' | 'card_name',
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    value?: string | number | readonly string[] | undefined
    register?: UseFormRegisterReturn,
    errors?: FieldErrors;
    className?: string
}

type SelectFieldProp = {
    items?: VSelectProp[],
    handleSelect?: (selectedItem: string | number) => void,
    loading?: boolean,
    mode?: 'search' | 'default'
}


const TextField: React.FC<TextFieldProps> = ({
    label,
    value,
    required,
    inputType = 'text',
    placeholder,
    size,
    errors,
    register,
    onChange,
    disabled
}) => {

    const $pathName = usePathname()
    const fielID = useId()

    const isAdminCtx = isDashboardContext($pathName)
    const isMd = size === 'md'
    const isSm = size === 'sm'
    const hasError = errors && register && errors[register.name];

    const _baseClassname = `m-0 block 
          ${isSm ? 'px-[8px] h-[32px] text-text-body' : (isMd ? 'h-[45px] px-[20px] py-[10px] text-text-body' : 'h-[58px] px-[20px] py-[10px] text-stone-500')}
          w-full ${isMd ? 'rounded-[10px]' : (isAdminCtx ? 'rounded-[9.19px]' : 'rounded-md')} 
          ${hasError ? 'border-red-500' : 'border-neutral-300'} border border-solid border-opacity-60 bg-transparent
          bg-clip-padding text-base leading-tight text-neutral-700 transition duration-200
          ease-linear placeholder:text-stone-300 ${hasError ? 'focus:border-red-400' : 'focus:border-primary'} text-[10px] font-normal
          focus:text-neutral-700 focus:outline-none peer-focus:text-primary focus:outline-offset-1 focus:outline-2 ${hasError ? 'focus:outline-red-200' : 'focus:outline-blue-200'}`

    return (
        <div className={`flex-col justify-start items-start gap-2 inline-flex w-full`}>
            <label
                className={`${isMd ? 'text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary' : (isAdminCtx ? "text-text-body text-base font-normal finter leading-relaxed tracking-tight" : "text-stone-500 text-xs font-medium")}`}
                htmlFor={fielID}>{label} {required && <span className={`text-red-400`}>*</span>} </label>
            <input
                {...(register ? register : {})}
                id={fielID}
                type={inputType}
                disabled={disabled}
                autoFocus={false}
                value={value}
                onChange={onChange}
                //required={required}
                className={_baseClassname}
                placeholder={placeholder}
            />

            {hasError &&
                <p className="text-red-500">{errors && register ? `${errors[register.name]?.message}` : ''}</p>}
        </div>
    )
}


export const FieldDate: React.FC<TextFieldProps> = ({ label, placeholder, size, register, errors, ...props }) => {

    const $pathName = usePathname()
    const fielID = useId()

    const isSm = size === 'sm'
    const isMd = size === 'md'

    const hasError = errors && register && errors[register.name];
    const isAdminCtx = isDashboardContext($pathName)

    return (
        <div className={`flex-col justify-start items-start gap-2 inline-flex w-full`}>
            {label && <label
                className={`${isMd ? 'text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary' : (isAdminCtx ? "text-text-body text-base font-normal finter leading-relaxed tracking-tight" : "text-stone-500 text-xs font-medium")}`}> {label}</label>}
            <input
                {...(register ? register : {})}
                id={fielID}
                type="date"
                className={`w-full m-0 block ${isSm ? 'max-w-[120px] h-[45px]' : (isMd ? 'h-[45px]' : 'h-[58px]')} ${isMd ? 'rounded-[10px]'
                    : (isAdminCtx ? 'rounded-[9.19px]' : 'rounded-md')} border bg-white border-solid ${hasError ? 'border-red-500' : 'border-neutral-300'} border-opacity-60 bg-transparent
                    bg-clip-padding text-base leading-tight text-neutral-700 transition duration-200 placeholder-neutral-400
                    ease-linear placeholder:text-stone-300  ${hasError ? 'focus:border-red-400' : 'focus:border-primary'}  text-[10px] font-normal px-[20px] py-[10px]
                    focus:text-neutral-700 focus:outline-none peer-focus:text-primary focus:outline-offset-1 focus:outline-2 ${hasError ? 'focus:outline-red-200' : 'focus:outline-blue-200'}`}
                placeholder={placeholder}
                {...props}
            />
        </div>
    )
}

export const TextArea: React.FC<TextFieldProps> = ({ label, register, className, placeholder, size, required, ...props }) => {


    const $pathName = usePathname()
    const fielID = useId()

    const isAdminCtx = isDashboardContext($pathName)
    const isMd = size === 'md'
    const isSm = size === 'sm'

    return (
        <div className={`flex-col justify-start items-start gap-2 inline-flex w-full`}>
            <label
                className={`${'text-sm leading-[24.57px] tracking-[-2%] font-medium'}`}
                htmlFor={fielID}> {label} {required && <span className="text-vaRed">*</span>} </label>
            <textarea
                id={fielID}
                className={cn("bg-transparent border border-solid border-neutral-300/60 text-neutral-700 rounded-2xl  resize-none w-full p-2",
                    "placeholder:text-vaTextPrimary/50 focus:outline-none focus:ring-2 focus:ring-vaBlue/30 focus:border-vaBlue/50", className)}
                rows={3}
                placeholder={placeholder}
                {...register}
                {...props as DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>}
            ></textarea>
        </div>
    )
}

export const CheckBox: React.FC<TextFieldProps> = ({ label }) => {

    const checkboxID = useId()

    const $pathName = usePathname()
    const fielID = useId()

    const isAdminCtx = isDashboardContext($pathName)

    return (
        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
                className={`relative float-left -ml-[1.7rem] mr-[6px] mt-[0.15rem] ${isAdminCtx ? "h-[1.125rem] w-[1.125rem] scale-125" : "h-[1.125rem] w-[1.125rem]"}
                    appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[#80878C]
                    outline-none before:pointer-events-none before:absolute before:h-[0.875rem]
                    before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent
                    before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-['']
                    ${isAdminCtx ? 'checked:border-[#37A3FF]' : 'checked:border-blue-primary'} ${isAdminCtx ? 'checked:bg-[#37A3FF]' : 'checked:bg-blue-primary'} checked:before:opacity-[0.16] checked:after:absolute
                    checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem]
                    checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem]
                    checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid
                    checked:after:border-white checked:after:bg-transparent checked:after:content-['']
                    hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]
                    focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12]
                    focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s]
                    focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem]
                    focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100
                    checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]
                    checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem]
                    checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0
                    checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent`}
                type="checkbox"
                value=""
                id={checkboxID}
                defaultChecked
            />
            {label && <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer text-black text-opacity-70 text-[12px] lg:text-base font-normal leading-snug"
                htmlFor={checkboxID}>
                {label}
            </label>}
        </div>
    )
}

export const SelectField2: React.FC<TextFieldProps & SelectFieldProp & React.HTMLAttributes<HTMLDivElement>> = ({
    label,
    loading,
    items,
    variant = "square",
    fit,
    size,
    handleSelect,
    ...props
}) => {

    const $pathName = usePathname()

    const isAdminCtx = isDashboardContext($pathName)

    const isRounded = variant === 'rounded'
    const isFited = fit === true
    const isSm = size === 'sm'
    const isMd = size === 'md'

    return (
        <div className={`${isFited ? '' : 'w-full'}`} {...props}>
            <div className={`flex-col justify-start items-start gap-2 inline-flex ${isFited ? '' : 'w-full'}`}>
                {label && <label
                    className={`${isMd ? 'text-[14px] leading-[24.57px] tracking-[-2%]' : 'text-xs'} font-medium ${loading ? 'text-slate-400' : (isSm ? 'text-text-body' : 'text-admin-primary')}`}> {label}</label>}
                <select
                    className={`bg-white m-0 block w-full ${isMd ? 'rounded-[10px]' : (isAdminCtx ? 'rounded-[14px]' : (isRounded ? `${isSm ? 'rounded-[10px]' : 'rounded-[200px]'}` : 'rounded-md'))} border border-solid border-text-body border-opacity-60 bg-transparent
                bg-clip-padding text-base leading-tight text-neutral-700 transition duration-200
                ease-linear placeholder:text-stone-300 focus:border-primary text-[10px] font-normal ${isSm ? 'px-[8px] h-[32px] text-text-body' : (isMd ? 'h-[45px] px-[20px] py-[10px] text-text-body' : 'h-[58px] px-[20px] py-[10px] text-stone-500')}
                focus:text-neutral-700 focus:outline-none peer-focus:text-primary`}
                    onChange={(v) => handleSelect && handleSelect(v.currentTarget.value)}
                >
                    {loading && <option>Chargement...</option>}
                    {!loading && items?.map((item, k) => (
                        <option className={`text-base leading-tight text-neutral-700`} key={k}
                            value={item.value}>{item.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
export const SelectField: React.FC<TextFieldProps & SelectFieldProp & React.HTMLAttributes<HTMLSelectElement>> = ({
    label,
    loading,
    items,
    variant = "square",
    mode = 'default',
    fit,
    size,
    errors,
    register,
    handleSelect,
    ...props
}) => {

    const $pathName = usePathname();
    const isAdminCtx = isDashboardContext($pathName);
    const isRounded = variant === 'rounded';
    const isFited = fit === true;
    const isSm = size === 'sm';
    const isMd = size === 'md';
    const isSearch = mode === 'search'

    const [selected, setSelected] = useState<VSelectProp | undefined>(undefined);
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState<VSelectProp[] | undefined>(undefined);

    //TODO: Fix this code block for rotation group page

    // React.useEffect(() => {
    //     if (!isSearch) return;
    //     if (loading) {
    //         setQuery('');
    //         setSelected(undefined);
    //     } else {
    //         const _filteredItems = query === ''
    //             ? items
    //             : items?.filter(i =>
    //                 i.label.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
    //             );
    //         setFilteredItems(_filteredItems);
    //         if (items && items.length > 0 && !selected) {
    //             setSelected(items[0]);
    //             if (handleSelect) {
    //                 handleSelect(items[0].value);
    //             }
    //         }
    //     }
    // }, [items, query, loading, isSearch, selected, handleSelect]);
    //
    // React.useEffect(() => {
    //     if (selected || !items?.length) return;
    //     setSelected(items[0]);
    //     handleSelect && handleSelect(items[0].value);
    // }, [items, selected, handleSelect]);  // Optimized dependencies


    const handleSelectItem = (item: VSelectProp) => {
        setSelected(item);
        setQuery(item.value)
        handleSelect && handleSelect(item.value);
    };

    const hasError = errors && register && errors[register.name];

    return (
        <div className="flex-col justify-start items-start gap-2 inline-flex w-full">
            <label htmlFor=""
                className={"text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary"}>{label}</label>
            <select
                {...(register ? register : {})}
                onChange={e => handleSelect && handleSelect(e.currentTarget.value)}
                defaultValue={items?.length && items[0].value} className={cn(
                    `m-0 block 
          h-[45px] px-[20px] py-[10px] text-text-body
          w-full rounded-[10px] 
          border-neutral-300 border border-solid border-opacity-60 bg-transparent
          bg-clip-padding text-base leading-tight text-neutral-700 transition duration-200
          ease-linear placeholder:text-stone-300 focus:border-primary text-[16px] font-normal
          focus:text-neutral-700 focus:outline-none peer-focus:text-primary focus:outline-offset-1 focus:outline-2 focus:outline-blue-200`
                )}>
                {items?.map(i => (<option key={i.value} value={i.value}>{i.label}</option>))}
            </select>
            {hasError &&
                <p className="text-red-500">{errors && register ? `${errors[register.name]?.message}` : ''}</p>}
        </div>
    )
}

export const CreditCardField: React.FC<TextFieldProps> = ({ label, name, placeholder }) => {

    return (
        <div className={`flex-col justify-start items-start gap-2 inline-flex w-full`}>
            {label &&
                <label className="text-black text-xl font-medium leading-[48.57px]"> {label}</label>}
            <div className={`relative flex-1 flex flex-col w-full`}>
                <input className={`
                    peer pr-12 pl-2 placeholder-gray-300
                    "m-0 block h-[58px] w-full rounded-md border border-solid border-neutral-300 border-opacity-60 bg-transparent
                    bg-clip-padding text-base leading-tight text-neutral-700 transition duration-200
                    ease-linear placeholder:text-stone-300 focus:border-primary text-[10px] font-normal px-[20px] py-[10px]
                    focus:text-neutral-700 focus:outline-none peer-focus:text-primary focus:outline-offset-1 focus:outline-2 focus:outline-blue-200
                `} type="text" name={name} placeholder={placeholder} />
                <Image src={cardNumber} alt={`${label}`} width={47}
                    className={`absolute bottom-2 right-[27px] -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6`} />
            </div>
        </div>
    )
}

export const SearchTextField: React.FC<{ fieldVariant?: `main` | `default` } & TextFieldProps> = ({
    fieldVariant,
    label,
    name,
    value, onChange,
    placeholder
}) => {

    const isMainVariant = fieldVariant === `main`

    return (
        <div className={`flex-col justify-start items-start gap-2 inline-flex w-full`}>
            {label &&
                <label className="text-black text-xl font-medium leading-[48.57px]"> {label}</label>}
            <div className={`relative flex-1 flex flex-col w-full`}>
                <SearchIcon className={`absolute bottom-2 left-[27px] top-[20.8px] -mb-0.5 transform translate-x-1/2 
                -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 text-[5px]`} />
                <input
                    value={value}
                    onChange={onChange}
                    className={`
                    ${isMainVariant ? 'border-text-body' : 'border-violet-50 w-[288px]'}
                    h-[41px]
                    bg-[#F4F7FE]
                    peer pl-12 pr-2 placeholder-gray-300
                    m-0 block rounded-md border border-solid border-opacity-60
                    bg-clip-padding transition duration-200
                    ease-linear placeholder:text-slate-400 focus:border-primary text-[10px] px-[20px] py-[10px]
                    focus:text-neutral-700 focus:outline-none peer-focus:text-primary focus:outline-offset-1 focus:outline-2 focus:outline-blue-200
                    text-slate-400 text-sm font-normal leading-tight
                    placeholder:text-sm placeholder:font-normal placeholder:leading-tight
                `} type="text" name={name} placeholder={placeholder} />
            </div>
        </div>
    )
}

export type FilterParamType = { name: string, key: string }

export const SimpleFilterSelect: React.FC<{ items: FilterParamType[] }> = ({ items }) => {
    const [isActive, setIsActive] = useState(false)
    const [isFilterReversed, setIsFilterReversed] = useState(false)
    const [activeItem, setActiveItem] = useState(items[0])
    const { setFilterToken, setSortAsc } = useAppStore()

    const handleToggleActive = () => {
        setIsActive(!isActive)
    }

    const handleSetActiveItem = (selectedItem: FilterParamType) => {
        setActiveItem(selectedItem)
        if (setFilterToken) {
            setFilterToken(selectedItem.key)
        }
        setIsActive(false)
    }

    const handleReverFilter = () => {

        setIsFilterReversed(!isFilterReversed)
        setSortAsc(isFilterReversed ? 'asc' : 'desc')

    }

    return (
        <div className={`flex justify-end mb-2 relative z-10`}>
            <div
                className={`flex items-center justify-center gap-[11px] hover:opacity-85 transition ease-in duration-200 delay-75 relative`}>
                <div className={`
                    flex items-center justify-center text-sm font-medium 
                    leading-normal text-slate-500
                `}>
                    <button onClick={handleReverFilter}>
                        <FilterIcon className={`${isFilterReversed ? "rotate-180" : ""}`} />
                    </button>
                    <div>Filtrer par:</div>
                </div>
                <div
                    className={`flex items-center justify-center text-gray-500 text-sm font-medium leading-normal cursor-pointer`}
                    onClick={handleToggleActive}
                >
                    <div>{activeItem.name}</div>
                    <ChevronDownIcon />
                </div>
                {isActive && <div
                    className={`bg-stone-50 text-gray-500 text-sm font-medium leading-normal absolute top-[22px] right-[18px]`}>
                    <ul>
                        {items.filter(item => item !== activeItem).map((item) => (
                            <SimpleFilterItem onClick={() => handleSetActiveItem(item)} key={item.key}
                                label={item.name} />
                        ))
                        }
                    </ul>
                </div>}
            </div>
        </div>
    )
}

const SimpleFilterItem: React.FC<{ label: string } & React.HTMLAttributes<HTMLElement>> = ({ label, ...props }) => {
    return (
        <li className={`hover:opacity-75 ease-in delay-75 duration-300 cursor-pointer`} {...props}>{label}</li>
    )
}

export function SwitchField({ handleToggle }: { handleToggle?: (state: boolean) => void }) {
    const [enabled, setEnabled] = useState(false)

    React.useEffect(() => {
        handleToggle && handleToggle(enabled)
    }, [enabled])
    return (
        <div className="">
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-[#37A3FF]' : 'bg-slate-300'}
          relative inline-flex h-[27px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-7' : 'translate-x-0'} pointer-events-none inline-block h-[23px] w-[23px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    )
}


export const RadioField: React.FC<{
    variant?: 'title' | 'text' | 'default',
    label: string,
    defaultChecked?: boolean,
    name: string,
    onChange?: (checked?: boolean) => void
}> = ({
    label,
    defaultChecked = false,
    name,
    variant,
    onChange
}) => {

        const [isDefaultChecked, setIsDefaultChecked] = React.useState(defaultChecked)

        const _id = useId()
        const isTitle = variant === "title"
        const isText = variant === "text"

        React.useEffect(() => {

            console.log(`isDefaultChecked = ${isDefaultChecked}`)

            if (defaultChecked) {
                setIsDefaultChecked(true)
            }
        }, [defaultChecked])

        return (
            <div className={"mb-[0.125rem]  min-h-[1.5rem] pl-[1.5rem] flex items-center"}>
                <input
                    className={`relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 
                    border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4
                    before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent]
                    before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-gray-500
                    checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem]
                    checked:after:rounded-full checked:after:border-gray-500 checked:after:bg-gray-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)]
                    hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0
                    focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]
                    focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-gray-500 checked:focus:before:scale-100
                    checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]
                    dark:border-neutral-600
                `}
                    type="radio"
                    name={name}
                    id={_id}
                    defaultChecked={isDefaultChecked}
                    onChange={(event) => onChange && onChange(event.target.checked)}
                />
                <label
                    className={`${isText ?
                        'text-text-body font-normal finter text-[14px] max-w-[467px]'
                        : (isTitle ? 'text-black font-semibold text-[16px]' : 'text-admin-primary font-medium')} 
                    mt-px inline-block ${isText ? 'pl-[20px]' : 'pl-[0.15rem]'} hover:cursor-pointer text-base leading-7`
                    }
                    htmlFor={_id}
                >
                    {label}
                </label>
            </div>
        )
    }


export const LabelField: React.FC<{
    label: string,
    value: string,
    withDelimiter?: boolean
} & React.HTMLAttributes<HTMLDivElement>> = ({ label, value, withDelimiter = true, ...props }) => {

    return (
        <div {...props}>
            <div className={`flex gap-[10px] items-center`}>
                {withDelimiter && <div className={`text-[24px] text-center font-normal text-admin-primary`}>
                    -
                </div>}
                <div className={`flex-col justify-start items-start gap-2 inline-flex w-full`}>
                    <label
                        className={`text-[14px] leading-[24.57px] tracking-[-2%] font-medium text-admin-primary`}> {label}</label>
                    <button className={`w-full bg-[#ebebeb] border border-text-body rounded-[10px] h-[45px] px-[20px] py-[10px] 
                text-admin-primary flex justify-center items-center
            hover:opacity-80 transition duration-200 text-[17.55px] leading-[24.57px] tracking-[-2%] font-bold text-center
            `}>
                        <div>{value}</div>
                    </button>
                </div>
            </div>
        </div>
    )
}


export const BtnField: React.FC<{
    label: string,
    variant?: 'icon' | 'btn',
    iconType?: 'chevron' | 'add'
} & React.HTMLAttributes<HTMLDivElement>> = ({
    label,
    variant = 'btn',
    iconType = 'add',
    className,
    ...props
}) => {

        const isIcon = variant === 'icon'
        const isAdd = iconType === "add"

        return (
            <div {...props}>
                <button type={"button"} className={cn(
                    `w-full border text-[14px] text-admin-primary
            font-medium leading-[14px]  flex justify-between items-center
            hover:bg-indigo-50 hover:text-blue-800 hover:border-blue-200 transition duration-200
            `,
                    `${!isIcon ? 'rounded-[10px] h-[45px] px-[20px] py-[10px]' : 'rounded-full size-[45px] flex items-center justify-center text-[28px]'}`,
                    !isIcon && "border-gray-500 bg-gray-200 hover:bg-gray-100 hover:border-gray-500 hover:text-admin-primary",
                    className
                )}>
                    {!isIcon && <div>{label}</div>}
                    {isAdd && <AddIcon width={28} height={28} />}
                    {!isAdd && <BiChevronRight width={28} height={28} />}
                </button>
            </div>
        )
    }


export const ImageUploadField: React.FC<{
    onSelect?: (formImage: File, isDelete?: boolean) => void,
    selectImageData?: File
}> = ({ onSelect, selectImageData }) => {

    const id = useId()

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return;

        if (!e.target.files.length) return

        const imageDataFile: File = e.target.files![0]

        if (onSelect) onSelect(imageDataFile)

    }

    const imageData = selectImageData ? URL.createObjectURL(selectImageData) : ''


    return (
        <div>
            <label htmlFor={id}>
                {!selectImageData && <EmptyImageUploadField />}
                {selectImageData &&
                    <SelectedImageUploadField onRemove={() => onSelect && onSelect(selectImageData, true)}
                        imageData={imageData} />}

            </label>
            <input type={'file'} id={id} className={`hidden`} accept={`image/*`} onChange={handleSelectFile} />
        </div>
    )
}


const EmptyImageUploadField: React.FC = () => {

    return (
        <div className={`text-text-body bg-white size-[97px] rounded-[10px] flex items-center justify-center border border-text-body border-dashed
                    cursor-pointer hover:opacity-75 transition duration-200
                `}>
            <AddIcon />
        </div>
    )
}

const SelectedImageUploadField: React.FC<{ imageData: string, onRemove: () => void }> = ({ imageData, onRemove }) => {

    const handleRemoveImageData = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        onRemove()
    }

    return (
        <div onClick={handleRemoveImageData}
            className={`size-[97px] rounded-[10px] cursor-pointer hover:opacity-75 transition duration-200 overflow-hidden border`}
            style={{ backgroundImage: `url(${imageData})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <div
                className={`opacity-0 hover:opacity-1 w-full h-full bg-black/[0.6] flex items-center justify-center text-[39px] cursor-pointer hover:opacity-95 transition duration-200 text-white`}>
                <TrashIcon />
            </div>
        </div>
    )
}

export const ImageUploadFieldGroup: React.FC<{
    label: string,
    multiple?: boolean,
    existingImages?: string[] | undefined,
    handleChange?: (files: File[]) => void
} & React.HTMLAttributes<HTMLDivElement>> = ({
    label,
    multiple = true,
    children,
    handleChange,
    existingImages,
    ...props
}) => {
        const [imagesSelected, setImagesSelected] = React.useState<File[]>([])

        const MAX_UPLOAD_IMAGE = multiple ? 4 : 1

        const handleSelectImage = (dataImage: File, isDelete?: boolean) => {
            if (isDelete) {
                const filtered = imagesSelected.filter(img => img !== dataImage)
                setImagesSelected(filtered)
                handleChange && handleChange(filtered)
                return
            }
            setImagesSelected([...imagesSelected, dataImage])
            handleChange && handleChange([...imagesSelected, dataImage])
        }

        const isAvailableToSelectMoreImage = imagesSelected.length < MAX_UPLOAD_IMAGE

        if (existingImages && existingImages.length) {
            return (
                <div className={`flex gap-2`}>
                    {existingImages && typeof existingImages === "object" && existingImages.map((im, i) => {
                        return (
                            <div key={i}
                                className={`size-[97px] rounded-[10px] cursor-pointer hover:opacity-75 relative transition duration-200 overflow-hidden border`}>
                                <VImageProvider width={100} height={100} src={im} alt={''} className={`size-[97px]`} />
                                <div
                                    className={`opacity-0 absolute top-0 hover:opacity-1 w-full h-full bg-black/[0.6] flex items-center justify-center text-[39px] cursor-pointer hover:opacity-95 transition duration-200 text-white`}>
                                    <TrashIcon />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }

        return (
            <div {...props}>
                <div>
                    <div
                        className={`text-[14px] leading-[24.57px] tracking-[-2%] font-medium  text-admin-primary mb-[10px]`}>{label}</div>
                    <div className={`flex gap-[15px] items-center justify-start`}>
                        {imagesSelected.map((imgS, k) => (
                            <ImageUploadField selectImageData={imgS} key={k} onSelect={handleSelectImage} />
                        ))}
                        {isAvailableToSelectMoreImage && <ImageUploadField onSelect={handleSelectImage} />}
                    </div>
                </div>
            </div>
        )
    }

// export const ImageUploadFieldGroup: React.FC<{
//     label: string,
//     multiple?: boolean,
//     existingImages?: string[], // Nouvelle prop pour les images existantes
//     handleChange?: (files: File[]) => void
// }&React.HTMLAttributes<HTMLDivElement>> = ({
//           label,
//           multiple = true,
//           existingImages = [], // Définissez une valeur par défaut pour éviter les erreurs
//           handleChange,
//           ...props
//       }) => {
//     const [imagesSelected, setImagesSelected] = React.useState<File[]>([]);
//
//     // Convertissez les URL des images existantes en objets File si nécessaire
//     // Cela dépend de la manière dont vous souhaitez gérer les images existantes
//     // Cette étape est facultative et peut nécessiter des ajustements selon votre cas d'utilisation
//
//     const MAX_UPLOAD_IMAGE = multiple ? 4 : 1;
//
//     const handleSelectImage = (dataImage: File, isDelete?: boolean) => {
//         // Remplacez l'image existante par la nouvelle
//         // Puisque la suppression n'est pas autorisée, ignorez `isDelete`
//         setImagesSelected([dataImage]); // Remplacez toujours par la nouvelle image dans le cas non multiple
//         handleChange && handleChange([dataImage]);
//     };
//
//     const isAvailableToSelectMoreImage = imagesSelected.length < MAX_UPLOAD_IMAGE;
//
//
//     return (
//         <div {...props}>
//             <div>
//                 <div className={`text-[14px] leading-[24.57px] tracking-[-2%] font-medium  text-admin-primary mb-[10px]`}>{label}</div>
//                 <div className={`flex gap-[15px] items-center justify-start`}>
//                     {existingImages.map((imgUrl, k) => {
//
//                         return(
//                             // Utilisez un composant pour afficher l'image existante
//                             // Vous devrez peut-être créer un nouveau composant ou ajuster `ImageUploadField` pour cela
//                             <SelectedImageUploadField imageData={imgUrl} key={k} onRemove={()=>{}} />
//                         )
//                     })}
//                     {isAvailableToSelectMoreImage && <ImageUploadField onSelect={handleSelectImage}/>}
//                 </div>
//             </div>
//         </div>
//     );
// };


export default TextField
