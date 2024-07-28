import { NextResponse } from 'next/server';
export const maxDuration = 60;

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import { storeImageBase64 } from '@/utils/storeImageBase64';
import CheckSessionToken from '../../account/CheckSessionToken';
import ResponseObject from '../../responseObject';

export async function POST(req) {
  try {
    const body = await req.json();

    const { formValue } = body;
    const sessionToken = req.cookies.get('token')?.value;
    if (formValue.product_id.trim()) {
      const transactionTest = await prisma.$transaction(async (tx) => {
        const tokenInfor = CheckSessionToken(sessionToken);
        if (tokenInfor) {
          const fileArray = formValue.product_img;
          const imageArray = [];
          if (fileArray.length > 0) {
            fileArray.forEach((file) => {
              const imgPath = storeImageBase64(file, 'products');
              imageArray.push(imgPath);
            });
          }
          const imgPaths = imageArray.join(';');
          const insertProduct = await tx.product.create({
            data: {
              product_id: formValue.product_id,
              product_name: formValue.product_name,
              price: formValue.price * 1,
              product_img: imgPaths,
              category: formValue.category,
              description: formValue.description,
              cre_usr_id: tokenInfor.usr_id,
              upd_usr_id: tokenInfor.usr_id,
            },
          });
          const returnProductDetailList = await tx.product.findMany({
            where: {
              product_id: formValue.product_id,
            },
            select: {
              product_id: true,
              product_name: true,
              price: true,
              category: true,
              description: true,
              ProductDetail: {
                include: {
                  costcode: true,
                },
              },
              product_img: true,
            },
            orderBy: [{ cre_dt: 'asc' }],
          });
          const processedProductDetailList = returnProductDetailList.map(
            (product) => ({
              ...product,
              product_img: product.product_img
                ? product.product_img.split(';')
                : [],
            })
          );

          return processedProductDetailList;
        }
      });
      console.log(transactionTest);
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SAVE_SUCCESS,
          transactionTest,
          'Product Detail',
          null
        )
      );
    }
    return NextResponse.json(
      ResponseObject(
        0,
        LOGIN_MESSAGE.MISSING_PARAMETER,
        null,
        'Product Detail',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Good Invoice Master', error)
    );
  }
}
