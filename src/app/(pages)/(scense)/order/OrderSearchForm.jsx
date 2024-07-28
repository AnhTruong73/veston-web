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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useToast } from '@/components/ui/use-toast';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { searchOrderMaster } from '@/app/apis/order/order';
import {
  getListRequest,
  getListRequestError,
  getListRequestSuccess,
  getParamSearch,
} from '@/app/redux/slice/scense/order';

export default function OrderSearchForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.order.isLoading);

  const form = useForm({
    defaultValues: {
      // area_id_otp: '',
      // area_nm_otp: '',
      // material_id_otp: '',
      // material_nm_otp: '',
      // email_otp: '',
      // phone_otp: '',
      // address_otp: '',
      //   branch_id_otp: userInfo.branch_id,
    },
  });

  const handleSearchRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await searchOrderMaster(paramsSearch);
      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Searching Successfully!',
          description: message,
        });
        console.log(data)
        dispatch(getListRequestSuccess(data.rows));
        dispatch(getParamSearch(paramsSearch));
      } else {
        toast({
          variant: 'default',
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

  //   useEffect(() => {
  //     dispatch(refreshMaterial());
  //     // form.handleSubmit();
  //   }, []);

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
                name="order_id_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Order ID"
                        {...field}
                        {...form.register('order_id_otp')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="customer_id_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Customer ID"
                        {...field}
                        {...form.register('customer_id_otp')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="cre_dt"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, 'dd/MM/yyyy')
                              : <p>Select Create Date</p>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            fromYear={1960}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  );
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div>
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
