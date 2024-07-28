import { NextResponse } from 'next/server';
import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function GET(req, { params }) {
  console.log(params);
  try {
    const order = await prisma.ordersRequest.findUnique({
      where: { orderId: params.orderId, customerId: params.customerId },
      include: {
        sewingticket: {
          include: {
            product: true,
            branch: true,
          },
        },
        branch: true,
        customer: true,
      },
    });
    const formattedOrder = {
      order_id: order.orderId,
      state_id: order.status,
      state_name: getStateName(order.status),
      actual_delivery: order.actual_delivery,
      est_delivery: order.est_delivery,
      created_at: order.cre_dt,
      order_items: order.sewingticket.map((item) => ({
        name: item.product.product_name,
        price: item.price + '',
        height: item.height,
        quantity: item.quantity,
        weight: item.weight,
        bust: item.bust,
        waist: item.waist,
        hips: item.hips,
        total_value: item.price * item.quantity + '',
      })),
      total_product_value: order.sewingticket.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      delivery_charges: order.shippingMethod == 'COD' ? '20000' : '0',
      total_order_value: order.totalAmount + '',
      customer_name: order.fullName,
      email: order.email,
      shippingMethod: order.shippingMethod,
      phone_number: order.phoneNumber,
      address: order.shippingAddress,
    };
    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        [],
        'CLIENT API',
        formattedOrder
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
