import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Info, Link, Pen, Pencil, Printer, Trash, View, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
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
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner';

// Custom cell component for action column
export const VariantActionCell = ({ id, variantId }: { id: string; variantId: string }) => {
    const router = useRouter();

    return (
        <div className="flex relative gap-3 cursor-pointer items-center justify-center w-full">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Pencil
                            size={18}
                            onClick={() =>
                                router.push({
                                    pathname: '/products/variants',
                                    query: { id, variantId },
                                })
                            }
                        />
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export const VariantColumns: ColumnDef<any>[] = [
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
        id: 'productVariantImage',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Image
                </Button>
            );
        },
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isDialogOpen, setIsDialogOpen] = useState(false);
            return (
                <React.Fragment>
                    {row?.original?.productVariantImage !== null && (
                        <div className="">
                            <Image
                                src={row?.original?.productVariantImage[0] as string}
                                alt="logo"
                                width={45}
                                height={45}
                                className="Product Image"
                                onClick={() => setIsDialogOpen(true)}
                                style={{ cursor: 'pointer' }}
                            />
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <div style={{ display: 'none' }} />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Image Preview</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex justify-center">
                                        <Image
                                            src={row?.original?.productVariantImage[0] as string}
                                            alt="logo"
                                            width={500} // Adjust the size as needed
                                            height={500}
                                            className="rounded-md"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Close
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </React.Fragment>
            );
        },
    },
    {
        accessorKey: 'variantId',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Variant
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row?.original?.variantMaster?.variantName}</div>,
    },
    {
        accessorKey: 'productId',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row?.original?.productCategory?.name}</div>,
    },
    {
        accessorKey: 'skuNo',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    SKU
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('skuNo')}</div>,
    },
    {
        accessorKey: 'qrCode',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    QR Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('qrCode')}</div>,
    },
    {
        accessorKey: 'batchNo',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Batch No
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.original?.variantMaster?.batchNo}</div>,
    },

    {
        accessorKey: 'purchaseCost',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Purchase Cost
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('purchaseCost')}</div>,
    },
    {
        accessorKey: 'mrp',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    MRP
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('mrp')}</div>,
    },
    {
        accessorKey: 'sellingPrice',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Selling Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('sellingPrice')}</div>,
    },
    {
        accessorKey: 'offerPrice',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Offer Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('offerPrice')}</div>,
    },
    {
        accessorKey: 'isReturnable',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Returnable
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const isReturnable = row.getValue('isReturnable');
            return <div className="text-sm">{isReturnable ? 'Yes' : 'No'}</div>;
        },
    },
    {
        accessorKey: 'returnDaysLimit',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Return Days
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('returnDaysLimit')}</div>,
    },

    {
        accessorKey: 'taxId',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    GST
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row?.original?.taxMaster?.slab}</div>,
    },
    {
        accessorKey: 'stock',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('stock')}</div>,
    },

    {
        accessorKey: 'manufacturingDate',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Mfg. Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-sm">
                {row?.original?.variantMaster?.manufacturingDate
                    ? format(new Date(row?.original?.variantMaster?.manufacturingDate), 'dd-MM-yyyy')
                    : ''}
            </div>
        ),
    },
    {
        accessorKey: 'expiryDate',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Exp. Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-sm">
                {row?.original?.variantMaster?.manufacturingDate
                    ? format(new Date(row?.original?.variantMaster?.expiryDate), 'dd-MM-yyyy')
                    : ''}
            </div>
        ),
    },

    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Action
                </Button>
            );
        },
        cell: ({ row }) => {
            const variantId = row?.original?.id ?? '';
            const id = row?.original?.productId ?? '';

            return <VariantActionCell id={id} variantId={variantId} />;
        },
    },
];

const DeleteAlert = ({ id }: { id: string }) => {
    const handleDelete = async (id: string) => {
        toast.success(`🎉 Successfully deleted`);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash className="w-4 h-4 cursor-pointer text-red-700" />
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
