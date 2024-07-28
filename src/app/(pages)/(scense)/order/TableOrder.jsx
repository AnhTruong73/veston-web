'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTable from '@/app/components/CustomTable';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DialogButton from '@/app/components/DialogButton';
import { deleteOrder, rejectOrder, searchSewing } from '@/app/apis/order/order';
import { format } from 'date-fns';
import { setItemDetailRequest } from '@/app/redux/slice/scense/order';
import { useToast } from '@/components/ui/use-toast';

export default function TableOrder() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  //   var dataSource = useSelector((state) => state.goodinvoice.dataSource);
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selecteds, setSelecteds] = useState([]);

  var dataSource = useSelector((state) => state.order.dataSource);

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
      title: 'Order No.',
      className: 'w-[10%] text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.orderId}</div>
          </>
        );
      },
    },
    {
      title: 'Branch ID',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.branchId}</div>
          </>
        );
      },
    },
    {
      title: 'Customer ID',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.customerId}</div>
          </>
        );
      },
    },
    {
      title: 'Shipping Method',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.shippingMethod}</div>
          </>
        );
      },
    },
    {
      title: 'Create Date',
      className: 'w-[10%] text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">
              {format(record.cre_dt, 'yyyy-dd-MM')}
            </div>
          </>
        );
      },
    },

    {
      title: 'Status',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.status}</div>
          </>
        );
      },
    },
    {
      title: 'Action',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="">
              <Button onClick={() => handleEditRequest(record)}>
                <Link href="/order/orderdetail">Edit</Link>
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  const getSelectedKeys = (selectedArray) => {
    setSelecteds(selectedArray);
    if (selectedArray.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleEditRequest = async (record) => {
    console.log(record);
    dispatch(setItemDetailRequest(record));
  };

  const handleRejectRequest = async (events) => {
    const orderDel = [
      {
        orderId: [],
      },
    ];

    orderDel[0].orderId = selecteds;
    try {
      const { status, message } = await deleteOrder(orderDel[0]);
      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Delete Successfully!',
          description: message,
        });
      } else {
        toast({
          variant: 'success',
          title: 'Delete Successfully!',
          description: message,
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
      dispatch(setLoading(false));
    } finally {
      setOpen(false);
    }
  };
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-2xl">Result</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end">
        <div className="flex space-x-4 p-4 rounded-lg">
          <DialogButton
            btnNm={'Reject'}
            dialogTitle={'Do you want to reject?'}
            dialogDescription={
              'Once confirmed, this data will be rejected from the system and cannot be undone. Do you want to continue?'
            }
            isDisabled={isDisabled}
            open={open}
            setOpen={setOpen}
            onClickFunction={handleRejectRequest}
          />
        </div>
      </CardContent>
      <CardContent>
        <CustomTable
          keyTable={'orderId'}
          columns={columns}
          dataSource={dataSource}
          getSelectedKeys={getSelectedKeys}
        />
      </CardContent>
    </Card>
  );
}
