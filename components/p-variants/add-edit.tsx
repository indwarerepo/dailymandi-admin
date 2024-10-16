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
import { IAddProduct, IAddProductVariant } from '@/types/interfaces/product';
import { productSchema } from '@/types/schemas';
import { ChangeEvent, useState } from 'react';
import { Icons } from '@/components/ui/icons';
import { convertBase64 } from '@/lib/base64convertor';
// import Image from 'next/image';
import ProductCategoryDropdown from '@/components/dropdowns/category-dropdown';
import VarienDropdown from '@/components/dropdowns/varient-dropdown';
import TaxProductDropdown from '../dropdowns/tax-dropdown-product';
import { Textarea } from '../ui/textarea';
import {
    useAddProductMutation,
    useAddProductVariantMutation,
    useEditProductVariantMutation,
} from '@/features/product/productAPI';
import ImagePreview from '../ImagePreview';
import { toast } from 'sonner';
type props = {
    selectedVariants: any;
    variantId: string;
    productId: string;
    isUpdate: boolean;
};

const AddEditVariantComponent = ({ selectedVariants, variantId, productId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dateManufacturing, setManufacturingDate] = useState<Date | undefined>(undefined);
    const [dateExpiry, setExpiryDate] = useState<Date | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [addVariants] = useAddProductVariantMutation();
    const [updateVariants] = useEditProductVariantMutation();
    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedVariants,
        // validationSchema: productSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            try {
                let payload: any = {
                    ...values,
                    productId: productId,
                    expiryDate: format(new Date(values.expiryDate), 'yyyy-MM-dd'),
                    manufacturingDate: format(new Date(values.manufacturingDate), 'yyyy-MM-dd'),
                };
                if (isUpdate) {
                    payload.id = variantId;
                    let res = await updateVariants(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 ${res?.message}`);
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    // let { id, ...rest } = values;
                    let res = await addVariants(payload).unwrap();
                    if (res.statusCode === 201) {
                        toast.success(`🎉 ${res?.message}`);
                        action.resetForm();
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
    const handleManufacturingDateChange = (date: Date | undefined, field: string) => {
        setManufacturingDate(date);
        setFieldValue(field, date);
    };
    const handleExpiryDateChange = (date: Date | undefined, field: string) => {
        setExpiryDate(date);
        setFieldValue(field, date);
    };

    // Handle multiple file changes (updated to work with the correct type)
    const handleMultipleFilesChange = async (
        event: ChangeEvent<HTMLInputElement>,
        // index: number,
        setFieldValue: (field: string, value: any) => void,
        setImagePreviews: (previews: string[]) => void,
        imagePreviews: string[],
    ) => {
        if (event.target && event.target.files) {
            const files = Array.from(event.target.files);
            const imgPromises = files.map((file) => convertBase64(file));
            const imgs = (await Promise.all(imgPromises)) as string[];

            // Append the new images to the existing productVariantImage array
            setFieldValue('productVariantImage', imgs);

            // Update image previews for the selected product variant
            // const newPreviews = [...imagePreviews];
            // newPreviews[index] = imgs as string[];
            // setImagePreviews(newPreviews);

            // Update image previews for the selected product variant
            // const newPreviews = [...imagePreviews];
            // newPreviews[index] = [...(newPreviews[index] || []), ...imgs];
            // setImagePreviews(newPreviews);
            // const newPreviews = [...imagePreviews];
            // if (!newPreviews) {
            //     newPreviews = [];
            // }
            // newPreviews = [...newPreviews, ...imgs];
            // setImagePreviews(newPreviews);
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
            <Card className="w-full px-8 py-8 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5 mb-5">
                {/* <Tabs defaultValue="generalInformation" className="w-full">
                    <TabsList className="my-3">
                        <TabsTrigger value="generalInformation">General Information</TabsTrigger>
                        <TabsTrigger value="variant">Variant</TabsTrigger>
                        <TabsTrigger value="inventory ">Inventory</TabsTrigger>
                    </TabsList> */}

                <form className="grid w-full items-center" onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-9 items-center gap-3 mb-1  w-full px-0 py-0 rounded-md cus-form max-[500px]:px-0 max-[500px]:py-6  mt-5">
                            {/* Variant Name */}
                            <div className="flex flex-col space-y-1.5 items-start">
                                <Label htmlFor="variantId">
                                    Variant Name<sup className="text-rose-600">*</sup>
                                </Label>

                                <VarienDropdown name="variantId" onChange={handleChange} variantId={values.variantId} />
                            </div>
                            {/* SKU No */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="">
                                    SKU No<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="text"
                                    name="skuNo"
                                    value={values.skuNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            {/* QR Code */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="qrCode">
                                    QR Code<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="text"
                                    name="qrCode"
                                    value={values.qrCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            {/* Purchase Cost */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="purchaseCost">
                                    Purchase Cost<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="number"
                                    name="purchaseCost"
                                    value={values.purchaseCost}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            {/* MRP */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="mrp">
                                    MRP<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="number"
                                    name="mrp"
                                    value={values.mrp}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            {/* Sale Price */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="sellingPrice">
                                    Sale Price<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="number"
                                    name="sellingPrice"
                                    value={values.sellingPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            {/* Offer Price */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="offerPrice">
                                    Offer Price<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="number"
                                    name="offerPrice"
                                    value={values.offerPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            {/* Tax Dropdown */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="taxId">
                                    Tax<sup className="text-rose-600">*</sup>
                                </Label>

                                <TaxProductDropdown name="taxId" onChange={handleChange} taxId={values.taxId} />
                            </div>
                            {/* Stock */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="stock">
                                    Stock<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="number"
                                    name="stock"
                                    value={values.stock}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            {/* Returnable */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="isReturnable">
                                    Returnable<sup className="text-rose-600">*</sup>
                                </Label>
                                <Select
                                    name="isReturnable"
                                    value={values.isReturnable ? 'true' : 'false'}
                                    onValueChange={(value) => setFieldValue('isReturnable', value === 'true')}
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
                            </div>
                            {/*  Return Days Limit */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="returnDaysLimit">
                                    Return Days<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="number"
                                    name="returnDaysLimit"
                                    value={values.returnDaysLimit}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            {/* Batch No */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="batchNo">
                                    Batch No<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    type="text"
                                    name="batchNo"
                                    value={values.batchNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            {/* Manufacturing Date */}
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="manufacturingDate">
                                    Mfg. Date<sup className="text-rose-600">*</sup>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className="w-full justify-start text-left font-normal text-xs bg-card"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {values.manufacturingDate ? (
                                                format(new Date(values.manufacturingDate), 'dd MMM, yyyy')
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
                                                handleManufacturingDateChange(date, 'manufacturingDate')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {/* Expiry Date */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="expiryDate">
                                    Exp. Date<sup className="text-rose-600">*</sup>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className="w-full justify-start text-left font-normal text-xs bg-card"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {values.expiryDate ? (
                                                format(new Date(values.expiryDate), 'dd MMM, yyyy')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={dateExpiry}
                                            onSelect={(date) => handleExpiryDateChange(date, 'expiryDate')}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {/* Remarks */}
                            {/* <div className="flex sm:col-span-2 flex-col space-y-1.5">
                                <Label htmlFor="remarks">
                                    Remarks<sup className="text-rose-600">*</sup>
                                </Label>
                                <Textarea
                                    name="remarks"
                                    value={values.remarks}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="cstheight sm:h-10 border-borderColor focus:border-borderColor bg-card outline-none "
                                />
                            </div> */}
                            {/* Upload Image */}
                            <div className="flex sm:col-span-2 flex-col space-y-1.5">
                                <Label
                                    htmlFor="productVariantImage"
                                    // className="sm:hidden"
                                >
                                    Upload Image
                                </Label>
                                <Input
                                    name="productVariantImage"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) =>
                                        handleMultipleFilesChange(e, setFieldValue, setImagePreviews, imagePreviews)
                                    }
                                />

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
                                {/* {imagePreviews?.length > 0 && <ImagePreview images={imagePreviews} />} */}
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
                            {isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <>{'Save'}</>}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
};

export default AddEditVariantComponent;
