import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface InputProps {
    label?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: HTMLInputTypeAttribute
    placeholder?: string;
    className?: string;
    error?: string;
    isError?: boolean;
    size?: "sm" | "md" | "lg";
}


const Input = ({label, value, onChange, type = "text", placeholder, className, error, isError, size = "md"}: InputProps) => {
  

  const labelSizeClasses = {
    sm: "text-sm px-2",
    md: "text-md px-4 font-medium",
    lg: "text-lg px-6 font-semibold"
  }

  const inputSizeClasses = {
    sm: "p-1 text-sm",
    md: "p-2 text-md",
    lg: "p-3 text-lg"
  }


  return (
    <div className="">
        {label && <p className={` ${labelSizeClasses[size]}`}>{label}</p>}
        <input 

            type={type} 
            className={`
              border border-gray-300 dark:border-gray-600 rounded-full
              ${inputSizeClasses[size]}
              w-full mt-1
              focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
              ${className}
              ${isError && "border-red-500 dark:border-red-500 placeholder-red-500"}
            `} 
            value={value}
            onChange={onChange}
            placeholder={isError ? error : placeholder}
        />
    </div>
  )
}

export default Input