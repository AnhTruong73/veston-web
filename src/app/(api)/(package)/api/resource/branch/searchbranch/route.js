import { NextResponse } from 'next/server';
export const maxDuration = 300;
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    //input validation
    // const userSchema = z.object({
    //   area_id_otp: z.string(),
    //   area_nm_otp: z.string(),
    //   branch_id_otp: z.string(),
    //   branch_nm_otp: z.string(),
    //   email_otp: z.string(),
    //   phone_otp: z.string(),
    //   address_otp: z.string(),
    //   del_yn_otp: z.string(),
    // });
    const body = await req.json();
    var searchOtp = [];
    if (Object.keys(body).length > 0) {
      const { area_id_otp, branch_id_otp, email_otp, phone_otp, del_yn_otp } =
        body;

      if (area_id_otp) {
        searchOtp.push({ area_id: { equals: area_id_otp } });
      }
      if (branch_id_otp) {
        searchOtp.push({ branch_id: { equals: branch_id_otp } });
      }
      if (email_otp) {
        searchOtp.push({ email: { equals: email_otp } });
      }
      if (phone_otp) {
        searchOtp.push({ phone: { equals: phone_otp } });
      }
      if (del_yn_otp) {
        searchOtp.push({ del_yn: { equals: del_yn_otp } });
      }
    }

    const searchBranch = await prisma.branch.findMany({
      where: {
        AND: searchOtp,
      },
      select: {
        branch_id: true,
        branch_nm: true,
        phone: true,
        email: true,
        address: true,
        area_id: true,
        area_nm: true,
        headoffice_yn: true,
        cre_usr_id: true,
        cre_dt: true,
        upd_usr_id: true,
        upd_dt: true,
      },
      orderBy: [{ cre_dt: 'asc' }],
    });
    if (searchBranch.length > 0) {
      const searchBranchFormattedDates = searchBranch.map((tmpBranch) => ({
        ...tmpBranch,
        cre_dt: new Date(tmpBranch.cre_dt).toLocaleString('en-US', {
          timeZone: 'GMT',
        }), // Ví dụ với múi giờ là GMT
        upd_dt: new Date(tmpBranch.upd_dt).toLocaleString('en-US', {
          timeZone: 'GMT',
        }), // Ví dụ với múi giờ là GMT
      }));
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SEARCH_SUCCESS,
          searchBranchFormattedDates,
          'Branch',
          null
        )
      );
    } else {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Branch', null)
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Branch', null)
    );
  }
}
