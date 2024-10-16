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
import { ICMS } from '@/types/interfaces/cms';
import { useAddCMSMutation, useEditCMSMutation } from '@/features/cms/cmsAPI';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { cmsSchema } from '@/types/schemas';
import { Textarea } from '../ui/textarea';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type props = {
    selectedCMSs: ICMS;
    setSelectedCMSs: Dispatch<SetStateAction<ICMS>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedCMSs, setSelectedCMSs, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addCMSs] = useAddCMSMutation();
    const [editCMSs] = useEditCMSMutation();
    const editorRef = useRef<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Set to true once component is mounted on the client-side
    }, []);

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedCMSs,
        validationSchema: cmsSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedCMSs(values);

            try {
                let payload: any = {
                    name: values.name as string,
                    cmsKey: values.cmsKey as string,
                    description: values.description as string,
                    url: values.url as string,
                    // icon: values.icon as string,
                    metaTitle: values.metaTitle as string,
                    metaDescription: values.metaDescription as string,
                };
                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editCMSs(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 CMS updated successfully.`);
                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    // let { id, ...rest } = values;
                    let res = await addCMSs(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();
                        toast.success(`🎉 CMS added successfully.`);
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
                                        router.push('/cms');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    CMS
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} CMS</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} CMS
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
                                    Name<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="name"
                                    placeholder="Enter CMS Name"
                                    value={values?.name}
                                    disabled={isUpdate}
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
                                <Label htmlFor="cmsKey">
                                    CMS Key<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="cmsKey"
                                    placeholder="Enter CMS Key"
                                    value={values?.cmsKey}
                                    disabled={isUpdate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.cmsKey && errors.cmsKey ? (
                                    <small id="cmsKey-help" className="text-rose-600">
                                        {errors.cmsKey}
                                    </small>
                                ) : null}
                            </div>

                            {/* <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="icon">Icon</Label>
                                <Input
                                    name="icon"
                                    placeholder="Enter Icon"
                                    value={values?.icon}
                                    disabled={isUpdate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.icon && errors.icon ? (
                                    <small id="icon-help" className="text-rose-600">
                                        {errors.icon}
                                    </small>
                                ) : null}
                            </div> */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="url">
                                    URL<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="url"
                                    placeholder="Enter URL"
                                    value={values?.url}
                                    disabled={isUpdate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.url && errors.url ? (
                                    <small id="url-help" className="text-rose-600">
                                        {errors.url}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="metaTitle">META Title</Label>
                                <Input
                                    name="metaTitle"
                                    placeholder="Enter META Title"
                                    value={values?.metaTitle}
                                    disabled={isUpdate}
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
                                <Label htmlFor="metaDescription">META Description</Label>
                                <Textarea
                                    name="metaDescription"
                                    placeholder="Write META Description"
                                    value={values?.metaDescription}
                                    disabled={isUpdate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.metaDescription && errors.metaTitle ? (
                                    <small id="metaDescription-help" className="text-rose-600">
                                        {errors.metaDescription}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">
                                    Description<sup className="text-rose-600">*</sup>
                                </Label>
                                {/* <CKEditor
                                    editor={ClassicEditor}
                                    data={values?.description} // This sets the initial content of the editor
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFieldValue('description', data); // Update Formik state
                                    }}
                                    onBlur={handleBlur} // Mark field as touched
                                /> */}
                                {isClient && (
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={values?.description}
                                        onReady={(editor) => {
                                            editorRef.current = editor;
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setFieldValue('description', data);
                                        }}
                                    />
                                )}
                                {!isClient && <div>Loading editor...</div>}
                                {touched.description && errors.description ? (
                                    <small id="description-help" className="text-rose-600">
                                        {errors.description}
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
