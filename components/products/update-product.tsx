import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Pencil, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Plus, Save } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip } from '@radix-ui/react-tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { productSchema } from '@/types/schemas';
import { useAddProductMutation, useEditProductMutation } from '@/features/product/productAPI';
import { convertBase64 } from '@/lib/base64convertor';
import ProductCategoryDropdown from '@/components/dropdowns/category-dropdown';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Icons } from '../ui/icons';
import BrandDropdown from '../dropdowns/brand-dropdown';
type props = {
    selectedProducts: any;
    productId: string;
    isUpdate: boolean;
};

const UpdateProductComponent = ({ selectedProducts, productId, isUpdate }: props) => {
    console.log('🚀 ~ UpdateProductComponent ~ selectedProducts:', selectedProducts);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [updateProducts] = useEditProductMutation();
    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedProducts,
        // validationSchema: productSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            let updatedProduct = {
                id: productId,
                name: values.name,
                description: values.description,
                specification: values.specification,
                manufacturer: values.manufacturer,
                brandId: values.brandId || values.product_brand?.id,
                categoryId: values.categoryId || values.productCategory?.id,
                isFeatured: values.isFeatured || false,
                isNewProduct: values.isNewProduct || false,
                isBestSeller: values.isBestSeller || false,
                paymentTerm: values.paymentTerm || '',
                warrantyPolicy: values.warrantyPolicy || '',
                metaTitle: values.metaTitle || '',
                metaDescription: values.metaDescription || '',
                productImage: '', // Default to an empty string if no new image is provided
            };

            // If a new image is added, include the productImage field
            if (values.productImage && values.productImage.startsWith('data:image')) {
                updatedProduct.productImage = values.productImage;
            }
            console.log('🚀 ~ onSubmit: ~ updatedProduct:', updatedProduct);
            try {
                let res = await updateProducts(updatedProduct).unwrap();
                if (res.statusCode === 201) {
                    action.resetForm();
                    toast.success('🎉 Product Added successfully.'), router.back();
                } else {
                    toast.error(`🛑 ${res?.message}`);
                }
            } catch (error: any) {
                toast.error(`🛑 ${error?.data?.message}`);
            }
            setIsLoading(false);
        },
    });

    // Helper function to resize the image
    const resizeImage = (base64Str: string, maxWidth: number, maxHeight: number): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            // const img = (window.Image as any)();
            img.src = base64Str;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // let width = img.width;
                // let height = img.height;

                // // Maintain aspect ratio
                // if (width > height) {
                //     if (width > maxWidth) {
                //         height *= maxWidth / width;
                //         width = maxWidth;
                //     }
                // } else {
                //     if (height > maxHeight) {
                //         width *= maxHeight / height;
                //         height = maxHeight;
                //     }
                // }

                // canvas.width = width;
                // canvas.height = height;

                // Set the canvas dimensions to the desired width and height
                canvas.width = maxWidth;
                canvas.height = maxHeight;

                // Draw image on canvas
                if (ctx) {
                    ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
                    // ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/png')); // return resized image as base64
                }
            };
        });
    };

    const handleProductFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files) {
            const file = event.target.files[0];

            // Convert the file to base64
            const img = await convertBase64(file);

            // If the conversion succeeded, resize the image
            if (img) {
                const resizedImage = await resizeImage(img as string, 400, 400); // Resize to 300x300

                setImagePreview(resizedImage); // Set preview for resized image
                // You can set this resized image as the form value
                setFieldValue('productImage', resizedImage);
            }
        }
    };

    useEffect(() => {
        if (selectedProducts) setImagePreview(selectedProducts?.productImage);
    }, [selectedProducts]);

    return (
        <>
            {/* Form Start ==================== */}
            <Card className="w-full px-8 py-8 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                {/* <Tabs defaultValue="generalInformation" className="w-full">
                    <TabsList className="my-3">
                        <TabsTrigger value="generalInformation">General Information</TabsTrigger>
                        <TabsTrigger value="variant">Variant</TabsTrigger>
                        <TabsTrigger value="inventory ">Inventory</TabsTrigger>
                    </TabsList>
                    <TabsContent value="generalInformation"> */}
                <form className="grid w-full items-center" onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 w-full items-center gap-7 mb-5">
                            {/* Product Name */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">
                                    Name<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Product Name"
                                    value={values?.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.name && errors.name ? (
                                    <small id="name-help" className="text-rose-600">
                                        {errors.name as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* Category */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="category">
                                    Category<sup className="text-rose-600">*</sup>
                                </Label>
                                <ProductCategoryDropdown onChange={handleChange} categoryId={values?.categoryId} />
                                {touched.categoryId && errors.categoryId ? (
                                    <small id="categoryId-help" className="text-rose-600">
                                        {errors.categoryId as string}
                                    </small>
                                ) : null}
                            </div>

                            {/* Brand */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="brandId">
                                    Brand<sup className="text-rose-600">*</sup>
                                </Label>
                                <BrandDropdown onChange={handleChange} brandId={values?.brandId} />
                                {touched.brandId && errors.brandId ? (
                                    <small id="brandId-help" className="text-rose-600">
                                        {errors.brandId as string}
                                    </small>
                                ) : null}
                            </div>

                            {/* <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="description">
                                            GST % <sup className="text-rose-600">*</sup>
                                        </Label>
                                        <Input
                                            value={values?.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="border-borderColor focus:border-borderColor bg-card outline-none"
                                        />
                                    </div> */}

                            {/* isFeatured */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="isFeatured">Featured</Label>
                                <Select
                                    name="isFeatured"
                                    value={values?.isFeatured ? 'true' : 'false'}
                                    onValueChange={(value) => setFieldValue(`isFeatured`, value === 'true')}
                                >
                                    <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                        <SelectValue placeholder="Select Product Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="true">Yes</SelectItem>
                                            <SelectItem value="false">No</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {touched.isFeatured && errors.isFeatured ? (
                                    <small id="isFeatured-help" className="text-rose-600">
                                        {errors.isFeatured as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* isNewProduct */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="isNewProduct">New Product</Label>
                                <Select
                                    name="isNewProduct"
                                    value={values?.isNewProduct ? 'true' : 'false'}
                                    onValueChange={(value) => setFieldValue(`isNewProduct`, value === 'true')}
                                >
                                    <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                        <SelectValue placeholder="Select Product Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="true">Yes</SelectItem>
                                            <SelectItem value="false">No</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {touched.isNewProduct && errors.isNewProduct ? (
                                    <small id="isNewProduct-help" className="text-rose-600">
                                        {errors.isNewProduct as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* isBestSeller */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="isBestSeller">Best Seller</Label>
                                <Select
                                    name="isBestSeller"
                                    value={values?.isBestSeller ? 'true' : 'false'}
                                    onValueChange={(value) => setFieldValue(`isBestSeller`, value === 'true')}
                                >
                                    <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                        <SelectValue placeholder="Select Product Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="true">Yes</SelectItem>
                                            <SelectItem value="false">No</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {touched.isBestSeller && errors.isBestSeller ? (
                                    <small id="isBestSeller-help" className="text-rose-600">
                                        {errors.isBestSeller as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* Payment Term */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="paymentTerm">Payment Term</Label>
                                <Textarea
                                    id="paymentTerm"
                                    name="paymentTerm"
                                    placeholder="Payment Term"
                                    value={values?.paymentTerm}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.paymentTerm && errors.paymentTerm ? (
                                    <small id="paymentTerm-help" className="text-rose-600">
                                        {errors.paymentTerm as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* Warranty Policy */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="warrantyPolicy">Warranty Policy</Label>
                                <Textarea
                                    id="warrantyPolicy"
                                    name="warrantyPolicy"
                                    placeholder="Warranty Policy"
                                    value={values?.warrantyPolicy}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.warrantyPolicy && errors.warrantyPolicy ? (
                                    <small id="warrantyPolicy-help" className="text-rose-600">
                                        {errors.warrantyPolicy as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* Manufacturer */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="manufacturer">Manufacturer</Label>
                                <Textarea
                                    id="manufacturer"
                                    name="manufacturer"
                                    placeholder="Manufacturer"
                                    value={values?.manufacturer}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.manufacturer && errors.manufacturer ? (
                                    <small id="manufacturer-help" className="text-rose-600">
                                        {errors.manufacturer as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* Specification */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="specification">Specification</Label>
                                <Textarea
                                    id="specification"
                                    name="specification"
                                    placeholder="Specification"
                                    value={values?.specification}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.specification && errors.specification ? (
                                    <small id="specification-help" className="text-rose-600">
                                        {errors.specification as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* Meta Title */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="metaTitle">Meta Title</Label>
                                <Textarea
                                    id="metaTitle"
                                    name="metaTitle"
                                    placeholder="Meta Title"
                                    value={values?.metaTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.metaTitle && errors.metaTitle ? (
                                    <small id="metaTitle-help" className="text-rose-600">
                                        {errors.metaTitle as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* Meta Description */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="metaDescription">Meta Description</Label>
                                <Textarea
                                    id="metaDescription"
                                    name="metaDescription"
                                    placeholder="Meta Description"
                                    value={values?.metaDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.metaDescription && errors.metaDescription ? (
                                    <small id="metaDescription-help" className="text-rose-600">
                                        {errors.metaDescription as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* Description */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="description"
                                    value={values?.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.description && errors.description ? (
                                    <small id="description-help" className="text-rose-600">
                                        {errors.description as string}
                                    </small>
                                ) : null}
                            </div>
                            {/* Upload Image */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="productImage">Upload Image</Label>
                                {imagePreview !== null && (
                                    <img
                                        src={imagePreview}
                                        alt="logo"
                                        width={45}
                                        height={50}
                                        className="Category Image"
                                    />
                                )}
                                <Input
                                    name="productImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProductFileChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button
                            className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                            variant="outline"
                            disabled={isLoading}
                            type="submit"
                        >
                            <Save className="mr-3 w-4 h-4" />
                            {isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <>{'Update'}</>}
                        </Button>
                    </CardFooter>
                </form>
                {/* </TabsContent>
                            <CardFooter className="flex justify-end">
                                <Button
                                    className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                                    variant="outline"
                                    onClick={() => {
                                        toast({
                                            title: 'Uh oh! Something went wrong.',
                                        });
                                    }}
                                >
                                    <Save className="mr-3 w-4 h-4" />
                                    Save
                                </Button>
                            </CardFooter>
                        </form>
                    </TabsContent>
                    <TabsContent value="inventory">Change your inventory here.</TabsContent>
                </Tabs> */}
            </Card>
        </>
    );
};

export default UpdateProductComponent;
