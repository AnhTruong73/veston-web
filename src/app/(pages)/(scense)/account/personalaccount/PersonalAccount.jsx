'use client';
// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import moment from 'moment';
import _ from 'lodash';
import ImageProfile from '../../employee/ImageProfile';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { updateAccount } from '@/app/apis/account/account';
import { updateProfile } from '@/app/apis/employee/employee';
import { updatePerProfile } from '@/app/redux/slice/authSlice';
import { setLayoutLoading } from '@/app/redux/slice/stateSlice';

export default function PersonalAccount(data) {
  var personalProfile = useSelector((state) => state.auth.user);

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { toast } = useToast();
  const _ = require('lodash');

  const form = useForm();

  useEffect(() => {
    if (personalProfile.personalProfile) {
      form.reset();
      const convertBirth = moment(
        personalProfile.personalProfile.birthday
      ).format('L');
      const newDetail = { ...personalProfile, birthday: convertBirth };
      Object.keys(newDetail).forEach((key) => {
        form.setValue(key, newDetail[key]);
      });
    }
  }, [personalProfile, form.setValue, form.reset]);

  const formattedDate = format(
    new Date(personalProfile.personalProfile.birthday),
    'dd-MM-yyyy'
  );
  personalProfile = {
    ...personalProfile,
    'personalProfile.birthday': formattedDate,
  };

  const compareChange = (obj1, obj2, keys) => {
    for (let key of keys) {
      if (_.get(obj1, key) !== _.get(obj2, key)) {
        return false;
      }
    }
    return true;
  };

  const EmpToCompare = [
    'imgsrc',
    'employee_nm',
    'address',
    'phone',
    'employee_id',
  ];

  var PerToCompare = {
    ...PerToCompare,
    employee_nm: personalProfile.personalProfile.employee_nm,
  };
  PerToCompare = {
    ...PerToCompare,
    address: personalProfile.personalProfile.address,
  };
  PerToCompare = {
    ...PerToCompare,
    employee_id: personalProfile.personalProfile.employee_id,
  };
  PerToCompare = {
    ...PerToCompare,
    phone: personalProfile.personalProfile.phone,
  };
  PerToCompare = {
    ...PerToCompare,
    imgsrc: personalProfile.personalProfile.imgsrc,
  };
  console.log(personalProfile);

  const onSubmit = (e) => {
    dispatch(setLayoutLoading(true));
    var emp = {
      ...emp,
      address: e.personalProfile.address,
      employee_nm: e.personalProfile.employee_nm,
      employee_id: e.personalProfile.employee_id,
      phone: e.personalProfile.phone,
      imgsrc: e.imgsrc,
    };

    handleUpdateRequest(emp);
  };

  const handleResetPass = async () => {
    dispatch(setLayoutLoading(true));
    try {
      var e = { ...e, password: password };
      e = { ...e, usrname: personalProfile.usrname };
      if (confirmPassword == password) {
        const { status, data, message } = await updateAccount(e);
        if (status == '1') {
          toast({
            variant: 'success',
            title: 'Update Successfully!',
            description: message,
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Failed!',
            description: 'Change password failed!',
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Change Password Failed!',
          description: 'Confirm password incorrect',
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Select failed!',
        description: 'Có lỗi xảy ra!',
      });
    } finally {
      dispatch(setLayoutLoading(false));
    }
  };

  const handleUpdateRequest = async (paramsSearch) => {
    console.log(PerToCompare.employee_nm);
    try {
      if (!compareChange(paramsSearch, PerToCompare, EmpToCompare)) {
        console.log(paramsSearch);
        const upEmp = await updateProfile(paramsSearch);
        if (upEmp.status == 1) {
          toast({
            variant: 'success',
            title: 'Update Successfully!',
            description: upEmp.message,
          });
          dispatch(updatePerProfile(upEmp.data.rows));
        } else {
          toast({
            variant: 'destructive',
            title: 'Update Failed!',
            description: upEmp.message,
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Update Failed!',
          description: 'Bạn chưa cập nhật thông tin',
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

  return (
    <div className="w-full">
      <Card>
        <Form {...form}>
          <form disable={isLoading} onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="grid grid-cols-2">
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="personalProfile.branchBranch_id"
                  render={({ field }) => (
                    <CardTitle
                      className="text-sm text-muted-foreground md:inline"
                      {...field}
                      {...form.register('personalProfile.branchBranch_id')}
                    >
                      (Branch ID:{field.value})
                    </CardTitle>
                  )}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <FormField
                control={form.control}
                name="personalProfile.imgsrc"
                render={({ field }) => {
                  return (
                    <>
                      <ImageProfile
                        {...field}
                        {...form.register('personalProfile.imgsrc')}
                        setValue={form.setValue}
                        imgsrc={form.getValues('personalProfile.imgsrc')}
                      />
                    </>
                  );
                }}
              />
            </CardContent>
            <CardContent className="space-y-4">
              <FormField
                className=""
                control={form.control}
                name="personalProfile.Branch.branch_nm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormControl>
                        <FloatingLabelInput
                          label="Branch Name"
                          {...field}
                          {...form.register('personalProfile.Branch.branch_nm')}
                          disabled
                        ></FloatingLabelInput>
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="employee_id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Employee ID"
                        {...field}
                        {...form.register('personalProfile.employee_id')}
                        disabled
                      ></FloatingLabelInput>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                className=""
                control={form.control}
                name="personalProfile.employee_nm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        label="Employee Name"
                        {...field}
                        {...form.register('personalProfile.employee_nm')}
                      ></FloatingLabelInput>
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
                    <FormControl>
                      <FloatingLabelInput
                        label="Email"
                        {...field}
                        {...form.register('personalProfile.email')}
                        disabled
                      ></FloatingLabelInput>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="personalProfile.position"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormControl>
                        <FloatingLabelInput
                          label="Position"
                          {...field}
                          disabled
                          {...form.register('personalProfile.position')}
                        ></FloatingLabelInput>
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="personalProfile.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormControl>
                        <FloatingLabelInput
                          label="Gender"
                          {...field}
                          disabled
                          {...form.register('personalProfile.gender')}
                        ></FloatingLabelInput>
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="personalProfile.birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormControl>
                        <FloatingLabelInput
                          label="Birthday"
                          {...field}
                          disabled
                          {...form.register('personalProfile.birthday')}
                        ></FloatingLabelInput>
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="personalProfile.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormControl>
                        <FloatingLabelInput
                          label="Phone"
                          {...field}
                          {...form.register('personalProfile.phone')}
                        ></FloatingLabelInput>
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="personalProfile.address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormControl>
                        <FloatingLabelInput
                          label="Address"
                          {...field}
                          {...form.register('personalProfile.address')}
                        ></FloatingLabelInput>
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Change Password</Button>
                  </DialogTrigger>
                  <form>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">New Password</Label>
                          <Input
                            id="password"
                            type="password"
                            className="col-span-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="col-span-3"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" onClick={handleResetPass}>
                          Save
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </CardContent>
            <CardContent className="flex justify-end">
              <div className="flex space-x-4 p-4 rounded-lg">
                <Button type="submit">Save</Button>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
