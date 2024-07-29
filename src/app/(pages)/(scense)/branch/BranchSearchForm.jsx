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
  Select,
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

import { searchBranch } from '@/app/apis/branch/branch';
import {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  refreshBranch,
} from '@/app/redux/slice/scense/branch';
import { setLayoutLoading } from '@/app/redux/slice/stateSlice';
import { useToast } from '@/components/ui/use-toast';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { setSearchOption } from '@/app/redux/slice/scense/branch';
import { FloatingLabelSelect } from '@/components/ui/floating-label-select';

export default function BranchSearchForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      area_id_otp: '',
      area_nm_otp: '',
      branch_id_otp: '',
      branch_nm_otp: '',
      email_otp: '',
      phone_otp: '',
      address_otp: '',
      del_yn_otp: '',
    },
  });

  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSearchRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await searchBranch(paramsSearch);
      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Searching Successfully!',
          description: message,
        });
        dispatch(setSearchOption(paramsSearch));
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
    // form.handleSubmit();
    dispatch(setLayoutLoading(false));
    dispatch(refreshBranch());
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
                name="area_id_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Area ID"
                        {...field}
                        {...form.register('area_id_otp')}
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
                name="email_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Email"
                        {...field}
                        {...form.register('email_otp')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="phone_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Phone"
                        {...field}
                        {...form.register('phone_otp')}
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
