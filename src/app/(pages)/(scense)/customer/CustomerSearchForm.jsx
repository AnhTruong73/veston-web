'use client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

import { searchCustomer } from '@/app/apis/customer/customer';
import {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
} from '@/app/redux/slice/scense/customer';
import { useToast } from '@/components/ui/use-toast';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { FloatingLabelSelect } from '@/components/ui/floating-label-select';

export default function CustomerSearchForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      // area_id_otp: '',
      // area_nm_otp: '',
      // employee_id_otp: '',
      // employee_nm_otp: '',
      // email_otp: '',
      // phone_otp: '',
      // address_otp: '',
      del_yn_otp: 'N',
    },
  });
  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSearchRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await searchCustomer(paramsSearch);
      console.log(status);
      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Searching Successfully!',
          description: message,
        });
        dispatch(getListRequestSuccess(data.rows));
      } else {
        toast({
          variant: 'destructive',
          title: 'Searching failed!',
          description: message,
        });
        dispatch(getListRequestError(false));
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
      dispatch(getListRequestError(false));
    }
  };

  const onSubmit = (e) => {
    dispatch(getListRequest(true));
    handleSearchRequest(e);
  };

  useEffect(() => {
    // form.handleSubmit();
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
                name="customer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Customer ID"  
                        {...field} 
                        {...form.register('customer_id')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="customer_nm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Customer Name" 
                        {...field}
                        {...form.register('customer_nm')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="del_yn_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelSelect
                        label="Delete" 
                        defaultValue="N"
                        {...form.register('del_yn_otp')}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Y">Yes</SelectItem>
                            <SelectItem value="N">No</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </FloatingLabelSelect>
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
