import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dispatch, SetStateAction, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { IOrderStatus } from '@/types/interfaces/orderStatus';
import { orderStatusSchema } from '@/types/schemas';
import { useAddOrderStatusMutation, useEditOrderStatusMutation } from '@/features/orderStatus/orderStatusAPI';

type props = {
    selectedOrderStatuses: IOrderStatus;
    setSelectedOrderStatuses: Dispatch<SetStateAction<IOrderStatus>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedOrderStatuses, setSelectedOrderStatuses, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addOrderStatuses] = useAddOrderStatusMutation();
    const [editOrderStatuses] = useEditOrderStatusMutation();

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedOrderStatuses,
        validationSchema: orderStatusSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedOrderStatuses(values);

            try {
                let payload: any = {
                    statusTitle: values.statusTitle as string,
                    remarks: values.remarks as string,
                };
                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editOrderStatuses(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();

                        toast.success(`🎉 Order status updated successfully.`);
                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    let res = await addOrderStatuses(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();

                        toast.success(`🎉 Order status added successfully.`);
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
                                        router.push('/order-status');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Order Status
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} Order Status</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} Order Status
                    </h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        {/* <Button variant="outline" className="py-1 px-3">
                            <CornerUpLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button> */}
                    </div>
                </div>
            </div>
            {/* Breadcrumb and Header End ==================== */}

            <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                <form className="grid w-full items-center" onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-7 mb-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="statusTitle">
                                    Status Title<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="statusTitle"
                                    placeholder="Enter Status Title"
                                    value={values?.statusTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.statusTitle && errors.statusTitle ? (
                                    <small id="statusTitle-help" className="text-rose-600">
                                        {errors.statusTitle}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="remarks">
                                    Remarks<sup className="text-rose-600">*</sup>
                                </Label>
                                <Textarea
                                    name="remarks"
                                    placeholder="Write remarks"
                                    value={values?.remarks}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.remarks && errors.remarks ? (
                                    <small id="remarks-help" className="text-rose-600">
                                        {errors.remarks}
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
