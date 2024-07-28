'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ImgProduct from './ImgProduct';

// const products = [
//   {
//     id: 1,
//     name: 'Product 1',
//     description: 'This is product 1 description',
//     price: 29.99,
//     image: 'https://via.placeholder.com/215x300',
//     category: 'VEST',
//   },
//   {
//     id: 2,
//     name: 'Product 2',
//     description: 'This is product 2 description',
//     price: 39.99,
//     image: 'https://via.placeholder.com/215x300',
//     category: 'VEST',
//   },
//   {
//     id: 3,
//     name: 'Product 3',
//     description: 'This is product 3 description',
//     price: 19.99,
//     image: 'https://via.placeholder.com/215x300',
//     category: 'SHIRT',
//   },
//   {
//     id: 4,
//     name: 'Product 4',
//     description: 'This is product 4 description',
//     price: 49.99,
//     image: 'https://via.placeholder.com/215x300',
//     category: 'SHIRT',
//   },
// ];

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
