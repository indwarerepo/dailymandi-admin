import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pen, Trash } from 'lucide-react';

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
import { toast } from 'sonner';

export function City() {
    const router = useRouter();
    const permissionList: any = [
        {
            id: 1,
            name: 'Assembly',
            type: 'Manufacturing',
            cost: '$10,000',
            requirements: ' Raw materials, Tools',
            machinery: '  Assembly line',
        },
        {
            id: 2,
            name: 'Welding',
            type: 'Manufacturing',
            cost: '$10,000',
            requirements: ' Raw materials, Tools',
            machinery: '  Assembly line',
        },
    ];
    const columns: ColumnDef<PermissionData>[] = [
        {
            id: 'check',
            header: ({ table }) => (
                <Checkbox
                    className="check ml-2"
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    className="check"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
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
            accessorKey: 'type',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-center"
                    >
                        Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-center">{row.getValue('type')}</div>,
        },

        {
            accessorKey: 'cost',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-center"
                    >
                        Cost
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-center">{row.getValue('cost')}</div>,
        },
        {
            accessorKey: 'requirements',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-center"
                    >
                        Requirements
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-center">{row.getValue('requirements')}</div>,
        },
        {
            accessorKey: 'machinery',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="w-full items-center justify-center"
                    >
                        Machinery
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-sm text-center">{row.getValue('machinery')}</div>,
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
