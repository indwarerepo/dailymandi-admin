import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pen, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import DataTable from '@/components/ui-lib/data-table';
import { TooltipComponent } from '@/components/ui-lib/hover-tooltip';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import { PermissionData } from '@/types/interfaces/permission';
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
import React from 'react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { toast } from 'sonner';

export function Offers() {
    const router = useRouter();
    const permissionList: any = [
        {
            id: 1,
            name: 'Summer Discount',
            depreciation: 'A sale that brings joy',
            discountAmount: '25%',
            discountRenge: ' Minimum order ₹199	',
        },
        {
            id: 2,
            name: 'Winter Discount',
            depreciation: 'A sale that brings joy',
            discountAmount: '35%',
            discountRenge: ' Minimum order ₹499	',
        },
    ];
    const columns: ColumnDef<PermissionData>[] = [
        // {
        //   id: "check",
        //   header: ({ table }) => (
        //     <Checkbox
        //       className="check ml-2"
        //       checked={
        //         table.getIsAllPageRowsSelected() ||
        //         (table.getIsSomePageRowsSelected() && "indeterminate")
        //       }
        //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //       aria-label="Select all"
        //     />
        //   ),
        //   cell: ({ row }) => (
        //     <Checkbox
        //       className="check"
        //       checked={row.getIsSelected()}
        //       onCheckedChange={(value) => row.toggleSelected(!!value)}
        //       aria-label="Select row"
        //     />
        //   ),
        //   enableSorting: false,
        //   enableHiding: false,
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
            accessorKey: 'depreciation',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-start justify-start"
                    >
                        Depreciation
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-start">{row.getValue('depreciation')}</div>,
        },

        {
            accessorKey: 'discountAmount',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-center"
                    >
                        Discount Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-center">{row.getValue('discountAmount')}</div>,
        },
        {
            accessorKey: 'discountRenge',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-start justify-start"
                    >
                        Discount Renge
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-start">{row.getValue('discountRenge')}</div>,
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-start justify-start"
                    >
                        Status
                    </Button>
                );
            },
            cell: ({ row }) => {
                return (
                    <React.Fragment>
                        <div className="flex items-center">
                            <Switch id="active-status" />
                        </div>
                    </React.Fragment>
                );
            },
        },
        {
            accessorKey: 'action',
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
                // const id = row.original._id ?? '';
                return (
                    <React.Fragment>
                        <div className="flex relative gap-3 cursor-pointer items-center justify-center w-full">
                            <Link
                                className="inline-block"
                                href={{
                                    pathname: '',
                                    // query: { id },
                                }}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Pencil size={18} />
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Link>
                            |
                            <Link
                                className="inline-block"
                                href={{
                                    pathname: '',
                                    // query: { id },
                                }}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Trash size={18} />
                                        </TooltipTrigger>
                                        <TooltipContent>Delete</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Link>
                        </div>
                    </React.Fragment>
                );
            },
        },
    ];

    return <DataTable columns={columns} data={permissionList} className="shadow-md" />;
}

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
