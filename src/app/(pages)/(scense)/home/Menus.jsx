'use client';
import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Menus() {
  return (
    <>
      <div className="space-y-4 p-4 rounded-lg">
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 grid-flow-row gap-4">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="text" />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="text" />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="text" />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="text" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="flex space-x-4 p-4 rounded-lg">
              {/* <Button>Addd</Button> */}
              <Button>Search</Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle> Manage User </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-end">
            <div className="flex space-x-4 p-4 rounded-lg">
              <Button>Add</Button>
              <Button>Delete</Button>
            </div>
          </CardContent>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
