"use client"

import { MouseEventHandler, ReactNode } from "react"

interface ButtonProps {
    children?: ReactNode
    className?: string
    onClick: MouseEventHandler<HTMLButtonElement>
    variant?: "outline" | "primary" | "secondary" | "ghost"
    size?: "sm" | "md" | "lg"
    disabled?: boolean
}

const Button = ({children, className, onClick, variant = "primary", size = "md", disabled = false}: ButtonProps) => {
    const variants = new Map<string, string>([
        ["outline", 
            `border border-neutral-400 hover:bg-neutral-200 text-neutral-900
            dark:border-neutral-500 dark:hover:bg-neutral-700 dark:text-neutral-100`],
        
        ["primary", 
            `text-neutral-100 bg-neutral-900 hover:bg-neutral-800 
            dark:text-neutral-900 dark:bg-neutral-100 dark:hover:bg-neutral-200
        `],
        
        ["secondary", 
            `text-neutral-900 bg-neutral-200 hover:bg-neutral-300
            dark:text-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 
        `],
        ["ghost", 
            `text-neutral-900 hover:bg-neutral-200
            dark:text-neutral-100 dark:hover:bg-neutral-700
        `],
    ])

    const sizes = new Map<string, string>([
        ["sm", "p-1 text-sm"],
        ["md", "p-2 text-base"],
        ["lg", "p-4 text-lg"],
    ])

    className = `rounded-full ${variants.get(variant)} ${sizes.get(size)} cursor-pointer ${className ?? ""}`

    return (
        <button 
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
        {children}
        </button>
    )
}

export default Button