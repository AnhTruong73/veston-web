'use client'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { usePathname } from 'next/navigation'
import Link from "next/link"

export default function LinkWithToolTip({ children, href, textToolTip, className }) {
    const pathname = usePathname();
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={href ?? '#'}
                    className={`${pathname.includes(href) ? "group flex h-14 w-14 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-12 md:w-12 md:text-base" : "flex h-12 w-12 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground md:h-10 md:w-10"}`}
                >
                    {children}
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{textToolTip}</TooltipContent>
        </Tooltip>
    )
}
