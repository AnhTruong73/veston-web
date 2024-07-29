'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTable from '@/app/components/CustomTable';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogCreate from '@/app/components/DialogCreate';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DialogButton from '@/app/components/DialogButton';
import { rejectGoodInvoice } from '@/app/apis/goodinvoice/goodinvoicedetail';
import { formatCurrencyVND } from '@/common/jay';
import { useToast } from '@/components/ui/use-toast';
import {
  setLoading,
  setUpdateDetailRequestSuccess,
} from '@/app/redux/slice/scense/goodinvoice';
import { setLayoutLoading } from '@/app/redux/slice/stateSlice';

export default function TableGoodInvoice() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isDisabled, setIsDisabled] = useState(true);
  const [selecteds, setSelecteds] = useState([]);
  const dispatch = useDispatch();
  var dataSource = useSelector((state) => state.goodinvoice.dataSource);
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
      title: 'Invoice No.',
      className: 'w-[10%] text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.inv_id}</div>
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
            <div className="font-medium">{record.branch_id}</div>
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
      title: 'Total Amount',
      className: 'w-[200px] text-right',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">
              {formatCurrencyVND(record.total_amt)}
            </div>
            {/* <div className="font-medium">VND</div> */}
          </>
        );
      },
    },
    {
      title: 'Created By',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.cre_usr_id}</div>
          </>
        );
      },
    },
    {
      title: 'Issue Date',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.issue_dt}</div>
          </>
        );
      },
    },
    {
      title: 'Updated By',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.upd_usr_id}</div>
          </>
        );
      },
    },
    {
      title: 'Provider Name',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.provider_nm}</div>
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

  const handleRejectRequest = async (events) => {
    dispatch(setLayoutLoading(true));
    events.preventDefault();
    try {
      let isApproved = false;
      for (const item of dataSource) {
        for (const inv_id in selecteds) {
          console.log(item);
          if (inv_id == item.inv_id && item.status == 'APPROVE') {
            isApproved = true;
          }
        }
      }
      if (isApproved) {
        const { status, message } = await rejectGoodInvoice(selecteds);
        if (status == '1') {
          toast({
            variant: 'success',
            title: 'Reject Successfully!',
            description: message,
          });
          dataSource = dataSource.filter(
            (data) => !selecteds.includes(data.branch_id)
          );
          dispatch(setUpdateDetailRequestSuccess(dataSource));
        } else {
          toast({
            variant: 'destructive',
            title: 'Reject Failed!',
            description: message,
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Reject Failed!',
          description: 'Good Invoice was approved',
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        variant: 'destructive',
        title: 'Reject failed!',
        description: 'Có lỗi xảy ra!',
      });
    } finally {
      dispatch(setLayoutLoading(false));
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
          <Button asChild>
            <Link href="/goodinvoice/goodinvoicedetail">Create</Link>
          </Button>
        </div>
      </CardContent>
      <CardContent>
        <CustomTable
          keyTable={'inv_id'}
          columns={columns}
          dataSource={dataSource}
          getSelectedKeys={getSelectedKeys}
        />
      </CardContent>
    </Card>
  );
}
