import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { productCategorySchema } from '@/types/schemas';
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
import { ProductCategory } from '@/types/interfaces/productCategory';
import {
    useAddProductCategoryMutation,
    useEditProductCategoryMutation,
} from '@/features/productCategory/productCategoryAPI';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { convertBase64 } from '@/lib/base64convertor';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

type props = {
    selectedProducts: ProductCategory;
    setSelectedProducts: Dispatch<SetStateAction<ProductCategory>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedProducts, setSelectedProducts, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addProducts] = useAddProductCategoryMutation();
    const [editProducts] = useEditProductCategoryMutation();

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedProducts,
        validationSchema: productCategorySchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedProducts(values);

            try {
                let payload: any = {
                    name: values.name as string,
                    displayOrder: values.displayOrder as string | number,
                    coverImage: values.coverImage as string,
                    description: values.description as string,
                };
                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editProducts(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 Product category updated successfully.`);
                        router.back();
                    } else {
                        toast.error(`🛑 ${res.message}`);
                    }
                } else {
                    let res = await addProducts(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();
                        toast.success(`🎉 Product category added successfully.`);
                    } else {
                        toast.error(`🛑 ${res.message}`);
                    }
                }
            } catch (error: any) {
                console.log('🚀 ~ onSubmit: ~ error:', error);

                toast.error(`🛑 ${error?.data?.message}`);
            }

            setIsLoading(false);
        },
    });

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files) {
            const file = event.target.files[0];
            const img = await convertBase64(file);
            setImagePreview(img as string);
            setFieldValue('coverImage', img);
        }
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
                                        router.push('/product-category');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Category
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} Category</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} Category
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
                                <Label htmlFor="name">
                                    Category<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="name"
                                    placeholder="Enter Product Category"
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
                                <Label htmlFor="displayOrder">
                                    Display Order<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="number"
                                    name="displayOrder"
                                    value={values?.displayOrder}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.displayOrder && errors.displayOrder ? (
                                    <small id="displayOrder-help" className="text-rose-600">
                                        {errors.displayOrder}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="coverImage">Image</Label>
                                {imagePreview !== null && (
                                    <Image
                                        src={imagePreview}
                                        alt="logo"
                                        width={45}
                                        height={50}
                                        className="Category Image"
                                    />
                                )}
                                <Input
                                    name="coverImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
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
