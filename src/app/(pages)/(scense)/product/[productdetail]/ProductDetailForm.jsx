'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTable from '@/app/components/CustomTable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

import DialogButton from '@/app/components/DialogButton';
import { useToast } from '@/components/ui/use-toast';
// import {
//   getListRequestSuccess,
//   getMasterInsertSuccess,
//   setCostcode,
//   setCostcodeRequest,
//   setDetailInsertSuccess,
//   setLoading,
// } from '@/app/redux/slice/scense/product';
import { formatCurrencyVND } from '@/common/jay';
import { deleteCostcode, insertCostcode } from '@/app/apis/product/product';
import {
  setCostcodeRequest,
  setDetailInsertSuccess,
  setLoading,
} from '@/app/redux/slice/scense/product';
import DialogAddMaterialForProduct from './DialogAddMaterialForProduct';

const ProductDetailForm = React.memo(() => {
  const [open, setOpen] = useState(false);
  const [openAddMaterial, setOpenAddMaterial] = useState(false);

  const { toast } = useToast();
  const dispatch = useDispatch();
  const [selecteds, setSelecteds] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const isSaved = useSelector((state) => state.product.isSaved);
  var productMaster = useSelector((state) => state.product.master);
  var dataSource = useSelector((state) => state.product.dataSourceDetail);

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
      className: 'w-[20%] text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.product_detail_id}</div>
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
      title: 'Type',
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
      title: 'Action',
      className: 'text-center',
      children: (record, _index) => {
        return (
          <>
            <div className="">
              <Button onClick={() => handleEditRequest(record)}>Edit</Button>
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
      const { status, message, data } = await insertCostcode({
        productMaster,
        paramsAdd,
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
        description: 'Có lỗi xảy ra!',
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
        productMaster,
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

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-2xl">Detailed Information</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end">
        <div>
          <DialogAddMaterialForProduct
            btnNm={'Add'}
            dialogTitle={'Add New Material'}
            open={openAddMaterial}
            setOpen={setOpenAddMaterial}
            onClickFunction={handleAddRequest}
            onCloseFunction={handleCloseForm}
            isDisabled={!isSaved}
          />
          &nbsp;
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
          />
        </div>
      </CardContent>
      <CardContent>
        <CustomTable
          keyTable={'product_detail_id'}
          columns={columns}
          dataSource={dataSource}
          getSelectedKeys={getSelectedKeys}
        />
      </CardContent>
    </Card>
  );
});

export default ProductDetailForm;
