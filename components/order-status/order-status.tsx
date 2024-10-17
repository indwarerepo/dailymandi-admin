import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash, Pencil } from 'lucide-react';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import React, { useState } from 'react';
import { IOrderStatus } from '@/types/interfaces/orderStatus';
import { useDeleteOrderStatusMutation, useEditActiveStatusMutation } from '@/features/orderStatus/orderStatusAPI';
import { toast } from 'sonner';

interface CellProps {
    row: any;
}

export const StatusChangeCell: React.FC<CellProps> = ({ row }) => {
    const [statusUpdateAgent] = useEditActiveStatusMutation();

    async function updateStatus(id: string) {
        try {
            let res = await statusUpdateAgent(id).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 Order Status Successfully Updated.`);
            } else {
                toast.error(`🛑 ${res.message}`);
            }
        } catch (error) {
            toast.error(`Failed to update status`);
        }
    }
    return (
        <React.Fragment>
            <div className="flex items-status">
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

export const OrderStatusColumns: ColumnDef<IOrderStatus>[] = [
    {
        accessorKey: 'statusTitle',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Status Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('statusTitle')}</div>,
    },
    {
        accessorKey: 'remarks',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Remarks
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('remarks')}</div>,
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
                                                pathname: `/order-status/add-edit`,
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

                        {/* <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DeleteAlert id={row.getValue('id') as string} />
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                        </TooltipProvider> */}
                    </div>
                </React.Fragment>
            );
        },
    },
];

// const DeleteAlert = ({ id }: { id: string }) => {
//     const [deleteOrderStatus] = useDeleteOrderStatusMutation();

//     const { toast } = useToast();

//     const handleDelete = async (id: string) => {
//         try {
//             let res = await deleteOrderStatus(id).unwrap();
//             console.log('🚀 ~ handleDelete ~ res:', res);
//             if (res.statusCode === 201) {
//                 toast({
//                     variant: 'sucess',
//                     title: `🎉 Order Status Successfully Deleted.`,
//                     duration: 1500,
//                 });
//             } else {
//                 toast({
//                     variant: 'error',
//                     title: `🛑 ${res.message}`,
//                     duration: 1500,
//                 });
//             }
//         } catch (error) {
//             toast({
//                 variant: 'error',
//                 title: `Failed to delete Order Status`,
//                 duration: 1500,
//             });
//         }
//     };

//     return (
//         <AlertDialog>
//             <AlertDialogTrigger asChild>
//                 <Trash size={18} /*className="w-4 h-4 cursor-pointer text-red-700"*/ />
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <AlertDialogAction onClick={() => handleDelete(id)}>Continue</AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     );
// };
