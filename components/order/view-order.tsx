import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';

import { CornerUpLeft, Save, X as ClX, CheckCheck, Contact, Package, ScrollText } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IOrder } from '@/types/interfaces/order';
import { toast } from 'sonner';

interface DetailProps {
    orderData: any;
}

const ViewOrder: React.FC<DetailProps> = ({ orderData }: DetailProps) => {
    console.log('🚀 ~ OrderDetails:', orderData);
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="py-2">
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
                                <BreadcrumbPage>Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium"> Order Detail</h2>
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

            <div className="flex flex-col space-y-3">
                <Card className="w-full px-7 py-7 cus-form  border-[1px] mt-5">
                    <CardContent>
                        <h2 className="text-base tracking-tight font-bold mt-1 font-poppins sm:text-xl flex gap-x-1 items-center">
                            <Contact className="h-5 w-5" /> Customer Details :
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 w-full items-center gap-2 py-0">
                            {/* User Info */}
                            <div>
                                <Label htmlFor="userName">
                                    <span>Name:</span> {orderData.users?.name || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="userEmail">
                                    <span>Email:</span> {orderData.users?.email || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="userPhone">
                                    <span>Phone:</span> {orderData.users?.phone || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="deliveryAddress">
                                    <span>Address:</span> {orderData.deliveryAddress || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="deliveryCity">
                                    <span>City:</span> {orderData.deliveryCity || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="deliveryState">
                                    <span>State:</span> {orderData.deliveryState || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="deliveryPincode">
                                    <span>PIN Code:</span> {orderData.deliveryPincode || 'N/A'}
                                </Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="w-full px-7 py-7 cus-form border-[1px] mt-5">
                    <CardContent>
                        <h2 className="text-base tracking-tight font-bold mt-1 font-poppins sm:text-xl flex gap-x-1 items-center">
                            <ScrollText className="h-5 w-5" /> Order Summary :
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 w-full items-center gap-2 ">
                            <div>
                                <Label htmlFor="orderNumber">
                                    <span>Order Number:</span> {orderData.orderNumber || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="amountDeductionFromWallet">
                                    <span>Amount deduction from wallet:</span>{' '}
                                    {orderData.amountDeductionFromWallet || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="paymentMethod">
                                    <span>Payment Method:</span> {orderData.paymentMethod || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="subtotalPrice">
                                    <span>Subtotal:</span> {orderData.subtotalPrice || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="deliveryAmt">
                                    <span>Delivery Charges:</span> {orderData.deliveryAmt || 'N/A'}
                                </Label>
                            </div>

                            <div>
                                <Label htmlFor="orderTotal">
                                    <span>Order Total:</span> {orderData.orderTotal || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="orderTotalInWord" className="capitalize">
                                    <span>Order Total(in words):</span> {orderData.orderTotalInWord || 'N/A'}
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="payableAmount">
                                    <span>Payable Amount:</span> {orderData.payableAmount || 'N/A'}
                                </Label>
                            </div>

                            <div>
                                <Label htmlFor="paidAmount">
                                    <span>Paid Amount:</span> {orderData.paidAmount || 'N/A'}
                                </Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Order Details */}
                <Card className="w-full px-7 py-7 cus-form border-[1px] mt-5">
                    <CardContent>
                        <h2 className="text-base tracking-tight font-bold mt-1 font-poppins sm:text-xl flex gap-x-1 items-center">
                            <Package className="h-5 w-5" /> Product Summary :
                        </h2>
                        <Table>
                            <TableHeader>
                                <TableRow className="">
                                    <TableHead className="">
                                        <p className="font-semibold text-xs sm:text-sm pl-2">Name</p>
                                    </TableHead>
                                    <TableHead>
                                        <p className="font-semibold text-xs sm:text-sm text-center">Image</p>
                                    </TableHead>
                                    <TableHead>
                                        {' '}
                                        <p className="font-semibold text-xs sm:text-sm text-center">Variant</p>
                                    </TableHead>
                                    <TableHead>
                                        {' '}
                                        <p className="font-semibold text-xs sm:text-sm text-center">Price/Unit</p>
                                    </TableHead>
                                    <TableHead>
                                        <p className="font-semibold text-xs sm:text-sm text-center">Quantity</p>
                                    </TableHead>
                                    <TableHead>
                                        <p className="font-semibold text-xs sm:text-sm text-center">GST(%)</p>
                                    </TableHead>
                                    <TableHead>
                                        <p className="font-semibold text-xs sm:text-sm text-center">Tax Amount</p>
                                    </TableHead>
                                    <TableHead className="text-right">
                                        {' '}
                                        <p className="font-semibold text-xs sm:text-sm text-center">Sub Total</p>
                                    </TableHead>
                                    <TableHead className="text-right">
                                        {' '}
                                        <p className="font-semibold text-xs sm:text-sm text-center">Total</p>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderData.orderDetails?.map((detail: any, detailIndex: number) => {
                                    const limit = parseInt(detail?.quantity) || 1; // Get the quantity limit from detail

                                    return (
                                        <React.Fragment key={detailIndex}>
                                            <TableRow className="">
                                                <TableCell>
                                                    {' '}
                                                    <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-start">
                                                        {detail?.product?.name || 'N/A'}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    {' '}
                                                    <span
                                                        className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center"
                                                        onClick={() => {
                                                            setSelectedImage(detail?.product?.productImage);
                                                            setIsDialogOpen(true);
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <Image
                                                            src={detail?.product?.productImage}
                                                            alt="Product Image"
                                                            width={30} // Adjust width as necessary
                                                            height={30} // Adjust height as necessary
                                                            className="rounded-md"
                                                        />
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                                        {detail?.varient_name || 'N/A'}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                                        {detail?.originalPrice.toFixed(2) || 'N/A'}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                                        {detail?.quantity}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    {' '}
                                                    <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                                        {detail?.tax_master?.percentage || 'N/A'}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    {' '}
                                                    <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                                        {detail?.taxAmt.toFixed(2) || 'N/A'}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                                        {detail?.orderPrice.toFixed(2) || 'N/A'}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                                        {/* {detail?.orderPrice.toFixed(2) || 'N/A'} */}
                                                        {(detail?.orderPrice * detail?.quantity).toFixed(2)}
                                                    </p>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        {/* ----------------------- */}
                        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                            {/* <div>
                                <p className="font-semibold text-xs sm:text-sm">Name</p>
                            </div>
                            <div>
                                <p className="font-semibold text-xs sm:text-sm text-center">Image</p>
                            </div>
                            <div>
                                <p className="font-semibold text-xs sm:text-sm text-center">Variant</p>
                            </div>

                            <div>
                                <p className="font-semibold text-xs sm:text-sm text-center">Price/Unit</p>
                            </div>
                            <div>
                                <p className="font-semibold text-xs sm:text-sm text-center">Quantity</p>
                            </div>
                            <div>
                                <p className="font-semibold text-xs sm:text-sm text-center">GST(%)</p>
                            </div>
                            <div>
                                <p className="font-semibold text-xs sm:text-sm text-center">Tax Amount</p>
                            </div>
                            <div>
                                <p className="font-semibold text-xs sm:text-sm text-center">Total</p>
                            </div> */}

                            {/* {orderData.orderDetails?.map((detail: any, detailIndex: number) => {
                                const limit = parseInt(detail?.quantity) || 1; 

                                return (
                                    <React.Fragment key={detailIndex}>
                                        <p className="font-normal mb-1 text-xs sm:text-sm flex items-center">
                                            {detail?.product?.name || 'N/A'}
                                        </p>
                                        <span
                                            className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center"
                                            onClick={() => {
                                                setSelectedImage(detail?.product?.productImage);
                                                setIsDialogOpen(true);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <Image
                                                src={detail?.product?.productImage}
                                                alt="Product Image"
                                                width={30} 
                                                height={30} 
                                                className="rounded-md"
                                            />
                                        </span>
                                        <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                            {detail?.varient_name || 'N/A'}
                                        </p>
                                        <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                            {detail?.originalPrice.toFixed(2) || 'N/A'}
                                        </p>
                                        <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                            {detail?.quantity}
                                        </p>
                                        <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                            {detail?.tax_master?.percentage || 'N/A'}
                                        </p>
                                        <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                            {detail?.taxAmt.toFixed(2) || 'N/A'}
                                        </p>
                                        <p className="font-normal mb-1 text-xs sm:text-sm text-center flex items-center justify-center">
                                            {detail?.orderPrice.toFixed(2) || 'N/A'}
                                        </p>
                                    </React.Fragment>
                                );
                            })} */}
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <div style={{ display: 'none' }} />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Image Preview</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex justify-center">
                                        {selectedImage && (
                                            <Image
                                                src={selectedImage}
                                                alt="Product Image Preview"
                                                width={500} // Adjust the size as needed
                                                height={500}
                                                className="rounded-md"
                                            />
                                        )}
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Close
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ViewOrder;
