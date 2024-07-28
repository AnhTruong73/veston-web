import { NextResponse } from 'next/server';
export const maxDuration = 60;
import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function GET(req, { params }) {
  console.log(params);
  try {
    const orders = await prisma.ordersRequest.findMany({
      where: {
        customerId: params.customerId,
      },
      include: {
        sewingticket: {
          include: {
            product: {
              include: { Feedbacks: true },
            },
            branch: true,
          },
        },
        branch: true,
        customer: true,
      },
    });

    const formattedOrders = orders.map((order) => ({
      order_id: order.orderId,
      state_id: order.status,
      shippingMethod: order.shippingMethod,
      state_name: getStateName(order.status),
      order_items: order.sewingticket.map((item) => ({
        product_variant_id: item.productId,
        name: item.product.product_name,
        image: item.product.product_img
          ? item.product.product_img.split(';')[0]
          : '',
        height: item.height,
        weight: item.weight,
        bust: item.bust,
        quantity: item.quantity,
        waist: item.waist,
        hips: item.hips,
        price: item.price,
        has_feedback: item.product.Feedbacks,
      })),
      total_order_value: order.totalAmount,
      created_at: order.cre_dt,
    }));
    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        formattedOrders,
        'CLIENT API',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'CLIENT API', error)
    );
  }
}

function getStateName(stateId) {
  // Giả sử có một hàm để chuyển đổi state_id thành tên tương ứng
  const stateNames = {
    REQUEST: 'Chờ Xác Nhận',
    REJECT: 'Đã Hủy',
    APPROVE: 'Đã Xác Nhận',
    INPROCESS: 'Đang Xử Lý',
    DONE: 'Hoàn Thành',
  };
  return stateNames[stateId] || 'Unknown';
}
