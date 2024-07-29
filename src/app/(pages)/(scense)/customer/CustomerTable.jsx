'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import CustomTable from '@/app/components/CustomTable';
import DialogButton from '@/app/components/DialogButton';
import {
  setItemDetailRequest,
  flagSet,
  setUpdateDetailRequestSuccess,
  setLoading,
} from '@/app/redux/slice/scense/customer';
import { deleteCustomer } from '@/app/apis/customer/customer';
import { setLayoutLoading } from '@/app/redux/slice/stateSlice';

export default function CustomerTable() {
  const { toast } = useToast();
  const dispatch = useDispatch();

  var dataSource = useSelector((state) => state.customer.dataSource);

  const [selecteds, setSelecteds] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  const getSelectedKeys = (selectedArray) => {
    setSelecteds(selectedArray);
    if (selectedArray.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleDeleteRequest = async (events) => {
    dispatch(setLayoutLoading(true));

    events.preventDefault();
    try {
      const { status, message } = await deleteCustomer(selecteds);
      if (status == '1') {
        toast({
          variant: 'success',
          title: 'Delete Successfully!',
          description: message,
        });
        dataSource = dataSource.filter(
          (data) => !selecteds.includes(data.customer_id)
        );
        dispatch(setUpdateDetailRequestSuccess(dataSource));
      } else {
        toast({
          variant: 'destructive',
          title: 'Delete Failed!',
          description: message,
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: 'Có lỗi xảy ra!',
      });
    } finally {
      dispatch(setLayoutLoading(false));
      setOpen(false);
    }
  };

  const handleDetailRequest = async (paramsDetail) => {
    paramsDetail = { ...paramsDetail, flgTp: 'R' };
    dispatch(setItemDetailRequest(paramsDetail));
  };

  const handleEditRequest = async (paramsEdit) => {
    paramsEdit = { ...paramsEdit, flgTp: 'U' };
    dispatch(setItemDetailRequest(paramsEdit));
  };

  const handleAddRequest = async (paramsAdd) => {
    paramsAdd = { ...paramsAdd, flgTp: 'I' };
    dispatch(setItemDetailRequest(paramsAdd));
  };

  const columns = [
    {
      isSelect: true,
    },
    {
      title: 'No.',
      children: (_record, index) => {
        return <>{index}</>;
      },
    },
    {
      title: 'Name',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.customer_nm}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              (ID: {record.customer_id})
            </div>
          </>
        );
      },
    },
    {
      title: 'Gender',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.gender}</div>
          </>
        );
      },
    },
    {
      title: 'Phone',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.phone}</div>
          </>
        );
      },
    },
    {
      title: 'Email',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.email}</div>
          </>
        );
      },
    },
    {
      title: 'Address',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.address}</div>
          </>
        );
      },
    },
    {
      title: 'Action',
      children: (record, _index) => {
        return (
          <>
            <div className="flex space-x-4 p-4 rounded-lg">
              <Button onClick={() => handleEditRequest(record)}>Edit</Button>
              <Button onClick={() => handleDetailRequest(record)}>
                Detail
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-2xl">Result</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end">
        <div className="flex space-x-4 p-4 rounded-lg">
          <Button onClick={() => handleAddRequest({})}>Add</Button>
          <DialogButton
            btnNm={'Delete'}
            dialogTitle={'Do you want to delete?'}
            dialogDescription={
              'Once confirmed, this data will be deleted from the system and cannot be undone. Do you want to continue?'
            }
            isDisabled={isDisabled}
            open={open}
            setOpen={setOpen}
            onClickFunction={handleDeleteRequest}
          ></DialogButton>
        </div>
      </CardContent>
      <CardContent>
        <CustomTable
          keyTable={'customer_id'}
          columns={columns}
          dataSource={dataSource}
          getSelectedKeys={getSelectedKeys}
        />
      </CardContent>
    </Card>
  );
}
