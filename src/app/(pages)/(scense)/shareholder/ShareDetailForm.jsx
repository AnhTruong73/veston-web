'use client';
import React, { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';
import {
  setItemDetailRequest,
  setLoading,
  setItemDetailRequestSuccess,
  getListRequestSuccess
} from '@/app/redux/slice/scense/shareholder';
import {
 insertShareholder,
 searchShareholder,
 updateShareholder,
} from '@/app/apis/shareholder/shareholder';
import { useToast } from '@/components/ui/use-toast';
import _ from 'lodash';

export default function ShareDetailForm(data) {
  const detailItem = useSelector((state) => state.shareholder.detail);
  const isLoading = useSelector((state) => state.shareholder.isLoading);
  const searchOption = useSelector((state) => state.shareholder.searchOption);
  const dispatch = useDispatch();

  const _ = require('lodash');

  const form = useForm(
  );

  const { toast } = useToast();
  const handleCloseForm = async () => {
    dispatch(setItemDetailRequest(null));
  };

  const ShareToCompare = [
    'shareholder_nm', 
    'address', 
    'phone', 
    'email', 
    'birthday',
    'share_value'
  ];

  const compareChange = (obj1, obj2, keys) => {
    for (let key of keys) {
        if (_.get(obj1, key) !== _.get(obj2, key)) {
            return false;
        }
    }
    return true;
  }

  const handleUpdateRequest = async (paramsSearch) => {
    console.log(detailItem.birthday);
    console.log(paramsSearch.birthday)
    try {
      if(!compareChange(paramsSearch, detailItem, ShareToCompare)){
        const { status, message, data } = await updateShareholder(paramsSearch);
        if (status == 1) {
          toast({
            variant: 'success',
            title: 'Update Successfully!',
            description: message,
          });
          const SHload = await searchShareholder(searchOption);
          dispatch(getListRequestSuccess(SHload.data.rows));
        } else {
          toast({
            variant: 'destructive',
            title: 'Update Failed!',
            description: message,
          });
          dispatch(setLoading(false));
        }
      }else{
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
      dispatch(setLoading(false));
    }
  };
  const handleInsertRequest = async (paramsSearch) => {
    console.log(paramsSearch.share_value)
    try {
      const { status, message, data } = await insertShareholder(paramsSearch);
      if (status == 1) {
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
        dispatch(setLoading(false));
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
      dispatch(setLoading(false));
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
    dispatch(setLoading(true));
    if (e.flgTp == 'U') handleUpdateRequest(e);
    else if (e.flgTp == 'I') handleInsertRequest(e);
  };

  if (detailItem && detailItem.flgTp) {
    const isReadOnly =
      detailItem.flgTp == 'R' ? { readOnly: true } : { readOnly: false };
    var flgTp = detailItem.flgTp;
    return (
      <div className="w-4/12">
        <Card>
          <Form {...form}>
            <form disable={isLoading} onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader className="grid">
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
                  name="shareholder_nm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shareholder Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register('shareholder_nm',{ required: 'Shareholder Name is required!' })}
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
                          {...form.register('address',{ required: 'Address is required!', max: 100})}
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
                          {...form.register('phone',{ required: 'Phone Number is required!' })}
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
                          {...form.register('email', {required: 'Email is required!'})}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                          {...isReadOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                className=""
                control={form.control}
                name="birthday"
                render={({ field }) => {
                  if (!field.value) {
                    field.onChange(new Date()); // Set field value to current date if it's undefined
                  }
                  return (
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
                            {field.value
                              ? format(field.value, 'PPP')
                              : format(new Date(), 'PPP')}
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
                 <FormField
                  className=""
                  control={form.control}
                  name="share_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Shares (%)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          {...form.register('share_value', { valueAsNumber: true, required: 'Share Value is required!' })}
                          {...isReadOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br />
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
