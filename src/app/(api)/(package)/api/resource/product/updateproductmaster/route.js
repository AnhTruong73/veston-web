import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import CheckSessionToken from '../../account/CheckSessionToken';
import ResponseObject from '../../responseObject';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const body = await req.json();

    const { formValue, branchId } = body;
    const sessionToken = req.cookies.get('token')?.value;
    if (formValue.product_id.trim()) {
      const transactionTest = await prisma.$transaction(async (tx) => {
        const tokenInfor = CheckSessionToken(sessionToken);
        if (tokenInfor) {
          const fileArray = formValue.product_img;
          if (fileArray.length > 0) {
            await tx.productImage.deleteMany({
              where: {
                product_id: formValue.product_id,
              },
            });
            fileArray.forEach(async (file) => {
              await tx.productImage.create({
                data: {
                  id: uuidv4,
                  product_id: formValue.product_id,
                  img_src: file,
                },
              });
            });
          }

          const updateProduct = await tx.product.update({
            where: {
              product_id: formValue.product_id,
            },
            data: {
              product_name: formValue.product_name,
              price: formValue.price * 1,
              product_img: imgPaths,
              category: formValue.category,
              description: formValue.description,
              upd_usr_id: tokenInfor.usr_id,
            },
          });
          const updateStoreProduct = await tx.storeProduct.upsert({
            where: {
              productId_branchId: {
                productId: formValue.product_id,
                branchId: branchId,
              },
            },
            update: {
              price: formValue.storeProductPrice * 1,
              upd_usr_id: tokenInfor.usr_id,
            },
            create: {
              branchId: branchId,
              productId: formValue.product_id,
              price: formValue.storeProductPrice * 1,
              cre_usr_id: tokenInfor.usr_id,
              upd_usr_id: tokenInfor.usr_id,
            },
          });
          const returnProductDetail = await tx.product.findMany({
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
              product_img: {
                include: {
                  img_src: true,
                },
              },
            },
            orderBy: [{ cre_dt: 'asc' }],
          });

          return returnProductDetail;
        }
      });
      var getStoreProductPrice = await prisma.storeProduct.findFirst({
        where: {
          AND: {
            branchId: body.branchId,
            productId: body.formValue.product_id,
          },
        },
        select: {
          price: true,
        },
      });
      var processedProductDetail = transactionTest.map((product) => ({
        ...product,
        storeProductPrice: getStoreProductPrice
          ? getStoreProductPrice.price
          : 0,
      }));
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SAVE_SUCCESS,
          processedProductDetail,
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
