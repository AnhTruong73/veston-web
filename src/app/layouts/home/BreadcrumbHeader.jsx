'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default function BreadcrumbHeader() {
  const pathname = usePathname();
  const pathBreadcrumb = pathname.split('/');

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathBreadcrumb &&
          pathBreadcrumb.map((e, index) => {
            if (e && e !== '') {
              const pathBreadcrumbBaseOnIndex = pathBreadcrumb.slice(
                0,
                index + 1
              );
              const link = pathBreadcrumbBaseOnIndex.join('/');
              return (
                <>
                  {index == pathBreadcrumb.length - 1 ? (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbPage>{e.toUpperCase()}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  ) : (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href={`${link}`}>{e.toUpperCase()}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </>
              );
            }
            return <></>;
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
