import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Info, Link, Pen, Pencil, Printer, Trash, View, Wallet } from 'lucide-react';
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
import Image from 'next/image';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Product } from '@/types/interfaces/product';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    useEditActiveStatusMutation,
    useEditNewProductStatusMutation,
    useEditBestsellerStatusMutation,
    useEditFeaturedStatusMutation,
} from '@/features/product/productAPI';
import { toast } from 'sonner';

interface CellProps {
    row: any;
}

export const StatusChangeCell: React.FC<CellProps> = ({ row }) => {
    const [statusUpdate] = useEditActiveStatusMutation();
    async function updateStatus(id: string) {
        try {
            let res = await statusUpdate(id).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 Product Status Successfully Updated.`);
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
export const BestSellerStatusChangeCell: React.FC<CellProps> = ({ row }) => {
    const [statusUpdate] = useEditBestsellerStatusMutation();
    async function updateStatus(id: string) {
        try {
            let res = await statusUpdate(id).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 Bestseller Status Successfully Updated.`);
            } else {
                toast(`🛑 ${res.message}`);
            }
        } catch (error) {
            toast(`Failed to update status`);
        }
    }
    return (
        <React.Fragment>
            <div className="flex items-center">
                <Switch
                    id="isBestSeller"
                    checked={row.getValue('isBestSeller') === true ? true : false}
                    onClick={() => {
                        updateStatus(row.original.id as string);
                    }}
                />
            </div>
        </React.Fragment>
    );
};
export const NewProductStatusChangeCell: React.FC<CellProps> = ({ row }) => {
    const [statusUpdate] = useEditNewProductStatusMutation();
    async function updateStatus(id: string) {
        try {
            let res = await statusUpdate(id).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 New Product Status Successfully Updated.`);
            } else {
                toast.error(`🛑 ${res.message}`);
            }
        } catch (error) {
            toast.error(`🛑 Failed to update status`);
        }
    }
    return (
        <React.Fragment>
            <div className="flex items-center">
                <Switch
                    id="isNewProduct"
                    checked={row.getValue('isNewProduct') === true ? true : false}
                    onClick={() => {
                        updateStatus(row.original.id as string);
                    }}
                />
            </div>
        </React.Fragment>
    );
};
export const FeaturedStatusChangeCell: React.FC<CellProps> = ({ row }) => {
    const [statusUpdate] = useEditFeaturedStatusMutation();

    async function updateStatus(id: string) {
        try {
            let res = await statusUpdate(id).unwrap();
            if (res.statusCode === 201) {
                toast.success(`🎉 Featured Status Successfully Updated.`);
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
                    id="isFeatured"
                    checked={row.getValue('isFeatured') === true ? true : false}
                    onClick={() => {
                        updateStatus(row.original.id as string);
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export const ProductColumns: ColumnDef<Product>[] = [
    {
        accessorKey: 'productImage',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Image
                </Button>
            );
        },
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isDialogOpen, setIsDialogOpen] = useState(false);
            return (
                <React.Fragment>
                    <div className="">
                        <Image
                            src={row?.original?.productImage as string}
                            alt="logo"
                            width={35}
                            height={35}
                            className="Product Image"
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
                                        src={row?.original?.productImage as string}
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
                    Product
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row.getValue('name')}</div>,
    },
    {
        id: 'category',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row?.original?.productCategory?.name}</div>,
    },
    {
        id: 'subCategoryId',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Sub Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row?.original?.product_subcategory?.name}</div>,
    },
    {
        id: 'brand',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Brand
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm">{row?.original?.brand?.name}</div>,
    },
    // {
    //     accessorKey: 'specification',
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //                 className="w-full items-center justify-center"
    //             >
    //                 Specification
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         );
    //     },
    //     cell: ({ row }) => <div className="text-sm text-center">{row.getValue('specification')}</div>,
    // },
    {
        accessorKey: 'isBestSeller',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start pointer-events-none"
                >
                    Best Seller
                </Button>
            );
        },
        cell: BestSellerStatusChangeCell,
    },
    {
        accessorKey: 'isNewProduct',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start pointer-events-none"
                >
                    New Product
                </Button>
            );
        },
        cell: NewProductStatusChangeCell,
    },
    {
        accessorKey: 'isFeatured',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start pointer-events-none"
                >
                    Featured
                </Button>
            );
        },
        cell: FeaturedStatusChangeCell,
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
                    Created Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-sm text-center">{format(new Date(row?.original?.createdAt), 'dd-MM-yyyy')}</div>
        ),
    },
    // {
    //     accessorKey: 'isActive',
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //                 className="w-full items-center justify-center"
    //             >
    //                 Status
    //             </Button>
    //         );
    //     },
    //     cell: StatusChangeCell,
    // },
    {
        id: 'variant',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center pointer-events-none"
                >
                    Variant
                </Button>
            );
        },
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            return (
                <div className="flex justify-center items-center gap-x-4">
                    <span className="cursor-pointer pointer-events-none">{row?.original?.variantCount}</span>{' '}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info
                                    size={18}
                                    onClick={() =>
                                        router.push({
                                            pathname: '/products/variants',
                                            query: {
                                                id: row?.original?.id, // Send the query with the product ID or any other value
                                            },
                                        })
                                    }
                                    className="cursor-pointer"
                                />
                            </TooltipTrigger>
                            <TooltipContent>View Variant</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {/* <Popover>
                            <PopoverTrigger>
                                <Info size={18} onClick={() => router.push('/products/add-edit')} />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h6>Variant Details</h6>
                                <ul>
                                    <li>
                                        <span className="mr-1">1.</span>India Gate Basmati Rice 500gm
                                    </li>
                                    <li>
                                        <span className="mr-1">2.</span>India Gate Basmati Rice 1kg
                                    </li>
                                    <li>
                                        <span className="mr-1">3.</span>India Gate Basmati Rice 5kg
                                    </li>
                                    <li>
                                        <span className="mr-1">4.</span>India Gate Basmati Rice 10kg
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover> */}
                </div>
            );
        },
    },
    {
        id: 'action',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center pointer-events-none"
                >
                    Action
                </Button>
            );
        },
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            let id = row?.original?.id ?? '';
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
                                                pathname: `/products/update-product`,
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

                        {/* <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    
                                    <DeleteAlert id="" />
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                        </TooltipProvider> */}
                        {/* </Link> */}
                    </div>
                </React.Fragment>
            );
        },
    },
];

const DeleteAlert = ({ id }: { id: string }) => {
    const handleDelete = async (id: string) => {
        toast.success(`🎉 Successfully deleted`);
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
