import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
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
    Eye,
} from 'lucide-react';
import DataTable from '@/components/ui-lib/data-table';
import { useDebounce, usePagination, useSorting } from '@/lib/utils';
import { ColumnFiltersState } from '@tanstack/react-table';
import { orderColumns } from '@/components/order/order';
import { Spinner } from '@/components/ui/spinner';
import { useGetAllOrderslistQuery } from '@/features/order/orderApi';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const OrderIndex = () => {
    const router = useRouter();
    const aone_token = getCookie('aone_token');
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);
    if (aone_token) {
        if (userType === 'Driver') {
            router.push('/delivery-dashboard');
        }
    } else {
        router.push('/');
    }
    const { pageIndex, pageSize, onPaginationChange, paginator } = usePagination();
    const { sorting, onSortingChange, field, order } = useSorting();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);

    let { data, isLoading } = useGetAllOrderslistQuery(
        {
            pageIndex: pageIndex as number,
            pageSize: pageSize as number,
            sortBy: field,
            sortOrder: order,
            filters: debouncedColumnFilters,
        },
        { refetchOnMountOrArgChange: true },
    );
    const emptyMessage = () => {
        if (isLoading) {
            return <Spinner />;
        } else if (data && data?.data?.length === 0) {
            return renderEmpty();
        }
        return null;
    };

    const renderEmpty = () => {
        return <div>No Order Available!!!</div>;
    };
    return (
        <>
            {/* Breadcrumb and Header Start==================== */}
            <div className="grid grid-cols-12 gap-3 pb-3">
                <div className="col-span-12 sm:col-span-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="text-[#00A8E1]">
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
                {/* <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" className="py-1 px-3">
                            <Upload className="mr-2 h-4 w-4" /> Export Orders
                        </Button>

                        <div className="relative cursor-pointer">
                            <Button className="py-1 px-3" onClick={() => router.push('/order/order-return')}>
                                <Eye className="mr-2 w-4 h-4" /> Order Return
                            </Button>
                            <Badge
                                variant="destructive"
                                className="absolute -top-3.5 -right-2 p-0 w-[1.2rem] h-[1.2rem] text-xs font-normal text-[#ffff] flex items-center justify-center"
                            >
                                2
                            </Badge>
                        </div>
                    </div>
                </div> */}
            </div>
            {/* Breadcrumb and Header End ==================== */}

            {/* Filter and Search Start==================== */}
            {/* <div className="grid grid-cols-12 gap-3 my-3">
                <div className="col-span-12">
                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" className="py-1 px-3">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                        <div className="relative">
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
            </div> */}
            <DataTable
                columns={orderColumns}
                data={(data?.data as any[]) || []}
                emptyMessage={emptyMessage}
                hiddenDefaultColumn={{}}
                dataCount={data?.count ? Math.ceil(data?.count / paginator?.pageSize) : 0}
                pagination={paginator}
                onPaginationChange={onPaginationChange}
                onSortingChange={onSortingChange}
                sorting={sorting}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                className="shadow-md"
            />
        </>
    );
};
export default OrderIndex;
