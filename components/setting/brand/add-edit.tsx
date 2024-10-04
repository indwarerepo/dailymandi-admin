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
import { IZone } from '@/types/interfaces/zone';
import { useAddZoneMutation, useEditZoneMutation } from '@/features/zone/zoneAPI';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { brandSchema, zoneSchema } from '@/types/schemas';
import { IBrand } from '@/types/interfaces/brand';
import { useAddBrandMutation, useEditBrandMutation } from '@/features/brand/brandAPI';
import { Textarea } from '@/components/ui/textarea';

type props = {
    selectedBrands: IBrand;
    setSelectedBrands: Dispatch<SetStateAction<IBrand>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedBrands, setSelectedBrands, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addBrands] = useAddBrandMutation();
    const [editBrands] = useEditBrandMutation();

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: selectedBrands,
        validationSchema: brandSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedBrands(values);

            try {
                let payload: any = {
                    name: values.name as string,
                    description: values.description as string,
                    metaTitle: values.metaTitle as string,
                    metaDescription: values.metaDescription as string,
                };
                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editBrands(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 ${res?.message}`);
                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    // let { id, ...rest } = values;
                    let res = await addBrands(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();
                        toast.success(`🎉 ${res?.message}`);
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
                                        router.push('/brand');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Brand
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} Brand</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} Brand
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
                                    Brand Name<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="name"
                                    placeholder="Enter Brand Name"
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
                                <Label htmlFor="description">
                                    Description<sup className="text-rose-600">*</sup>
                                </Label>
                                <Textarea
                                    name="description"
                                    placeholder="Write Description"
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
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="metaTitle">
                                    Meta Title<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="metaTitle"
                                    placeholder="Enter Meta Title"
                                    value={values?.metaTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.metaTitle && errors.metaTitle ? (
                                    <small id="metaTitle-help" className="text-rose-600">
                                        {errors.metaTitle}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="metaDescription">
                                    Meta Description<sup className="text-rose-600">*</sup>
                                </Label>
                                <Textarea
                                    name="metaDescription"
                                    placeholder="Write Meta Description"
                                    value={values?.metaDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.metaDescription && errors.metaDescription ? (
                                    <small id="metaDescription-help" className="text-rose-600">
                                        {errors.metaDescription}
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
