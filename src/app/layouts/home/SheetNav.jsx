'use client';
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Home,
  PanelLeft,
  Trello,
  UsersRound,
  FileSpreadsheet,
  WarehouseIcon,
  Shirt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SheetNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs py-20">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/home"
            className={`${
              pathname.includes('home')
                ? 'group flex h-10 w-[95%] shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                : ''
            } flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
          >
            <Home className="h-5 w-5 transition-all group-hover:scale-110" />
            Home
          </Link>
          <Link
            href="/branch"
            className={`${
              pathname.includes('branch')
                ? 'group flex h-10 w-[95%] shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                : ''
            } flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
          >
            <Trello className="h-5 w-5" />
            Branch
          </Link>

          <Link
            href="/employee"
            className={`${
              pathname.includes('employee')
                ? 'group flex h-10 w-[95%] shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                : ''
            } flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
          >
            <UsersRound className="h-5 w-5" />
            Employee
          </Link>

          <Link
            href="/material"
            className={`${
              pathname.includes('material')
                ? 'group flex h-10 w-[95%] shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                : ''
            } flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
          >
            <WarehouseIcon className="h-5 w-5" />
            Material
          </Link>

          <Link
            href="/goodinvoice"
            className={`${
              pathname.includes('goodinvoice')
                ? 'group flex h-10 w-[95%] shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                : ''
            } flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
          >
            <FileSpreadsheet className="h-5 w-5" />
            Good Invoice
          </Link>

          <Link
            href="/product"
            className={`${
              pathname.includes('product')
                ? 'group flex h-10 w-[95%] shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                : ''
            } flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
          >
            <Shirt className="h-5 w-5" />
            Product
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
