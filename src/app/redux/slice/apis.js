import { combineReducers } from '@reduxjs/toolkit';
import { branchSlice } from './scense/branch';
import { employeeSlice } from './scense/employee';
import { shareholderSlice } from './scense/shareholder';
import { materialSlice } from './scense/material';
import { goodInvoiceSlice } from './scense/goodinvoice';
import { goodInvoiceDetailSlice } from './scense/goodinvoicedetail';
import { productSlice } from './scense/product';
import { customerSlice } from './scense/customer';
import { orderSlice } from './scense/order';

export const apisSlice = combineReducers({
  branch: branchSlice,
  employee: employeeSlice,
  material: materialSlice,
  goodinvoice: goodInvoiceSlice,
  shareholder: shareholderSlice,
  customer: customerSlice,
  order: orderSlice,
  goodinvoicedetail: goodInvoiceDetailSlice,
  product: productSlice,
});
