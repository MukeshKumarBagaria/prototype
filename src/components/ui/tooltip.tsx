"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Custom Tooltip implementation without external dependencies.
 * Designed for GIGW accessibility compliance with high contrast.
 */

const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

const TooltipContext = React.createContext<{
    open: boolean
    setOpen: (v: boolean) => void
}>({ open: false, setOpen: () => { } })

const Tooltip = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <TooltipContext.Provider value={{ open, setOpen }}>
            <div className="relative inline-flex">
                {children}
            </div>
        </TooltipContext.Provider>
    )
}

const TooltipTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLSpanElement> & { asChild?: boolean }>(
    ({ children, asChild, ...props }, ref) => {
        const { setOpen } = React.useContext(TooltipContext)

        const handleMouseEnter = () => setOpen(true)
        const handleMouseLeave = () => setOpen(false)
        const handleFocus = () => setOpen(true)
        const handleBlur = () => setOpen(false)

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                onMouseEnter: (e: React.MouseEvent) => {
                    handleMouseEnter()
                        ; (children.props as any).onMouseEnter?.(e)
                },
                onMouseLeave: (e: React.MouseEvent) => {
                    handleMouseLeave()
                        ; (children.props as any).onMouseLeave?.(e)
                },
                onFocus: (e: React.FocusEvent) => {
                    handleFocus()
                        ; (children.props as any).onFocus?.(e)
                },
                onBlur: (e: React.FocusEvent) => {
                    handleBlur()
                        ; (children.props as any).onBlur?.(e)
                },
                ...props
            })
        }

        return (
            <span
                ref={ref as React.Ref<HTMLSpanElement>}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tabIndex={0}
                {...props}
            >
                {children}
            </span>
        )
    }
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        const { open } = React.useContext(TooltipContext)

        if (!open) return null

        return (
            <div
                ref={ref}
                role="tooltip"
                className={cn(
                    "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50",
                    "whitespace-nowrap rounded-md px-3 py-1.5",
                    "bg-gray-900 text-white text-sm font-medium",
                    "shadow-lg border border-gray-700",
                    "animate-in fade-in-0 zoom-in-95 duration-150",
                    className
                )}
                {...props}
            >
                {children}
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-gray-900" />
                </div>
            </div>
        )
    }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
