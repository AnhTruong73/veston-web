'use client';
import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
export default function LayoutLoading({ children }) {
  const isLoading = useSelector((state) => state.app.isLayoutLoading);
  return (
    <>
      <Spin className="h-creen w-screen" size="large" spinning={isLoading}>
        {children}
      </Spin>
    </>
  );
}
