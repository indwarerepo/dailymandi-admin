import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { driverAddSchema, driverEditSchema } from '@/types/schemas';
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
import { IDriver } from '@/types/interfaces/driver';
import { useAddDriverMutation, useEditDriverMutation } from '@/features/driver/driverAPI';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useGetZoneDDQuery } from '@/features/zone/zoneAPI';
import MultipleSelector, { Option } from '../ui/multiple-selector';
import { Textarea } from '../ui/textarea';

type props = {
    selectedDrivers: IDriver;
    setSelectedDrivers: Dispatch<SetStateAction<IDriver>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedDrivers, setSelectedDrivers, thisId, isUpdate }: props) => {
    console.log('🚀 ~ AddEditComponent ~ selectedDrivers:', selectedDrivers);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addDrivers] = useAddDriverMutation();
    const [editDrivers] = useEditDriverMutation();
    let [zoneData, setZoneData] = useState<Option[]>([]);
    const { data: ddZone, isLoading: zoneLoading } = useGetZoneDDQuery();
    // console.log('🚀 ~ AddEditComponent ~ ddZone:', ddZone);

    let _zoneList = ddZone?.data?.map((_c) => {
        return { value: `${_c.id}`, label: `${_c.zoneName}` };
    });
    // console.log('🚀 ~ let_zoneList=ddZone?.data?.map ~ _zoneList:', _zoneList);

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: selectedDrivers,
        validationSchema: isUpdate ? driverEditSchema : driverAddSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            setIsLoading(true);
            setSelectedDrivers(values);
            console.log('🚀 ~ onSubmit: ~ values:', values);
            try {
                let _zoneIds = zoneData?.map((zone: any) => zone.value);
                if (_zoneIds.length === 0) {
                    toast.error(`🛑 Please select the zone !!!`);
                    setIsLoading(false);
                    return;
                }

                let payload: any = {
                    name: values.name as string,
                    phone: values.phone.toString(),
                    address: values.address as string,
                    landmark: values.landmark as string,
                    panNo: values.panNo as string,
                    aadharNo: values.aadharNo.toString(),
                    licenseNo: values.licenseNo as string,
                    zoneId: _zoneIds,
                };
                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editDrivers(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 Driver updated successfully.`);
                        router.back();
                    } else {
                        toast.error(`🛑 ${res?.message}`);
                    }
                } else {
                    let newPayload = { ...payload, email: values.email as string, password: values.password as string };

                    let res = await addDrivers(newPayload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        router.back();
                        toast.success(`🎉 Driver added successfully.`);
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

    // useEffect(() => {
    //     if (isUpdate) {
    //         let _statearr = selectedDrivers?.zones?.map((_c: any) => {
    //             return { value: `${_c?.id}`, label: `${_c.zoneName}` };
    //         });
    //         setZoneData(_statearr);
    //     }
    //     console.log('🚀 ~ AddEditComponent ~ isUpdate:', selectedDrivers);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isUpdate]);

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
                                        router.push('/drivers');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Delivery Partners
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{isUpdate ? `Edit` : `Add`} Delivery Partners</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">
                        {' '}
                        {isUpdate ? `Edit` : `Add`} Delivery Partners
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
                                    Driver Name<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="name"
                                    placeholder="Enter Driver Name"
                                    value={values?.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.name && errors.name ? (
                                    <small id="phone-help" className="text-rose-600">
                                        {errors.name}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone">
                                    Phone Number<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="phone"
                                    type="number"
                                    placeholder="Enter Phone Number"
                                    value={values?.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.phone && errors.phone ? (
                                    <small id="phone-help" className="text-rose-600">
                                        {errors.phone}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">
                                    Email <sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    // type="email"
                                    placeholder="Enter Email Id"
                                    value={values?.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isUpdate}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.email && errors.email ? (
                                    <small id="email-help" className="text-rose-600">
                                        {errors.email}
                                    </small>
                                ) : null}
                            </div>
                            {isUpdate ? null : (
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">
                                        Password <sup className="text-rose-600">*</sup>
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        // type="password"
                                        placeholder="Enter Password"
                                        value={values?.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border-borderColor focus:border-borderColor bg-card outline-none"
                                    />
                                    {touched.password && errors.password ? (
                                        <small id="password-help" className="text-rose-600">
                                            {errors.password}
                                        </small>
                                    ) : null}
                                </div>
                            )}

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="zone">
                                    Zone <sup className="text-rose-600">*</sup>
                                </Label>
                                {/* <AnimatedMulti
                                    name="zoneId"
                                    options={zoneId}
                                    selectedvalue={values?.zoneId}
                                    onChange={handleChange}
                                /> */}
                                {/* <ZoneDropdown onChange={handleChange} zoneId={values?.zoneId} /> */}
                                <MultipleSelector
                                    value={zoneData}
                                    onChange={setZoneData}
                                    selectFirstItem={false}
                                    options={_zoneList ? _zoneList : []}
                                    placeholder="Select Zone"
                                    emptyIndicator={
                                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                            no results found.
                                        </p>
                                    }
                                />
                                {/* {touched.zoneId && errors.zoneId ? (
                                    <small id="zoneId-help" className="text-rose-600">
                                        {errors.zoneId}
                                    </small>
                                ) : null} */}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="address">
                                    Address<sup className="text-rose-600">*</sup>
                                </Label>
                                <Textarea
                                    name="address"
                                    placeholder="Enter Address"
                                    value={values?.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.address && errors.address ? (
                                    <small id="address-help" className="text-rose-600">
                                        {errors.address}
                                    </small>
                                ) : null}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="landmark">
                                    Landmark<sup className="text-rose-600">*</sup>
                                </Label>
                                <Textarea
                                    name="landmark"
                                    placeholder="Enter Landmark"
                                    value={values?.landmark}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.landmark && errors.landmark ? (
                                    <small id="landmark-help" className="text-rose-600">
                                        {errors.landmark}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="panNo">
                                    PAN No.<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="panNo"
                                    placeholder="Enter PAN No"
                                    value={values?.panNo}
                                    onChange={(e) => {
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value: e.target.value.toUpperCase(),
                                            },
                                        });
                                    }}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.panNo && errors.panNo ? (
                                    <small id="panNo-help" className="text-rose-600">
                                        {errors.panNo}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="aadharNo">
                                    Aadhaar No.<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="aadharNo"
                                    type="number"
                                    placeholder="Enter Aadhar No"
                                    value={values?.aadharNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.aadharNo && errors.aadharNo ? (
                                    <small id="aadharNo-help" className="text-rose-600">
                                        {errors.aadharNo}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="licenseNo">
                                    License No.<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    name="licenseNo"
                                    placeholder="Enter License No"
                                    value={values?.licenseNo}
                                    onChange={(e) => {
                                        let value = e.target.value.toUpperCase(); // Convert to uppercase
                                        if (value.length === 2 && !value.includes('-')) {
                                            value = value + '-'; // Automatically insert hyphen after first two letters
                                        }
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value,
                                            },
                                        });
                                    }}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.licenseNo && errors.licenseNo ? (
                                    <small id="licenseNo-help" className="text-rose-600">
                                        {errors.licenseNo}
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
