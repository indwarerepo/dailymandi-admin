import { ColumnDef } from '@tanstack/react-table';
import {
    ArrowUpDown,
    Pen,
    Trash,
    BadgeInfo,
    Pencil,
    BadgeIndianRupee,
    Wallet,
    Printer,
    View,
    ChevronDown,
    Check,
    ArrowDown,
} from 'lucide-react';

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
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { cn } from '@/lib/utils';
import { useUpdateOrderDiverStatusMutation, useUpdateOrderStatusMutation } from '@/features/order/orderApi';
import { useGetDropdownOrderStatuslistQuery } from '@/features/orderStatus/orderStatusAPI';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useGetAllDriversDropdownlistQuery } from '@/features/driver/driverAPI';
import { toast } from 'sonner';

// const : any = [],
// const permissionList: any = [
//     {
//         id: 1,
//         date: '12-08-2024, 01:00pm',
//         orderNumber: 'BIZI00001845',
//         // customer: {customerdetails},
//         zone: 'West',
//         quantity: '5',
//         payment: 'Online',
//         driverStatus: 'Pending',
//         orderStatus: 'Pending',
//         action: '',
//     },
//     {
//         id: 1,
//         date: '12-08-2024, 01:00pm',
//         orderNumber: 'BIZI00001846',
//         customer: 'Iqubal Ahamed',
//         zone: 'West',
//         quantity: '4',
//         payment: 'COD',
//         driverStatus: 'Delivered',
//         orderStatus: 'Completed',
//         action: '',
//     },
// ];

