'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import {
  insertOrderMaster,
  searchOrderMaster,
  updateStatusOrder,
  updateStatusSew,
} from '@/app/apis/order/order';
import {
  getListRequest,
  getListRequestSuccess,
  setDone,
} from '@/app/redux/slice/scense/order';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function OrderlMasterForm() {
  const { toast } = useToast();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [balance, setBalance] = useState(0);

  var orderDetail = useSelector((state) => state.order.detail);
  const isLoading = useSelector((state) => state.order.isLoading);
  const paramSearch = useSelector((state) => state.order.paramSearch);
  const flagDone = useSelector((state) => state.order.flagDone);

  console.log(flagDone);

  if (orderDetail) {
    const convertDate = format(orderDetail.cre_dt, 'dd/MM/yyyy');
    orderDetail = {
      ...orderDetail,
      conv_cre_dt: convertDate,
      balance: balance,
    };
  }

  const onSubmit = (e) => {
    handleConfirmOrder(e);
  };

  const handleConfirmOrder = async (e) => {
    e = { ...e, statusDone: 'APPROVE' };
    const insertOrder = await insertOrderMaster(e);
    const updateStatusOrders = await updateStatusOrder(e);
    const updateStatusSews = await updateStatusSew(e);
    if (updateStatusSews.status == 1 && insertOrder.status == 1) {
      toast({
        variant: 'success',
        title: 'Update Successfully!',
        description: updateStatusSews.message,
      });
      const { status, data } = await searchOrderMaster(paramSearch);
      if (status == 1) {
        dispatch(getListRequestSuccess(data.rows));
        push('/order');
      }
    }
  };

  const handleDoneOrder = async () => {
    orderDetail = { ...orderDetail, statusDone: 'DONE' };
    const orderDone = await updateStatusOrder(orderDetail);
    if (orderDone.status == 1) {
      toast({
        variant: 'success',
        title: 'Update Successfully!',
        description: orderDone.message,
      });
      dispatch(setDone(null));
      const { status, data } = await searchOrderMaster(paramSearch);
      if (status == 1) {
        dispatch(getListRequestSuccess(data.rows));
        push('/order');
      }
    }
  };

  const form = useForm({});
  useEffect(() => {
    if (orderDetail) {
      setBalance(orderDetail.totalAmount - orderDetail.prepaid);
      console.log(orderDetail.status);
      Object.keys(orderDetail).forEach((key) => {
        form.setValue(key, orderDetail[key]);
      });
    }
  }, [orderDetail, form.setValue]);

  return (
    <Card>
      <Form {...form}>
        <form disable={isLoading} onSubmit={form.handleSubmit(onSubmit)}>
          {/* <CardHeader></CardHeader> */}
          <CardHeader className="px-7">
            <CardTitle className="text-2xl">Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 grid-flow-row gap-5">
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order ID</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        {...form.register('orderId')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="col-span-1"
                control={form.control}
                name="branchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch ID</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        {...form.register('branchId')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer ID</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        {...form.register('customerId')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        {...form.register('fullName')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        {...form.register('phoneNumber')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input readOnly {...field} {...form.register('email')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        {...form.register('shippingAddress')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Method</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        {...form.register('shippingMethod')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="est_delivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimate Delivery</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('est_delivery')}
                        readOnly={
                          orderDetail.status != 'REQUEST' ? true : false
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="actual_delivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actual Delivery</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        {...form.register('actual_delivery')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cre_usr_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Created By</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('cre_usr_id')}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="conv_cre_dt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Created Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('conv_cre_dt')}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input {...field} {...form.register('status')} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prepaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pre Paid</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('prepaid')}
                        readOnly={
                          orderDetail.status != 'REQUEST' ? true : false
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance Payment</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('balance')}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('totalAmount')}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="flex">
              <Button
                type="button"
                className="w-full"
                disabled={flagDone != 'DONE' ? true : false}
                onClick={handleDoneOrder}
              >
                Done
              </Button>
              &nbsp;
              <Button
                type="submit"
                className="w-full"
                disabled={orderDetail.status != 'REQUEST' ? true : false}
              >
                Approval
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
