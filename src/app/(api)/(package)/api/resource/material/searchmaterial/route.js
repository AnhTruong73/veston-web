import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    var searchOtp = [];
    if (Object.keys(body).length > 0) {
      const { branch_id_otp, material_id_otp, material_name_otp } = body;

      if (branch_id_otp) {
        searchOtp.push({ branch_id: { equals: branch_id_otp } });
      }
      if (material_id_otp) {
        searchOtp.push({ material_id: { equals: material_id_otp } });
      }
      if (material_name_otp) {
        searchOtp.push({ material_name: { contains: material_name_otp } });
      }
    }

    const searchWarehouse = await prisma.warehouseDetail.findMany({
      where: {
        AND: searchOtp,
      },
      select: {
        branch_id: true,
        cost_cd: true,
        quantity: true,
        cre_dt: true,
        cre_usr_id: true,
        upd_usr_id: true,
        upd_dt: true,
        branch: true,
        costcode: true,
      },
      orderBy: [{ cre_dt: 'asc' }],
    });
    if (searchWarehouse.length > 0) {
      const searchWarehouseFormattedDates = searchWarehouse.map(
        (tmpWarehouse) => ({
          ...tmpWarehouse,
          cre_dt: new Date(tmpWarehouse.cre_dt).toLocaleString('en-US', {
            timeZone: 'GMT',
          }), // Ví dụ với múi giờ là GMT
          upd_dt: new Date(tmpWarehouse.upd_dt).toLocaleString('en-US', {
            timeZone: 'GMT',
          }), // Ví dụ với múi giờ là GMT
        })
      );
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SEARCH_SUCCESS,
          searchWarehouseFormattedDates,
          'Warehouse',
          null
        )
      );
    } else {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Warehouse', null)
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Warehouse', null)
    );
  }
}
