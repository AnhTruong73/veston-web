'use client';

import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import { getSale } from '@/app/apis/report/sales';
import lineChart from './configs/lineChart';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

function LineChart() {
  const { Title, Paragraph } = Typography;
  const [dataSource, setDataSource] = useState(lineChart);

  const getDataSale = async (typeSale) => {
    const res = await getSale(typeSale);
    const { rows: data } = res.data;

    if (data && typeof data === 'object' && data.length > 0) {
      const dataSeries = [];
      const dataCategories = [];
      data.forEach((item, index) => {
        if (item.sales) {
          const seriesItem = [];
          Object.keys(item.sales).forEach((key) => {
            if (index === 0) {
              dataCategories.push(key);
            }
            seriesItem.push(item.sales[key]);
          });
          dataSeries.push({
            name: item.branchId,
            data: seriesItem,
            offsetY: 0,
          });
        }
      });
      const dataSale = {
        series: dataSeries,
        options: {
          ...lineChart.options,
          xaxis: {
            ...lineChart.options.xaxis,
            categories: dataCategories,
          },
        },
      };
      return dataSale;
    }
    return null;
  };

  const getCategoriesChart = (typeSale) => {
    switch (typeSale) {
      case 'yearly':
        const date = new Date();
        const year = date.getFullYear();
        const listYear = [];
        for (let i = 0; i < 5; i++) {
          listYear.push(year - i);
        }
        return listYear.reverse();
      case 'monthly':
        return [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
      case 'weekly':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      default:
        break;
    }
  };

  const onChangeTypeSale = async (value) => {
    const defaultCategories = getCategoriesChart(value);
    const defaultSale = {
      series: [
        {
          name: 'Have no data!',
          data: defaultCategories.map(() => 0),
          offsetY: 0,
        },
      ],
      options: {
        ...lineChart.options,
        xaxis: {
          ...lineChart.options.xaxis,
          categories: defaultCategories,
        },
      },
    };
    try {
      const dataSaleResponse = await getDataSale(value);
      if (dataSaleResponse) {
        setDataSource(dataSaleResponse);
      } else {
        setDataSource(defaultSale);
      }
    } catch (error) {
      setDataSource(defaultSale);
    }
  };

  useEffect(() => {
    onChangeTypeSale('yearly');
  }, []);

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>SALES</Title>
        </div>
      </div>
      <Select onValueChange={(value) => onChangeTypeSale(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="yearly" />
        </SelectTrigger>
        <SelectContent>
          {['yearly', 'monthly', 'weekly'].map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ReactApexChart
        className="full-width"
        options={dataSource.options}
        series={dataSource.series}
        type="area"
        height={350}
        width={'100%'}
      />
    </>
  );
}

export default LineChart;
