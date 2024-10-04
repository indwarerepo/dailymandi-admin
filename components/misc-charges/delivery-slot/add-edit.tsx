import * as React from 'react';
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

import { useAddDeliverySlotMutation, useEditDeliverySlotMutation } from '@/features/miscCharges/miscChargesAPI';
import { RDeliverySlot } from '@/types/interfaces/miscCharges';
import { Textarea } from '@/components/ui/textarea';
import { TimePicker12Demo } from '@/components/ui-lib/time-picker-12h-demo';
import { deliverySlotSchema } from '@/types/schemas';
import moment from 'moment';

type props = {
    selectedDeliverySlots: RDeliverySlot;
    setSelectedDeliverySlots: Dispatch<SetStateAction<RDeliverySlot>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedDeliverySlots, setSelectedDeliverySlots, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timeFromDate, setTimeFromDate] = useState<Date | undefined>(new Date());
    const [timeToDate, setTimeToDate] = useState<Date | undefined | any>(new Date());

    // Effect to handle date setting during edit
    useEffect(() => {
        if (isUpdate && selectedDeliverySlots) {
            if (selectedDeliverySlots?.timeFrom) {
                setTimeFromDate(new Date(moment(selectedDeliverySlots?.timeFrom).format()));
            }
            if (selectedDeliverySlots?.timeTo) {
                setTimeToDate(new Date(moment(selectedDeliverySlots?.timeTo).format()));
            }
        }
    }, [isUpdate, selectedDeliverySlots]);

    const [addDeliverySlots] = useAddDeliverySlotMutation();
    const [editDeliverySlots] = useEditDeliverySlotMutation();

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedDeliverySlots,
        validationSchema: deliverySlotSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            setIsLoading(true);
            setSelectedDeliverySlots(values);
            let ev: any = new Date();
            const year = ev.getFullYear() as string;
            const month = (ev.getMonth() + 1) as string;
            const day = ev.getDate() as string;

            let st: any = timeFromDate;
            let hours1 = st.getHours() as string;
            let minutes1 = st.getMinutes() as string;

            let nn = year + '-' + month + '-' + day + ' ' + hours1 + ':' + minutes1;
            let tdate = moment(nn).toISOString();

            let st2: any = timeToDate;
            let hours2 = st2.getHours() as string;
            let minutes2 = st2.getMinutes() as string;

            let nn2 = year + '-' + month + '-' + day + ' ' + hours2 + ':' + minutes2;
            let tdate2 = moment(nn2).toISOString();

            try {
                // Prepare the payload by merging the date and time correctly
                let payload: any = {
                    displayContent: values.displayContent as string,
                    timeFrom: tdate,
                    timeTo: tdate2,
                };
                console.log('🚀 ~ onSubmit: ~ payload:', payload);

                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editDeliverySlots(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 Delivery Slot updated successfully.`);

                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    let res = await addDeliverySlots(payload).unwrap();
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
                                        router.push('/misc-charges');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Misc Charges
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} Delivery Slot</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} Delivery Slot
                    </h2>
                </div>
            </div>

            <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                <form className="grid w-full items-center" onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-7 mb-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="timeFrom">
                                    Time From<sup className="text-rose-600">*</sup>
                                </Label>
                                <TimePicker12Demo date={timeFromDate} setDate={setTimeFromDate} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="timeTo">
                                    Time to<sup className="text-rose-600">*</sup>
                                </Label>
                                <TimePicker12Demo date={timeToDate} setDate={setTimeToDate} />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="displayContent">Content</Label>
                                <Textarea
                                    name="displayContent"
                                    placeholder="Write content"
                                    value={values?.displayContent}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.displayContent && errors.displayContent ? (
                                    <small id="displayContent-help" className="text-rose-600">
                                        {errors.displayContent}
                                    </small>
                                ) : null}
                            </div>
                        </div>
                    </CardContent>

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
                </form>
            </Card>
        </div>
    );
};

export default AddEditComponent;
