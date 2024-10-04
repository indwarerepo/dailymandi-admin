import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Separator } from '../ui/separator';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useToast } from '@/components/ui/use-toast';
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
import { ColumnDef, ColumnFiltersState, OnChangeFn, PaginationState, SortingState } from '@tanstack/react-table';
import { ArrowUpDown, Trash, Pencil } from 'lucide-react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ICustomer, RCustomerAddressDetails, RTransactionDetails, RKYCDetails } from '@/types/interfaces/customer';
import { useAppSelector } from '@/store/hooks';
import DataTable from '@/components/ui-lib/data-table';
import { IncentiveColumns } from './incentive';

interface DetailProps {
    AddressList: RCustomerAddressDetails[];
    KYCAccountDetails: RKYCDetails;
    TransactionsDetails: RTransactionDetails[];
    paginator: any; // Define paginator props type
    // onPaginationChange: (page: number) => void;
    onPaginationChange: OnChangeFn<PaginationState>;
    sorting: SortingState; // Define sorting type
    onSortingChange: (sort: SortingState) => void;
    columnFilters: ColumnFiltersState;
    setColumnFilters: (filters: ColumnFiltersState) => void;
    dataCount: number;
    emptyMessage: () => JSX.Element | null;
}

const ViewCustomer: React.FC<DetailProps> = ({
    AddressList,
    KYCAccountDetails,
    TransactionsDetails,
    paginator,
    onPaginationChange,
    sorting,
    onSortingChange,
    columnFilters,
    setColumnFilters,
    dataCount,
    emptyMessage,
}: DetailProps) => {
    const router = useRouter();
    console.log('🚀 ~ ViewCustomer ~ AddressList:', AddressList);

    const groupedAddresses = AddressList.reduce((acc, address) => {
        const title = address?.addressTitle || 'Unknown';
        if (!acc[title]) {
            acc[title] = [];
        }
        acc[title].push(address);
        return acc;
    }, {} as { [key: string]: RCustomerAddressDetails[] });

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
                                        router.push('/customer');
                                    }}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Customer
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium"> Customer Detail</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        <Button variant="outline" onClick={() => router.push('/customer')} className="py-1 px-3">
                            <CornerUpLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
            </div>
            {/* Breadcrumb and Header End ==================== */}

            <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                <CardContent>
                    <Tabs defaultValue="address" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="address">Address</TabsTrigger>
                            <TabsTrigger value="account-detail">Acount Detail</TabsTrigger>
                            <TabsTrigger value="wallet">Wallet</TabsTrigger>
                            <TabsTrigger value="incentive">Incentive</TabsTrigger>
                        </TabsList>
                        <TabsContent value="address">
                            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                                {Object.keys(groupedAddresses).map((addressTitle, index) => {
                                    const formattedTitle = addressTitle.charAt(0).toUpperCase() + addressTitle.slice(1);
                                    return (
                                        // eslint-disable-next-line react/jsx-key
                                        <AccordionItem key={index} value={`item-${index}`}>
                                            <AccordionTrigger>{formattedTitle}</AccordionTrigger>
                                            <AccordionContent>
                                                <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                                                    <CardContent>
                                                        <div className="grid grid-cols-1 md:grid-cols-1 w-full items-center gap-5 mb-5">
                                                            {groupedAddresses[addressTitle].map((address, idx) => (
                                                                // <div key={idx}>
                                                                <>
                                                                    <div className="flex flex-col space-y-1.5">
                                                                        <Label htmlFor="name">
                                                                            Customer Name:{' '}
                                                                            {`${
                                                                                address?.firstName
                                                                                    ? address?.firstName
                                                                                    : 'N/A'
                                                                            } ${
                                                                                address?.lastName
                                                                                    ? address?.lastName
                                                                                    : 'N/A'
                                                                            }`}
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1.5">
                                                                        <Label htmlFor="address">
                                                                            Address:
                                                                            {` ${
                                                                                address?.addressOne
                                                                                    ? address?.addressOne
                                                                                    : 'N/A'
                                                                            }, ${
                                                                                address?.addressTwo
                                                                                    ? address?.addressTwo
                                                                                    : 'N/A'
                                                                            }`}
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1.5">
                                                                        <Label htmlFor="city">
                                                                            City:{' '}
                                                                            {address?.city ? address?.city : 'N/A'}
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1.5">
                                                                        <Label htmlFor="state">
                                                                            State:{' '}
                                                                            {address?.state ? address?.state : 'N/A'}
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1.5">
                                                                        <Label htmlFor="country">
                                                                            Country:{' '}
                                                                            {address?.country
                                                                                ? address?.country
                                                                                : 'N/A'}
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1.5">
                                                                        <Label htmlFor="pincode">
                                                                            Pincode:{' '}
                                                                            {address?.pincode?.pincode
                                                                                ? address?.pincode?.pincode
                                                                                : 'N/A'}
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1.5">
                                                                        <Label htmlFor="phoneNo">
                                                                            Phone:{' '}
                                                                            {address?.phone ? address?.phone : 'N/A'}
                                                                        </Label>
                                                                    </div>
                                                                    {/* <div className="flex flex-col space-y-1.5">
                                                                <Label htmlFor="landmark">
                                                                    Landmark: {address?.addressTitle}
                                                                </Label>
                                                            </div> */}
                                                                    {/* </div> */}
                                                                </>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </TabsContent>
                        <TabsContent value="account-detail">
                            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Bank Detail</AccordionTrigger>
                                    <AccordionContent>
                                        <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-1 w-full items-center gap-5 mb-5">
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="bankName">
                                                            Bank Name:{' '}
                                                            {KYCAccountDetails?.bankName
                                                                ? KYCAccountDetails?.bankName
                                                                : 'N/A'}{' '}
                                                        </Label>
                                                    </div>

                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="branchName">
                                                            Branch Name:{' '}
                                                            {KYCAccountDetails?.bankBranch
                                                                ? KYCAccountDetails?.bankBranch
                                                                : 'N/A'}
                                                        </Label>
                                                    </div>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="ifscCode">
                                                            IFSC Code:{' '}
                                                            {KYCAccountDetails?.ifscCode
                                                                ? KYCAccountDetails?.ifscCode
                                                                : 'N/A'}
                                                        </Label>
                                                    </div>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="acHoldName">
                                                            Account Holder Name:{' '}
                                                            {KYCAccountDetails?.name ? KYCAccountDetails?.name : 'N/A'}
                                                        </Label>
                                                    </div>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="accountNo">
                                                            Account Number:{' '}
                                                            {KYCAccountDetails?.accountNumber
                                                                ? KYCAccountDetails?.accountNumber
                                                                : 'N/A'}
                                                        </Label>
                                                    </div>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="upiAccount">
                                                            UPI Account:{' '}
                                                            {KYCAccountDetails?.upiId
                                                                ? KYCAccountDetails?.upiId
                                                                : 'N/A'}
                                                        </Label>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>KYC Detail</AccordionTrigger>
                                    <AccordionContent>
                                        <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-1 w-full items-center gap-5 mb-5">
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="panNo">
                                                            PAN:{' '}
                                                            {KYCAccountDetails?.panNumber
                                                                ? KYCAccountDetails?.panNumber
                                                                : 'N/A'}
                                                        </Label>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Contact Information</AccordionTrigger>
                                    <AccordionContent>
                                        <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-1 w-full items-center gap-5 mb-5">
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="name">
                                                            Name:{' '}
                                                            {KYCAccountDetails?.name ? KYCAccountDetails?.name : 'N/A'}
                                                        </Label>
                                                    </div>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="email">
                                                            Email:{' '}
                                                            {KYCAccountDetails?.email
                                                                ? KYCAccountDetails?.email
                                                                : 'N/A'}
                                                        </Label>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </TabsContent>
                        <TabsContent value="wallet">
                            <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-1 w-full items-center gap-5 mb-5">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="walletBalance">
                                                Wallet Balance:{' '}
                                                {KYCAccountDetails?.walletAmount
                                                    ? KYCAccountDetails?.walletAmount
                                                    : 'N/A'}
                                            </Label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="incentive">
                            <DataTable
                                columns={IncentiveColumns}
                                data={TransactionsDetails}
                                dataCount={dataCount}
                                pagination={paginator}
                                onPaginationChange={onPaginationChange}
                                sorting={sorting}
                                onSortingChange={onSortingChange}
                                columnFilters={columnFilters}
                                setColumnFilters={setColumnFilters}
                                emptyMessage={emptyMessage}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default ViewCustomer;
