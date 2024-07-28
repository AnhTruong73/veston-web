import { NextResponse } from 'next/server';
import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '../../resource/responseObject';

export async function GET(req) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Fetch today's sales
    const todaySales = await prisma.orders.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        cre_dt: {
          gte: today,
          lt: tomorrow,
        },
        status: 'DONE',
      },
    });

    // Fetch yesterday's sales
    const yesterdaySales = await prisma.orders.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        cre_dt: {
          gte: yesterday,
          lt: today,
        },
        status: 'DONE',
      },
    });

    // Fetch today's users
    const todayUsers = await prisma.customer.count({
      where: {
        cre_dt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Fetch yesterday's users
    const yesterdayUsers = await prisma.customer.count({
      where: {
        cre_dt: {
          gte: yesterday,
          lt: today,
        },
      },
    });

    // Fetch new clients today
    const newClientsToday = await prisma.customer.count({
      where: {
        cre_dt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Fetch new clients yesterday
    const newClientsYesterday = await prisma.customer.count({
      where: {
        cre_dt: {
          gte: yesterday,
          lt: today,
        },
      },
    });

    // Fetch new orders today
    const newOrdersToday = await prisma.orders.count({
      where: {
        cre_dt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Fetch new orders yesterday
    const newOrdersYesterday = await prisma.orders.count({
      where: {
        cre_dt: {
          gte: yesterday,
          lt: today,
        },
      },
    });

    const calculatePercentageChange = (todayValue, yesterdayValue) => {
      if (yesterdayValue === 0) {
        return todayValue === 0 ? '0%' : '+100%';
      }
      return `${(
        ((todayValue - yesterdayValue) / yesterdayValue) *
        100
      ).toFixed(2)}%`;
    };

    const count = [
      {
        today: 'Today’s Sales',
        title: `$${todaySales._sum.amount ?? 0}`,
        persent: calculatePercentageChange(
          todaySales._sum.amount ?? 0,
          yesterdaySales._sum.amount ?? 0
        ),
        bnb: 'bnb2',
      },
      {
        today: 'Today’s Users',
        title: `${todayUsers}`,
        persent: calculatePercentageChange(todayUsers, yesterdayUsers),
        bnb: 'bnb2',
      },
      {
        today: 'New Clients',
        title: `+${newClientsToday}`,
        persent: calculatePercentageChange(
          newClientsToday,
          newClientsYesterday
        ),
        bnb: 'redtext',
      },
      {
        today: 'New Orders',
        title: `${newOrdersToday}`,
        persent: calculatePercentageChange(newOrdersToday, newOrdersYesterday),
        bnb: 'bnb2',
      },
    ];

    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        count,
        'Dashboard Data',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Dashboard Data', null)
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
