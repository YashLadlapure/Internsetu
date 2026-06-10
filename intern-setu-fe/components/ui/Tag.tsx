import { ReactNode } from "react"

interface TagProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
}

const Tag = ({children, className, onClick, size = "md"}: TagProps) => {

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  className = `${className ? className : ""} ${sizeClasses[size]}`

  return (
    <div onClick={onClick} className={`rounded-full bg-neutral-300 dark:bg-neutral-700 hover:scale-105 transition ${className}`}>
      {children}
    </div>
  )
}

export default Tag