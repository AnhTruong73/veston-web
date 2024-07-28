'use client';
import React, { useEffect, useState } from 'react';
import {
  Home,
  Settings,
  Trello,
  UsersRound,
  WarehouseIcon,
  UserRound,
  FileSpreadsheet,
  Archive,
  UserCog,
  Shirt,
  Handshake,
} from 'lucide-react';
import LinkWithToolTip from '@/app/components/LinkWithToolTip';
import { Separator } from '@/components/ui/separator';

import checkPermission from '@/utils/checkPermission';
import { useSelector } from 'react-redux';
export default function NavHome() {
  const UserInfor = useSelector((state) => state.auth.user);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex py-10">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {checkPermission('/home', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/home'} textToolTip={'Home'}>
                <Home className="h-6 w-6" />
                <span className="sr-only">Home</span>
              </LinkWithToolTip>
            </>
          )
        }

        {checkPermission('/branch', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/branch'} textToolTip={'Branch'}>
                <Trello className="h-6 w-6" />
                <span className="sr-only">Branch</span>
              </LinkWithToolTip>
            </>
          )
        }

        {checkPermission('/material', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/material'} textToolTip={'Material'}>
                <WarehouseIcon className="h-6 w-6" />
                <span className="sr-only">Material</span>
              </LinkWithToolTip>
            </>
          )
        }

        {checkPermission('/goodinvoice', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/goodinvoice'} textToolTip={'Good Invoice'}>
                <FileSpreadsheet className="h-6 w-6" />
                <span className="sr-only">Good Invoice</span>
              </LinkWithToolTip>
            </>
          )
        }

        {checkPermission('/goodinvoice', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/order'} textToolTip={'Order'}>
                <Archive className="h-6 w-6" />
                <span className="sr-only">Order</span>
              </LinkWithToolTip>
            </>
          )
        }

        {checkPermission('/product', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/product'} textToolTip={'Product'}>
                <Shirt className="h-6 w-6" />
                <span className="sr-only">Product</span>
              </LinkWithToolTip>
            </>
          )
        }

        <Separator className="mb-2 mt-2" />

        {checkPermission('/employee', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/employee'} textToolTip={'Employee'}>
                <UsersRound className="h-6 w-6" />
                <span className="sr-only">Employee</span>
              </LinkWithToolTip>
            </>
          )
        }

        {checkPermission('/shareholder', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/shareholder'} textToolTip={'Shareholder'}>
                <Handshake className="h-6 w-6" />
                <span className="sr-only">Shareholder</span>
              </LinkWithToolTip>
            </>
          )
        }

        {checkPermission('/customer', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/customer'} textToolTip={'Customer'}>
                <UserRound className="h-6 w-6" />
                <span className="sr-only">Customer</span>
              </LinkWithToolTip>
            </>
          )
        }

        {checkPermission('/account', UserInfor) &&
          (
            <>
              <LinkWithToolTip href={'/account'} textToolTip={'Account'}>
                <UserCog className="h-6 w-6" />
                <span className="sr-only">Account</span>
              </LinkWithToolTip>
            </>
          )
        }

      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <LinkWithToolTip href={'#'} textToolTip={'Settings'}>
          <Settings className="h-6 w-6" />
          <span className="sr-only">Settings</span>
        </LinkWithToolTip>
      </nav>
    </aside>
  );
}
