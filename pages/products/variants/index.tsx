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
    CornerUpLeft,
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { constants } from 'buffer';
import { Spinner } from '@/components/ui/spinner';
import { useDebounce, usePagination, useSorting } from '@/lib/utils';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useGetVariantListByProductIdQuery, useGetVariantProductByIdQuery } from '@/features/product/productAPI';
import DataTable from '@/components/ui-lib/data-table';
import { VariantColumns } from '@/components/p-variants/products-variant';
import { ProductVariant } from '@/types/interfaces/product';
import AddEditVariantComponent from '@/components/p-variants/add-edit';
import moment from 'moment';

const initialVariants = {
    variantId: '',
    skuNo: '',
    qrCode: '',
    purchaseCost: 0,
    mrp: 0,
    sellingPrice: 0,
    offerPrice: 0,
    taxId: '',
    stock: 0,
    isReturnable: false,
    returnDaysLimit: 0,
    batchNo: '',
    remarks: '',
    manufacturingDate: new Date(),
    expiryDate: new Date(),
    productVariantImage: [],
};

const VariantIndex = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { variantId } = router.query as { variantId: string };
    const [productVariants, setProductVariants] = useState<ProductVariant>(initialVariants);
    const { pageIndex, pageSize, onPaginationChange, paginator } = usePagination();
    const { sorting, onSortingChange, field, order } = useSorting();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
        // { id: 'productId', value: '65fd3ca715ac503fc03e0665' },
    ]);
    const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);
    const { data: productVariantData } = useGetVariantProductByIdQuery(variantId, { skip: !variantId });
    console.log('🚀 ~ VariantIndex ~ productVariantData:', productVariantData);
    let { data, isLoading } = useGetVariantListByProductIdQuery(
        {
            id: router?.query?.id as string,
            pageIndex: pageIndex as number,
            pageSize: pageSize as number,
            sortBy: field,
            sortOrder: order,
            filters: debouncedColumnFilters,
        },
        { refetchOnMountOrArgChange: true },
    );
    useEffect(() => {
        if (productVariantData) {
            setProductVariants({
                variantId: productVariantData?.data?.variantId ?? '',
                skuNo: productVariantData?.data?.skuNo ?? '',
                qrCode: productVariantData?.data?.qrCode ?? '',
                purchaseCost: productVariantData?.data?.purchaseCost ?? 0,
                mrp: productVariantData?.data?.mrp ?? 0,
                sellingPrice: productVariantData?.data?.sellingPrice ?? 0,
                offerPrice: productVariantData?.data?.offerPrice ?? 0,
                taxId: productVariantData?.data?.taxId ?? '',
                stock: productVariantData?.data?.stock ?? 0,
                isReturnable: productVariantData?.data?.isReturnable ?? false,
                returnDaysLimit: productVariantData?.data?.returnDaysLimit ?? 0,
                batchNo: productVariantData?.data?.batchNo ?? '',
                remarks: productVariantData?.data?.remarks ?? '',

                productVariantImage: [],
                // ...productVariantData?.data,
                manufacturingDate: productVariantData?.data?.manufacturingDate
                    ? new Date(moment(productVariantData?.data?.manufacturingDate).format())
                    : new Date(),
                expiryDate: productVariantData?.data?.expiryDate
                    ? new Date(moment(productVariantData?.data?.expiryDate).format())
                    : new Date(),
                //     description: selectedPermissions?.description,
            });
            // setProductVariants(productVariantData?.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productVariantData, variantId]);
    const emptyMessage = () => {
        if (isLoading) {
            return <Spinner />;
        } else if (data && data?.data?.length === 0) {
            return renderEmpty();
        }
        return null;
    };

    const renderEmpty = () => {
        return <div>No Variant Available!!!</div>;
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
                                <BreadcrumbPage
                                    onClick={() => router.push('/products')}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Product
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Variant</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">All Variant</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        <Button variant="outline" onClick={() => router.push('/products')} className="py-1 px-3">
                            <CornerUpLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
                {/* <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="py-1 px-3">
                            <Upload className="mr-2 h-4 w-4" /> Export
                        </Button>
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
                                            <Label htmlFor="picture"></Label>
                                            <Input id="picture" type="file" />
                                            <Button type="submit">
                                                {' '}
                                                <Upload className="mr-2 h-4 w-4" /> Upload
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button className="py-1 px-3" onClick={() => router.push('/products/variants/add-edit')}>
                            <BadgePlus className="mr-2 w-4 h-4" /> New Variant
                        </Button>
                    </div>
                </div> */}
            </div>
            {/* Breadcrumb and Header End ==================== */}

            {/* Filter and Search Start==================== */}
            {/* <div className="grid grid-cols-12 gap-3 my-3">
                <div className="col-span-12">
                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" className="py-1 px-3">
                            <ExternalLink className="mr-2 h-4 w-4" /> Export
                        </Button>
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
            {/* Filter and Search End ==================== */}
            {/* <Variants /> */}
            {/* 
            <AddEditVariantComponent
                selectedVariants={productVariants}
                //  productId={id as string}
                //  isUpdate={id ? true : false}
            /> */}

            <AddEditVariantComponent
                isUpdate={variantId ? true : false}
                selectedVariants={productVariants}
                variantId={variantId as string}
                productId={id as string}
            />

            <DataTable
                columns={VariantColumns}
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

export default VariantIndex;
