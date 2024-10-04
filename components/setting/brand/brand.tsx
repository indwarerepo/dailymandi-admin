import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
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
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

import { IBrand } from '@/types/interfaces/brand';
import { useDeleteBrandMutation, useEditActiveStatusMutation } from '@/features/brand/brandAPI';

interface CellProps {
    row: any;
}

export const StatusChangeCell: React.FC<CellProps> = ({ row }) => {
    const [statusUpdate] = useEditActiveStatusMutation();

    // console.log(row);
    async function updateStatus(id: string) {
        try {
            let res = await statusUpdate(id).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 Brand Status Successfully Updated.`);
            } else {
                toast.error(`🛑 ${res.message}`);
            }
        } catch (error) {
            toast.error(`Failed to update status`);
        }
    }
    return (
        <React.Fragment>
            <div className="flex justify-start">
                <Switch
                    id="isActive"
                    checked={row.getValue('isActive') === true ? true : false}
                    onClick={() => {
                        updateStatus(row.original.id as string);
                    }}
                />
            </div>
        </React.Fragment>
    );
};

// ActionCell component
export const ActionCell = ({ id }: { id: string }) => {
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
                                    pathname: `/brand/add-edit`,
                                    query: { id },
                                })
                            }
                        />
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <span>|</span>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DeleteAlert id={id} />
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export const BrandColumns: ColumnDef<IBrand>[] = [
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
        cell: ({ row }) => <div className="text-sm justify-start">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'description',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm justify-start">{row.getValue('description')}</div>,
    },
    {
        accessorKey: 'metaTitle',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Meta Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm justify-start">{row.getValue('metaTitle')}</div>,
    },
    {
        accessorKey: 'metaDescription',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Meta Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm justify-start">{row.getValue('metaDescription')}</div>,
    },
    {
        accessorKey: 'isActive',
        header: 'Status',
        cell: StatusChangeCell,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="w-full items-center justify-center pointer-events-none">
                    Action
                </Button>
            );
        },
        cell: ({ row }) => {
            const id = row?.original?.id ?? '';
            return <ActionCell id={id} />;
        },
    },
];

const DeleteAlert = ({ id }: { id: string }) => {
    const [deleteBrand] = useDeleteBrandMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteBrand(id).unwrap();
            toast.success(`🎉 Successfully deleted`);
        } catch (error) {
            toast.error(`Failed to delete Zone`);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash size={18} />
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
