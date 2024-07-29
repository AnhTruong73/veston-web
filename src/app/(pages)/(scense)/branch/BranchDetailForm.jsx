'use client';
import React, { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';
import {
  setItemDetailRequest,
  setItemDetailRequestSuccess,
  getListRequestSuccess,
} from '@/app/redux/slice/scense/branch';
import {
  updateBranch,
  insertBranch,
  searchNameArea,
  searchBranch,
} from '@/app/apis/branch/branch';
import { useToast } from '@/components/ui/use-toast';

import { setLayoutLoading } from '@/app/redux/slice/stateSlice';
export default function BranchDetailForm(data) {
  const detailItem = useSelector((state) => state.branch.detail);
  const searchOption = useSelector((state) => state.branch.searchOption);
  const isLoading = useSelector((state) => state.branch.isLoading);
  const dispatch = useDispatch();

  var form = useForm();

  const { toast } = useToast();
  var isAutoGenerate = { readOnly: false };
  const handleCloseForm = async () => {
    dispatch(setItemDetailRequest(null));
  };
  const handleOnChangeAreaID = async (paramsEdit) => {
    var key = paramsEdit.target.name;
    var value = paramsEdit.target.value;
    form.setValue(key, value);
    if (value.length >= 1) {
      const { status, message, data } = await searchNameArea({
        area_id: value,
      });
      if (status == '1') {
        form.setValue('area_nm', data.rows[0].area_nm);
        isAutoGenerate = { readOnly: true };
      } else {
        form.setValue('area_nm', '');
        isAutoGenerate = { readOnly: false };
      }
    } else {
      form.setValue('area_nm', '');
      isAutoGenerate = { readOnly: false };
    }
  };
  const handleUpdateRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await updateBranch(paramsSearch);
      if (status == '1') {
        toast({
          variant: 'success',
          title: 'Update Successfully!',
          description: message,
        });
        const newUpBranch = await searchBranch(searchOption);
        dispatch(getListRequestSuccess(newUpBranch.data.rows));
      } else {
        toast({
          variant: 'destructive',
          title: 'Update Failed!',
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
  const handleInsertRequest = async (paramsSearch) => {
    try {
      const { status, message, data } = await insertBranch(paramsSearch);
      if (status == '1') {
        toast({
          variant: 'success',
          title: 'Insert Successfully!',
          description: message,
        });
        dispatch(setItemDetailRequestSuccess(data.key));
      } else {
        toast({
          variant: 'destructive',
          title: 'Insert Failed!',
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
  useEffect(() => {
    if (detailItem && detailItem.flgTp != 'I') {
      Object.keys(detailItem).forEach((key) => {
        form.setValue(key, detailItem[key]);
      });
    } else if (detailItem && detailItem.flgTp == 'I') {
      Object.keys(form.getValues()).forEach((key) => {
        form.setValue(key, detailItem[key] ? detailItem[key] : '');
        form.setValue('flgTp', 'I');
      });
    }
  }, [detailItem, form.setValue]);

  const onSubmit = (e) => {
    dispatch(setLayoutLoading(true));
    if (e.flgTp == 'U') handleUpdateRequest(e);
    else if (e.flgTp == 'I') handleInsertRequest(e);
  };

  if (detailItem && detailItem.flgTp) {
    const isReadOnly =
      detailItem.flgTp == 'R' ? { readOnly: true } : { readOnly: false };
    const isDisabled =
      detailItem.flgTp == 'R' ? { disabled: true } : { disabled: false };
    const isHidden =
      detailItem.flgTp == 'R' ? { hidden: true } : { hidden: false };
    var flgTp = detailItem.flgTp;
    return (
      <div className="w-4/12">
        <Card>
          <Form {...form}>
            <form disable={isLoading} onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader className="grid grid-cols-2">
                <div className="flex flex-col items-start">
                  {flgTp == 'I' && (
                    <FormField
                      control={form.control}
                      name="area_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="area_id"
                              {...field}
                              {...form.register('area_id')}
                              {...isReadOnly}
                              placeholder="Area ID"
                              maxLength={3}
                              onChange={(value) => handleOnChangeAreaID(value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {flgTp == 'I' && (
                    <FormField
                      control={form.control}
                      name="branch_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              {...form.register('branch_id')}
                              {...isReadOnly}
                              placeholder="Branch ID"
                              maxLength={5}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {flgTp != 'I' && (
                    <FormField
                      control={form.control}
                      name="area_id"
                      render={({ field }) => (
                        <CardTitle
                          className="text-sm text-muted-foreground md:inline"
                          {...field}
                          {...form.register('area_id')}
                        >
                          (Area ID:{field.value})
                        </CardTitle>
                      )}
                    />
                  )}
                  {flgTp != 'I' && (
                    <FormField
                      control={form.control}
                      name="branch_id"
                      render={({ field }) => (
                        <CardTitle
                          className="text-sm text-muted-foreground md:inline"
                          {...field}
                          {...form.register('branch_id')}
                        >
                          (Branch ID:{field.value})
                        </CardTitle>
                      )}
                    />
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <Button
                    onClick={() => handleCloseForm()}
                    variant="outline"
                    size="icon"
                    type="button"
                  >
                    <Cross1Icon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <FormField
                  className=""
                  control={form.control}
                  name="area_nm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('area_nm')}
                          {...isReadOnly}
                          {...isAutoGenerate}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className=""
                  control={form.control}
                  name="branch_nm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('branch_nm')}
                          {...isReadOnly}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className=""
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('address')}
                          {...isReadOnly}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className=""
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('phone')}
                          {...isReadOnly}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className=""
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('email')}
                          {...isReadOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br />
                <FormField
                  className=""
                  control={form.control}
                  name="headoffice_yn"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          {...field}
                          {...form.register('headoffice_yn')}
                          onValueChange={field.onChange}
                          {...isDisabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Head Office" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Y">Yes</SelectItem>
                            <SelectItem value="N">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br />
                <FormField
                  className=""
                  control={form.control}
                  name="cre_usr_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Created by</FormLabel>
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
                  className=""
                  control={form.control}
                  name="cre_dt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Create date</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('cre_dt')}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className=""
                  control={form.control}
                  name="upd_usr_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Updated by</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('upd_usr_id')}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className=""
                  control={form.control}
                  name="upd_dt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Update date</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('upd_dt')}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>{' '}
              {flgTp != 'R' && (
                <CardFooter className="flex justify-end">
                  <div className="flex space-x-4 p-4 rounded-lg">
                    <Button type="submit">Save</Button>
                  </div>
                </CardFooter>
              )}
            </form>
          </Form>
        </Card>
      </div>
    );
  }
}
