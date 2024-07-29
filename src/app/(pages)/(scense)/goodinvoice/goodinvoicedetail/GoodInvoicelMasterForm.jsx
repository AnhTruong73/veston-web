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
  FormMessage,
} from '@/components/ui/form';

import { Status } from '@prisma/client';

import { useToast } from '@/components/ui/use-toast';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';

import { Label } from '@/components/ui/label';
import { searchNameBranch } from '@/app/apis/branch/branch';
import {
  insertGoodInvoiceMaster,
  searchGoodInvoiceMaster,
  updateGoodInvoiceMaster,
} from '@/app/apis/goodinvoice/goodinvoicedetail';
import { setLayoutLoading } from '@/app/redux/slice/stateSlice';
import { FloatingLabelSelect } from '@/components/ui/floating-label-select';
import {
  getListRequestError,
  getListRequestSuccess,
  getMasterInsertSuccess,
  refreshGoodInvoiceDetail,
} from '@/app/redux/slice/scense/goodinvoicedetail';

export default function GoodInvoicelMasterForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isApproved, setIsApproved] = useState(false);
  const isSaved = useSelector((state) => state.goodinvoicedetail.isSaved);

  const isLoading = useSelector((state) => state.goodinvoicedetail.isLoading);
  const userInfo = useSelector((state) => state.auth.user);
  var goodInvoiceMaster = useSelector(
    (state) => state.goodinvoicedetail.master
  );
  const defaultValue = {
    branch_id: '',
    branch: { branch_nm: '' },
    inv_id: '',
    issue_dt: '',
    provider_address: '',
    provider_nm: '',
    provider_phone: '',
    provider_representative: '',
    status: 'REQUEST',
    total_amt: '',
    cre_usr_id: userInfo.usr_id,
  };
  const form = useForm({
    defaultValues: defaultValue,
  });
  const branchId = form.watch('branch_id');

  const handleOnChangeBranchID = async (value) => {
    if (value.length >= 1) {
      const { status, data } = await searchNameBranch({
        branchId: value,
      });
      if (status == '1') {
        form.setValue('branch.branch_nm', data.rows[0].branch_nm);
      } else {
        form.setValue('branch.branch_nm', '');
      }
    } else {
      form.setValue('branch.branch_nm', '');
    }
  };

  useEffect(() => {
    if (goodInvoiceMaster == null) {
      form.reset(defaultValue);
    } else {
      form.reset(goodInvoiceMaster);
    }
  }, [goodInvoiceMaster]);
  useEffect(() => {
    dispatch(setLayoutLoading(false));
    dispatch(refreshGoodInvoiceDetail());
    form.reset(defaultValue);
  }, []);

  useEffect(() => {
    if (branchId != '') {
      handleOnChangeBranchID(branchId);
    }
  }, [branchId, form.setValue]);

  const handleSearchMasterRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await searchGoodInvoiceMaster(
        paramsSearch
      );

      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Searching Successfully!',
          description: message,
        });
        dispatch(getMasterInsertSuccess(data.rows[0]));
        dispatch(getListRequestSuccess(data.rows[0].goodsInvoiceDetail));
        setIsApproved(true);
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

  const handleSaveMasterForm = async (formValue) => {
    // dispatch(setItemDetailRequest(null));
    try {
      const { status, message, data } = await insertGoodInvoiceMaster(
        formValue
      );
      console.log(data);
      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Save Successfully!',
          description: message,
        });
        dispatch(getMasterInsertSuccess(formValue));
      } else {
        toast({
          variant: 'default',
          title: 'Save failed!',
          description: message,
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Save failed!',
        description: 'Có lỗi xảy ra!',
      });
    } finally {
      dispatch(setLayoutLoading(false));
    }
  };

  const handleUpdateMasterForm = async (formValue) => {
    try {
      const { status, message, data } = await updateGoodInvoiceMaster(
        formValue
      );

      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Save Successfully!',
          description: message,
        });

        dispatch(getMasterInsertSuccess(formValue));
      } else {
        toast({
          variant: 'default',
          title: 'Save failed!',
          description: message,
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Save failed!',
        description: 'Có lỗi xảy ra!',
      });
    } finally {
      dispatch(setLayoutLoading(false));
    }
  };

  return (
    <Card>
      <Form {...form}>
        <form disable={isLoading}>
          {/* <CardHeader></CardHeader> */}
          <CardHeader className="px-7">
            <CardTitle className="text-2xl">General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid xl:grid-cols-6 2xl:grid-cols-8 grid-flow-row gap-4">
              <div className="grid items-center gap-1.5">
                <Label>For</Label>
              </div>

              <div className="grid items-center gap-1.5 col-span-2 grid-flow-col min-w-[380px]">
                <FormField
                  className="col-span-1"
                  control={form.control}
                  name="branch_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          label="Branch ID"
                          readOnly={isSaved}
                          {...field}
                          {...form.register('branch_id')}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  className="min-w-[190px]"
                  control={form.control}
                  name="branch.branch_nm"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label="Branch Name"
                          {...field}
                          {...form.register('branch.branch_nm')}
                          // disabled
                          readOnly
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
                  name="inv_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          label="Good Invoice ID"
                          readOnly={isSaved}
                          {...field}
                          {...form.register('inv_id')}
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
                  name="cre_usr_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          label="Created by"
                          {...field}
                          {...form.register('cre_usr_id')}
                          readOnly
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
                  name="issue_dt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          label="Issued Date"
                          readOnly={isSaved}
                          type="date"
                          {...field}
                          {...form.register('issue_dt')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid items-center row-start-2 gap-1.5">
                <Label>From</Label>
              </div>
              <div className="grid items-center row-start-2 gap-1.5">
                <FormField
                  control={form.control}
                  name="provider_nm"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          label="Provider Name"
                          readOnly={isSaved}
                          {...field}
                          {...form.register('provider_nm')}
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
                  name="provider_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          label="Provider Phone"
                          readOnly={isSaved}
                          {...field}
                          {...form.register('provider_phone')}
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
                  name="provider_representative"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          label="Provider Representative"
                          readOnly={isSaved}
                          {...field}
                          {...form.register('provider_representative')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid items-center row-start-2 gap-1.5 col-span-2">
                <FormField
                  control={form.control}
                  name="provider_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          label="Provider Address"
                          readOnly={isSaved}
                          {...field}
                          {...form.register('provider_address')}
                        />
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
                  name="total_amt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          type="number"
                          min="0"
                          step="any"
                          label="Total Amount"
                          {...field}
                          {...form.register('total_amt')}
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
                      <FormControl>
                        <FloatingLabelSelect
                          label="Status"
                          {...field}
                          disabled
                          {...form.register('status')}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Object.keys(Status).map((key) => (
                                <SelectItem key={key} value={key}>
                                  {Status[key]}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </FloatingLabelSelect>
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
                type="button"
                className="w-full"
                disabled={isSaved}
                onClick={() => {
                  dispatch(setLayoutLoading(true));
                  handleSearchMasterRequest(form.getValues());
                }}
              >
                Search
              </Button>
              &nbsp;
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  dispatch(refreshGoodInvoiceDetail());
                  if (!isSaved) form.reset(defaultValue);
                }}
              >
                Clear All
              </Button>
              &nbsp;
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  dispatch(setLayoutLoading(true));
                  isSaved
                    ? handleUpdateMasterForm(form.getValues())
                    : handleSaveMasterForm(form.getValues());
                }}
                disabled={isApproved}
              >
                Save
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
