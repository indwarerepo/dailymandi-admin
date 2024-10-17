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
import { IVariant } from '@/types/interfaces/variant';
import { useDeleteVariantMutation, useEditActiveStatusMutation } from '@/features/variant/variantAPI';

interface CellProps {
    row: any;
}

export const StatusChangeCell: React.FC<CellProps> = ({ row }) => {
    const [statusUpdateAgent] = useEditActiveStatusMutation();

    async function updateStatus(id: string) {
        try {
            let res = await statusUpdateAgent(id).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 Variant Status Successfully Updated.`);
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

export const VariantColumns: ColumnDef<IVariant>[] = [
    {
        accessorKey: 'variantName',
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
        cell: ({ row }) => <div className="text-sm ">{row.getValue('variantName')}</div>,
    },
    // {
    //     accessorKey: 'description',
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //                 className="w-full items-start justify-center"
    //             >
    //                 Description
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         );
    //     },
    //     cell: ({ row }) => <div className="text-sm text-center">{row.getValue('description')}</div>,
    // },
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
        // header: 'Action',
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
                                                pathname: `/variant/add-edit`,
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
    const [deleteVariant] = useDeleteVariantMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteVariant(id).unwrap();
            toast.success(`🎉 Successfully deleted`);
        } catch (error) {
            toast.error(`Failed to delete Variant`);
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
