import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { ArrowUpDown, Pen, Trash, BadgeInfo, Pencil, BadgeIndianRupee, Wallet, Printer, View } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import DataTable from '@/components/ui-lib/data-table';
import { TooltipComponent } from '@/components/ui-lib/hover-tooltip';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import { PermissionData } from '@/types/interfaces/permission';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { ICustomer } from '@/types/interfaces/customer';
import { format } from 'date-fns';

interface CellProps {
    row: any;
}

export const StatusChangeCell: React.FC<CellProps> = ({ row }) => {
    // const [statusUpdateAgent] = useEditActiveStatusMutation();
    const { toast } = useToast();
    // async function updateStatus(id: string) {
    //     try {
    //         let res = await statusUpdateAgent(id).unwrap();
    //         if (res.statusCode === 201) {
    //             toast({
    //                 variant: 'sucess',
    //                 title: `🎉 Order Status Successfully Updated.`,
    //                 duration: 1500,
    //             });
    //         } else {
    //             toast({
    //                 variant: 'error',
    //                 title: `🛑 ${res.message}`,
    //                 duration: 1500,
    //             });
    //         }
    //     } catch (error) {
    //         toast({
    //             variant: 'error',
    //             title: `Failed to update status`,
    //             duration: 1500,
    //         });
    //     }
    // }
    return (
        <React.Fragment>
            <div className="flex items-status">
                <Switch
                    id="isActive"
                    checked={row.getValue('isActive') === true ? true : false}
                    onClick={() => {
                        // updateStatus(row.original.id as string);
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export const CustomerColumns: ColumnDef<ICustomer>[] = [
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
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start pointer-events-none"
                >
                    Email
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-start">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start pointer-events-none"
                >
                    Phone
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('phone')}</div>,
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
                    Registered Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-sm text-center ">{format(new Date(row?.original?.createdAt), 'dd-MM-yyyy')}</div>
        ),
    },

    {
        accessorKey: 'referralCode',
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="w-full items-center justify-center  pointer-events-none">
                    Referral Code
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-center">{row?.original?.referralCode}</div>,
    },
    {
        accessorKey: 'referredBy',
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="w-full items-center justify-center  pointer-events-none">
                    Referred By
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-center">{row?.original?.referredBy}</div>,
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
            let id = row?.original?.id ?? '';
            return (
                <React.Fragment>
                    <div className="flex relative gap-3 cursor-pointer items-center justify-center w-full">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <View
                                        size={18}
                                        onClick={() =>
                                            router.push({ pathname: '/customer/details', query: { id: id } })
                                        }
                                    />
                                </TooltipTrigger>
                                <TooltipContent>View More Details</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </React.Fragment>
            );
        },
    },
];
