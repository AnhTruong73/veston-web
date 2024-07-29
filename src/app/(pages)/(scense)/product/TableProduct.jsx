'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ImgProduct from './ImgProduct';

export default function TableProductl() {
  var products = useSelector((state) => state.product.dataSource);
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-2xl">Result</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end">
        <div>
          <Button>
            <Link href="/product/productdetail">Create Product</Link>
          </Button>
        </div>
      </CardContent>
      {Object.keys(groupedProducts).map((category) => (
        <CardContent key={category} className="mb-8">
          <h1 className=" font-semibold mb-4">{category}</h1>
          <div className="flex flex-wrap gap-4 justify-start">
            {groupedProducts[category].map((product) => (
              <ImgProduct key={product.id} product={product} />
            ))}
          </div>
        </CardContent>
      ))}
    </Card>
  );
}
