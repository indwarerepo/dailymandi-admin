import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash, Pencil } from 'lucide-react';
import Image from 'next/image';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import React, { useState } from 'react';

import {
    useDeleteProductCategoryMutation,
    useEditActiveStatusMutation,
} from '@/features/productCategory/productCategoryAPI';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProductCategory } from '@/types/interfaces/productCategory';

interface CellProps {
    row: any;
}

export const StatusChangeCell: React.FC<CellProps> = ({ row }) => {
    const [statusUpdateAgent] = useEditActiveStatusMutation();

    async function updateStatus(id: string) {
        try {
            let res = await statusUpdateAgent(id).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 Category Status Successfully Updated.`);
            } else {
                toast.error(`🛑 ${res.message}`);
            }
        } catch (error) {
            toast.error(`Failed to update status`);
        }
    }
    return (
        <React.Fragment>
            <div className="flex items-center">
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

export const CategoryColumns: ColumnDef<ProductCategory>[] = [
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
        accessorKey: 'displayOrder',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Display Order
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-center">{row.getValue('displayOrder')}</div>,
    },
    {
        accessorKey: 'coverImage',
        // header: ({ column }) => {
        //     return (
        //         <Button
        //             variant="ghost"
        //             onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        //             className="w-full items-start justify-start"
        //         >
        //             Image
        //         </Button>
        //     );
        // },
        header: 'Image',
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isDialogOpen, setIsDialogOpen] = useState(false);
            return (
                <React.Fragment>
                    <div className="">
                        <Image
                            src={row?.original?.coverImage}
                            alt="Category Image"
                            width={35}
                            height={35}
                            className="Category Image"
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
                                        src={row?.original?.coverImage}
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
                </React.Fragment>
            );
        },
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
                <Button variant="ghost" className="w-full flex items-center justify-center pointer-events-none">
                    Action
                </Button>
            );
        },
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            return (
                <React.Fragment>
                    <div className="flex relative gap-3 cursor-pointer items-center justify-center w-full">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Pencil
                                        size={18}
                                        onClick={() =>
                                            router.push({
                                                pathname: `/product-category/add-edit`,
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
    const [deleteProduct] = useDeleteProductCategoryMutation();

    const handleDelete = async (id: string) => {
        try {
            let res = await deleteProduct(id).unwrap();
            console.log('🚀 ~ handleDelete ~ res:', res);
            if (res.statusCode === 201) {
                toast.success(`🎉 Category Successfully Deleted.`);
            } else {
                toast.error(`🛑 ${res.message}`);
            }
        } catch (error) {
            toast.error(`Failed to delete Product Category`);
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
