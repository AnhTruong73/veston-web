'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTable from '@/app/components/CustomTable';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

import DialogButton from '@/app/components/DialogButton';
import { useToast } from '@/components/ui/use-toast';
import {
  setItemDetailRequest,
  setLoading,
  setSewingDetail,
} from '@/app/redux/slice/scense/order';
import {
  confirmOrder,
  deleteCostcode,
  deleteSewing,
  insertOrderDetail,
  searchSewingOrder,
} from '@/app/apis/order/order';
import { formatCurrencyVND } from '@/common/jay';
import { format } from 'date-fns';
import Link from 'next/link';

const OrderlDetailForm = React.memo(() => {
  const [open, setOpen] = useState(false);
  const [openAddMaterial, setOpenAddMaterial] = useState(false);

  const { toast } = useToast();
  const dispatch = useDispatch();
  const [selecteds, setSelecteds] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const dataSource = useSelector((state) => state.order.detail.sewingticket);
  const dataSources = useSelector((state) => state.order.detail);

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
      title: 'Sewing No.',
      className: 'w-[10%] text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.sewingTicketId}</div>
          </>
        );
      },
    },
    {
      title: 'Product ID',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.productId}</div>
          </>
        );
      },
    },
    {
      title: 'Price',
      className: 'text-right',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.price} </div>
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
    {
      title: 'Create Date',
      className: 'text-center',
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
                <Link href="/order/orderdetail/sewingdetail">Edit</Link>
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

  const handleDeleteRequest = async (e) => {
    const sewDel = [
      {
        sewingTicketId: [],
      },
    ];

    sewDel[0].sewingTicketId = selecteds;
    try {
      const { status, message, data } = await deleteSewing({
        OrderMasterId: dataSources.orderId,
        sewingTicketId: selecteds,
      });
      if (status == 1) {
        const searchSO = await searchSewingOrder(dataSources);
        dispatch(setItemDetailRequest(searchSO.data.rows));
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
        variant: 'success',
        title: 'Delete Successfully!',
        description: 'FAILED',
      });
    } finally {
      setOpen(false);
    }
  };

  const handleEditRequest = (paramsEdit) => {
    dispatch(setSewingDetail(paramsEdit));
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-2xl">Sewing Lists</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end">
        <div>
          <DialogButton
            btnNm={'Delete'}
            dialogTitle={'Do you want to delete?'}
            dialogDescription={
              'Once confirmed, this data will be deleted from the system and cannot be undone. Do you want to continue?'
            }
            isDisabled={
              isDisabled || dataSources.status == 'DONE' ? true : false
            }
            open={open}
            setOpen={setOpen}
            onClickFunction={handleDeleteRequest}
          />
          &nbsp;
          {/* <Button
            disabled={!isSaved}
            onClick={() => handleConfirmRequest(record)}
          >
            Confirm
          </Button> */}
        </div>
      </CardContent>
      <CardContent>
        <CustomTable
          keyTable={'sewingTicketId'}
          columns={columns}
          dataSource={dataSource}
          getSelectedKeys={getSelectedKeys}
        />
      </CardContent>
    </Card>
  );
});

export default OrderlDetailForm;
