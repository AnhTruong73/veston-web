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

// export default function DialogAddMaterial({
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
    const defaultValue = {
      inv_id: '',
      branch_id: '',
      total_amt: 0,
      cost_cd: '',
      quantity: 0,
      unit_amount: 0,
      discount: 0,
      tax: 0,
      cre_usr_id: '',
      cre_dt: '',
      upd_usr_id: '',
      upd_dt: '',
      costcode: {
        cost_cd: '',
        cost_nm: '',
        cost_color: '',
        cost_type: '',
        cost_uom: '',
        cre_usr_id: '',
        cre_dt: '',
        upd_usr_id: '',
        upd_dt: '',
      },
    };
    const form = useForm({ defaultValues: defaultValue });

    const costCd = form.watch('costcode.cost_cd');

    const onSubmit = (e) => {
      onClickFunction(e);
    };

    useEffect(() => {
      if (costCd) {
        form.setValue('cost_cd', costCd);
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
                  name="branch_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="hidden"
                          {...field}
                          {...form.register('branch_id')}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  className="hidden"
                  control={form.control}
                  name="inv_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="hidden"
                          {...field}
                          {...form.register('inv_id')}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  className="hidden"
                  control={form.control}
                  name="cost_cd"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="hidden"
                          {...field}
                          {...form.register('cost_cd')}
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

                <FormField
                  control={form.control}
                  name="unit_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Amount </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="any"
                          {...field}
                          {...form.register('unit_amount')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="any"
                          {...field}
                          {...form.register('discount')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="any"
                          {...field}
                          {...form.register('tax')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_amt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount </FormLabel>
                      <FormControl>
                        <Input
                          readOnly={true}
                          type="number"
                          min="0"
                          step="any"
                          {...field}
                          {...form.register('total_amt')}
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

export default DialogAddMaterial;
