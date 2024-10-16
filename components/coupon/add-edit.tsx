import * as React from 'react';
import { addDays, format } from 'date-fns';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { CornerUpLeft, Save } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '../ui/textarea';
import { ICoupon } from '@/types/interfaces/coupon';
import { couponSchema } from '@/types/schemas';
import { useAddCouponMutation, useEditCouponMutation } from '@/features/coupon/couponAPI';
import { startOfDay, formatISO } from 'date-fns';

type props = {
    selectedCoupons: ICoupon;
    setSelectedCoupons: Dispatch<SetStateAction<ICoupon>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedCoupons, setSelectedCoupons, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addCoupons] = useAddCouponMutation();
    const [editCoupons] = useEditCouponMutation();

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedCoupons,
        validationSchema: couponSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedCoupons(values);
            const adjustedStartDate = formatISO(startOfDay(values.startDate), { representation: 'date' });
            const adjustedExpiredDate = formatISO(startOfDay(values.expiredDate), { representation: 'date' });

            try {
                let payload: any = {
                    name: values.name as string,
                    couponCode: values.couponCode as string,
                    minOrderAmount: values.minOrderAmount as number,
                    offerPercentage: values.offerPercentage as number,
                    couponValidity: values.couponValidity as number,
                    useLimit: values.useLimit as number,
                    startDate: adjustedStartDate as string,
                    expiredDate: adjustedExpiredDate as string,
                    policy: values.policy as string,
                    description: values.description as string,
                };
                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editCoupons(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 Coupon updated successfully.`);

                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    // let { id, ...rest } = values;
                    let res = await addCoupons(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();
                        toast.success(`🎉 Coupon added successfully.`);
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                }
            } catch (error: any) {
                console.log('🚀 ~ onSubmit: ~ error:', error);
                toast.error(`🛑 ${error?.data?.message}`);
            }
            setIsLoading(false);
        },
    });

    useEffect(() => {
        if (values.startDate && values.couponValidity) {
            const newExpiredDate = addDays(values.startDate, values.couponValidity);
            setFieldValue('expiredDate', newExpiredDate);
        }
    }, [values.startDate, values.couponValidity, setFieldValue]);
    // const [date, setDate] = React.useState<Date>();

    return (
        <div className="py-3">
            <div className="mb-8 flex justify-between">
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
                                        router.push('/coupon');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Coupon
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} Coupon</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} Coupon
                    </h2>
                </div>
            </div>

            <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                {/* <CardContent> */}
                {/* <h6 className="mb-12">Add Process</h6> */}{' '}
                <form className="grid w-full items-center" onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-7 mb-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">
                                    Coupon Name<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="name"
                                    placeholder="Enter Coupon Name"
                                    value={values?.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.name && errors.name ? (
                                    <small id="name-help" className="text-rose-600">
                                        {errors.name}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="couponCode">
                                    Coupon Code<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="couponCode"
                                    placeholder="Enter Coupon Code"
                                    value={values?.couponCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.couponCode && errors.couponCode ? (
                                    <small id="couponCode-help" className="text-rose-600">
                                        {errors.couponCode}
                                    </small>
                                ) : null}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="minOrderAmount">
                                    Min Order Amount<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="minOrderAmount"
                                    type="number"
                                    value={values?.minOrderAmount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.minOrderAmount && errors.minOrderAmount ? (
                                    <small id="minOrderAmount-help" className="text-rose-600">
                                        {errors.minOrderAmount}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="offerPercentage">
                                    Offer Percentage (%)<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="offerPercentage"
                                    type="number"
                                    value={values?.offerPercentage}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.offerPercentage && errors.offerPercentage ? (
                                    <small id="offerPercentage-help" className="text-rose-600">
                                        {errors.offerPercentage}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="couponValidity">
                                    Coupon Validity<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="couponValidity"
                                    type="number"
                                    value={values?.couponValidity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.couponValidity && errors.couponValidity ? (
                                    <small id="couponValidity-help" className="text-rose-600">
                                        {errors.couponValidity}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="useLimit">
                                    Use Limit<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="useLimit"
                                    type="number"
                                    value={values?.useLimit}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.useLimit && errors.useLimit ? (
                                    <small id="useLimit-help" className="text-rose-600">
                                        {errors.useLimit}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="startDate">
                                    Start Date<sup className="text-rose-600">*</sup>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !values.startDate && 'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {values.startDate ? (
                                                format(values.startDate, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={values.startDate}
                                            onSelect={(date) => setFieldValue('startDate', date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="expiredDate">
                                    Expired Date<sup className="text-rose-600">*</sup>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !values.expiredDate && 'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {values.expiredDate ? (
                                                format(values.expiredDate, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={values.expiredDate}
                                            disabled
                                            onSelect={(date) => setFieldValue('expiredDate', date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="policy">
                                    Policy<sup className="text-rose-600">*</sup>
                                </Label>
                                <Textarea
                                    name="policy"
                                    placeholder="Write policy"
                                    value={values?.policy}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.policy && errors.policy ? (
                                    <small id="policy-help" className="text-rose-600">
                                        {errors.policy}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    name="description"
                                    placeholder="Write description"
                                    value={values?.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.description && errors.description ? (
                                    <small id="description-help" className="text-rose-600">
                                        {errors.description}
                                    </small>
                                ) : null}
                            </div>
                        </div>
                    </CardContent>

                    {/* <div className="flex justify-end gap-4 mt-5"> */}
                    <CardFooter className="flex justify-end gap-x-3">
                        <Button variant="outline" className="py-1 px-3" type="reset" onClick={() => router.back()}>
                            <CornerUpLeft className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>

                        <Button
                            className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                            variant="outline"
                            type="submit"
                            disabled={isLoading}
                        >
                            <Save className="mr-3 w-4 h-4" />
                            Save
                        </Button>
                    </CardFooter>
                    {/* </div> */}
                </form>
                {/* </CardContent> */}
            </Card>
        </div>
    );
};

export default AddEditComponent;
