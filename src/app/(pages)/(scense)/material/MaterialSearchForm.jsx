'use client';
import React, { useEffect } from 'react';
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

import { searchMaterial } from '@/app/apis/material/material';
import {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  refreshMaterial,
} from '@/app/redux/slice/scense/material';
import { useToast } from '@/components/ui/use-toast';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { setLayoutLoading } from '@/app/redux/slice/stateSlice';

export default function MaterialSearchForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.material.isLoading);
  const userInfo = useSelector((state) => state.auth.user);
  const isDisabled = userInfo.role != 'SUPPERADMIN' ? true : false;
  const form = useForm({
    defaultValues: {
      branch_id_otp: userInfo.personalProfile
        ? userInfo.personalProfile.branchBranch_id
        : '',
    },
  });

  const handleSearchRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await searchMaterial(paramsSearch);

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
    dispatch(getListRequest(true));
    dispatch(setLayoutLoading(true));
    handleSearchRequest(e);
  };

  useEffect(() => {
    dispatch(setLayoutLoading(false));
    dispatch(refreshMaterial());
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
                        disabled={isDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="material_id_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Material ID"
                        {...field}
                        {...form.register('material_id_otp')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="grid items-center gap-1.5"
                control={form.control}
                name="material_name_otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Name"
                        {...field}
                        {...form.register('material_name_otp')}
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
