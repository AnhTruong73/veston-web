'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'antd';

function ButtonRedirect({ href, text, buttonProp }) {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(href);
    }

    return (
        <Button {...buttonProp} onClick={handleNavigate}>{text}</Button>
    )
}

export default ButtonRedirect