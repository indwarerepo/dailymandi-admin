import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, BadgePlus, Filter } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { useRouter } from 'next/router';
import { useDebounce, usePagination, useSorting } from '@/lib/utils';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Spinner } from '@/components/ui/spinner';
import DataTable from '@/components/ui-lib/data-table';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';
import { IOrderDelivery } from '@/types/interfaces/delivery-order';
import { OrderDeliveryColumns } from '@/components/delivery-order/delivery-order';
import { useGetAllOrderDeliverylistQuery } from '@/features/order-delivery/order-delivery-api';
// import { IOrderDelivery } from '@/types/interfaces/order';
// import { OrderColumns } from '@/components/order/order';
// import { useGetAllOrderlistQuery } from '@/features/order/orderAPI';

export default function OrderIndex({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();
    const aone_token = getCookie('aone_token');
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);
    if (aone_token) {
        if (userType === 'Admin') {
            router.push('/dashboard');
        }
    } else {
        router.push('/');
    }
    const { pageIndex, pageSize, onPaginationChange, paginator } = usePagination();
    const { sorting, onSortingChange, field, order } = useSorting();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);
    const { data, isLoading } = useGetAllOrderDeliverylistQuery(
        {
            pageIndex: pageIndex as number,
            pageSize: pageSize as number,
            sortBy: field,
            sortOrder: order,
            filters: debouncedColumnFilters,
        },
        { refetchOnMountOrArgChange: true },
    );
    console.log('🚀 ~ OrderIndex ~ data:', data);
    const emptyMessage = () => {
        if (isLoading) {
            return <Spinner />;
        } else if (data && data?.count === 0) {
            return renderEmpty();
        }
        return null;
    };

    const renderEmpty = () => {
        return <div>No Orders Available!!!</div>;
    };

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    });
    return (
        <>
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
                                <BreadcrumbPage>Orders</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">All Orders</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        {/* <Button variant="outline" className="py-1 px-3">
                            <MonitorUp className="mr-2 h-4 w-4" /> Import PIN Code
                        </Button> */}
                        {/* <Button className="py-1 px-3" onClick={() => router.push('/setting/pinCode')}>
                            <BadgePlus className="mr-2 w-4 h-4" /> New PIN Code
                        </Button> */}
                        {/* <Button className="py-1 px-3" onClick={() => router.push('/cms/add-edit')}>
                            <BadgePlus className="mr-2 w-4 h-4" /> New CMS
                        </Button> */}
                    </div>
                </div>
            </div>
            {/* Breadcrumb and Header End ==================== */}

            {/* Filter and Search Start==================== */}
            <div className="grid grid-cols-12 gap-3 my-3">
                <div className="col-span-12">
                    <div className="flex justify-end gap-4">
                        {/* <Button variant="ghost" className="py-1 px-3">
                            <ExternalLink className="mr-2 h-4 w-4" /> Export
                        </Button> */}
                        {/* <Button variant="ghost" className="py-1 px-3">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button> */}
                        <div className="relative">
                            {/* <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" className="py-1 px-3">
                                        <Filter className="mr-2 h-4 w-4" /> Filter
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h6 className="font-medium leading-none">Please select a date</h6>
                                            <div className="flex w-full max-w-sm items-center space-x-2">
                                                <div className={cn('grid gap-2', className)}>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                id="date"
                                                                variant={'outline'}
                                                                className={cn(
                                                                    'w-[300px] justify-start text-left font-normal',
                                                                    !date && 'text-muted-foreground',
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {date?.from ? (
                                                                    date.to ? (
                                                                        <>
                                                                            {format(date.from, 'LLL dd, y')} -{' '}
                                                                            {format(date.to, 'LLL dd, y')}
                                                                        </>
                                                                    ) : (
                                                                        format(date.from, 'LLL dd, y')
                                                                    )
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                initialFocus
                                                                mode="range"
                                                                defaultMonth={date?.from}
                                                                selected={date}
                                                                onSelect={setDate}
                                                                numberOfMonths={2}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>

                                                <Button type="submit">Search</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <Label htmlFor="search"></Label>
                            <Input
                                id="search"
                                placeholder="Search..."
                                className="border-borderColor focus:border-borderColor bg-card outline-none py-1 px-3"
                            /> */}
                            <div className="absolute top-3 right-2  max-[500px]:hidden">
                                {/* <Search className="mr-2 w-4 h-4" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Filter and Search End ==================== */}
            <DataTable
                columns={OrderDeliveryColumns}
                data={(data?.data as IOrderDelivery[]) || []}
                emptyMessage={emptyMessage}
                hiddenDefaultColumn={{}}
                dataCount={data?.count ? Math.ceil(data?.count / paginator?.pageSize) : 0}
                pagination={paginator}
                onPaginationChange={onPaginationChange}
                onSortingChange={onSortingChange}
                sorting={sorting}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
        </>
    );
}
