'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Cookies from 'js-cookie';
import { COOKIE_KEY } from '@/web.config';
import { login } from '@/app/apis/auth/auth';
import { loginRequest, loginSuccess } from '@/app/redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoginFormValidations } from '@/validations/login-validations';
import { useToast } from '@/components/ui/use-toast';
import { setLayoutLoading } from '@/app/redux/slice/stateSlice';

function LoginForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(LoginFormValidations),
    defaultValues: {
      usrname: '',
      password: '',
    },
  });

  const handleLoginRequest = async ({ usrname, password }) => {
    try {
      const { status, message, data } = await login({ usrname, password });
      console.log(status, message, data);
      if (status == 1) {
        const { token, user } = data;
        Cookies.set(COOKIE_KEY.API_TOKEN_KEY, token);
        dispatch(loginSuccess({ token: token, user: user }));
        toast({
          variant: 'success',
          title: 'Login successfully!',
          description: message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed!',
          description: message,
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Login failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
    } finally {
      dispatch(setLayoutLoading(false));
    }
  };

  const onSubmit = (e) => {
    dispatch(setLayoutLoading(true));
    handleLoginRequest(e);
  };

  return (
    <>
      <Spin spinning={false}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              className="grid gap-2"
              control={form.control}
              name="usrname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter username!"
                      {...field}
                      {...form.register('usrname')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              className="grid gap-2"
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      // autoComplete={true}
                      {...field}
                      {...form.register('password')}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </Spin>
    </>
  );
}

export default LoginForm;
