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
            </DialogHeader>
            <FloatingLabelInput
              label="Material Name"
              onChange={(e) => {
                setCostName(e.target.value);
              }}
            />
            <FloatingLabelInput
              label="Material Color"
              onChange={(e) => {
                setCostColor(e.target.value);
              }}
            />
            <FloatingLabelInput
              label="Material Type"
              onChange={(e) => {
                setCostType(e.target.value);
              }}
            />
            <FloatingLabelSelect
              label="Unit of Measure"
              onValueChange={(e) => {
                setCostUom(e);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Please select Unit of Measure!" />
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
              label="Quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
              min="0"
              step="any"
            />
            <FloatingLabelInput
              label="Unit Amount"
              onChange={(e) => {
                setUnitAmount(e.target.value);
              }}
              type="number"
              min="0"
              step="any"
            />
            <FloatingLabelInput
              label="Discount"
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              type="number"
              min="0"
              step="any"
            />
            <FloatingLabelInput
              label="Tax"
              onChange={(e) => {
                setTax(e.target.value);
              }}
              type="number"
              min="0"
              step="any"
            />
            <FloatingLabelInput
              label="Total Amount"
              onChange={(e) => {
                setTax(e.target.value);
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
