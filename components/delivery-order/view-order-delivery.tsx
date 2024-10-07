import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '../ui/separator';
import { useRouter } from 'next/router';

import { CornerUpLeft, Save, X as ClX, CheckCheck } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner';
import OtpInput from 'react-otp-input';
import { Icons } from '../ui/icons';
import { Spinner } from '../ui/spinner';
import {
    useDeliveryOTPVerificationMutation,
    useUpdateOrderDeliveryReturnMutation,
    useUpdateOrderDeliveryStatusMutation,
} from '@/features/order-delivery/order-delivery-api';
interface DetailProps {
    orderData: any;
}

const ViewOrderDeliveryComponent: React.FC<DetailProps> = ({ orderData }: DetailProps) => {
    console.log('🚀 ~ OrderDetails:', orderData);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [otp, setOtp] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [quantities, setQuantities] = useState<number[]>([]);
    const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
    // Mutation for updating the order status
    const [updateOrderStatus] = useUpdateOrderDeliveryStatusMutation();
    const [updateReturnDelivery] = useUpdateOrderDeliveryReturnMutation();
    const [deliveryOTPVerification] = useDeliveryOTPVerificationMutation();

    // Initialize checkedItems to have all products checked by default
    useEffect(() => {
        if (orderData?.orderDetails) {
            const initialCheckedItems = orderData.orderDetails.reduce((acc: any, detail: any) => {
                acc[detail.product.id] = true; // Mark all products as checked
                return acc;
            }, {});
            setCheckedItems(initialCheckedItems);
        }
    }, [orderData]);
    // UseEffect to initialize quantities when orderData.orderDetails changes
    useEffect(() => {
        if (orderData?.orderDetails && Array.isArray(orderData.orderDetails)) {
            setQuantities(orderData.orderDetails.map((detail: any) => parseInt(detail.quantity) || 1));
        }
    }, [orderData]);

    const handleQuantityChange = (index: number, type: 'increase' | 'decrease', limit: number) => {
        setQuantities((prevQuantities) =>
            prevQuantities.map((quantity, i) => {
                if (i === index) {
                    if (type === 'increase' && quantity < limit) {
                        return quantity + 1;
                    } else if (type === 'decrease' && quantity > 1) {
                        return quantity - 1;
                    }
                }
                return quantity;
            }),
        );
    };

    if (!orderData?.orderDetails || !Array.isArray(orderData.orderDetails)) {
        return (
            <div>
                <Spinner />
            </div>
        ); // Handle empty or invalid order data
    }

    // Handle checkbox change
    const handleCheckboxChange = (index: number, checked: boolean) => {
        setCheckedItems((prevChecked) => ({
            ...prevChecked,
            [index]: checked,
        }));
    };

    // Calculate new dueAmount based on unchecked products
    const calculateNewDueAmount = () => {
        const uncheckedProducts = orderData?.orderDetails.filter((detail: any) => !checkedItems[detail.product.id]);

        const totalUncheckedOriginalPrice = uncheckedProducts.reduce(
            (total: number, product: any) => total + parseFloat(product?.orderPrice) * parseFloat(product?.quantity),
            0,
        );

        const newDueAmount = orderData?.dueAmount.toFixed(2) - totalUncheckedOriginalPrice.toFixed(2);
        return newDueAmount > 0 ? newDueAmount : 0;
    };

    // Generate prodArr on button click
    const handleButtonClick = () => {
        // const prodArr = orderData.orderDetails.map((detail: any, index: number) => ({
        //     prodId: detail.product.id,
        //     orderType: checkedItems[detail.product.id] ? 1 : 0,
        //     orderQnt: quantities[index],
        // }));
        // const prodArr = orderData.orderDetails.map((detail: any, index: number) => ({
        //     prodId: detail.product.id,
        // }));
        // console.log('Generated prodArr:', prodArr);
        // Filter unchecked products
        // const uncheckedProducts = prodArr?.filter((prod: any) => !checkedItems[prod.prodId]);

        // console.log('Unchecked Products:', uncheckedProducts);
        // const checkedProducts = prodArr.filter((product: any) => product.orderType === 1);
        // console.log('🚀 ~ handleButtonClick ~ checkedProducts:', checkedProducts);

        const isAtLeastOneChecked = Object.values(checkedItems).some((isChecked) => isChecked);

        if (!isAtLeastOneChecked) {
            toast.error('Please select at least one product.');
            return;
        }
        const uncheckedProductIds = orderData?.orderDetails
            .filter((detail: any) => !checkedItems[detail?.product?.id])
            .map((detail: any) => detail?.product?.id);
        const newDueAmount = calculateNewDueAmount();
        let final = { uncheckedProductIds, deliveryAmt: orderData?.deliveryAmt, totalAmt: orderData?.orderTotal };
        console.log('🚀 ~ handleButtonClick ~ final:', final);
    };

    // Accept button handler
    const handleAccept = async () => {
        try {
            let payload = { id: orderData.id, actionType: 1 };
            let res = await updateOrderStatus(payload).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 ${res?.message}`);
            } else {
                toast.error(`🛑 ${res?.message}`);
            }
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    // Reject button handler
    const handleReject = async () => {
        try {
            let payload = { id: orderData.id, actionType: 0 };
            let res = await updateOrderStatus(payload).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 ${res?.message}`);
            } else {
                toast.error(`🛑 ${res?.message}`);
            }
        } catch (error) {
            console.error('Error rejecting order:', error);
            // toast.error(`🛑 Error rejecting order:', ${error}`);
        }
    };
    // Arrived  button handler
    const handleArrived = async () => {
        try {
            let payload = { id: orderData.id, actionType: 'Arrived' };
            let res = await updateOrderStatus(payload).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 ${res?.message}`);
            } else {
                toast.error(`🛑 ${res?.message}`);
            }
        } catch (error) {
            console.error('Error Arriving order:', error);
            // toast.error(`🛑 Error rejecting order:', ${error}`);
        }
    };

    // PickedUp  button handler
    const handlePickedUp = async () => {
        try {
            let payload = { id: orderData.id, actionType: 'Picked up' };
            let res = await updateOrderStatus(payload).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 ${res?.message}`);
            } else {
                toast.error(`🛑 ${res?.message}`);
            }
        } catch (error) {
            console.error('Error Arriving order:', error);
            // toast.error(`🛑 Error rejecting order:', ${error}`);
        }
    };
    // Reached  button handler
    const handleReached = async () => {
        try {
            let payload = { id: orderData.id, actionType: 'Reached' };
            let res = await updateOrderStatus(payload).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 ${res?.message}`);
            } else {
                toast.error(`🛑 ${res?.message}`);
            }
        } catch (error) {
            console.error('Error Arriving order:', error);
            // toast.error(`🛑 Error rejecting order:', ${error}`);
        }
    };

    async function onOtpSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        if (otp !== '' && otp.length === 6) {
            const payload = {
                // email: data.email,
                id: orderData?.id,
                otp: +otp,
            };
            console.log('🚀 ~ onOtpSubmit ~ payload:', payload);
            try {
                let res = await deliveryOTPVerification(payload).unwrap();
                console.log('🚀 ~ onOtpSubmit ~ res:', res);
                if (res.statusCode === 201) {
                    toast.success(`🎉 ${res?.message}`);
                    router.push('/delivery-order');
                } else {
                    toast.error(`🛑 ${res?.message}`);
                }
            } catch (error: any) {
                toast.error(`🛑 ${error?.data?.message}`);
            }
        } else {
            toast.error(`🚧 Fill the OTP.`);
        }
        setIsLoading(false);
    }

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
                                        router.push('/delivery-order');
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
                        <Button variant="outline" onClick={() => router.push('/delivery-order')} className="py-1 px-3">
                            <CornerUpLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
            </div>
            {/* Breadcrumb and Header End ==================== */}

            {orderData?.order_status?.statusTitle === 'Assigned' ? (
                <div className="flex flex-col space-y-3">
                    <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-2 w-full items-center gap-5 mb-5">
                                <div>
                                    <Label htmlFor="orderNumber">
                                        <strong>Order Number:</strong> {orderData.orderNumber || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="orderTotal">
                                        <strong>Order Total:</strong> {orderData.orderTotal || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="orderTotalInWord">
                                        <strong>Order Total(in words):</strong> {orderData.orderTotalInWord || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="amountDeductionFromWallet">
                                        <strong>Amount deduction from wallet:</strong>{' '}
                                        {orderData.amountDeductionFromWallet || 'N/A'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="subtotalPrice">
                                        <strong>Subtotal:</strong> {orderData.subtotalPrice || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="deliveryAmt">
                                        <strong>Delivery Amount:</strong> {orderData.deliveryAmt || 'N/A'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="payableAmount">
                                        <strong>Payable Amount:</strong> {orderData.payableAmount || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="paidAmount">
                                        <strong>Paid Amount:</strong> {orderData.paidAmount || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="paymentMethod">
                                        <strong>Payment Method:</strong> {orderData.paymentMethod || 'N/A'}
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="flex flex-col space-y-3">
                    <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-2 w-full items-center gap-5 mb-5">
                                {/* User Info */}
                                <div>
                                    <Label htmlFor="userName">
                                        <strong>Name:</strong> {orderData.users?.name || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="userEmail">
                                        <strong>Email:</strong> {orderData.users?.email || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="userPhone">
                                        <strong>Phone:</strong> {orderData.users?.phone || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="deliveryAddress">
                                        <strong>Delivery Address:</strong> {orderData.deliveryAddress || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="deliveryPincode">
                                        <strong>Delivery Pincode:</strong> {orderData.deliveryPincode || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="deliveryState">
                                        <strong>Delivery State:</strong> {orderData.deliveryState || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="deliveryCity">
                                        <strong>Delivery City:</strong> {orderData.deliveryCity || 'N/A'}
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-2 w-full items-center gap-5 mb-5">
                                <div>
                                    <Label htmlFor="orderNumber">
                                        <strong>Order Number:</strong> {orderData.orderNumber || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="orderTotal">
                                        <strong>Order Total:</strong> {orderData.orderTotal || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="orderTotalInWord">
                                        <strong>Order Total(in words):</strong> {orderData.orderTotalInWord || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="amountDeductionFromWallet">
                                        <strong>Amount deduction from wallet:</strong>{' '}
                                        {orderData.amountDeductionFromWallet || 'N/A'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="subtotalPrice">
                                        <strong>Subtotal:</strong> {orderData.subtotalPrice || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="deliveryAmt">
                                        <strong>Delivery Amount:</strong> {orderData.deliveryAmt || 'N/A'}
                                    </Label>
                                </div>

                                <div>
                                    <Label htmlFor="payableAmount">
                                        <strong>Payable Amount:</strong> {orderData.payableAmount || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="paidAmount">
                                        <strong>Paid Amount:</strong> {orderData.paidAmount || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="paymentMethod">
                                        <strong>Payment Method:</strong> {orderData.paymentMethod || 'N/A'}
                                    </Label>
                                </div>
                                <div>
                                    <Label htmlFor="paymentMethod">
                                        <strong>Order Status:</strong> {orderData?.order_status?.statusTitle || 'N/A'}
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Order Details */}
                    <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                        <CardContent>
                            <div className="grid grid-cols-9 gap-2">
                                <div>
                                    <strong>Select Product</strong>
                                </div>
                                <div>
                                    <strong>Name</strong>
                                </div>
                                <div>
                                    <strong>Image</strong>
                                </div>
                                <div>
                                    <strong>Quantity</strong>
                                </div>
                                <div>
                                    <strong>Order Price</strong>
                                </div>
                                <div>
                                    <strong>Original Price</strong>
                                </div>
                                <div>
                                    <strong>Tax Amount</strong>
                                </div>
                                <div>
                                    <strong>Variant</strong>
                                </div>
                                <div>
                                    <strong>Tax(%)</strong>
                                </div>

                                {orderData.orderDetails?.map((detail: any, detailIndex: number) => {
                                    const limit = parseInt(detail?.quantity) || 1;
                                    return (
                                        <React.Fragment key={detailIndex}>
                                            <div>
                                                <Checkbox
                                                    id={`checkbox-${detailIndex}`}
                                                    name={`checkbox-${detailIndex}`}
                                                    className="check"
                                                    checked={!!checkedItems[detail.product.id]}
                                                    onCheckedChange={(checked: boolean) =>
                                                        handleCheckboxChange(detail.product.id, checked)
                                                    }
                                                />
                                            </div>
                                            <div>{detail?.product?.name || 'N/A'}</div>
                                            <div
                                                onClick={() => {
                                                    setSelectedImage(detail?.product?.productImage);
                                                    setIsDialogOpen(true);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <Image
                                                    src={detail?.product?.productImage}
                                                    alt="Product Image"
                                                    width={50} // Adjust width as necessary
                                                    height={50} // Adjust height as necessary
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {/* Decrease Button */}
                                                {/* <button
                                                    className="px-2 py-1 border rounded"
                                                    onClick={() => handleQuantityChange(detailIndex, 'decrease', limit)}
                                                    disabled={quantities[detailIndex] <= 1} // Ensure quantities exist
                                                >
                                                    -
                                                </button> */}

                                                {/* Quantity Display */}
                                                <span>{quantities[detailIndex]}</span>

                                                {/* Increase Button */}
                                                {/* <button
                                                    className="px-2 py-1 border rounded"
                                                    onClick={() => handleQuantityChange(detailIndex, 'increase', limit)}
                                                    disabled={quantities[detailIndex] >= limit} // Ensure quantities exist
                                                >
                                                    +
                                                </button> */}
                                            </div>
                                            <div>{detail?.orderPrice.toFixed(2) || 'N/A'}</div>
                                            <div>{detail?.originalPrice.toFixed(2) || 'N/A'}</div>
                                            <div>{detail?.taxAmt.toFixed(2) || 'N/A'}</div>
                                            <div>{detail?.varient_name || 'N/A'}</div>
                                            <div>{detail?.tax_master?.percentage || 'N/A'}</div>
                                        </React.Fragment>
                                    );
                                })}
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
            )}

            {orderData?.order_status?.statusTitle === 'Assigned' && (
                <div className="flex flex-col space-y-3">
                    <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-2 w-full items-center gap-5 mb-5">
                                <Button
                                    className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                                    variant="outline"
                                    onClick={handleAccept}
                                >
                                    <CheckCheck className="mr-3 w-4 h-4" />
                                    Accept
                                </Button>
                            </div>
                        </CardContent>
                        {/* <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-2 w-full items-center gap-5 mb-5">
                                <Button
                                    className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                                    variant="outline"
                                    onClick={handleReject}
                                >
                                    <CheckCheck className="mr-3 w-4 h-4" />
                                    Reject
                                </Button>
                            </div>
                        </CardContent> */}
                    </Card>
                </div>
            )}
            {orderData?.order_status?.statusTitle === 'Out for Delivery' && (
                <div className="flex flex-col space-y-3">
                    <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-2 w-full items-center gap-5 mb-5">
                                {Object.keys(checkedItems).length > 0 && (
                                    <p>Payable Amount: {calculateNewDueAmount()}</p>
                                )}
                                <Button
                                    className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                                    variant="outline"
                                    onClick={handleButtonClick}
                                >
                                    <CheckCheck className="mr-3 w-4 h-4" />
                                    Submit
                                </Button>
                            </div>
                        </CardContent>
                        {/* <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-2 w-full items-center gap-5 mb-5">
                                <Button
                                    className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                                    variant="outline"
                                    onClick={handleReject}
                                >
                                    <CheckCheck className="mr-3 w-4 h-4" />
                                    Reject
                                </Button>
                            </div>
                        </CardContent> */}
                    </Card>
                </div>
            )}
            {orderData?.order_status?.statusTitle === 'Reached' && (
                <div className="flex flex-col space-y-3">
                    <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                        <CardContent>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span> </span>}
                                renderInput={(props: any) => <input {...props} className="custom_otp_input" />}
                            />
                            <Button
                                disabled={isLoading}
                                onClick={onOtpSubmit}
                                className="px-8 h-12 w-full  bg-primary hover:bg-primary/90 rounded-3xl"
                            >
                                {isLoading ? (
                                    <Icons.spinner className="h-4 w-4 animate-spin" />
                                ) : (
                                    <p className="uppercase tracking-wide font-popp text-base">Verify & Proceed</p>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ViewOrderDeliveryComponent;
