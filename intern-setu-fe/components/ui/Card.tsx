import { MouseEventHandler, ReactNode } from "react"
import { cn } from "@/lib/utils"

const Card = ({children, className, ref, onClick}: {children?: ReactNode, className?: string, ref?: React.Ref<HTMLDivElement | null>, onClick?: MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div 
      ref={ref}
      onClick={onClick}
      className={cn(
        "overflow-hidden rounded-lg lg:rounded-xl text-gray-900 dark:text-gray-100",
        "border border-neutral-300 dark:border-neutral-700",
        "bg-neutral-200 dark:bg-neutral-800",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card