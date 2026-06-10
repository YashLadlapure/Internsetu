"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react";

interface DropDownmenuProps {
    optoins: {label: string, value: number | string | null}[];
    onSelect: (value: number | string | null) => void;
    selectedValue: number | string | null;
    placeholder?: string;
    className?: string;
    listClassName?: string;
    isSearchable?: boolean;
    isError?: boolean;
    error?: string;
    label?: string;
    size?: "sm" | "md" | "lg";
}   

const DropDownmenu = ({optoins, onSelect, selectedValue, placeholder, className, listClassName, isSearchable, isError, error, label, size = "md" }: DropDownmenuProps) => {

    const [filteredOptions, setFilteredOptions] = useState(optoins);
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");

    useEffect(()=> {
        setFilteredOptions(optoins);
    }, [optoins]);

    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            if(containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    useEffect(()=>{
        const selectedOption = optoins.find(option => option.value === selectedValue);
        if(selectedOption) {
            setInputValue(selectedOption.label);
        }
    }, [selectedValue, optoins])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setInputValue(e.target.value);
 
        if(!isSearchable) return;

        const filtered = optoins.filter(option => option.label.toLowerCase().includes(query));
        setFilteredOptions(filtered);
    }

    const handleSelect = (value: string | number | null, label: string) => {
        onSelect(value);
        setInputValue(label);
        setDropdownOpen(false);
    }

    const labelSizeClasses = {
        sm: "text-sm px-2",
        md: "text-md px-4 font-medium",
        lg: "text-lg px-6 font-semibold"
    }

    return (
        <div className="relative" ref={containerRef}>
            {label && <p className={` ${labelSizeClasses[size]}`}>{label}</p>}
            <input 
                type="text" 
                placeholder={isError ? error : placeholder} 
                className={`border border-gray-300 dark:border-gray-600 rounded-full  mt-1 p-2 w-full ${className} ${isError && "border-red-500"}`}
                onChange={handleChange}
                readOnly={!isSearchable}
                value={inputValue}
                onFocus={() => setDropdownOpen(true)}
            />
            {dropDownOpen && (
                <ul className={`z-50 absolute w-full border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto ${className} ${listClassName}`}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(option => (
                            <li
                                key={option.value}
                                className={`p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                    selectedValue === option.value
                                        ? "bg-gray-300 dark:bg-gray-600"
                                        : ""
                                }`}
                                onMouseDown={() =>
                                    handleSelect(option.value, option.label)
                                }
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">No results found</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default DropDownmenu