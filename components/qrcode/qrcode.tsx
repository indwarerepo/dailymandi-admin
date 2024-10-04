import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IQRCode } from '@/types/interfaces/qrcode';

export const QRCodeColumns: ColumnDef<IQRCode>[] = [
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
        accessorKey: 'image',
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
                            src={row?.original?.image}
                            alt="logo"
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
                                        src={row?.original?.image}
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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Pencil
                                        size={18}
                                        onClick={() =>
                                            router.push({
                                                pathname: `/qrcode/add-edit`,
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
                    </div>
                </React.Fragment>
            );
        },
    },
];
