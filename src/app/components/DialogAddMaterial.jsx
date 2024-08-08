'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { FloatingLabelSelect } from '@/components/ui/floating-label-select';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { searchUnitOfMeasure } from '../apis/goodinvoice/goodinvoicedetail';
import { formatCurrencyVND } from '@/common/jay';

const DialogAddMaterial = React.memo(
  ({
    btnNm,
    dialogTitle,
    onClickFunction,
    onCloseFunction,
    isDisabled,
    open,
    setOpen,
  }) => {
    const itemData = useSelector((state) => state.goodinvoicedetail.costcode);
    const [costCd, setCostCd] = useState('');
    const [costNm, setCostName] = useState('');
    const [costColor, setCostColor] = useState('');
    const [costUom, setCostUom] = useState('');
    const [costType, setCostType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitAmount, setUnitAmount] = useState('');
    const [discount, setDiscount] = useState('');
    const [tax, setTax] = useState('');
    const [totalAmt, setTotalAmt] = useState('');
    const [type, setType] = useState([]);
    const handleConfirm = async () => {
      try {
        const costCode = {
          costCd,
          costNm,
          costColor,
          costUom,
          costType,
          quantity,
          unitAmount,
          discount,
          tax,
          totalAmt,
        };
        onClickFunction(costCode);
      } catch (e) {
        console.log(e);
      }
    };
    useEffect(() => {
      const setDataForUom = async () => {
        try {
          const { status, message, data } = await searchUnitOfMeasure();
          if (status == 1) {
            setType(data.rows);
          }
        } catch (e) {
          console.log(e);
        }
      };
      if (open) {
        setDataForUom();
        if (itemData) {
          setCostCd(itemData.cost_cd);
          setCostName(itemData.costcode.cost_nm);
          setCostColor(itemData.costcode.cost_color);
          setCostUom(itemData.costcode.cost_uom);
          setCostType(itemData.costcode.cost_type);
          setQuantity(itemData.quantity);
          setUnitAmount(itemData.unit_amount);
          setDiscount(itemData.discount);
          setTax(itemData.tax);
          setTotalAmt(formatCurrencyVND(itemData.total_amt));
        } else {
          setCostCd('');
          setCostName('');
          setCostColor('');
          setCostUom('');
          setCostType('');
          setQuantity('');
          setUnitAmount('');
          setDiscount('');
          setTax('');
          setTotalAmt('');
        }
      }
    }, [open]);
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen} onClose={onCloseFunction}>
          <DialogTrigger asChild>
            <Button disabled={isDisabled} onClick={onCloseFunction}>
              {btnNm}
            </Button>
          </DialogTrigger>
          <DialogContent className={'overflow-y-scroll w-[70%] max-h-[700px]'}>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
              {costCd ? (
                <DialogTitle className="">ID: ${costCd} </DialogTitle>
              ) : (
                ``
              )}
              <br />
            </DialogHeader>
            <FloatingLabelInput
              value={costNm}
              label="Material Name"
              onChange={(e) => {
                setCostName(e.target.value);
              }}
            />
            <FloatingLabelInput
              value={costColor}
              label="Material Color"
              onChange={(e) => {
                setCostColor(e.target.value);
              }}
            />
            <FloatingLabelInput
              value={costType}
              label="Material Type"
              onChange={(e) => {
                setCostType(e.target.value);
              }}
            />
            <FloatingLabelSelect
              value={costUom}
              label="Unit of Measure"
              onValueChange={(e) => {
                setCostUom(e);
              }}
            >
              <SelectTrigger>
                <SelectValue
                  value={costType}
                  placeholder="Please select Unit of Measure!"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {type.map((value) => {
                    // debugger;
                    return (
                      <SelectItem value={value.value}>{value.name}</SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </FloatingLabelSelect>

            <FloatingLabelInput
              value={quantity}
              label="Quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
              min="0"
              step="any"
            />
            <FloatingLabelInput
              value={unitAmount}
              label="Unit Amount"
              onChange={(e) => {
                setUnitAmount(e.target.value);
              }}
              type="number"
              min="0"
              step="any"
            />
            <FloatingLabelInput
              value={discount}
              label="Discount"
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              type="number"
              min="0"
              step="any"
            />
            <FloatingLabelInput
              value={tax}
              label="Tax"
              onChange={(e) => {
                setTax(e.target.value);
              }}
              type="number"
              min="0"
              step="any"
            />
            <FloatingLabelInput
              value={totalAmt}
              label="Total Amount"
              onChange={(e) => {
                setTotalAmt(formatCurrencyVND(e.target.value));
              }}
              readOnly
            />
            <br />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCloseFunction}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleConfirm}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

export default DialogAddMaterial;
