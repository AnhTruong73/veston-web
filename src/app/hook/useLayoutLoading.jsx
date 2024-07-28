"use client"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLayoutLoading } from '@/app//redux/slice/stateSlice';

function useLayoutLoading() {
    const dispatch = useDispatch();
    const isLayoutLoading = useSelector((state) => state.auth.isLayoutLoading);

    useEffect(() => {
        if (isLayoutLoading) {
            dispatch(setLayoutLoading(false));
        }
    }, [isLayoutLoading])
}

export default useLayoutLoading