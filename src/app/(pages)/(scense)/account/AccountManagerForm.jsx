'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Role } from '@prisma/client';

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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { FloatingLabelSelect } from '@/components/ui/floating-label-select';
import { insertAccount, searchUser } from '@/app/apis/account/account';

export default function AccountManagerForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const users = useSelector((state) => state.auth.user);

  const [userType, setUserType] = useState([]);

  const defaultValue = {
    usr_id: '',
    usr_name: '',
    usrname: '',
    email: '',
    password: '',
    confirm_password: '',
    role: '',
  };
  const form = useForm({
    defaultValues: defaultValue,
  });

  const handlerSubmit = async (e) => {
    try {
      e.cre_usr_id = users.usrname;
      const creAcc = await insertAccount(e);
      if (creAcc.status == 1) {
        toast({
          variant: 'success',
          title: 'Create Account Successfully!',
          description: creAcc.message,
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Save Failed!',
          description: creAcc.message,
        });
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Select failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
    }
  };

  const handleSearchUser = async (e) => {
    try {
      switch (userType) {
        case 'Employee':
          const emp_id = { employee_id: e };
          const emp = await searchUser(emp_id);
          form.setValue('email', emp.data.rows.email);
          form.setValue('usr_name', emp.data.rows.employee_nm);
          form.setValue('usrname', emp.data.rows.usrname);

          break;
        case 'Shareholder':
          const sh_id = { shareholder_id: e };
          const shares = await searchUser(sh_id);
          console.log(shares.data);
          form.setValue('email', shares.data.rows.email);
          form.setValue('usr_name', shares.data.rows.shareholder_nm);
          break;
        default:
      }
    } catch {}
  };

  useEffect(() => {}, [form.setValue]);
  console.log(Role);
  const onSubmit = (e) => {
    handlerSubmit(e);
  };
  return (
    <Card>
      <Form {...form}>
        <form disable={isLoading} onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="px-7">
            <CardTitle className="text-2xl">Account Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid xl:grid-cols-2 2xl:grid-cols-8 grid-flow-row gap-3">
              <div className="grid items-center gap-1 col-span-2">
                <FormField
                  className="grid items-center gap-1 "
                  control={form.control}
                  name="user_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <FormControl>
                        <FloatingLabelSelect
                          {...form.register('user_type')}
                          onValueChange={(e) => {
                            field.onChange(e);
                            setUserType(e);
                            form.reset();
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Employee">Employee</SelectItem>
                              <SelectItem value="Shareholder">
                                Shareholder
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </FloatingLabelSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center row-start-2 gap-1.5 col-span-2">
                <FormField
                  control={form.control}
                  name="usr_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User ID</FormLabel>
                      <FormControl>
                        <Input
                          label="User ID"
                          onChange={handleSearchUser(field.value)}
                          {...field}
                          {...form.register('usr_id', {
                            required: 'User ID must be selected!',
                          })}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-1 col-span-2">
                <FormField
                  control={form.control}
                  name="usr_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          label="Full Name"
                          {...field}
                          {...form.register('usr_name', {
                            required: 'Full Name is required!',
                          })}
                          readOnly
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-1 col-span-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          label="Email"
                          {...field}
                          {...form.register('email', {
                            required: 'Email is required!',
                          })}
                          readOnly
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-1 col-span-2">
                <FormField
                  control={form.control}
                  name="usrname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          label="Username"
                          {...field}
                          {...form.register('usrname', {
                            required: 'Username is required!',
                          })}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-1 col-span-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          label="Password"
                          {...field}
                          {...form.register('password', {
                            required: 'Password is required!',
                          })}
                          type="password"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-1 col-span-2">
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          label="Confirm Password"
                          {...field}
                          {...form.register('confirm_password', {
                            validate: (value) =>
                              value === form.watch('password') ||
                              'Passwords do not match',
                          })}
                          type="password"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-1 col-span-2 ">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <FloatingLabelSelect
                          {...field}
                          {...form.register('role', {
                            required: 'Role is required!',
                          })}
                          onValueChange={(e) => {
                            field.onChange(e);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Please select Role!" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Object.keys(Role).map((key) => (
                                <SelectItem key={key} value={key}>
                                  {Role[key]}
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
              <Button type="submit" className="w-full">
                Save
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
