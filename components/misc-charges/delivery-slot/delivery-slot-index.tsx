import { Button } from '@/components/ui/button';
import { BadgePlus, Slash } from 'lucide-react';
import { useRouter } from 'next/router';
import { useDebounce, usePagination, useSorting } from '@/lib/utils';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useState } from 'react';
import React from 'react';
import { Spinner } from '@/components/ui/spinner';
import DataTable from '@/components/ui-lib/data-table';
import { DeliverySlotColumns } from '@/components/misc-charges/misc-charges';
import { IMiscCharges } from '@/types/interfaces/miscCharges';
import { useGetAllDeliverySlotlistQuery, useGetAllMiscChargeslistQuery } from '@/features/miscCharges/miscChargesAPI';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function DeliverySlotIndex({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();
    const { pageIndex, pageSize, onPaginationChange, paginator } = usePagination();
    const { sorting, onSortingChange, field, order } = useSorting();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);
    const { data, isLoading } = useGetAllDeliverySlotlistQuery(
        {
            pageIndex: pageIndex as number,
            pageSize: pageSize as number,
            sortBy: field,
            sortOrder: order,
            filters: debouncedColumnFilters,
        },
        { refetchOnMountOrArgChange: true },
    );
    console.log('🚀 ~ DeliverySlotIndex ~ data:', data);
    const emptyMessage = () => {
        if (isLoading) {
            return <Spinner />;
        } else if (data && data?.count === 0) {
            return renderEmpty();
        }
        return null;
    };

    const renderEmpty = () => {
        return <div>No Delivery Slot Available!!!</div>;
    };

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
                                <BreadcrumbPage>Delivery Slots</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">All Delivery Slots</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        <Button
                            className="py-1 px-3"
                            onClick={() => router.push('/misc-charges/delivery-slot/add-edit')}
                        >
                            <BadgePlus className="mr-2 w-4 h-4" /> New
                        </Button>
                    </div>
                </div>
            </div>
            {/* Breadcrumb and Header End ==================== */}

            {/* Filter and Search Start==================== */}
            <div className="grid grid-cols-12 gap-3 my-3"></div>
            {/* Filter and Search End ==================== */}
            <DataTable
                columns={DeliverySlotColumns}
                data={(data?.data as IMiscCharges[]) || []}
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
