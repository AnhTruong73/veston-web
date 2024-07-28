import { NextResponse } from 'next/server';
export const maxDuration = 300;
import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '../../resource/responseObject';

export async function GET(req, { params }) {
  try {
    let groupedOrders = [];
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    switch (params.linechart) {
      case 'yearly':
        const fourYearsAgo = new Date(`${currentYear - 4}-01-01`);

        const ordersByBranchAndYear = await prisma.orders.groupBy({
          by: ['branchId', 'cre_dt'],
          _count: {
            id: true,
          },
          where: {
            cre_dt: {
              gte: fourYearsAgo,
            },
          },
          orderBy: {
            branchId: 'asc',
          },
        });

        const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

        groupedOrders = ordersByBranchAndYear.reduce((acc, order) => {
          const year = new Date(order.cre_dt).getFullYear();
          const branchId = order.branchId;
          if (!acc[branchId]) {
            acc[branchId] = {};
            years.forEach((y) => {
              acc[branchId][y] = 0;
            });
          }
          acc[branchId][year] += order._count.id;
          return acc;
        }, {});
        break;
      case 'monthly':
        const oneYearAgo = new Date();
        oneYearAgo.setMonth(currentDate.getMonth() - 11);

        const ordersByBranchAndMonth = await prisma.orders.groupBy({
          by: ['branchId', 'cre_dt'],
          _count: {
            id: true,
          },
          where: {
            cre_dt: {
              gte: oneYearAgo,
            },
          },
          orderBy: {
            branchId: 'asc',
          },
        });
        const months = [];
        for (let i = 0; i < 12; i++) {
          const date = new Date();
          date.setMonth(currentDate.getMonth() - i);
          months.push({ year: date.getFullYear(), month: date.getMonth() + 1 });
        }
        months.reverse();

        groupedOrders = ordersByBranchAndMonth.reduce((acc, order) => {
          const date = new Date(order.cre_dt);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const branchId = order.branchId;

          if (!acc[branchId]) {
            acc[branchId] = {};
            months.forEach(({ year, month }) => {
              acc[branchId][month] = 0;
            });
          }
          acc[branchId][month] += order._count.id;
          return acc;
        }, {});

        break;

      case 'weekly':
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 6); // Set to 6 days ago to include today
        const ordersByBranchAndDay = await prisma.orders.groupBy({
          by: ['branchId', 'cre_dt'],
          _count: {
            id: true,
          },
          where: {
            cre_dt: {
              gte: sevenDaysAgo,
            },
          },
          orderBy: {
            branchId: 'asc',
          },
        });

        const days = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(currentDate.getDate() - i);
          days.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
        }
        days.reverse(); // Ensure the days are in chronological order

        groupedOrders = ordersByBranchAndDay.reduce((acc, order) => {
          const date = new Date(order.cre_dt);
          const formattedDate = date.toISOString().split('T')[0];
          const branchId = order.branchId;

          if (!acc[branchId]) {
            acc[branchId] = {};
            days.forEach((day) => {
              acc[branchId][day] = 0;
            });
          }
          acc[branchId][formattedDate] += order._count.id;
          return acc;
        }, {});
        break;
      default:
        break;
    }
    const branchIds = Object.keys(groupedOrders);
    const branches = await prisma.branch.findMany({
      where: {
        branch_id: { in: branchIds },
      },
    });

    const result = branches.map((branch) => ({
      branchName: branch.name,
      branchId: branch.branch_id,
      sales: groupedOrders[branch.branch_id],
    }));
    if (result.length == 0) {
      return NextResponse.json(
        ResponseObject(
          0,
          LOGIN_MESSAGE.SEARCH_FAILED,
          result,
          'Line Chart',
          null
        )
      );
    }

    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        result,
        'Line Chart',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Line Chart', null)
    );
  }
}
function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
}
