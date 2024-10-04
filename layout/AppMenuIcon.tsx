import { Menubar } from '@/components/ui/menubar';
import { AppMenuIconItem } from '@/types/interfaces/menu';
import AppMenuItemIcon from './AppMenuItemIcon';

import {
    Bike,
    Boxes,
    LandPlot,
    Layers,
    Layout,
    LayoutGrid,
    Image,
    Network,
    PieChart,
    QrCode,
    ReceiptIndianRupee,
    Scale,
    Settings,
    ShoppingCart,
    Store,
    Tag,
    Trello,
    Users,
} from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

const AppMenuIcon = () => {
    const authData = useAppSelector((state) => state?.persistedReducers?.authSlice?.data);

    const modelAdmin: AppMenuIconItem[] = [
        // {
        //     label: 'Dashboard',
        //     icon: LayoutGrid,
        //     to: '/dashboard',
        // },
        // {
        //     label: 'Orders',
        //     icon: ShoppingCart,
        //     to: '/order',
        // },
        // {
        //     label: 'Users',
        //     icon: Users,
        //     to: '/users',
        // },
        // {
        //     label: 'Users',
        //     icon: Users,
        //     to: '/users',
        // },
        {
            label: 'Dashboard',
            icon: LayoutGrid,
            to: '/dashboard',
        },
        {
            label: 'Orders',
            icon: ShoppingCart,
            to: '/order',
        },
        {
            label: 'Products',
            icon: PieChart,
            items: [
                {
                    label: 'All Products',
                    icon: Tag,
                    to: '/products',
                },
                {
                    label: 'Category',
                    icon: Layers,
                    to: '/product-category',
                },
                {
                    label: 'Brand',
                    icon: Trello,
                    to: '/brand',
                },
            ],
        },
        {
            label: 'Customers',
            icon: Users,
            to: '/customer',
        },

        {
            label: 'Delivery',
            icon: Bike,
            to: '/drivers',
        },
        {
            label: 'Setting',
            icon: Settings,
            items: [
                {
                    label: 'App Banner',
                    icon: Image,
                    to: '/app-banner',
                },

                {
                    label: 'Zone',
                    icon: LandPlot,
                    to: '/setting/zone',
                },
                {
                    label: 'PIN Code',
                    icon: LandPlot,
                    to: '/setting/pin-code',
                },

                {
                    label: 'Coupon',
                    icon: Store,
                    to: '/coupon',
                },
                {
                    label: 'QR Code',
                    icon: QrCode,
                    to: '/qrcode',
                },
                {
                    label: 'Tax',
                    icon: ReceiptIndianRupee,
                    to: '/tax',
                },
                {
                    label: 'Variant',
                    icon: Scale,
                    to: '/variant',
                },
                {
                    label: 'Order Status',
                    icon: Store,
                    to: '/order-status',
                },
                {
                    label: 'Delivery Slot',
                    icon: Boxes,
                    to: '/misc-charges',
                },
            ],
        },
        {
            label: 'CMS',
            icon: Layout,
            to: '/cms',
        },
    ];
    const modelDriver: AppMenuIconItem[] = [
        {
            label: 'Dashboard',
            icon: LayoutGrid,
            to: '/delivery-dashboard',
        },
        {
            label: 'Orders',
            icon: ShoppingCart,
            to: '/delivery-order',
        },
    ];
    return (
        <Menubar className="flex flex-col border-none h-[90%] gap-1 space-x-0 bg-topbarBackground">
            {authData?.userType === 'Admin' ? (
                <>
                    {modelAdmin.map((item, i) => {
                        return <AppMenuItemIcon item={item} key={i} index={i} />;
                    })}{' '}
                </>
            ) : (
                <>
                    {modelDriver.map((item, i) => {
                        return <AppMenuItemIcon item={item} key={i} index={i} />;
                    })}{' '}
                </>
            )}
        </Menubar>
    );
};

export default AppMenuIcon;
