'use client';
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ImageUpload from './ImageUpload';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FashionCategory } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';

import { FloatingLabelSelect } from '@/components/ui/floating-label-select';
import { Textarea } from '@/components/ui/textarea';
import {
  insertProductMaster,
  searchProductMaster,
  updateProductMaster,
} from '@/app/apis/product/product';
import {
  getListRequestError,
  getMasterInsertSuccess,
  refreshProductDetail,
} from '@/app/redux/slice/scense/product';
import { useSearchParams } from 'next/navigation';
const ProductMasterForm = () => {
  var productMaster = useSelector((state) => state.product.master);
  const params = useSearchParams();
  const [newProduct, setNewProduct] = useState({
    product_id: '',
    product_name: '',
    description: '',
    price: '',
    product_img: [],
    category: 'VEST',
    storeProductPrice: '',
  });

  const { toast } = useToast();
  const dispatch = useDispatch();
  const isSaved = useSelector((state) => state.product.isSaved);

  const isLoading = useSelector((state) => state.product.isLoading);
  const userInfo = useSelector((state) => state.auth.user);
  useEffect(() => {
    //
    if (params.get('product_id')) {
      console.log(params.get('product_id'));
      handleSearchMasterRequest({ product_id: params.get('product_id') });
    } else {
      dispatch(refreshProductDetail());
      form.reset(newProduct);
    }
  }, []);
  const handleImageUpload = (fileArray) => {
    const imageArray = [];

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray.push(reader.result);

        if (imageArray.length === fileArray.length) {
          form.setValue('product_img', [...imageArray]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveMasterForm = async (formValue) => {
    try {
      console.log(formValue);
      const { status, message, data } = await insertProductMaster({
        formValue,
      });

      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Save Successfully!',
          description: message,
        });
        dispatch(getMasterInsertSuccess(data.rows[0]));
      } else {
        toast({
          variant: 'default',
          title: 'Save failed!',
          description: message,
        });
        dispatch(getListRequestError(false));
      }
    } catch (e) {
      console.log(e);
      toast({
        variant: 'destructive',
        title: 'Save failed!',
        description: 'Có lỗi xảy ra!',
      });
      dispatch(getListRequestError(false));
    }
  };
  const form = useForm({
    defaultValues: newProduct,
  });
  const handleChangeFashionCategory = (value) => {
    form.setValue('category', value);
  };

  useEffect(() => {
    if (productMaster == null) {
      form.reset(newProduct);
    } else {
      form.reset(productMaster);
    }
  }, [productMaster]);

  const handleSearchMasterRequest = async (paramsSearch) => {
    try {
      const branchId = userInfo.personalProfile.branchBranch_id;
      const { status, message, data } = await searchProductMaster({
        paramsSearch,
        branchId,
      });

      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Searching Successfully!',
          description: message,
        });
        dispatch(getMasterInsertSuccess(data.rows[0]));
        // dispatch(getListRequestSuccess(data.rows[0].goodsInvoiceDetail));
      } else {
        toast({
          variant: 'default',
          title: 'Searching failed!',
          description: message,
        });
        dispatch(getListRequestError(false));
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Searching failed!',
        description: 'Có lỗi xảy ra!',
      });
      dispatch(getListRequestError(false));
    }
  };

  const handleUpdateMasterForm = async (formValue) => {
    console.log(formValue);
    try {
      const branchId = userInfo.personalProfile.branchBranch_id;
      const { status, message, data } = await updateProductMaster({
        formValue,
        branchId,
      });
      console.log(data);
      if (status == 1) {
        toast({
          variant: 'success',
          title: 'Save Successfully!',
          description: message,
        });
        dispatch(getMasterInsertSuccess(data.rows[0]));
      } else {
        toast({
          variant: 'default',
          title: 'Save failed!',
          description: message,
        });
        dispatch(getListRequestError(false));
      }
    } catch (e) {
      console.log(e);
      toast({
        variant: 'destructive',
        title: 'Save failed!',
        description: 'Có lỗi xảy ra!',
      });
      dispatch(getListRequestError(false));
    }
  };
  return (
    <Card>
      <Form {...form}>
        <form disable={isLoading}>
          <CardHeader className="px-7">
            <CardTitle className="text-2xl">General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center border-gray-300">
              <div className="grid grid-flow-row gap-4 w-full">
                <div className="grid items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="product_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            label="Product ID"
                            readOnly={isSaved}
                            {...field}
                            {...form.register('product_id')}
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
                    name="product_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            label="Product Name"
                            {...field}
                            {...form.register('product_name')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid items-center gap-1.5 ">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelSelect
                            label="Category"
                            {...field}
                            {...form.register('category')}
                            onValueChange={handleChangeFashionCategory}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {Object.keys(FashionCategory).map((key) => (
                                  <SelectItem key={key} value={key}>
                                    {FashionCategory[key]}
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

                <div className="grid items-center gap-1.5">
                  <div className="grid grid-flow-col gap-1.5">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabelInput
                              type="num"
                              label="Reference Price"
                              {...field}
                              {...form.register('price')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="storeProductPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabelInput
                              type="num"
                              label={`Price for Branch ${userInfo.personalProfile.branchBranch_id}`}
                              disabled={!isSaved}
                              {...field}
                              {...form.register('storeProductPrice')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid items-center col-span-2 gap-1.5">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Description"
                            {...form.register('description')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <CardContent>
              <div className="flex-1 m-2 text-center">
                <ImageUpload onImageUpload={handleImageUpload} />
                <FormField
                  className="hidden"
                  control={form.control}
                  name="product_img"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="hidden"
                          label="Product Name"
                          {...field}
                          {...form.register('product_img')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="flex">
              <Button
                type="button"
                className="w-full"
                disabled={isSaved}
                onClick={() => handleSearchMasterRequest(form.getValues())}
              >
                Search
              </Button>
              &nbsp;
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  dispatch(refreshProductDetail());
                  if (!isSaved) form.reset(newProduct);
                }}
              >
                Clear All
              </Button>
              &nbsp;
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  isSaved
                    ? handleUpdateMasterForm(form.getValues())
                    : handleSaveMasterForm(form.getValues());
                }}
              >
                Save
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProductMasterForm;
