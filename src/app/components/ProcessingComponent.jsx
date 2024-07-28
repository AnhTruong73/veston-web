"use client"
import React from 'react'
import useAllowAccessRouter from '@/app//hook/useAllowAccessRouter'
export default function ProcessingComponent({ children }) {
    useAllowAccessRouter();

    return (<>
        {children}
    </>)
}
