'use client';
// import * as React from 'react';
import React, { useState, useEffect } from 'react';
// import React, { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import moment from 'moment';

import { Button } from '@/components/ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';
import { refreshFormEmp } from '@/app/redux/slice/scense/employee';
import ImageProfile from './ImageProfile';

export default function EmployeeDetailForm(data) {
  const detailItem = useSelector((state) => state.employee.detail);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const flagGet = useSelector((state) => state.employee.flags);

  const dispatch = useDispatch();

  var statusHide = 'w-4/12 hidden';

  var form = useForm();

  const handleCloseForm = async () => {
    dispatch(refreshFormEmp());
  };

  if (detailItem && flagGet == 2) {
    statusHide = 'w-4/12';
  }

  useEffect(() => {
    if (detailItem) {
      form.reset();
      const conveBirth = moment(detailItem.birthday).format('L');
      const newDetail = { ...detailItem, birthday: conveBirth };
      Object.keys(newDetail).forEach((key) => {
        form.setValue(key, newDetail[key]);
      });
    }
  }, [detailItem, form.setValue, form.reset]);

  return (
    <div className={statusHide}>
      <Card>
        <Form {...form}>
          <div className="m-3 float-right">
            <Button
              onClick={() => handleCloseForm()}
              variant="outline"
              size="icon"
            >
              <Cross1Icon className="h-4 w-4" />
            </Button>
          </div>
          <form disable={isLoading}>
            <CardHeader className="grid grid-cols-2">
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="branchBranch_id"
                  render={({ field }) => (
                    <CardTitle
                      className="text-sm text-muted-foreground md:inline"
                      {...field}
                      {...form.register('branchBranch_id')}
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
                name="imgsrc"
                hidden
                render={({ field }) => (
                  <>
                    <ImageProfile
                      {...field}
                      {...form.register('imgsrc')}
                      imgsrc={field.value}
                      setValue={form.setValue}
                    />
                  </>
                )}
              />
            </CardContent>
            <CardContent>
              <FormField
                className=""
                control={form.control}
                name="employee_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('employee_id')}
                        readOnly
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="employee_nm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('employee_nm')}
                        readOnly
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="area_nm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('Branch.area_nm')}
                          readOnly
                        ></Input>
                      </FormControl>
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
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('Branch.branch_nm')}
                          readOnly
                        ></Input>
                      </FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('position')}
                        readOnly
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('gender')}
                        readOnly
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input {...field} {...form.register('salary')} readOnly />
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
                        readOnly
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('birthday')}
                        readOnly
                      />
                    </FormControl>
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
                        readOnly
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('phone')}
                        readOnly
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=""
                control={form.control}
                name="account.usrname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('account.usrname')}
                        readOnly
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </form>
        </Form>
      </Card>

      {/* <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              <div className="font-medium">Trương Đình Ánh</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                (ID: HCM01E0001)
              </div>
            </CardTitle>
            <CardDescription>Created By: POSTMAN</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <ImageProfile />
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">November 23, 2023</time>
          </div>
        </CardFooter>
      </Card> */}
    </div>
  );
}
