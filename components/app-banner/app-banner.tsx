import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

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
import Link from 'next/link';
import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { IPaginator } from '@/types/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IBanner } from '@/types/interfaces/banner';
import { useDeleteBannerMutation } from '@/features/banner/bannerAPI';
import { toast } from 'sonner';
// interface CellProps {
//     row: any;
// }

// export const StatusChangeCell: React.FC<CellProps> = ({ row }) => {
//     const [statusUpdateAgent] = useEditActiveStatusMutation();
//     const { toast } = useToast();
//     // console.log(row);
//     async function updateStatus(id: string, currentStatus: boolean) {
//         try {
//             const updatedStatus = !currentStatus;
//             await statusUpdateAgent({ id, isActive: updatedStatus }).unwrap();
//         } catch (error) {
//             toast({
//                 variant: 'error',
//                 title: `Failed to update status`,
//                 duration: 1500,
//             });
//         }
//     }
//     return (
//         <React.Fragment>
//             <div className="flex items-center">
//                 <Switch
//                     id="isActive"
//                     checked={row.getValue('isActive') === true ? true : false}
//                     onClick={() => {
//                         updateStatus(row.original.id as string, row.getValue('isActive'));
//                     }}
//                 />
//             </div>
//         </React.Fragment>
//     );
// };

export const BannerColumns: ColumnDef<IBanner>[] = [
    {
        accessorKey: 'image',
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="w-full items-start justify-start pointer-events-none">
                    Image
                </Button>
            );
        },
        // header: 'Image',
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isDialogOpen, setIsDialogOpen] = useState(false);
            return (
                <React.Fragment>
                    <div className="">
                        <Image
                            src={row?.original?.image}
                            alt="Banner Image"
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
        accessorKey: 'categoryId',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-start">{row?.original?.productCategory?.name}</div>,
    },
    {
        accessorKey: 'bannerDisplay',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-center"
                >
                    Display
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const bannerType = row.getValue('bannerDisplay');
            return (
                <div className="text-sm text-center">
                    {bannerType === 'W' ? 'Website' : bannerType === 'M' ? 'Mobile' : 'Unknown'}
                </div>
            );
        },
        //  <div className="text-sm text-center">{row.getValue('bannerDisplay')}</div>,
    },
    {
        accessorKey: 'bannerType',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-center"
                >
                    Banner Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-center">{row.getValue('bannerType')}</div>,
    },

    // {
    //     accessorKey: 'isActive',
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //                 className="w-full items-start justify-start"
    //             >
    //                 Status
    //             </Button>
    //         );
    //     },
    //     cell: StatusChangeCell,
    // },

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
            const id = row.original.id ?? '';
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
                                                pathname: `/app-banner/add-edit`,
                                                query: {
                                                    id: id,
                                                },
                                            })
                                        }
                                    />
                                </TooltipTrigger>
                                <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {/* </Link> */}|
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
                                    <DeleteAlert id={row.getValue('id') as string} />
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {/* </Link> */}
                    </div>
                </React.Fragment>
            );
        },
    },
];

const DeleteAlert = ({ id }: { id: string }) => {
    const [deleteBanner] = useDeleteBannerMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteBanner(id).unwrap();
            toast.success(`🎉 Successfully deleted`);
        } catch (error) {
            toast.error(`Failed to delete banner`);
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
