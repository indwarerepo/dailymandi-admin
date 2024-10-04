import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash, Wallet, Printer, View, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
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

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

import { original } from '@reduxjs/toolkit';
import { IOrderDelivery } from '@/types/interfaces/delivery-order';
import { useUpdateOrderDeliveryStatusMutation } from '@/features/order-delivery/order-delivery-api';

// export const OrderStatusChangeCell = ({ row }: any) => {
//     let [updateOrderStatus] = useUpdateOrderStatusMutation();
//     const [open, setOpen] = useState(false);
//     let { data: orderStatusList, isLoading: orderStatusLoading } = useGetDropdownOrderStatuslistQuery();

//     const [isActive, setActive] = useState(false);
//     const selectClass = () => {
//         setActive(!isActive);
//     };
//     const onChange = (value: string) => {
//         let _value = { orderStatusId: value, id: row.original.id };
//         onUpdateStatus(_value);
//     };

//     async function onUpdateStatus(body: any) {
//         try {
//             await updateOrderStatus(body)
//                 .unwrap()
//                 .then((res: any) => {
//                     console.log('🚀 ~ .then ~ res:', res);
//                     if (res.statusCode === 200) {
//                         // toast.success(`🎉 ${res?.message}`);
//                     } else {
//                         // toast.error(`🛑 ${res?.message}`);
//                     }
//                 });
//         } catch (error: any) {
//             // toast.error(`🛑 Something went wrong!!!`);
//         }
//     }

//     return (
//         <div className="">
//             <Popover open={open} onOpenChange={setOpen}>
//                 <PopoverTrigger asChild>
//                     <Button
//                         variant="outline"
//                         role="combobox"
//                         aria-expanded={open}
//                         className="w-full rounded-full px-3 justify-between drop-button"
//                         onClick={selectClass}
//                     >
//                         <p className={isActive ? ('select' as any) : null}>
//                             {row?.original?.order_status?.id
//                                 ? orderStatusList?.data?.find(
//                                       (framework: any) => framework.id === row?.original?.order_status?.id,
//                                   )?.statusTitle
//                                 : 'Select Order Status'}
//                         </p>

//                         <ChevronDown className="" />
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="min-w-50 z-[1000] p-0">
//                     <Command>
//                         <CommandInput placeholder="Search State" className="h-9" />
//                         <CommandEmpty>No order Status found.</CommandEmpty>
//                         <CommandGroup>
//                             <CommandList className="w-full max-h-[10rem] overflow-y-scroll">
//                                 {orderStatusList?.data?.map((order: any) => {
//                                     return (
//                                         <CommandItem
//                                             disabled={false}
//                                             key={order?.id}
//                                             value={order?.statusTitle}
//                                             onSelect={(currentValue) => {
//                                                 onChange(order?.id);
//                                                 // setValue(currentValue === value ? '' : state?.title);
//                                                 setOpen(false);
//                                             }}
//                                             className="cursor-pointer"
//                                         >
//                                             {order?.statusTitle}
//                                             <Check
//                                                 className={cn(
//                                                     'ml-auto h-4 w-4',
//                                                     row?.original?.order_status?.id === order?.id
//                                                         ? 'opacity-100'
//                                                         : 'opacity-0',
//                                                 )}
//                                             />
//                                         </CommandItem>
//                                     );
//                                 })}
//                             </CommandList>
//                         </CommandGroup>
//                     </Command>
//                 </PopoverContent>
//             </Popover>
//         </div>
//     );
// };

// export const StatusChangeCell = ({ row }: any) => {
//     const [selectedDriverChange, setSelectedDriverStatus] = useState<string>(row.original.leadStatus);

//     const [updateOrderStatus] = useUpdateOrderDeliveryStatusMutation();

//     const handleDriverChange = async (value: string) => {
//         setSelectedDriverStatus(value);

//         let _actionType = value === 'order1' ? 1 : 0;

//         try {
//             let _payload = {
//                 actionType: _actionType,
//                 orderId: row.original.id,
//             };
//             const res = await updateOrderStatus(_payload).unwrap();

//             console.log('Order status updated successfully', res);
//         } catch (error) {
//             console.error('Error updating order status:', error);
//         }
//     };

//     return (
//         <div className="">
//             <Select value={selectedDriverChange} onValueChange={handleDriverChange}>
//                 <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Order Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectGroup>
//                         <SelectItem value="order1">Accept</SelectItem>
//                         <SelectItem value="order2">Reject</SelectItem>
//                     </SelectGroup>
//                 </SelectContent>
//             </Select>
//         </div>
//     );
// };
export const OrderDeliveryColumns: ColumnDef<IOrderDelivery>[] = [
    {
        accessorKey: 'orderNumber',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Order Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-center">{row.getValue('orderNumber')}</div>,
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
                    Order Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-center">{row.getValue('orderTotal')}</div>,
    },
    {
        id: 'orderAddress',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Delivery Location
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const city = row?.original?.deliveryCity ? row?.original?.deliveryCity : '-';
            const pincode = row?.original?.deliveryPincode ? row?.original?.deliveryPincode : '-';
            const state = row?.original?.deliveryState ? row?.original?.deliveryState : '-';
            return <div className="text-sm items-center justify-start">{`${city}, ${state}, ${pincode}`}</div>;
        },
    },

    // {
    //     accessorKey: 'paidAmount',
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //                 className="w-full items-center justify-center"
    //             >
    //                 Paid Amount
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         );
    //     },
    //     cell: ({ row }) => <div className="text-sm text-center">{row.getValue('paidAmount')}</div>,
    // },
    // {
    //     accessorKey: 'dueAmount',
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //                 className="w-full items-center justify-center"
    //             >
    //                 Due Amount
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         );
    //     },
    //     cell: ({ row }) => <div className="text-sm text-center">{row.getValue('dueAmount')}</div>,
    // },
    {
        accessorKey: 'paymentMethod',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-start"
                >
                    Payment Method
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="text-sm text-center">{row.getValue('paymentMethod')}</div>,
    },
    {
        id: 'orderStatus',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-full items-center justify-center"
                >
                    Order Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-sm text-center">
                {row?.original?.order_status?.statusTitle ? row?.original?.order_status?.statusTitle : '-'}
            </div>
        ),
    },
    {
        accessorKey: 'id',
        header: 'Action',
        cell: ({ row }) => {
            const id = row.original.id ?? '';
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            return (
                <React.Fragment>
                    <div className="flex relative gap-3 cursor-pointer items-center justify-center w-full">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <View
                                        size={18}
                                        onClick={() =>
                                            router.push({ pathname: '/delivery-order/details', query: { id: id } })
                                        }
                                    />
                                </TooltipTrigger>
                                <TooltipContent>View Order Details</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </React.Fragment>
            );
        },
    },
];
