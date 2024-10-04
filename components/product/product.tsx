import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import {
    ArrowUpDown,
    Info,
    Pen,
    Trash,
    BadgeInfo,
    Pencil,
    BadgeIndianRupee,
    Wallet,
    Printer,
    View,
} from 'lucide-react';
import Image from 'next/image';
import CateImg from '@/public/images/category-image.jpg';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import DataTable from '@/components/ui-lib/data-table';
import { TooltipComponent } from '@/components/ui-lib/hover-tooltip';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import { Switch } from '@/components/ui/switch';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { IPaginator } from '@/types/types';
// import {
//     useDeleteProductCategoryMutation,
//     useEditActiveStatusMutation,
// } from '@/features/productCategory/productCategoryAPI';
import { useDeleteProductMutation, useEditActiveStatusMutation } from '@/features/product/productAPI';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { toast } from 'sonner';

interface CellProps {
    row: any;
}

type props = {
    onPaginationChange?: Dispatch<SetStateAction<Pick<IPaginator, 'pageIndex' | 'pageSize'>>>;
    pagination: Pick<IPaginator, 'pageIndex' | 'pageSize'>;
    onSortingChange: any;
    sorting: any;
    columnFilters: ColumnFiltersState;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    count: number;
};

// export const StatusChangeCell: React.FC<CellProps> = ({ row }) => {
//     const [statusUpdateAgent] = useEditActiveStatusMutation();
//     const { toast } = useToast();
//     // console.log(row);
//     async function updateStatus(id: string, currentStatus: boolean) {
//         try {
//             const updatedStatus = !currentStatus;
//             await statusUpdateAgent({ id, isActive: updatedStatus }).unwrap();
//         } catch (error) {
//             toast({
//                 variant: 'error',
//                 title: `Failed to update status`,
//                 duration: 1500,
//             });
//         }
//     }
//     return (
//         <React.Fragment>
//             <div className="flex items-center">
//                 <Switch
//                     id="isActive"
//                     checked={row.getValue('isActive') === true ? true : false}
//                     onClick={() => {
//                         updateStatus(row.original.id as string, row.getValue('isActive'));
//                     }}
//                 />
//             </div>
//         </React.Fragment>
//     );
// };

export function Product({
    pagination,
    onPaginationChange,
    onSortingChange,
    sorting,
    setColumnFilters,
    columnFilters,
    count,
}: props) {
    const router = useRouter();

    const dataList = useAppSelector((state) => state.productSlice.productList);
    console.log('🚀 ~ dataList:', dataList);

    const columns: ColumnDef<any>[] = [
        // {
        //     id: 'check',
        //     header: ({ table }) => (
        //         <Checkbox
        //             className="check ml-2"
        //             checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             className="check"
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-start"
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm">{row.getValue('name')}</div>,
        },

        {
            accessorKey: 'categoryId',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-center"
                    >
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-center">{row?.original?.productCategory?.name}</div>,
        },
        {
            accessorKey: 'specification',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-center"
                    >
                        Specification
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-center">{row.getValue('specification')}</div>,
        },
        {
            accessorKey: 'variantCount',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-center"
                    >
                        Variant
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return (
                    <div className="flex justify-center items-center gap-x-4">
                        <span className="">{row.getValue('variantCount')}</span>{' '}
                        <Popover>
                            <PopoverTrigger>
                                <Info size={18} />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h6>Variant Details</h6>
                                <ul>
                                    <li>
                                        <span className="mr-1">1.</span>India Gate Basmati Rice 500gm
                                    </li>
                                    <li>
                                        <span className="mr-1">2.</span>India Gate Basmati Rice 1kg
                                    </li>
                                    <li>
                                        <span className="mr-1">3.</span>India Gate Basmati Rice 5kg
                                    </li>
                                    <li>
                                        <span className="mr-1">4.</span>India Gate Basmati Rice 10kg
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </div>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-center"
                    >
                        Created Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-center">{row.getValue('createdAt')}</div>,
        },
        // {
        //     accessorKey: 'isActive',
        //     header: ({ column }) => {
        //         return (
        //             <Button
        //                 variant="ghost"
        //                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        //                 className="w-full items-start justify-start"
        //             >
        //                 Status
        //             </Button>
        //         );
        //     },
        //     cell: <></>
        //     // StatusChangeCell,
        // },
        {
            accessorKey: 'id',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full flex items-center justify-center"
                    >
                        Action
                    </Button>
                );
            },
            cell: ({ row }) => {
                // const id = row.original.id ?? '';
                return (
                    <React.Fragment>
                        <div className="flex relative gap-3 cursor-pointer items-center justify-center w-full">
                            {/* <Link
                                className="inline-block"
                                href={{
                                    pathname: '/product-category/add-edit',
                                    query: { id: row.getValue('id') },
                                }}
                            > */}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Pencil
                                            size={18}
                                            onClick={() =>
                                                router.push({
                                                    pathname: `/product/add-edit`,
                                                    query: {
                                                        id: row.getValue('id'),
                                                    },
                                                })
                                            }
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>Edit</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {/* </Link> */}|
                            {/* <Link
                                className="inline-block"
                                href={{
                                    pathname: '',
                                    // query: { id },
                                }}
                            > */}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {/* <Trash size={18} /> */}
                                        <DeleteAlert id={row.getValue('id') as string} />
                                    </TooltipTrigger>
                                    <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {/* </Link> */}
                        </div>
                    </React.Fragment>
                );
            },
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={dataList ? dataList : []}
            hiddenDefaultColumn={{}}
            dataCount={count ? Math.ceil(count / pagination?.pageSize) : 0}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            onSortingChange={onSortingChange}
            sorting={sorting}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            className="shadow-md"
        />
    );
}

const DeleteAlert = ({ id }: { id: string }) => {
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id).unwrap();
            toast.success(`🎉 Successfully deleted`);
        } catch (error) {
            toast.error(`Failed to delete Product`);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash size={18} /*className="w-4 h-4 cursor-pointer text-red-700"*/ />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
