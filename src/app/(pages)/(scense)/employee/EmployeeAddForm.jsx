'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import React, { useEffect, useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getListAreaSuccess,
  getListRequestSuccess,
  refreshFormEmp,
} from '@/app/redux/slice/scense/employee';
import { insertEmployee, searchEmployee } from '@/app/apis/employee/employee';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { EmpFormValidations } from '@/validations/emp_validations';
import ImageProfile from './ImageProfile';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { searchBranch } from '@/app/apis/branch/branch';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchArea } from '@/app/apis/area/area';

export default function EmployeeAddForm(data) {
  const options = useSelector((state) => state.employee.optionSelect);
  const flagGet = useSelector((state) => state.employee.flags);
  const searchOption = useSelector((state) => state.employee.searchOption);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const users = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [branchArea, setbranchArea] = useState([]);
  // const [flagAcc, setflagAcc] = useState(true);

  const statusHide = flagGet === 0 ? 'w-4/12' : 'w-4/12 hidden';

  var form = useForm({
    resolver: zodResolver(EmpFormValidations),
    defaultValues: {
      area_id: '',
      branch_id: '',
      employee_nm: '',
      position: '',
      email: '',
      gender: '',
      salary: '',
      address: '',
      phone: '',
      imgsrc: '',
    },
  });

  const handleSelectChange = async (e) => {
    const areaId = { area_id_otp: e };
    console.log(areaId);
    try {
      const { message, status, data } = await searchBranch(areaId);
      setbranchArea(data.rows);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Select failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
    }
  };

  const onSubmit = (e) => {
    debugger;
    handlerSubmit(e);
  };

  const handlerSubmit = async (e) => {
    e.cre_usr_id = users.usrname;
    console.log(e.birthday);

    try {
      // e =  {...e, 'flagAcc': flagAcc}
      const insEmp = await insertEmployee(e);
      if (insEmp.status == 1) {
        toast({
          variant: 'success',
          title: 'Add Employee Successfully!',
          description: 'Save Successfully',
        });
        const newUpEmp = await searchEmployee(searchOption);
        dispatch(getListRequestSuccess(newUpEmp.data.rows));
        dispatch(refreshFormEmp());
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Save Failed!',
          description: 'Save Failed!',
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Select failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
    }
  };

  const handleCloseForm = async () => {
    dispatch(refreshFormEmp());
    form.reset();
  };

  const handleSelectArea = async () => {
    try {
      const { data } = await searchArea();
      dispatch(getListAreaSuccess(data.rows));
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: e ?? 'Có lỗi xảy ra!',
      });
    }
  };

  useEffect(() => {
    handleSelectArea();
  }, []);

  useEffect(() => {
    dispatch(refreshFormEmp());
    form.reset();
  }, [form.reset]);

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
            <CardHeader className=""></CardHeader>
            <CardContent className="p-6 text-sm">
              {/* <FormField
                control={form.control}
                name="imgsrc"
                hidden
                render={({ field }) => (
                  <>
                    <ImageProfile setValue={form.setValue} />
                  </>
                )}
              /> */}
            </CardContent>
            <CardContent>
              <FormField
                className=""
                control={form.control}
                name="area_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <FormControl>
                        <Select
                          {...field}
                          {...form.register('area_id')}
                          onValueChange={(e) => {
                            field.onChange(e);
                            handleSelectChange(e);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {options.map((option) => (
                                <SelectItem value={option.area_id}>
                                  {option.area_nm}
                                </SelectItem>
                              ))}
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
                name="branch_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <FormControl>
                        <Select
                          {...field}
                          {...form.register('branch_id')}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* Map over the options array to create option elements */}
                              {branchArea.map((option) => (
                                <SelectItem value={option.branch_id}>
                                  {option.branch_nm}
                                </SelectItem>
                              ))}
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
                            <SelectValue placeholder="Select gender" />
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
                        {...form.register('salary', { valueAsNumber: true })}
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
                        {...form.register('email')}
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} {...form.register('address')}></Input>
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
                        type="number"
                        maxlength="10"
                        min="9"
                        valueAsNumber="true"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="mb-2 mt-8" />
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
