import { Product } from '@/components/product/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    ChevronLeft,
    FileDown,
    FileUp,
    Plus,
    Search,
    BadgePlus,
    Filter,
    ExternalLink,
    ArrowDown,
    Upload,
    MonitorUp,
} from 'lucide-react';
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
import { useGetAllProductListQuery } from '@/features/product/productAPI';

export default function ProductIndex({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();
    const { pageIndex, pageSize, onPaginationChange, paginator } = usePagination();
    const { sorting, onSortingChange, field, order } = useSorting();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);
    const { data, refetch } = useGetAllProductListQuery(
        {
            pageIndex: pageIndex as number,
            pageSize: pageSize as number,
            sortBy: field,
            sortOrder: order,
            filters: debouncedColumnFilters,
        },
        { refetchOnMountOrArgChange: true },
    );

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
                                <BreadcrumbPage>Product</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">All Product</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        {/* <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="py-1 px-3">
                                    <MonitorUp className="mr-2 h-4 w-4" /> Import
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h6 className="font-medium leading-none">Please select an excel file</h6>
                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                            <Label htmlFor="picture"></Label>
                                            <Input id="picture" type="file" />
                                            <Button type="submit">Upload</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover> */}

                        <Button className="py-1 px-3" onClick={() => router.push('/product/add-edit')}>
                            <BadgePlus className="mr-2 w-4 h-4" /> New
                        </Button>
                    </div>
                </div>
            </div>
            {/* Breadcrumb and Header End ==================== */}

            {/* Filter and Search Start==================== */}
            <div className="grid grid-cols-12 gap-3 my-3">
                <div className="col-span-12">
                    <div className="flex justify-end gap-4">
                        <div className="relative">
                            <Popover>
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
                            />
                            <div className="absolute top-3 right-2  max-[500px]:hidden">
                                <Search className="mr-2 w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Filter and Search End ==================== */}
            <Product
                pagination={paginator}
                onPaginationChange={onPaginationChange}
                onSortingChange={onSortingChange}
                count={data?.count || 0}
                sorting={sorting}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
        </>
    );
}
