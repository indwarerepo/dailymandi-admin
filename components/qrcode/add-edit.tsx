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

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { convertBase64 } from '@/lib/base64convertor';
import { qrcodeSchema } from '@/types/schemas';
import { IQRCode } from '@/types/interfaces/qrcode';
import { useAddQRCodeMutation, useEditQRCodeMutation } from '@/features/qrcode/qrcodeAPI';

type props = {
    selectedQRCodes: IQRCode;
    setSelectedQRCodes: Dispatch<SetStateAction<IQRCode>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedQRCodes, setSelectedQRCodes, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addQRCodes] = useAddQRCodeMutation();
    const [editQRCodes] = useEditQRCodeMutation();

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedQRCodes,
        validationSchema: qrcodeSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedQRCodes(values);

            try {
                let payload: any = {
                    name: values.name as string,
                    image: values.image as string,
                };
                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editQRCodes(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 QRCode updated successfully.`);
                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    // let { id, ...rest } = values;
                    let res = await addQRCodes(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();
                        toast.success(`🎉 QRCode added successfully.`);
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
                                        router.push('/qrcode');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    QR Code
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} QR Code</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} QR Code
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
                {/* <CardContent> */}
                {/* <h6 className="mb-12">Add Process</h6> */}{' '}
                <form className="grid w-full items-center" onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-7 mb-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">
                                    QR Code Name<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="name"
                                    placeholder="Enter QR Code Name"
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
