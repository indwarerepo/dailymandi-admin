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
import { Dispatch, SetStateAction, useState } from 'react';
import { IMiscCharges } from '@/types/interfaces/miscCharges';
import { useEditMiscChargesMutation } from '@/features/miscCharges/miscChargesAPI';
import { miscChargesSchema } from '@/types/schemas';

type props = {
    selectedMiscChargess: IMiscCharges;
    setSelectedMiscChargess: Dispatch<SetStateAction<IMiscCharges>>;
    thisId: string;
    isUpdate: boolean;
};

const AddEditComponent = ({ selectedMiscChargess, setSelectedMiscChargess, thisId, isUpdate }: props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editMiscChargess] = useEditMiscChargesMutation();

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: selectedMiscChargess,
        validationSchema: miscChargesSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            setSelectedMiscChargess(values);

            try {
                let payload: any = {
                    defaultDiscountRate: values.defaultDiscountRate as number,
                    specialDiscountRate: values.specialDiscountRate as number,
                    defaultTaxRate: values.defaultTaxRate as number,
                    specialTaxRate: values.specialTaxRate as number,
                    defaultDeliveryCharge: values.defaultDeliveryCharge as number,
                    specialDeliveryRate: values.specialDeliveryRate as number,
                    welcomeWalletAmt: values.welcomeWalletAmt as number,
                    walletDeductionRateOnOrder: values.walletDeductionRateOnOrder as number,
                    orderReturnCommRateOA: values.orderReturnCommRateOA as number,
                    orderReturnCommRateNOA: values.orderReturnCommRateNOA as number,
                    refByAddCommRate: values.refByAddCommRate as number,
                };

                if (isUpdate) {
                    payload.id = thisId;
                    let res = await editMiscChargess(payload).unwrap();
                    if (res.statusCode === 201) {
                        action.resetForm();
                        toast.success(`🎉 Misc Charges updated successfully.`);
                        router.back();
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
    // console.log('🚀 ~ Addedit ~ values:', values);

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
                                        router.push('/misc-charges');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Misc Charges
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit Misc Charges</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium"> Edit Misc Charges</h2>
                </div>
            </div>

            <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                {/* <CardContent> */}
                {/* <h6 className="mb-12">Add Process</h6> */}{' '}
                <form className="grid w-full items-center" onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-7 mb-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="defaultDiscountRate">Default Discount Rate</Label>
                                <Input
                                    name="defaultDiscountRate"
                                    type="number"
                                    placeholder="Enter Default Discount Rate"
                                    value={values?.defaultDiscountRate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.defaultDiscountRate && errors.defaultDiscountRate ? (
                                    <small id="defaultDiscountRate-help" className="text-rose-600">
                                        {errors.defaultDiscountRate}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="specialDiscountRate">Special Discount Rate</Label>
                                <Input
                                    name="specialDiscountRate"
                                    type="number"
                                    placeholder="Enter Special Discount Rate"
                                    value={values?.specialDiscountRate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.specialDiscountRate && errors.specialDiscountRate ? (
                                    <small id="specialDiscountRate-help" className="text-rose-600">
                                        {errors.specialDiscountRate}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="defaultTaxRate">Default Tax Rate</Label>
                                <Input
                                    name="defaultTaxRate"
                                    type="number"
                                    placeholder="Enter Default Tax Rate"
                                    value={values?.defaultTaxRate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.defaultTaxRate && errors.defaultTaxRate ? (
                                    <small id="defaultTaxRate-help" className="text-rose-600">
                                        {errors.defaultTaxRate}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="specialTaxRate">Special Tax Rate</Label>
                                <Input
                                    name="specialTaxRate"
                                    type="number"
                                    placeholder="Enter Special Tax Rate"
                                    value={values?.specialTaxRate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.specialTaxRate && errors.specialTaxRate ? (
                                    <small id="specialTaxRate-help" className="text-rose-600">
                                        {errors.specialTaxRate}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="defaultDeliveryCharge">Default Delivery Rate</Label>
                                <Input
                                    name="defaultDeliveryCharge"
                                    type="number"
                                    placeholder="Enter Default Delivery Rate"
                                    value={values?.defaultDeliveryCharge}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.defaultDeliveryCharge && errors.defaultDeliveryCharge ? (
                                    <small id="defaultDeliveryCharge-help" className="text-rose-600">
                                        {errors.defaultDeliveryCharge}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="specialDeliveryRate">Special Delivery Rate</Label>
                                <Input
                                    name="specialDeliveryRate"
                                    type="number"
                                    placeholder="Enter Special Delivery Rate"
                                    value={values?.specialDeliveryRate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.specialDeliveryRate && errors.specialDeliveryRate ? (
                                    <small id="specialDeliveryRate-help" className="text-rose-600">
                                        {errors.specialDeliveryRate}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="welcomeWalletAmt">Welcome Wallet Amount</Label>
                                <Input
                                    name="welcomeWalletAmt"
                                    type="number"
                                    placeholder="Enter Welcome Wallet Amount"
                                    value={values?.welcomeWalletAmt}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.welcomeWalletAmt && errors.welcomeWalletAmt ? (
                                    <small id="welcomeWalletAmt-help" className="text-rose-600">
                                        {errors.welcomeWalletAmt}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="walletDeductionRateOnOrder">Wallet Deduction Rate On Order</Label>
                                <Input
                                    name="walletDeductionRateOnOrder"
                                    type="number"
                                    placeholder="Enter Wallet Deduction Rate On Order"
                                    value={values?.walletDeductionRateOnOrder}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.walletDeductionRateOnOrder && errors.walletDeductionRateOnOrder ? (
                                    <small id="walletDeductionRateOnOrder-help" className="text-rose-600">
                                        {errors.walletDeductionRateOnOrder}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="orderReturnCommRateOA">Order Return Commission Rate Order Amount</Label>
                                <Input
                                    name="orderReturnCommRateOA"
                                    type="number"
                                    placeholder="Enter Order Return Commission Rate Order Amount"
                                    value={values?.orderReturnCommRateOA}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.orderReturnCommRateOA && errors.orderReturnCommRateOA ? (
                                    <small id="orderReturnCommRateOA-help" className="text-rose-600">
                                        {errors.orderReturnCommRateOA}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="orderReturnCommRateNOA">
                                    Order Return Commission Rate Net Order Amount
                                </Label>
                                <Input
                                    name="orderReturnCommRateNOA"
                                    type="number"
                                    placeholder="Enter Order Return Commission Rate Net Order Amount"
                                    value={values?.orderReturnCommRateNOA}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.orderReturnCommRateNOA && errors.orderReturnCommRateNOA ? (
                                    <small id="orderReturnCommRateNOA-help" className="text-rose-600">
                                        {errors.orderReturnCommRateNOA}
                                    </small>
                                ) : null}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="refByAddCommRate">Referred By Add Commission Rate</Label>
                                <Input
                                    name="refByAddCommRate"
                                    type="number"
                                    placeholder="Enter Referred By Add Commission Rate"
                                    value={values?.refByAddCommRate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {touched.refByAddCommRate && errors.refByAddCommRate ? (
                                    <small id="refByAddCommRate-help" className="text-rose-600">
                                        {errors.refByAddCommRate}
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
