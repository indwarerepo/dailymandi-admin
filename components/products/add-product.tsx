import * as React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik, FormikErrors } from 'formik';
import { IPermission } from '@/types/interfaces/permission';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Pencil, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import {
    CornerUpLeft,
    ChevronLeft,
    FileDown,
    FileUp,
    Plus,
    Search,
    BadgePlus,
    Filter,
    ExternalLink,
    ArrowDown,
    Upload,
    MonitorUp,
    Save,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip } from '@radix-ui/react-tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { IAddProduct } from '@/types/interfaces/product';
import { productSchema } from '@/types/schemas';
import { ChangeEvent, useState } from 'react';
import { Icons } from '@/components/ui/icons';
import { convertBase64 } from '@/lib/base64convertor';
// import Image from 'next/image';
import ProductCategoryDropdown from '@/components/dropdowns/category-dropdown';
import VarienDropdown from '@/components/dropdowns/varient-dropdown';
import TaxProductDropdown from '../dropdowns/tax-dropdown-product';
import { Textarea } from '../ui/textarea';
import { useAddProductMutation } from '@/features/product/productAPI';
import ImagePreview from '../ImagePreview';
import { toast } from 'sonner';
import BrandDropdown from '../dropdowns/brand-dropdown';
import SubCategoryByCategory from '../dropdowns/subcategory-dropdown';
type props = {
    selectedProducts: IAddProduct;
    productId: string;
    isUpdate: boolean;
};

