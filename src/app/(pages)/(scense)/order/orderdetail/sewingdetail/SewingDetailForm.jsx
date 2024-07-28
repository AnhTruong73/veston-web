'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { FloatingLabelInput } from '@/components/ui/floating-label-input';

import { Label } from '@/components/ui/label';
import {
  searchOrderMaster,
  searchSewingOrder,
  updateSewDone,
} from '@/app/apis/order/order';
import {
  getListRequestSuccess,
  setDone,
  setItemDetailRequest,
} from '@/app/redux/slice/scense/order';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function SewingDetailForm() {
  const { toast } = useToast();
  const { push } = useRouter();
  const dispatch = useDispatch();

  var orderDetail = useSelector((state) => state.order.SewDetail);
  const isLoading = useSelector((state) => state.order.isLoading);
  const paramSearch = useSelector((state) => state.order.paramSearch);

  if (orderDetail) {
    const convertDate = format(orderDetail.cre_dt, 'dd/MM/yyyy');
    orderDetail = { ...orderDetail, conv_cre_dt: convertDate };
  }

  const onSubmit = (e) => {
    handleDoneSew(e);
  };

  const handleDoneSew = async (e) => {
    e.status = 'DONE';
    const updateStatusSews = await updateSewDone(e);
    if (updateStatusSews.status == 1) {
      toast({
        variant: 'success',
        title: 'Update Successfully!',
        description: updateStatusSews.message,
      });
      dispatch(setDone(updateStatusSews.data.rows));
      const searchOM = await searchOrderMaster(paramSearch);
      const searchSO = await searchSewingOrder(orderDetail.orderId);
      if (searchOM.status == 1 && searchSO.status == 1) {
        toast({
          variant: 'success',
          title: 'Searching Successfully!',
          description: searchOM.message,
        });
        dispatch(setItemDetailRequest(searchSO.data.rows));
        dispatch(getListRequestSuccess(searchOM.data.rows));
        push('/order/orderdetail');
      }
    }
  };

  const form = useForm({});
  useEffect(() => {
    if (orderDetail) {
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
          <CardHeader className="px-7"></CardHeader>
          <CardContent>
            <div className="grid xl:grid-cols-6 2xl:grid-cols-8 grid-flow-row gap-4">
              <div className="grid items-center gap-1.5">
                <Label>General</Label>
              </div>
              <div className="grid items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="sewingTicketId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sewing Ticket ID</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('sewingTicketId')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-1.5">
                <FormField
                  className="col-span-1"
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
              </div>
              <div className="grid items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product ID</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('productId')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-1.5 ">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('quantity')}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-1.5 ">
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
              </div>
              <div className="grid items-center row-start-2 gap-1.5">
                <Label>Measurements</Label>
              </div>
              <div className="grid items-center row-start-2 gap-1.5">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('height')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center row-start-2 gap-1.5">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('weight')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center row-start-2 gap-1.5">
                <FormField
                  control={form.control}
                  name="bust"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bust</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} {...form.register('bust')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center row-start-2 gap-1.5">
                <FormField
                  control={form.control}
                  name="waist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waist</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('waist')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center row-start-2 gap-1.5">
                <FormField
                  control={form.control}
                  name="hips"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hips</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} {...form.register('hips')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center row-start-3 gap-1.5 ">
                <Label>Total Amount</Label>
              </div>
              <div className="grid items-center row-start-3 gap-1.5 ">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          {...field}
                          {...form.register('price')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center row-start-3 gap-1.5 ">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('status')}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="flex">
              <Button
                type="submit"
                className="w-full"
                disabled={orderDetail.status == 'DONE' ? true : false}
              >
                DONE
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
