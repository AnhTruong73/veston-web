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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  getListRequestSuccess,
  getListRequest,
} from '@/app/redux/slice/scense/employee';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Cross1Icon } from '@radix-ui/react-icons';
import { refreshFormEmp } from '@/app/redux/slice/scense/employee';
import { updateEmployee, searchEmployee } from '@/app/apis/employee/employee';
import { useToast } from '@/components/ui/use-toast';

import _ from 'lodash';
import ImageProfile from './ImageProfile';

export default function EmployeeDetailForm(data) {
  const detailItem = useSelector((state) => state.employee.detail);
  const searchOption = useSelector((state) => state.employee.searchOption);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const flagGet = useSelector((state) => state.employee.flags);

  var statusHide = 'w-4/12 hidden';

  const dispatch = useDispatch();
  const { toast } = useToast();
  const _ = require('lodash');

  const form = useForm();
  // {
  //   resolver: zodResolver(EmpFormValidations),
  // }

  const handleCloseForm = async () => {
    dispatch(refreshFormEmp());
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
    'employee_nm',
    'position',
    'gender',
    'salary',
    'email',
    'birthday',
    'address',
    'phone',
    'del_yn',
    'imgsrc'
  ];

  const onSubmit = (e) => {
    console.log(e);
    handleUpdateRequest(e);
  };

  if (detailItem && flagGet == 1) {
    statusHide = 'w-4/12';
  }

  const handleUpdateRequest = async (paramsSearch) => {
    try {
      if (!compareChange(paramsSearch, detailItem, EmpToCompare)) {
        const upEmp = await updateEmployee(paramsSearch);
        if (upEmp.status == 1) {
          toast({
            variant: 'success',
            title: 'Update Successfully!',
            description: upEmp.message,
          });
          const newUpEmp = await searchEmployee(searchOption);
          dispatch(getListRequestSuccess(newUpEmp.data.rows));
          dispatch(refreshFormEmp());
          form.reset();
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
        description: e ?? 'Có lỗi xảy ra!',
      });
    }
  };

  useEffect(() => {
    if (detailItem) {
      form.reset();
      Object.keys(detailItem).forEach((key) => {
        form.setValue(key, detailItem[key]);
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
          <form disable={isLoading} onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="grid grid-cols-2">
              <div className="flex flex-col ">
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
                      <FormControl>
                        <Select
                          {...field}
                          {...form.register('position')}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="RECEPTIONIST">
                                RECEPTIONIST
                              </SelectItem>
                              <SelectItem value="SEWINGSTAFF">
                                SEWINGSTAFF
                              </SelectItem>
                              <SelectItem value="STOREMANAGER">
                                STOREMANAGER
                              </SelectItem>
                              <SelectItem value="SHIPPER">SHIPPER</SelectItem>
                              <SelectItem value="SECURITYGUARD">
                                SECURITYGUARD
                              </SelectItem>
                              <SelectItem value="BRANCHMANAGER">
                                BRANCHMANAGER
                              </SelectItem>
                              <SelectItem value="GENERALMANAGER">
                                GENERALMANAGER
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
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
                      <FormControl>
                        <Select
                          {...field}
                          {...form.register('gender')}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="MALE">MALE</SelectItem>
                              <SelectItem value="FEMALE">FEMALE</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
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
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        {...form.register('salary', {
                          required: 'Salary is required',
                        })}
                      />
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
                        {...form.register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid Email',
                          },
                        })}
                        type="email"
                        placeholder="Example@123.com"
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
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromYear={1960}
                          toYear={2030}
                        />
                      </PopoverContent>
                    </Popover>
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
                        {...form.register('address', {
                          required: 'Address is required',
                        })}
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
                        {...form.register('phone', {
                          required: 'Address is required',
                        })}
                        type="number"
                        maxlength="10"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
            <Separator className="mb-2 mt-8"/>
            <FormField
                className=""
                control={form.control}
                name="del_yn"
                render={({ field }) => (
                <FormItem>
                <FormLabel>Delete Status</FormLabel>
                <FormControl>
                <FormControl>
                    <Select
                    {...field}
                    {...form.register('del_yn')}
                    onValueChange={field.onChange}
                    disabled = {field.value == 'N'? true:false}
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
                    </Select>
                </FormControl>
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
                />  
            {/* <FormField
                className=""
                control={form.control}
                name="usrname"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        {...form.register('account.usrname')}
                        readOnly={true}
                        ></Input>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                className=""
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        {...form.register('password')}
                        type="password"
                        defaultValue=''
                        readOnly={(detailItem && (detailItem.account)? false:true)}
                        ></Input>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                /> */}
            </CardContent>
            <CardContent className="flex justify-end">
              <Button type="submit">Update</Button>
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
