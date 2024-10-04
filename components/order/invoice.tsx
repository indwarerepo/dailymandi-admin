import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';

import { CornerUpLeft, Save, X as ClX, CheckCheck, ArrowLeft, Download } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import React, { useState, useRef } from 'react';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IOrder } from '@/types/interfaces/order';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import logoInvoice from '@/public/images/logo.png';
import { format } from 'date-fns';
import moment from 'moment';

interface DetailProps {
    orderData: any;
}

const Invoice: React.FC<DetailProps> = ({ orderData }: DetailProps) => {
    console.log('🚀 ~ orderData:', orderData);
    const router = useRouter();

    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printContents = printRef.current?.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents || '';
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // Reload page to restore the content
    };

    return (
        <div className="py-3">
            {/* Breadcrumb and Header Start==================== */}
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 sm:col-span-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onClick={() => {
                                        router.push('/dashboard');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onClick={() => {
                                        router.push('/order');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Order
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Invoice</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium"> Order Invoice</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        <Button variant="outline" onClick={() => router.push('/order')} className="py-1 px-3">
                            <CornerUpLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
            </div>
            {/* Breadcrumb and Header End ==================== */}

            <div ref={printRef}>
                <div className="container mx-auto my-4 sm:my-8">
                    {/* <div className="border-dashed border-green-600 border-2 text-center p-3 sm:p-8 mt-10 mb-6">
                    <h2 className="p-0 m-0 text-base sm:text-2xl text-green-600">
                        Thank you. Your order has been received.
                    </h2>
                </div> */}
                    {/* <div className="mt-6 py-4 flex gap-x-3 justify-between">
                        <div>
                            <h5>Order Invoice</h5>{' '}
                        </div>
                        <Button className="bg-green-700" onClick={() => router.push('/order')}>
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </div> */}

                    <Card className="sm:w-[22rem] mx-auto border rounded-sm pt-6 ">
                        <div className=" border-b-[1px] border-dashed mb-2 pb-2">
                            <div className="flex justify-center items-center">
                                <Image src={logoInvoice} width={150} height={60} alt="logo" />
                            </div>
                            <h2 className="text-xl font-semibold text-center mb-2">Tax Invoice</h2>

                            <h3 className="text-sm font-semibold text-center my-2">
                                PIN Code: <span>{orderData?.deliveryPincode}</span>
                            </h3>
                            <p className="text-center text-sm">
                                Aonemart
                                <br />
                                Maple Heights
                                <br />
                                Roypara Sukantapally
                                <br />
                                New Town Rajarhat
                                <br />
                                Kolkata 700157
                                <br />
                                GSTIN: 19ABICS6809H1ZW
                                <br />
                            </p>
                        </div>
                        <div>
                            <p className=" text-center text-sm mb-2">
                                Customer:{' '}
                                <strong className="capitalize font-semibold">{orderData?.users?.name || 'N/A'}</strong>{' '}
                                <br />
                                Phone: <strong className="font-semibold">{orderData?.users?.phone}</strong> <br />
                                Address:{' '}
                                <span>
                                    {orderData?.deliveryAddress} {orderData?.deliveryCity} {orderData?.deliveryPincode}{' '}
                                    {orderData?.deliveryState}
                                </span>
                            </p>
                            <p className=" text-center text-sm">
                                Inv No.: <strong className="font-semibold">{orderData?.orderNumber || 'N/A'}</strong>
                                <br />
                                {/* Inv Date: <strong className="font-semibold">30/09/2024 | 06:00 pm</strong> */}
                                Inv Date:{' '}
                                <strong className="font-semibold">
                                    {/* {format(new Date(orderData?.createdAt), 'dd/MM/yyyy| HH:MM a')} */}
                                    {moment(orderData?.createdAt).format('DD/MM/yy | h:mm A')}
                                </strong>
                            </p>
                        </div>
                        <div>
                            <Table className="border mb-3 mt-3">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="border-r w-6/12 p-2 text-xs font-semibold">
                                            Item
                                        </TableHead>
                                        <TableHead className="border-r p-2 text-xs font-semibold">Price/Unit</TableHead>
                                        <TableHead className="border-r  p-2 text-xs font-semibold">Qty</TableHead>
                                        <TableHead className="border-r p-2 text-xs font-semibold">GST %</TableHead>
                                        <TableHead className="border-r p-2 text-xs font-semibold">
                                            Tax Amt. (₹)
                                        </TableHead>
                                        <TableHead className=" p-2 text-xs font-semibold">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orderData?.orderDetails?.map(
                                        (detail: {
                                            id: React.Key | null | undefined;
                                            product: {
                                                name: string;
                                            };
                                            varient_name: string;
                                            orderPrice: number;
                                            quantity: number;
                                            taxAmt: number;
                                            tax_master: { percentage: number };
                                            orderTotal: number;
                                            originalPrice: number;
                                        }) => (
                                            <TableRow key={detail.id}>
                                                <TableCell className="font-medium p-2 text-xs">
                                                    {' '}
                                                    {detail?.product?.name} - {detail?.varient_name} {/* Item */}
                                                </TableCell>
                                                <TableCell className="text-right text-xs">
                                                    {detail?.originalPrice?.toFixed(2)} {/* Price Unit */}
                                                </TableCell>
                                                <TableCell>
                                                    {detail?.quantity} {/* Quantity */}
                                                </TableCell>
                                                <TableCell className="text-right text-xs">
                                                    {detail?.tax_master?.percentage} {/* GST% */}
                                                </TableCell>
                                                <TableCell className="text-right text-xs">
                                                    {detail?.taxAmt?.toFixed(2)} {/* Tax Amt */}
                                                </TableCell>
                                                <TableCell className="text-right text-xs">
                                                    {/* {detail?.orderPrice} */}
                                                    {/* {orderData?.subtotalPrice} */}
                                                    {(detail?.orderPrice * detail?.quantity).toFixed(2)}
                                                    {/*Total*/}
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )}
                                    <TableRow>
                                        <TableCell colSpan={4} className="border-r p-2 text-xs font-semibold">
                                            Sub Total
                                        </TableCell>
                                        <TableCell colSpan={2} className="text-right text-xs font-semibold">
                                            {orderData?.subtotalPrice}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={4} className="border-r p-2 text-xs font-semibold">
                                            Delivery Charges
                                        </TableCell>
                                        <TableCell colSpan={2} className="text-right text-xs font-semibold">
                                            {orderData?.deliveryAmt}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={4} className="border-r p-2 text-xs font-semibold">
                                            Gross Total
                                        </TableCell>
                                        <TableCell colSpan={2} className="text-right text-xs font-semibold">
                                            {orderData?.orderTotal}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <p className=" text-left px-2 pb-3 text-sm">
                                Amount (in words):{' '}
                                <strong className="font-medium capitalize">{orderData?.orderTotalInWord}</strong>
                            </p>
                        </div>
                        <CardFooter className="flex flex-col justify-center items-center p-2 bg-green-100">
                            <p className="text-sm ">Thank you for using Aonemart.</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="container flex justify-center items-center sm:my-8">
                <Button variant="default" onClick={handlePrint} className="py-1 px-3">
                    <Download className="mr-2 h-4 w-4" />
                    Print Invoice
                </Button>
            </div>
        </div>
    );
};

export default Invoice;
