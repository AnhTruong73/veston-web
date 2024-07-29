'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTable from '@/app/components/CustomTable';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TableMaterial() {
  var dataSource = useSelector((state) => state.material.dataSource);
  // var dataSource = [];
  console.log(dataSource);
  const [selecteds, setSelecteds] = useState([]);

  const columns = [
    {
      isSelect: true,
    },
    {
      title: 'No.',
      className: 'w-[3%] text-center',
      children: (_record, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: 'Barcode No.',
      className: 'w-[10%] text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.cost_cd}</div>
          </>
        );
      },
    },
    {
      title: 'Material Name',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.costcode.cost_nm}</div>
          </>
        );
      },
    },
    {
      title: 'Unit of Measure',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.costcode.cost_uom}</div>
          </>
        );
      },
    },

    {
      title: 'Color',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.costcode.cost_color}</div>
          </>
        );
      },
    },
    {
      title: 'type',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.costcode.cost_type}</div>
          </>
        );
      },
    },
    {
      title: 'Quantity',
      className: 'text-right',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.quantity} </div>
          </>
        );
      },
    },
  ];
  const getSelectedKeys = (selectedArray) => {
    setSelecteds(selectedArray);
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-2xl">Result</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end"></CardContent>
      <CardContent>
        <CustomTable
          keyTable={'cost_cd'}
          columns={columns}
          dataSource={dataSource}
          getSelectedKeys={getSelectedKeys}
        />
      </CardContent>
    </Card>
  );
}