export const AssignDriverStatusCell = ({ row }: any) => {
    let [updateDriverAssigned] = useUpdateOrderDiverStatusMutation();
    const [open, setOpen] = useState(false);
    let { data: driverList, isLoading: driverListLoading } = useGetAllDriversDropdownlistQuery();

    const [isActive, setActive] = useState(false);
    const selectClass = () => {
        setActive(!isActive);
    };
    const onChange = (value: string) => {
        let _value = { driverId: value, id: row.original.id };
        onUpdateStatus(_value);
    };

    async function onUpdateStatus(body: any) {
        try {
            await updateDriverAssigned(body)
                .unwrap()
                .then((res: any) => {
                    console.log('🚀 ~ .then ~ res:', res);
                    if (res.statusCode === 200) {
                        // toast.success(`🎉 ${res?.message}`);
                    } else {
                        // toast.error(`🛑 ${res?.message}`);
                    }
                });
        } catch (error: any) {
            // toast.error(`🛑 Something went wrong!!!`);
        }
    }

    return (
        <div className="">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full  text-xs sm:text-sm "
                        role="combobox"
                        aria-expanded={open}
                        onClick={selectClass}
                    >
                        <span className={isActive ? ('select' as any) : null}>
                            {row?.original?.driver?.id
                                ? driverList?.data?.find((framework: any) => framework.id === row?.original?.driver?.id)
                                      ?.name
                                : 'Select Driver'}
                        </span>
                        <ArrowDown className="ml-1 w-4 h-4" />
                    </Button>
                    {/* <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full rounded-md drop-button"
                        onClick={selectClass}
                    >
                        <p className={isActive ? ('select' as any) : null}>
                            {row?.original?.driver?.id
                                ? driverList?.data?.find((framework: any) => framework.id === row?.original?.driver?.id)
                                      ?.name
                                : 'Select Driver'}
                        </p>

                        <ChevronDown className="" />
                    </Button> */}
                </PopoverTrigger>
                <PopoverContent className="min-w-50 z-[1000] p-0">
                    <Command>
                        <CommandInput placeholder="Search State" className="h-9" />
                        <CommandEmpty>No driver found.</CommandEmpty>
                        <CommandGroup>
                            <CommandList className="w-full max-h-[10rem] overflow-y-scroll">
                                {driverList?.data?.map((d: any) => {
                                    return (
                                        <CommandItem
                                            disabled={false}
                                            key={d?.id}
                                            value={d?.name}
                                            onSelect={(currentValue) => {
                                                onChange(d?.id);
                                                // setValue(currentValue === value ? '' : state?.title);
                                                setOpen(false);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {d?.name}
                                            <Check
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    row?.original?.driver?.id === d?.id ? 'opacity-100' : 'opacity-0',
                                                )}
                                            />
                                        </CommandItem>
                                    );
                                })}
                            </CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export const OrderStatusChangeCell = ({ row }: any) => {
    let [updateOrderStatus] = useUpdateOrderStatusMutation();
    const [open, setOpen] = useState(false);
    let { data: orderStatusList, isLoading: orderStatusLoading } = useGetDropdownOrderStatuslistQuery();

    const [isActive, setActive] = useState(false);
    const selectClass = () => {
        setActive(!isActive);
    };
    const onChange = (value: string) => {
        let _value = { orderStatusId: value, id: row.original.id };
        onUpdateStatus(_value);
    };

    async function onUpdateStatus(body: any) {
        try {
            await updateOrderStatus(body)
                .unwrap()
                .then((res: any) => {
                    console.log('🚀 ~ .then ~ res:', res);
                    if (res.statusCode === 200) {
                        // toast.success(`🎉 ${res?.message}`);
                    } else {
                        // toast.error(`🛑 ${res?.message}`);
                    }
                });
        } catch (error: any) {
            // toast.error(`🛑 Something went wrong!!!`);
        }
    }

    return (
        <div className="">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full text-xs sm:text-sm"
                        role="combobox"
                        aria-expanded={open}
                        onClick={selectClass}
                    >
                        <span className={isActive ? ('select' as any) : null}>
                            {row?.original?.order_status?.id
                                ? orderStatusList?.data?.find(
                                      (framework: any) => framework.id === row?.original?.order_status?.id,
                                  )?.statusTitle
                                : 'Select Order Status'}
                        </span>
                        <ArrowDown className="ml-1 w-4 h-4" />
                    </Button>
                    {/* <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full rounded-full px-3 justify-between drop-button"
                        onClick={selectClass}
                    >
                        <p className={isActive ? ('select' as any) : null}>
                            {row?.original?.order_status?.id
                                ? orderStatusList?.data?.find(
                                      (framework: any) => framework.id === row?.original?.order_status?.id,
                                  )?.statusTitle
                                : 'Select Order Status'}
                        </p>

                        <ChevronDown className="" />
                    </Button> */}
                </PopoverTrigger>
                <PopoverContent className="min-w-50 z-[1000] p-0">
                    <Command>
                        <CommandInput placeholder="Search Order Status" className="h-9" />
                        <CommandEmpty>No Order Status found.</CommandEmpty>
                        <CommandGroup>
                            <CommandList className="w-full max-h-[10rem] overflow-y-scroll">
                                {orderStatusList?.data?.map((order: any) => {
                                    return (
                                        <CommandItem
                                            disabled={false}
                                            key={order?.id}
                                            value={order?.statusTitle}
                                            onSelect={(currentValue) => {
                                                onChange(order?.id);
                                                // setValue(currentValue === value ? '' : state?.title);
                                                setOpen(false);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {order?.statusTitle}
                                            <Check
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    row?.original?.order_status?.id === order?.id
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                        </CommandItem>
                                    );
                                })}
                            </CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export const StatusChangeCell = ({ row }: any) => {
    const [selectedDriverChange, setSelectedDriverStatus] = useState<string>(row.original.leadStatus);

    const handleDriverChange = (value: string) => {
        setSelectedDriverStatus(value);
    };

    return (
        <div className="">
            <Select value={selectedDriverChange} onValueChange={handleDriverChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Driver" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="driver1">Arindam Roy</SelectItem>
                        <SelectItem value="driver2">Rabiul Ali Shaha</SelectItem>
                        <SelectItem value="driver3">Iqbal Ahmad</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export const orderColumns: ColumnDef<any>[] = [
    // {
    //   id: "check",
    //   header: ({ table }) => (
    //     <Checkbox
    //       className="check ml-2"
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   // cell: ({ row }) => (
    //   //   <Checkbox
    //   //     className="check"
    //   //     checked={row.getIsSelected()}
    //   //     onCheckedChange={(value) => row.toggleSelected(!!value)}
    //   //     aria-label="Select row"
    //   //   />
    //   // ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-sm">{format(new Date(row?.original?.createdAt), 'dd-MM-yyyy hh:mm a')}</div>
        ),
    },
    {
        accessorKey: 'orderNumber',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-start justify-start"
                >
                    Order No.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-left">{row.getValue('orderNumber')}</div>,
    },

    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="w-full items-start justify-start  c">
                    Customer
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-start capitalize">{row?.original?.users?.name}</div>,
    },

    {
        accessorKey: 'orderTotal',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Order Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-center">{row.getValue('orderTotal')}</div>,
    },

    {
        // accessorKey: 'assignDriver',
        id: 'assignDriver',
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="w-full items-center justify-center  pointer-events-none">
                    Assign Driver
                </Button>
            );
        },
        cell: ({ row }) => <AssignDriverStatusCell row={row} />,
    },
    {
        accessorKey: 'driverStatus',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Driver Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-sm text-center">{row?.original?.driverStatus ? row?.original?.driverStatus : '-'}</div>
        ),
    },
    {
        // accessorKey: 'orderStatus',
        id: 'orderStatus',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Order Status
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <>
                    {row?.original?.order_status?.statusTitle === 'Confirmed' ||
                    row?.original?.order_status?.statusTitle === 'Pending' ? (
                        <OrderStatusChangeCell row={row} />
                    ) : (
                        <Button
                            variant="outline"
                            className="w-full text-xs sm:text-sm bg-slate-100 text-slate-400 pointer-events-none "
                            role="combobox"
                        >
                            {row?.original?.order_status?.statusTitle} <Check className="ml-1 h-4 w-4" />
                        </Button>
                    )}
                </>
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

        cell: ({ row }) => {
            // const id = row.original._id ?? '';
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            let id = row?.original?.id ?? '';
            return (
                <React.Fragment>
                    <div className="flex relative gap-3 cursor-pointer items-center w-full">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <View
                                        size={18}
                                        onClick={() => router.push({ pathname: '/order/details', query: { id: id } })}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>Order Details</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {/*                         
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Printer size={18} />
                                </TooltipTrigger>
                                <TooltipContent>Print Invoice</TooltipContent>
                            </Tooltip>
                        </TooltipProvider> */}
                        |
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <BadgeIndianRupee
                                        size={18}
                                        onClick={() => router.push({ pathname: '/order/invoice', query: { id: id } })}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>Payment Details</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
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
