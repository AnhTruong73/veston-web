'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTable from '@/app/components/CustomTable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import DialogButton from '@/app/components/DialogButton';
import DialogAddMaterial from '@/app/components/DialogAddMaterial';
import { useToast } from '@/components/ui/use-toast';
import {
  getListRequestSuccess,
  getMasterInsertSuccess,
  setCostcode,
  setCostcodeRequest,
  setDetailInsertSuccess,
  setLoading,
} from '@/app/redux/slice/scense/goodinvoicedetail';
import {
  confirmGoodInvoice,
  deleteCostcode,
  insertGoodInvoiceDetail,
} from '@/app/apis/goodinvoice/goodinvoicedetail';
import { formatCurrencyVND } from '@/common/jay';

const GoodInvoicelDetailForm = React.memo(() => {
  const [open, setOpen] = useState(false);
  const [openAddMaterial, setOpenAddMaterial] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const { toast } = useToast();
  const dispatch = useDispatch();
  const [selecteds, setSelecteds] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const isSaved = useSelector((state) => state.goodinvoicedetail.isSaved);
  const dataSource = useSelector((state) => state.goodinvoicedetail.dataSource);

  var goodInvoiceMaster = useSelector(
    (state) => state.goodinvoicedetail.master
  );
  useEffect(() => {
    if (!(goodInvoiceMaster == null)) {
      setIsApproved(goodInvoiceMaster.status == 'APPROVE' ? true : false);
    } else {
      setIsApproved(false);
    }
  }, [goodInvoiceMaster]);
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
      title: 'Unit Amount',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">
              {formatCurrencyVND(record.unit_amount)}
            </div>
          </>
        );
      },
    },
    {
      title: 'Discount',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.discount} %</div>
          </>
        );
      },
    },
    {
      title: 'Tax',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.tax} %</div>
          </>
        );
      },
    },
    {
      title: 'Total Amount',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">
              {formatCurrencyVND(record.total_amt)}
            </div>
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
              {/* <DialogAddMaterial
                btnNm={'Edit'}
                dialogTitle={'Add New Material'}
                open={openAddMaterial}
                setOpen={setOpenAddMaterial}
                onClickFunction={handleAddRequest}
                isDisabled={!isSaved}
                itemData={record}
              /> */}
              <Button onClick={() => handleEditRequest(record)}>Edit</Button>
              {/* &nbsp;
              <Button onClick={() => handleDetailRequest(record)}>
                Detail
              </Button> */}
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

  const handleAddRequest = async (paramsAdd) => {
    // events.preventDefault();
    console.log(paramsAdd);
    try {
      const { status, message, data } = await insertGoodInvoiceDetail({
        paramsAdd,
        goodInvoiceMaster,
      });
      if (status == '1') {
        toast({
          variant: 'success',
          title: 'Save Successfully!',
          description: message,
        });
        dispatch(setDetailInsertSuccess(data.rows));
      } else {
        toast({
          variant: 'destructive',
          title: 'Save Failed!',
          description: message,
        });
        dispatch(setLoading(false));
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
      dispatch(setLoading(false));
    } finally {
      setOpenAddMaterial(false);
    }
  };
  const handleCloseForm = async () => {
    dispatch(setCostcodeRequest(null));
  };
  const handleDeleteRequest = async (events) => {
    events.preventDefault();
    try {
      const { status, message, data } = await deleteCostcode({
        selecteds,
        goodInvoiceMaster,
      });
      if (status == '1') {
        toast({
          variant: 'success',
          title: 'Delete Successfully!',
          description: message,
        });
        dispatch(setDetailInsertSuccess(data.rows));
      } else {
        toast({
          variant: 'destructive',
          title: 'Delete Failed!',
          description: message,
        });
        dispatch(setLoading(false));
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

  const handleEditRequest = (paramsEdit) => {
    console.log(paramsEdit);
    dispatch(setCostcodeRequest(paramsEdit));
    setOpenAddMaterial(true);
  };

  const handleConfirmRequest = async (events) => {
    events.preventDefault();
    try {
      var totalAmtFromGrid = 0;
      var totalAmtFromGeneralInformation = 0;

      dataSource.forEach((item) => {
        totalAmtFromGrid += item.total_amt;
      });
      totalAmtFromGeneralInformation = goodInvoiceMaster.total_amt * 1;
      console.log(totalAmtFromGeneralInformation + ' ' + totalAmtFromGrid);
      if (totalAmtFromGeneralInformation == totalAmtFromGrid) {
        const { status, message, data } = await confirmGoodInvoice({
          goodInvoiceMaster,
        });
        if (status == '1') {
          toast({
            variant: 'success',
            title: 'Confirmed Successfully!',
            description: message,
          });
          // dispatch(setDetailInsertSuccess(data.rows));
          dispatch(getMasterInsertSuccess(data.rows[0]));
          dispatch(getListRequestSuccess(data.rows[0].goodsInvoiceDetail));
        } else {
          toast({
            variant: 'destructive',
            title: 'Confirmed Failed!',
            description: message,
          });
          dispatch(setLoading(false));
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Confirmed failed!',
          description:
            'Total amount của General Information phải bằng tổng Total Amount của Detailed Information',
        });
        dispatch(setLoading(false));
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Confirmed failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
      dispatch(setLoading(false));
    } finally {
      setOpenConfirm(false);
    }
  };
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-2xl">Detailed Information</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end">
        <div>
          <DialogAddMaterial
            btnNm={'Add'}
            dialogTitle={'Add New Material'}
            open={openAddMaterial}
            setOpen={setOpenAddMaterial}
            onClickFunction={handleAddRequest}
            onCloseFunction={handleCloseForm}
            isDisabled={!isSaved || isApproved}
          />
          &nbsp;
          <DialogButton
            btnNm={'Delete'}
            dialogTitle={'Do you want to delete?'}
            dialogDescription={
              'Once confirmed, this data will be deleted from the system and cannot be undone. Do you want to continue?'
            }
            isDisabled={isDisabled || isApproved}
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
          <DialogButton
            btnNm={'Confirm'}
            dialogTitle={'Do you want to confirm the Good Invoice?'}
            dialogDescription={
              'Once confirmed, this data will be confirmed and cannot be undone. Do you want to continue?'
            }
            isDisabled={!isSaved || isApproved}
            open={openConfirm}
            setOpen={setOpenConfirm}
            onClickFunction={handleConfirmRequest}
          />
        </div>
      </CardContent>
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
});

export default GoodInvoicelDetailForm;
