import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { bannerSchema } from '@/types/schemas';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { IBanner } from '@/types/interfaces/banner';
import { useAddBannerMutation, useEditBannerMutation } from '@/features/banner/bannerAPI';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { convertBase64 } from '@/lib/base64convertor';
import ProductCategoryDropdown from '../dropdowns/category-dropdown';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';

type props = {
    selectedBanners: IBanner;
    setSelectedBanners: Dispatch<SetStateAction<IBanner>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedBanners, setSelectedBanners, thisId, isUpdate }: props) => {
    console.log('🚀 ~ AddEditComponent ~ selectedBanners:', selectedBanners);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addBanners] = useAddBannerMutation();
    const [editBanners] = useEditBannerMutation();

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedBanners,
        validationSchema: bannerSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            setIsLoading(true);
            setSelectedBanners(values);

            try {
                let payload: any = {
                    name: values.name as string,
                    categoryId: values.categoryId as string,
                    image: values.image as string,
                    bannerDisplay: values.bannerDisplay as string,
                    bannerType: typeof values.bannerType === 'string' ? parseInt(values.bannerType) : values.bannerType,
                    remarks: values.remarks as string,
                };
                if (isUpdate) {
                    payload.id = thisId;

                    let res = await editBanners(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();

                        toast.success(`🎉 Banner updated successfully.`);
                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    let { id, ...rest } = values;
                    let res = await addBanners(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();
                        toast.success(`🎉 Banner added successfully.`);
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                }
            } catch (error: any) {
                toast.error(`🛑 ${error?.data?.message}`);
            }

            setIsLoading(false);
        },
    });

    useEffect(() => {
        if (values?.bannerDisplay) {
            setFieldValue('bannerType', values?.bannerType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values?.bannerDisplay, values?.bannerType]);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files) {
            const file = event.target.files[0];
            const img = await convertBase64(file);
            setImagePreview(img as string);
            setFieldValue('image', img);
        }
    };

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
                                        router.push('/app-banner');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    App Banner
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} Banner</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} Banner
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
                                    Banner Name<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="name"
                                    placeholder="Enter Banner Name"
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
                                <Label htmlFor="bannerDisplay">
                                    Device Display<sup className="text-rose-600">*</sup>
                                </Label>
                                <Select
                                    value={values?.bannerDisplay}
                                    onValueChange={(e) => setFieldValue('bannerDisplay', e)}
                                >
                                    <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                        <SelectValue placeholder="Select Banner Display" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="M">Mobile</SelectItem>
                                            <SelectItem value="W">Desktop</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {touched.bannerDisplay && errors.bannerDisplay ? (
                                    <small id="bannerDisplay-help" className="text-rose-600">
                                        {errors.bannerDisplay}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="bannerType">
                                    Banner Type<sup className="text-rose-600">*</sup>
                                </Label>
                                <Select
                                    value={values?.bannerType as string}
                                    onValueChange={(e) => setFieldValue('bannerType', e)}
                                    // disabled={!values?.bannerDisplay}
                                >
                                    <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                        <SelectValue placeholder="Select Banner Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {values?.bannerDisplay === 'M' && (
                                                <>
                                                    <SelectItem value="1">Mobile Option 1</SelectItem>
                                                    <SelectItem value="2">Mobile Option 2</SelectItem>
                                                    <SelectItem value="3">Mobile Option 3</SelectItem>
                                                </>
                                            )}
                                            {values?.bannerDisplay === 'W' && (
                                                <>
                                                    <SelectItem value="1">Desktop Option 1</SelectItem>
                                                    <SelectItem value="2">Desktop Option 2</SelectItem>
                                                    <SelectItem value="3">Desktop Option 3</SelectItem>
                                                    <SelectItem value="4">Desktop Option 4</SelectItem>
                                                    <SelectItem value="5">Desktop Option 5</SelectItem>
                                                    <SelectItem value="6">Desktop Option 6</SelectItem>
                                                </>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {touched.bannerType && errors.bannerType ? (
                                    <small id="bannerType-help" className="text-rose-600">
                                        {errors.bannerType}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="categoryId">
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
                                <Label htmlFor="image">Image</Label>
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
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    // value={values?.coverImage}
                                    onChange={handleFileChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.image && errors.image ? (
                                    <small id="image-help" className="text-rose-600">
                                        {errors.image}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="remarks">Remarks</Label>
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
