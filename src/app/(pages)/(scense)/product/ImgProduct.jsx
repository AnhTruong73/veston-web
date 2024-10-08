import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrencyVND } from '@/common/jay';
import Link from 'next/link';

const ImgProduct = ({ product }) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/product/productdetail?product_id=${product.product_id}`);
  };

  return (
    <Card>
      <CardHeader>
        <img
          src={product.product_img}
          alt={product.product_name}
          className="w-[215px] h-[300px] object-cover cursor-pointer"
          onClick={handleImageClick}
        />
      </CardHeader>
      <CardContent>
        <Link
          className=""
          href={{
            pathname: '/product/productdetail',
            query: { product_id: product.product_id },
          }}
        >
          <p className="text-xl font-bold truncate max-w-full">
            {product.product_name}
          </p>
        </Link>
        <br />
        <div className="hidden text-sm text-muted-foreground md:inline">
          (ID: {product.product_id})
        </div>
        <p className="text-gray-500 truncate max-w-full">
          {product.description ? product.description : '(No Description)'}
        </p>
      </CardContent>
      <CardFooter>
        <span className="text-lg font-semibold">
          {formatCurrencyVND(product.price)}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ImgProduct;
