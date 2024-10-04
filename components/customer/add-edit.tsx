import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { IPermission } from '@/types/interfaces/permission';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, Plus, Save } from 'lucide-react';
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

type props = {
    selectedPermissions: IPermission;
    permissionId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedPermissions, permissionId, isUpdate }: props) => {
    const router = useRouter();

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: selectedPermissions,
        // validationSchema: permissionSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log(values);
        },
    });

    return (
        <div className="py-3">
            <div className="mb-8 flex justify-between">
                <div className="">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/customer" className="flex items-center">
                                    <ChevronLeft /> Customer Master
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-3xl tracking-tight mb-0 mt-0 font-poppins font-thin">Add Customer Master</h2>
                </div>
            </div>

            <Card className="w-full px-24 py-20 cus-form max-[500px]:px-6 max-[500px]:py-6">
                <CardContent>
                    {/* <h6 className="mb-12">Add Machinery</h6> */}
                    <form className="grid w-full items-center" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-5 mb-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label>
                                    Customer Name<sup className="text-rose-600">*</sup>
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
                                <Label htmlFor="description">Address</Label>
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
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">GST No</Label>
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
                                <Label htmlFor="name">PAN No</Label>
                                <Input
                                    value={values?.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">Contact Details</Label>
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
                        </div>

                        <div className="flex justify-end gap-4 mt-5">
                            <Button variant="ghost">Cancel</Button>
                            <Button className="rounded-lg button-col px-6">
                                <Save className="mr-3 w-4 h-4" />
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddEditComponent;
