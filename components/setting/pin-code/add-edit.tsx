import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { pinCodeSchema } from '@/types/schemas';
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
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IPINCode } from '@/types/interfaces/pinCode';
import { useAddPINCodeMutation, useEditPINCodeMutation } from '@/features/pinCode/pinCodeAPI';
import ZoneDropdown from '@/components/dropdowns/zone-dropdown';

type props = {
    selectedPINCodes: IPINCode;
    setSelectedPINCodes: Dispatch<SetStateAction<IPINCode>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedPINCodes, setSelectedPINCodes, thisId, isUpdate }: props) => {
    console.log('🚀 ~ AddEditComponent ~ selectedPINCodes:', selectedPINCodes);

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addPINCodes] = useAddPINCodeMutation();
    const [editPINCodes] = useEditPINCodeMutation();

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedPINCodes,
        validationSchema: pinCodeSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedPINCodes(values);

            try {
                let payload: any = {
                    pincode: values.pincode as number,
                    area: values.area as string,
                    district: values.district as string,
                    zoneId: values.zoneId as string,
                };
                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editPINCodes(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 PINCode updated successfully.`);
                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    // let { id, ...rest } = values;
                    let res = await addPINCodes(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();
                        toast.success(`🎉 PINCode added successfully.`);
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
                                        router.push('/setting/pin-code');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    PINCode
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} PINCode</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} PINCode
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
                                <Label htmlFor="pincode">
                                    PIN Code<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="pincode"
                                    type="number"
                                    value={values?.pincode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.pincode && errors.pincode ? (
                                    <small id="pincode-help" className="text-rose-600">
                                        {errors.pincode}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="area">
                                    Area<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="area"
                                    placeholder="Enter area"
                                    value={values?.area}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.area && errors.area ? (
                                    <small id="area-help" className="text-rose-600">
                                        {errors.area}
                                    </small>
                                ) : null}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="district">
                                    District<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="district"
                                    placeholder="Enter district"
                                    value={values?.district}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.district && errors.district ? (
                                    <small id="district-help" className="text-rose-600">
                                        {errors.district}
                                    </small>
                                ) : null}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="zoneId">
                                    Zone<sup className="text-rose-600">*</sup>
                                </Label>
                                <ZoneDropdown onChange={handleChange} zoneId={values?.zoneId} />
                                {touched.zoneId && errors.zoneId ? (
                                    <small id="zoneId-help" className="text-rose-600">
                                        {errors.zoneId}
                                    </small>
                                ) : null}
                                {/* <Select value={values?.zoneId} onValueChange={(e) => setFieldValue('zoneId', e)}>
                                    <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                        <SelectValue placeholder="Select Zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {ddZone?.data
                                                .map((r: any) => ({ zoneName: r.name, value: r.id }))
                                                .map((r) => (
                                                    <SelectItem value={r.value} key={r.value}>
                                                        {r.zoneName}
                                                    </SelectItem>
                                                ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select> */}
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
