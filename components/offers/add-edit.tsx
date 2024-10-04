import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { useToast } from '@/components/ui/use-toast';

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
    const { toast } = useToast();

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
                                <BreadcrumbLink href="/generatewarranty" className="flex items-center">
                                    <ChevronLeft /> Warranty Claim
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-3xl tracking-tight mb-0 mt-0 font-poppins font-thin">Add Warranty Claim</h2>
                </div>
            </div>

            <Card className="w-full px-24 py-20 cus-form max-[500px]:px-6 max-[500px]:py-6">
                <CardContent>
                    {/* <h6 className="mb-12">Add Machinery</h6> */}
                    <form className="" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-5 mb-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Claim No.</Label>
                                <Input
                                    value={values?.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label>Customer Name</Label>
                                <Select>
                                    <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                        <SelectValue placeholder="Select Customer Name" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Customer Name</SelectLabel>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">Tax Invoice No</Label>
                                <Input
                                    value={values?.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Invoice Date</Label>
                                <Input
                                    value={values?.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Warranty Status</Label>
                                <Select>
                                    <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                        <SelectValue placeholder="Select Warranty Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Warranty Status</SelectLabel>
                                            <SelectItem value="uw">Under Warranty</SelectItem>
                                            <SelectItem value="ow">Out of Warranty</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="border p-2 rounded-lg mt-8">
                            <Button className="rounded-lg button-col mb-3">
                                <Plus className="mr-1 w-4 h-4" />
                                Add
                            </Button>
                            <div className="grid grid-cols-3 gap-2 mb-2 sm:grid-cols-5">
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Serial No"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Item Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Issue Date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Expiry Date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-2 sm:grid-cols-5">
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Serial No"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Item Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Issue Date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={values?.name}
                                        placeholder="Expiry Date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                </div>
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
