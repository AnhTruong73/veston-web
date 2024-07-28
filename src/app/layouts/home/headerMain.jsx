'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import ButtonChangeTheme from '@/app/components/themes/ButtonChangeTheme';
import userDefaultAVT from '@/assets/images/placeholder_user.png';
import SheetNav from './SheetNav';
import BreadcrumbHeader from './BreadcrumbHeader';
import { useSelector } from 'react-redux';

export default function HeaderHome() {
  const personalProfile = useSelector(
    (state) => state.auth.user.personalProfile
  );

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SheetNav />
      <BreadcrumbHeader />
      <div className="relative ml-auto flex-1 md:grow-0"></div>
      <ButtonChangeTheme />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={
                personalProfile ? personalProfile.imgsrc : userDefaultAVT.src
              }
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/account/personalaccount">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/auth/logout">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
