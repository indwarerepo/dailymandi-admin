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
import { IPINCode } from '@/types/interfaces/pinCode';
import { useDeletePINCodeMutation, useEditActiveStatusMutation } from '@/features/pinCode/pinCodeAPI';

interface CellProps {
    row: any;
}

export const StatusChangeCell: React.FC<CellProps> = ({ row }) => {
    const [statusUpdateAgent] = useEditActiveStatusMutation();

    // console.log(row);
    async function updateStatus(id: string) {
        try {
            let res = await statusUpdateAgent(id).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 PIN Code Status Successfully Updated.`);
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

export const PincodeColumns: ColumnDef<IPINCode>[] = [
    {
        accessorKey: 'pincode',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    PIN Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm justify-start">{row.getValue('pincode')}</div>,
    },
    {
        accessorKey: 'area',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Area
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm justify-start">{row.getValue('area')}</div>,
    },
    {
        accessorKey: 'district',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    District
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm justify-start">{row.getValue('district')}</div>,
    },

    {
        accessorKey: 'zoneId',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Zone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-start">{row?.original?.zone?.zoneName}</div>,
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
            // const id = row.original._id ?? '';
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            return (
                <React.Fragment>
                    <div className="flex relative gap-3 cursor-pointer items-center justify-center w-full">
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
                                    <Pencil
                                        size={18}
                                        onClick={() =>
                                            router.push({
                                                pathname: `/setting/pin-code/add-edit`,
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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DeleteAlert id={row.getValue('id') as string} />
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </React.Fragment>
            );
        },
    },
];

const DeleteAlert = ({ id }: { id: string }) => {
    const [deletePINCode] = useDeletePINCodeMutation();

    const handleDelete = async (id: string) => {
        try {
            await deletePINCode(id).unwrap();
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
