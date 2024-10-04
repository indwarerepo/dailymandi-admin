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
import { Dispatch, SetStateAction, useState } from 'react';
import { taxSchema } from '@/types/schemas';
import { ITax } from '@/types/interfaces/tax';
import { useAddTaxMutation, useEditTaxMutation } from '@/features/tax/taxAPI';

type props = {
    selectedTaxs: ITax;
    setSelectedTaxs: Dispatch<SetStateAction<ITax>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedTaxs, setSelectedTaxs, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addTaxs] = useAddTaxMutation();
    const [editTaxs] = useEditTaxMutation();

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: selectedTaxs,
        validationSchema: taxSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedTaxs(values);

            try {
                let payload: any = {
                    taxHead: values.taxHead as string,
                    slab: values.slab as string,
                    percentage: values.percentage as number,
                };
                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editTaxs(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();

                        toast.success(`🎉 Tax updated successfully.`);
                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    // let { id, ...rest } = values;
                    let res = await addTaxs(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();
                        toast.success(`🎉 Tax added successfully.`);
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
                                        router.push('/tax');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Tax
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} Tax</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} Tax
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
                                <Label htmlFor="taxHead">
                                    Tax Head<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="taxHead"
                                    placeholder="Enter Tax Head"
                                    value={values?.taxHead}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.taxHead && errors.taxHead ? (
                                    <small id="taxHead-help" className="text-rose-600">
                                        {errors.taxHead}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="slab">
                                    Slab<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="slab"
                                    placeholder="Enter slab"
                                    value={values?.slab}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.slab && errors.slab ? (
                                    <small id="slab-help" className="text-rose-600">
                                        {errors.slab}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="percentage">
                                    Percentage (%)<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="percentage"
                                    type="number"
                                    value={values?.percentage}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.percentage && errors.percentage ? (
                                    <small id="percentage-help" className="text-rose-600">
                                        {errors.percentage}
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
