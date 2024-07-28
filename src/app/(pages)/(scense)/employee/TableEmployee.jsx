'use client';

import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import CustomTable from '@/app/components/CustomTable';
import { searchArea } from '@/app/apis/area/area';
import { deleteEmployee } from '@/app/apis/employee/employee';
import DialogButton from '@/app/components/DialogButton';
import {
  setItemDetailRequest,
  getListAreaSuccess,
  setUpdateDetailRequestSuccess,
  flagSet,
} from '@/app/redux/slice/scense/employee';

export default function TableEmployee() {
  const { toast } = useToast();
  const dispatch = useDispatch();

  var dataSource = useSelector((state) => state.employee.dataSource);

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
    console.log(selecteds);
  };

  const handleSelectArea = async () => {
    try {
      const { data } = await searchArea();
      dispatch(getListAreaSuccess(data.rows));
      
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
    }
  };

  const handleOpen = async () => {
    dispatch(flagSet(0));
    handleSelectArea();
  };

  const handleDelete = async () => {
    const empSel = [
      {
        employee_id: [],
      },
    ];

    empSel[0].employee_id = selecteds;

    console.log(empSel[0]);

    try {
      const { status, message } = await deleteEmployee(empSel[0]);
      if(status == 1){
        toast({
          variant: 'success',
          title: 'Delete Successfully!',
          description: message,
        });
        dataSource = dataSource.filter(
          (data) => !selecteds.includes(data.employee_id)
        );
      }
      dispatch(setUpdateDetailRequestSuccess(dataSource));
      console.log('delete: ' + message + status);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
    }  finally {
      setOpen(false);
    }
  };

  const handleEditRequest = async (paramsSearch) => {
    dispatch(flagSet(1));
    dispatch(setItemDetailRequest(paramsSearch));
  };

  const handleDetailRequest = async (paramsSearch) => {
    dispatch(flagSet(2));
    dispatch(setItemDetailRequest(paramsSearch));
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
            <div className="font-medium">{record.employee_nm}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              (ID: {record.employee_id})
            </div>
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
      title: 'Position',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.position}</div>
          </>
        );
      },
    },
    {
      title: 'Salary',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.salary}</div>
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
          <div>
            <Button onClick={handleOpen}>Add</Button>
          </div>
          <DialogButton
            btnNm={'Delete'}
            dialogTitle={'Do you want to delete?'}
            dialogDescription={
              'Once confirmed, this data will be deleted from the system and cannot be undone. Do you want to continue?'
            }
            isDisabled={isDisabled}
            open={open}
            setOpen={setOpen}
            onClickFunction={handleDelete}
          ></DialogButton>
        </div>
      </CardContent>
      <CardContent>
        <CustomTable
          keyTable={'employee_id'}
          columns={columns}
          dataSource={dataSource}
          getSelectedKeys={getSelectedKeys}
        />
      </CardContent>
    </Card>
  );
}
