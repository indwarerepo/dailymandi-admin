import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { useToast } from '@/components/ui/use-toast';
import { productCategorySchema } from '@/types/schemas';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon, ChevronLeft, CornerUpLeft, Plus, Save, Trash } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/types/interfaces/product';
import { useAddProductMutation, useEditProductMutation } from '@/features/product/productAPI';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { convertBase64 } from '@/lib/base64convertor';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip } from '@radix-ui/react-tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import * as React from 'react';
import ProductCategoryDropdown from '../dropdowns/category-dropdown';
import TaxDropdown from '../dropdowns/tax-dropdown';

type props = {
    selectedProducts: Product;
    setSelectedProducts: Dispatch<SetStateAction<Product>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedProducts, setSelectedProducts, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addProducts] = useAddProductMutation();
    const [editProducts] = useEditProductMutation();
    const { toast } = useToast();

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedProducts,
        // validationSchema: productCategorySchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedProducts(values);

            // try {
            //     let payload: any = {
            //         name: values.name as string,
            //         categoryId: values.categoryId as string,
            //         description: values.description as string,
            //         manufacturer: values.manufacturer as string,
            //         specification: values.specification as string,
            //     };
            //     if (isUpdate) {
            //         payload.id = thisId;
            //         let res = await editProducts(payload).unwrap();
            //         if (res.statusCode === 201) {
            //             action.resetForm();
            //             toast({
            //                 variant: 'sucess',
            //                 title: '🎉 Product updated successfully.',
            //                 duration: 3500,
            //             });
            //             router.back();
            //         } else {
            //             toast({
            //                 variant: 'error',
            //                 title: `🛑 ${res?.message}`,
            //                 duration: 1500,
            //             });
            //         }
            //     } else {
            //         // let { id, ...rest } = values;
            //         let res = await addProducts(payload).unwrap();
            //         if (res.statusCode === 201) {
            //             action.resetForm();
            //             router.back();
            //             toast({
            //                 variant: 'sucess',
            //                 title: '🎉 Product added successfully.',
            //                 duration: 3500,
            //             });
            //         } else {
            //             toast({
            //                 variant: 'error',
            //                 title: `🛑 ${res?.message}`,
            //                 duration: 1500,
            //             });
            //         }
            //     }
            // } catch (error: any) {
            //     console.log('🚀 ~ onSubmit: ~ error:', error);
            //     toast({
            //         variant: 'error',
            //         title: `🛑 ${error?.data?.message}`,
            //         duration: 1500,
            //     });
            // }

            // setIsLoading(false);
        },
    });

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files) {
            const file = event.target.files[0];
            const img = await convertBase64(file);
            setImagePreview(img as string);
            setFieldValue('qrCode', img);
        }
    };

    const [date, setDate] = React.useState<Date>();

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
                                        router.push('/product');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Product
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} Product</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} Product
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

            <Card className="w-full px-8 py-8 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                <Tabs defaultValue="generalInformation" className="w-full">
                    <TabsList className="my-3">
                        <TabsTrigger value="generalInformation">General Information</TabsTrigger>
                        <TabsTrigger value="variant">Variant</TabsTrigger>
                        <TabsTrigger value="inventory ">Inventory</TabsTrigger>
                    </TabsList>
                    <TabsContent value="generalInformation">
                        <form className="grid w-full items-center" onSubmit={handleSubmit}>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-3 w-full items-center gap-7 mb-5">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">
                                            Name<sup className="text-rose-600">*</sup>
                                        </Label>
                                        <Input
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
                                        <Label htmlFor="categoryId">
                                            Category<sup className="text-rose-600">*</sup>
                                        </Label>
                                        <ProductCategoryDropdown
                                            onChange={handleChange}
                                            categoryId={values?.categoryId}
                                        />
                                        {/* <Select>
                                            <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="apple">Apple</SelectItem>
                                                    <SelectItem value="banana">Banana</SelectItem>
                                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                                    <SelectItem value="grapes">Grapes</SelectItem>
                                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select> */}
                                    </div>
                                    <div className="col-span-1 flex flex-col space-y-1.5">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
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

                                    <div className="col-span-1 flex flex-col space-y-1.5">
                                        <Label htmlFor="specification">Specification</Label>
                                        <Input
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
                                    <div className="col-span-1 flex flex-col space-y-1.5">
                                        <Label htmlFor="productVariant.skuNo">SKU No</Label>
                                        <Input
                                            value={values?.productVariant?.skuNo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="border-borderColor focus:border-borderColor bg-card outline-none"
                                        />
                                        {/* {touched?.productVariant?.skuNo && errors?.productVariant?.skuNo ? (
                                            <small id="skuNo-help" className="text-rose-600">
                                                {errors?.productVariant?.skuNo}
                                            </small>
                                        ) : null} */}
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        {/* <Label htmlFor="description">
                                            GST % <sup className="text-rose-600">*</sup>
                                        </Label>
                                        <Input
                                            value={values?.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="border-borderColor focus:border-borderColor bg-card outline-none"
                                        /> */}
                                        <Label htmlFor="taxId">
                                            Tax<sup className="text-rose-600">*</sup>
                                        </Label>
                                        <TaxDropdown onChange={handleChange} taxId={values?.productVariant?.taxId} />
                                    </div>

                                    <div className="col-span-1 flex flex-col space-y-1.5">
                                        <Label htmlFor="manufacturer">Manufacturer</Label>
                                        <Input
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

                                    {/* <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="hsncode">
                                            HSN Code<sup className="text-rose-600">*</sup>
                                        </Label>
                                        <Input
                                            value={values?.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="border-borderColor focus:border-borderColor bg-card outline-none"
                                        />
                                    </div> */}

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="qrCode">Upload QR Code</Label>
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
                                            name="qrCode"
                                            type="file"
                                            accept="image/*"
                                            // value={values?.coverImage}
                                            onChange={handleFileChange}
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

                    <TabsContent value="variant">
                        <form className="grid w-full items-center" onSubmit={handleSubmit}>
                            <CardContent>
                                <div className="">
                                    {/* Lebel Start */}
                                    <div className="sm:grid grid-cols-1 sm:grid-cols-9 w-full items-center gap-2 mb-2 hidden">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="variantName ">
                                                Variant Name<sup className="text-rose-600">*</sup>
                                            </Label>
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="uom ">
                                                UOM<sup className="text-rose-600">*</sup>
                                            </Label>
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="salePrice">
                                                Attributes<sup className="text-rose-600">*</sup>
                                            </Label>
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="salePrice">
                                                Sale Price<sup className="text-rose-600">*</sup>
                                            </Label>
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="mrp">
                                                MRP<sup className="text-rose-600">*</sup>
                                            </Label>
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="expiryDate">
                                                Expiry Date<sup className="text-rose-600">*</sup>
                                            </Label>
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="manufactureDate">
                                                Manufacture Date<sup className="text-rose-600">*</sup>
                                            </Label>
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="stock-alert">Upload Image</Label>
                                        </div>
                                        <div className="flex flex-col space-y-1.5"></div>
                                    </div>
                                    {/* Lebel End */}

                                    {/* Input Row Start */}
                                    <div className="grid grid-cols-1 sm:grid-cols-9 w-full items-center gap-2 mb-1">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="variantName " className="sm:hidden">
                                                Variant Name<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Variant Name"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="uom " className="sm:hidden">
                                                UOM<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="UOM"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="salePrice" className="sm:hidden">
                                                Attributes<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Attributes"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="salePrice" className="sm:hidden">
                                                Sale Price<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Sale Price"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="mrp" className="sm:hidden">
                                                MRP<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="MRP"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="expiryDate" className="sm:hidden">
                                                Expiry Date<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-full justify-start text-left font-normal',
                                                            !date && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="manufactureDate" className="sm:hidden">
                                                Manufacture Date<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-full justify-start text-left font-normal',
                                                            !date && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="stock-alert" className="sm:hidden">
                                                Upload Image
                                            </Label>
                                            <Input id="picture" type="file" className="" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            {/* <div className="flex gap-4 cursor-pointer items-center justify-center w-full">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Plus
                                                                size={18}
                                                                onClick={() => router.push('/products/add-edit')}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>Add Row</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Trash size={18} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>Delete Row</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* Input Row End */}

                                    {/* Input Row Start */}
                                    <div className="grid grid-cols-1 sm:grid-cols-9 w-full items-center gap-2 mb-1">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="variantName " className="sm:hidden">
                                                Variant Name<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Variant Name"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="uom " className="sm:hidden">
                                                UOM<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="UOM"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="salePrice" className="sm:hidden">
                                                Attributes<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Attributes"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="salePrice" className="sm:hidden">
                                                Sale Price<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Sale Price"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="mrp" className="sm:hidden">
                                                MRP<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="MRP"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="expiryDate" className="sm:hidden">
                                                Expiry Date<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-full justify-start text-left font-normal',
                                                            !date && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="manufactureDate" className="sm:hidden">
                                                Manufacture Date<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-full justify-start text-left font-normal',
                                                            !date && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="stock-alert" className="sm:hidden">
                                                Upload Image
                                            </Label>
                                            <Input id="picture" type="file" className="" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <div className="flex gap-4 cursor-pointer items-center justify-center w-full">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Plus
                                                                size={18}
                                                                onClick={() => router.push('/products/add-edit')}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>Add Row</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Trash size={18} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>Delete Row</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Input Row End */}

                                    {/* Input Row Start */}
                                    <div className="grid grid-cols-1 sm:grid-cols-9 w-full items-center gap-2 mb-1">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="variantName " className="sm:hidden">
                                                Variant Name<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Variant Name"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="uom " className="sm:hidden">
                                                UOM<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="UOM"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="salePrice" className="sm:hidden">
                                                Attributes<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Attributes"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="salePrice" className="sm:hidden">
                                                Sale Price<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Sale Price"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="mrp" className="sm:hidden">
                                                MRP<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Input
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="MRP"
                                                className="border-borderColor focus:border-borderColor bg-card outline-none"
                                            />
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="expiryDate" className="sm:hidden">
                                                Expiry Date<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-full justify-start text-left font-normal',
                                                            !date && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="manufactureDate" className="sm:hidden">
                                                Manufacture Date<sup className="text-rose-600">*</sup>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-full justify-start text-left font-normal',
                                                            !date && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {touched.name && errors.name ? (
                                                <small id="name-help" className="text-rose-600">
                                                    {errors.name}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="stock-alert" className="sm:hidden">
                                                Upload Image
                                            </Label>
                                            <Input id="picture" type="file" className="" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <div className="flex gap-4 cursor-pointer items-center justify-center w-full">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Plus
                                                                size={18}
                                                                onClick={() => router.push('/products/add-edit')}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>Add Row</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Trash size={18} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>Delete Row</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Input Row End */}
                                </div>
                            </CardContent>
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
                </Tabs>
            </Card>
        </div>
    );
};

export default AddEditComponent;
