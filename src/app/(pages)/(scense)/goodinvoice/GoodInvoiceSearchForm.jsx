'use client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { useToast } from '@/components/ui/use-toast';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { searchGoodInvoiceMasterList } from '@/app/apis/goodinvoice/goodinvoicedetail';
import {
  getListRequest,
  getListRequestError,
  getListRequestSuccess,
  refreshGoodInvoice,
} from '@/app/redux/slice/scense/goodinvoice';
import { setLayoutLoading } from '@/app/redux/slice/stateSlice';

export default function GoodInvoicelSearchForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.goodinvoice.isLoading);

  const form = useForm({
    defaultValues: {},
  });

  const handleSearchRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await searchGoodInvoiceMasterList(
        paramsSearch
      );

      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Searching Successfully!',
          description: message,
        });
        dispatch(getListRequestSuccess(data.rows));
      } else {
        toast({
          variant: 'default',
          title: 'Searching failed!',
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
    }
  };

  const onSubmit = (e) => {
    dispatch(setLayoutLoading(true));
    dispatch(getListRequest(true));
    handleSearchRequest(e);
  };

  useEffect(() => {
    dispatch(setLayoutLoading(false));
    dispatch(refreshGoodInvoice());
  }, []);

  return (
    <Card>
      <Form {...form}>
        <form disable={isLoading} onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">Search Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 grid-flow-row gap-4">
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="branch_id_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Branch ID"
                        {...field}
                        {...form.register('branch_id_otp')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="inv_id_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Good Invoice ID"
                        {...field}
                        {...form.register('inv_id_otp')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="flex space-x-4 p-4 rounded-lg">
              <Button type="submit" className="w-full">
                Search
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
