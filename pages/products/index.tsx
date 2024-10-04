import { ProductColumns } from '@/components/products/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Search, BadgePlus, Filter, ExternalLink, Upload, MonitorUp } from 'lucide-react';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';
import { useDebounce, usePagination, useSorting } from '@/lib/utils';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useRef, useState } from 'react';
import { useGetAllProductListQuery, useProductBulkUploadMutation } from '@/features/product/productAPI';
import DataTable from '@/components/ui-lib/data-table';
import { Product } from '@/types/interfaces/product';
import { toast } from 'sonner';

const ProductIndex = () => {
    const router = useRouter();
    const aone_token = getCookie('aone_token');
    // const authData = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data);
    // if (aone_token) {
    //     const route = authData?.userType === 'Admin' ? '/products' : '/delivery-dashboard';
    //     router.push(route);
    // } else {
    //     router.push('/');
    // }
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);

    if (aone_token) {
        if (userType === 'Driver') {
            router.push('/delivery-dashboard');
        }
    } else {
        router.push('/');
    }
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { pageIndex, pageSize, onPaginationChange, paginator } = usePagination();
    const { sorting, onSortingChange, field, order } = useSorting();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);
    const [excelUploadProduct, { isLoading: excelUploadLoading }] = useProductBulkUploadMutation();
    let { data, isLoading } = useGetAllProductListQuery(
        {
            pageIndex: pageIndex as number,
            pageSize: pageSize as number,
            sortBy: field,
            sortOrder: order,
            filters: debouncedColumnFilters,
        },
        { refetchOnMountOrArgChange: true },
    );
    console.log('🚀 ~ ProductIndex ~ data:', data?.count, paginator.pageSize);
    const emptyMessage = () => {
        if (isLoading) {
            return <Spinner />;
        } else if (data && data?.data?.length === 0) {
            return renderEmpty();
        }
        return null;
    };

    const renderEmpty = () => {
        return <div>No Product Available!!!</div>;
    };

    // Handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log('File selected:', file);
            setSelectedFile(file); // Set file to state
        }
    };

    // Import file
    const onImport = async () => {
        if (!selectedFile) {
            toast.error('🛑 No file selected!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile); // Ensure the file is added to formData

        try {
            const res = await excelUploadProduct(formData).unwrap();
            if (res.statusCode === 200 || res.statusCode === 201) {
                toast.success(`🎉 ${res?.message}`);
            } else {
                toast.error(`🛑 ${res?.message}`);
            }
        } catch (error: any) {
            toast.error(`🛑 ${error?.data?.message}`);
        } finally {
            onCancel();
        }
    };

    // Cancel and reset input
    const onCancel = () => {
        setSelectedFile(null); // Clear selected file
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear file input
        }
    };

    return (
        <>
            {/* Breadcrumb and Header Start==================== */}
            <div className="grid grid-cols-12 gap-3">
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
                                <BreadcrumbPage>Products</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">All Products</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        {/*<Button variant="outline" className="py-1 px-3">
                            <Upload className="mr-2 h-4 w-4" /> Export
                        </Button>*/}
                        <Popover>
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
                                            <Label htmlFor="excelUpload"></Label>
                                            <Input
                                                id="excelUpload"
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".xlsx, .xls, .csv"
                                                onChange={handleFileChange}
                                            />
                                            <Button onClick={onImport} disabled={excelUploadLoading || !selectedFile}>
                                                <Upload className="mr-2 h-4 w-4" /> Upload
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button onClick={() => router.push('/products/add-product')} className="py-1 px-3">
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
                        {/* <Button variant="ghost" className="py-1 px-3">
                            <ExternalLink className="mr-2 h-4 w-4" /> Export
                        </Button> */}
                        {/* <Button variant="ghost" className="py-1 px-3">
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
                        </div> */}
                    </div>
                </div>
            </div>
            {/* Filter and Search End ==================== */}
            <DataTable
                columns={ProductColumns}
                data={(data?.data as Product[]) || []}
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
export default ProductIndex;