const AddProductComponent = ({ selectedProducts, productId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dateManufacturing, setManufacturingDate] = useState<Date | undefined>(undefined);
    const [dateExpiry, setExpiryDate] = useState<Date | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[][]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number[]>([]);
    const [addProducts] = useAddProductMutation();
    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedProducts,
        validationSchema: productSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            if (values?.productVariant?.length === 0) {
                toast.error(`🛑 At least one product variant is required !!!`);
                setIsLoading(false);
                return;
            }
            const formattedValues = {
                ...values,
                productVariant: values.productVariant.map((variant) => ({
                    ...variant,
                    expiryDate: format(new Date(variant.expiryDate), 'yyyy-MM-dd'),
                    manufacturingDate: format(new Date(variant.manufacturingDate), 'yyyy-MM-dd'),
                })),
            };
            console.log('🚀 ~ onSubmit: ~ formattedValues:', formattedValues);
            try {
                let res = await addProducts(formattedValues).unwrap();
                if (res.statusCode === 201) {
                    action.resetForm();
                    toast.success('🎉 Product Added successfully.');
                    router.back();
                } else {
                    toast.error(`🛑 ${res?.message}`);
                }
            } catch (error: any) {
                toast.error(`🛑 ${error?.data?.message}`);
            }
            setIsLoading(false);
        },
    });
    const handleManufacturingDateChange = (date: Date | undefined, index: number, field: string) => {
        setManufacturingDate(date);
        setFieldValue(`productVariant.${index}.${field}`, date);
    };
    const handleExpiryDateChange = (date: Date | undefined, index: number, field: string) => {
        setExpiryDate(date);
        setFieldValue(`productVariant.${index}.${field}`, date);
    };

    const handleFileChange = async (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
        setFieldValue: (field: string, value: any) => void,
        setImagePreviews: (previews: string[]) => void,
        imagePreviews: string[],
    ) => {
        if (event.target && event.target.files) {
            const file = event.target.files[0];
            if (file) {
                const img = await convertBase64(file);
                setFieldValue(`productVariant.${index}.productVariantImage`, img);

                // Update image preview state
                const newPreviews = [...imagePreviews];
                newPreviews[index] = img as string;
                setImagePreviews(newPreviews);
            }
        }
    };

    // Handle multiple file changes (updated to work with the correct type)
    const handleMultipleFilesChange = async (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
        setFieldValue: (field: string, value: any) => void,
        setImagePreviews: (previews: string[][]) => void,
        imagePreviews: string[][],
    ) => {
        if (event.target && event.target.files) {
            const files = Array.from(event.target.files);
            const imgPromises = files.map((file) => convertBase64(file));
            const imgs = (await Promise.all(imgPromises)) as string[];

            // Append the new images to the existing productVariantImage array
            setFieldValue(`productVariant.${index}.productVariantImage`, imgs);

            // Update image previews for the selected product variant
            // const newPreviews = [...imagePreviews];
            // newPreviews[index] = imgs as string[];
            // setImagePreviews(newPreviews);

            // Update image previews for the selected product variant
            // const newPreviews = [...imagePreviews];
            // newPreviews[index] = [...(newPreviews[index] || []), ...imgs];
            // setImagePreviews(newPreviews);
            const newPreviews = [...imagePreviews];
            if (!newPreviews[index]) {
                newPreviews[index] = [];
            }
            newPreviews[index] = [...newPreviews[index], ...imgs];
            setImagePreviews(newPreviews);
        }
    };

    const handleNextImage = (index: number) => {
        if (imagePreviews[index]?.length > 1) {
            setCurrentImageIndex((prevState) => {
                const newState = [...prevState];
                newState[index] = (prevState[index] + 1) % imagePreviews[index].length;
                return newState;
            });
        }
    };

    const handlePrevImage = (index: number) => {
        if (imagePreviews[index]?.length > 1) {
            setCurrentImageIndex((prevState) => {
                const newState = [...prevState];
                newState[index] = (prevState[index] - 1 + imagePreviews[index].length) % imagePreviews[index].length;
                return newState;
            });
        }
    };

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

    return (
        <>
            {/* Form Start ==================== */}
            <div className="w-full px-8 py-8 rounded-md cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                {/* <Tabs defaultValue="generalInformation" className="w-full">
                    <TabsList className="my-3">
                        <TabsTrigger value="generalInformation">General Information</TabsTrigger>
                        <TabsTrigger value="variant">Variant</TabsTrigger>
                        <TabsTrigger value="inventory ">Inventory</TabsTrigger>
                    </TabsList> */}

                <form className="grid w-full items-center" onSubmit={handleSubmit}>
                    <div>
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
                                        {errors.name}
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
                                        {errors.categoryId}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="category">
                                    Sub Category<sup className="text-rose-600">*</sup>
                                </Label>
                                <SubCategoryByCategory
                                    onChange={handleChange}
                                    categoryId={values?.categoryId}
                                    subCategoryId={values?.subCategoryId}
                                />
                                {touched.subCategoryId && errors.subCategoryId ? (
                                    <small id="subCategoryId-help" className="text-rose-600">
                                        {errors.subCategoryId}
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
                                        {errors.brandId}
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
                                    value={values.isFeatured ? 'true' : 'false'}
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
                                        {errors.isFeatured}
                                    </small>
                                ) : null}
                            </div>
                            {/* isNewProduct */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="isNewProduct">New Product</Label>
                                <Select
                                    name="isNewProduct"
                                    value={values.isNewProduct ? 'true' : 'false'}
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
                                        {errors.isNewProduct}
                                    </small>
                                ) : null}
                            </div>
                            {/* isBestSeller */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="isBestSeller">Best Seller </Label>
                                <Select
                                    name="isBestSeller"
                                    value={values.isBestSeller ? 'true' : 'false'}
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
                                        {errors.isBestSeller}
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
                                        {errors.paymentTerm}
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
                                        {errors.warrantyPolicy}
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
                                        {errors.manufacturer}
                                    </small>
                                ) : null}
                            </div>
                            {/* Specification */}
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="specification">Specification</Label>
                                <Textarea
                                    id="specification"
                                    placeholder="Specification"
                                    value={values?.specification}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.specification && errors.specification ? (
                                    <small id="specification-help" className="text-rose-600">
                                        {errors.specification}
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
                            <div className="col-span-1  flex flex-col space-y-1.5">
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
                            <div className="col-span-1 sm:col-span-2 flex flex-col space-y-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Description"
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

                        {/* Input Row Start */}
                        {/* Loop through variants */}
                        {values.productVariant.map((variant, index) => (
                            <Card
                                key={index}
                                className="grid grid-cols-1 sm:grid-cols-10 items-center gap-2 mb-1  w-full px-4 py-4 rounded-md cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5"
                            >
                                {/* Variant Name */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.variantId`}>
                                        Name<sup className="text-rose-600">*</sup>
                                    </Label>

                                    <VarienDropdown
                                        name={`productVariant.${index}.variantId`}
                                        onChange={handleChange}
                                        variantId={variant.variantId}
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.variantId &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.variantId ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.variantId}</div>
                                    ) : null}
                                </div>
                                {/* SKU No */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.skuNo`}>
                                        SKU No<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        type="text"
                                        name={`productVariant.${index}.skuNo`}
                                        value={variant.skuNo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.skuNo &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.skuNo ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.skuNo}</div>
                                    ) : null}
                                </div>
                                {/* QR Code */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.qrCode`}>
                                        QR Code<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        type="text"
                                        name={`productVariant.${index}.qrCode`}
                                        value={variant.qrCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.qrCode &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.qrCode ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.qrCode}</div>
                                    ) : null}
                                </div>
                                {/* Purchase Cost */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.purchaseCost`}>
                                        Purchase Cost<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        type="number"
                                        name={`productVariant.${index}.purchaseCost`}
                                        value={variant.purchaseCost}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.purchaseCost &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.purchaseCost ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.purchaseCost}</div>
                                    ) : null}
                                </div>
                                {/* MRP */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.mrp`}>
                                        MRP<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        type="number"
                                        name={`productVariant.${index}.mrp`}
                                        value={variant.mrp}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.mrp &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.mrp ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.mrp}</div>
                                    ) : null}
                                </div>
                                {/* Sale Price */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.sellingPrice`}>
                                        Sale Price<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        type="number"
                                        name={`productVariant.${index}.sellingPrice`}
                                        value={variant.sellingPrice}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.sellingPrice &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.sellingPrice ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.sellingPrice}</div>
                                    ) : null}
                                </div>
                                {/* Offer Price */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.offerPrice`}>
                                        Offer Price<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        type="number"
                                        name={`productVariant.${index}.offerPrice`}
                                        value={variant.offerPrice}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.offerPrice &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.offerPrice ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.offerPrice}</div>
                                    ) : null}
                                </div>
                                {/* Tax Dropdown */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.taxId`}>
                                        Tax<sup className="text-rose-600">*</sup>
                                    </Label>

                                    <TaxProductDropdown
                                        name={`productVariant.${index}.taxId`}
                                        onChange={handleChange}
                                        taxId={variant.taxId}
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.taxId &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.taxId ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.taxId}</div>
                                    ) : null}
                                </div>
                                {/* Stock */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.stock`}>
                                        Stock<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        type="number"
                                        name={`productVariant.${index}.stock`}
                                        value={variant.stock}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.stock &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.stock ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.stock}</div>
                                    ) : null}
                                </div>
                                {/* Returnable */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.isReturnable`}>
                                        Returnable<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Select
                                        name={`productVariant.${index}.isReturnable`}
                                        value={variant.isReturnable ? 'true' : 'false'}
                                        onValueChange={(value) =>
                                            setFieldValue(`productVariant.${index}.isReturnable`, value === 'true')
                                        }
                                    >
                                        <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                            <SelectValue placeholder="Select Return Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="true">Yes</SelectItem>
                                                <SelectItem value="false">No</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.isReturnable &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.isReturnable ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.isReturnable}</div>
                                    ) : null}
                                </div>
                                {/*  Return Days Limit */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.returnDaysLimit`}>
                                        Return Days<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        type="number"
                                        name={`productVariant.${index}.returnDaysLimit`}
                                        value={variant.returnDaysLimit}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.returnDaysLimit &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.returnDaysLimit ? (
                                        <div className="text-red-600">
                                            {errors.productVariant[index]?.returnDaysLimit}
                                        </div>
                                    ) : null}
                                </div>
                                {/* Batch No */}
                                <div className="flex flex-col sm:col-span-1 space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.batchNo`}>
                                        Batch No<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        type="text"
                                        name={`productVariant.${index}.batchNo`}
                                        value={variant.batchNo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.batchNo &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.batchNo ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.batchNo}</div>
                                    ) : null}
                                </div>
                                {/* Manufacturing Date */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.manufacturingDate`}>
                                        Mfg. Date<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className="w-full justify-start text-left font-normal text-xs bg-card"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {variant.manufacturingDate ? (
                                                    format(new Date(variant.manufacturingDate), 'dd MMM, yyyy')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={dateManufacturing}
                                                onSelect={(date) =>
                                                    handleManufacturingDateChange(date, index, 'manufacturingDate')
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                {/* Expiry Date */}
                                <div className="flex flex-col  space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.expiryDate`}>
                                        Exp. Date<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className="w-full justify-start text-left font-normal text-xs bg-card"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {variant.expiryDate ? (
                                                    format(new Date(variant.expiryDate), 'dd MMM, yyyy')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={dateExpiry}
                                                onSelect={(date) => handleExpiryDateChange(date, index, 'expiryDate')}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                {/* Remarks */}
                                {/* <div className="sm:col-span-2 flex flex-col space-y-1.5">
                                    <Label htmlFor={`productVariant.${index}.remarks`}>
                                        Remarks<sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Textarea
                                        name={`productVariant.${index}.remarks`}
                                        value={variant.remarks}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="cstheight sm:h-10 border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.remarks &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.remarks ? (
                                        <div className="text-red-600">{errors.productVariant[index]?.remarks}</div>
                                    ) : null}
                                </div> */}
                                {/* Upload Image */}
                                <div className="flex flex-col sm:col-span-2 space-y-1.5">
                                    <Label
                                        htmlFor={`productVariant.${index}.productVariantImage`}
                                        // className="sm:hidden"
                                    >
                                        Upload Image
                                    </Label>
                                    <Input
                                        className="text-xs"
                                        name={`productVariant.${index}.productVariantImage`}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) =>
                                            handleMultipleFilesChange(
                                                e,
                                                index,
                                                setFieldValue,
                                                setImagePreviews,
                                                imagePreviews,
                                            )
                                        }
                                    />
                                    {errors.productVariant &&
                                    Array.isArray(errors.productVariant) &&
                                    typeof errors.productVariant[index] === 'object' &&
                                    errors.productVariant[index]?.productVariantImage &&
                                    touched.productVariant &&
                                    touched.productVariant[index]?.productVariantImage ? (
                                        <div className="text-red-600">
                                            {errors.productVariant[index]?.productVariantImage}
                                        </div>
                                    ) : null}
                                    {/* Preview all selected images */}
                                    {/* Preview Images */}
                                    {/* {imagePreviews[index]?.length > 0 && (
                                        <div className="mt-2 grid grid-cols-3 gap-2">
                                            {imagePreviews[index].map((img, imgIndex) => (
                                                <img
                                                    key={imgIndex}
                                                    src={img}
                                                    alt={`Image Preview ${imgIndex}`}
                                                    className="w-32 h-32 object-cover"
                                                />
                                            ))}
                                        </div>
                                    )} */}
                                    {/* Preview Images */}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    {' '}
                                    {imagePreviews[index]?.length > 0 && <ImagePreview images={imagePreviews[index]} />}
                                </div>
                                {/* Delete Row */}
                                <div className="flex flex-col space-y-1.5">
                                    <div className="flex gap-4 cursor-pointer items-center justify-center w-full">
                                        {/* <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Plus
                                                                size={18}
                                                                onClick={() => router.push('/products/add-edit')}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>Add Row</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider> */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Trash
                                                        size={18}
                                                        onClick={() => {
                                                            const updatedVariants = values.productVariant.filter(
                                                                (_, idx) => idx !== index,
                                                            );
                                                            setFieldValue('productVariant', updatedVariants);
                                                        }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent>Delete Row</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        {/* Input Row End */}
                        {/* Add Variant Button */}
                        <div className="my-4">
                            <Button
                                type="button"
                                className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                                onClick={() => {
                                    const newVariant = {
                                        variantId: '',
                                        skuNo: '',
                                        qrCode: '',
                                        purchaseCost: 0,
                                        mrp: 0,
                                        sellingPrice: 0,
                                        offerPrice: 0,
                                        taxId: '',
                                        stock: 0,
                                        isReturnable: false,
                                        returnDaysLimit: 0,
                                        batchNo: '',
                                        // remarks: '',
                                        manufacturingDate: new Date(),
                                        expiryDate: new Date(),
                                        // productVariantImage: '',
                                        productVariantImage: [],
                                    };
                                    setFieldValue('productVariant', [...values.productVariant, newVariant]);
                                    // setImagePreviews([...imagePreviews, []]);
                                    setImagePreviews((prev) => [...prev, []]);
                                }}
                            >
                                Add Variant
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                            variant="outline"
                            disabled={isLoading}
                            type="submit"
                        >
                            <Save className="mr-3 w-4 h-4" />
                            {isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <>{'Save'}</>}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProductComponent;
