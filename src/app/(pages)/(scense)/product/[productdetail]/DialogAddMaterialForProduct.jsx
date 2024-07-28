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
import React, { useEffect } from 'react';
import { searchCostCodeDetail } from '@/app/apis/costcode/costcode';

// export default function DialogAddMaterial({
const DialogAddMaterialForProduct = React.memo(
  ({
    btnNm,
    dialogTitle,
    onClickFunction,
    onCloseFunction,
    isDisabled,
    open,
    setOpen,
  }) => {
    const itemData = useSelector((state) => state.product.costcode);
    const defaultValue = {
      product_detail_id: '',
      cost_cd: '',
      quantity: 0,
      costcode: {
        cost_cd: '',
        cost_nm: '',
        cost_color: '',
        cost_type: '',
        cost_uom: '',
      },
    };
    const form = useForm();

    const costCd = form.watch('costcode.cost_cd');

    const onSubmit = (e) => {
      onClickFunction(e);
    };
    const handleOnChangeCostcodeID = async (value) => {
      if (value.length > 0) {
        const { status, data } = await searchCostCodeDetail({
          costCd: value,
        });
        if (status == '1') {
          const costCode = data.rows[0];
          form.setValue('product_detail_id', costCode.cost_cd);
          form.setValue('costcode.cost_cd', costCode.cost_cd);

          form.setValue('costcode.cost_nm', costCode.cost_nm);
          form.setValue('costcode.cost_color', costCode.cost_color);
          form.setValue('costcode.cost_type', costCode.cost_type);
          form.setValue('costcode.cost_uom', costCode.cost_uom);
        } else {
          form.setValue('product_detail_id', '');

          form.setValue('costcode.cost_nm', '');
          form.setValue('costcode.cost_color', '');
          form.setValue('costcode.cost_type', '');
          form.setValue('costcode.cost_uom', '');
        }
      }
    };
    useEffect(() => {
      if (costCd) {
        handleOnChangeCostcodeID(costCd);
      }
    }, [costCd, form.setValue]);

    useEffect(() => {
      if (itemData == null) {
        form.reset(defaultValue);
      } else {
        form.reset(itemData);
      }
    }, [itemData]);
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen} onClose={onCloseFunction}>
          <DialogTrigger asChild>
            <Button disabled={isDisabled} onClick={onCloseFunction}>
              {btnNm}
            </Button>
          </DialogTrigger>
          <DialogContent className={'overflow-y-scroll max-h-[500px]'}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>{dialogTitle}</DialogTitle>
                </DialogHeader>
                <br />

                <FormField
                  className="hidden"
                  control={form.control}
                  name="product_detail_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="hidden"
                          {...field}
                          {...form.register('product_detail_id')}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  className="col-start-2"
                  control={form.control}
                  name="costcode.cost_cd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barcode No.</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('costcode.cost_cd')}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="costcode.cost_nm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Name</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('costcode.cost_nm')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="costcode.cost_color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Color</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('costcode.cost_color')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="costcode.cost_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Type</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('costcode.cost_type')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="costcode.cost_uom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit of Measure </FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('costcode.cost_uom')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="any"
                          {...field}
                          {...form.register('quantity')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <br />
                <DialogFooter>
                  <DialogClose asChild onC>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={onCloseFunction}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Confirm</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

export default DialogAddMaterialForProduct;
