import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown, Trash, Pencil } from 'lucide-react';
import { RTransactionDetails } from '@/types/interfaces/customer';
import { format } from 'date-fns';
import { original } from '@reduxjs/toolkit';
import { useGetTransactionByCustomerIdQuery } from '@/features/customer/customerAPI';
import { useRouter } from 'next/router';

export const IncentiveColumns: ColumnDef<RTransactionDetails>[] = [
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-sm text-center">{format(new Date(row?.original?.createdAt), 'dd-MM-yyyy')}</div>
        ),
    },

    {
        accessorKey: 'orders.orderNumber',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Order no
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const transactionType = row?.original?.transactionType;
            const orderNo = row?.original?.orders?.orderNumber;
            return <div className="text-sm text-center">{transactionType ? orderNo : 'N/A'}</div>;
        },
        // <div className="text-sm text-center">{row?.original?.orders?.orderNumber}</div>,
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-center">{row.getValue('amount')}</div>,
    },
    {
        accessorKey: 'orders.transactionType',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Transaction Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const transactionType = row?.original?.transactionType;
            return <div className="text-sm text-start">{transactionType ? 'Credited' : 'Debited'}</div>;
        },
    },
    {
        accessorKey: 'remarks',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Remarks
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-start">{row.getValue('remarks')}</div>,
    },
];
