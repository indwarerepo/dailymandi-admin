import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types/layout';
import AppMenuitem from './AppMenuitem';
import {
    CalendarClock,
    ClipboardCheck,
    Cog,
    FileDown,
    FileText,
    Layers,
    LayoutGrid,
    Network,
    PieChart,
    Users,
    Tag,
    BadgePercent,
    ShoppingCart,
    Gift,
    Settings,
    Bike,
    LandPlot,
    Image,
    Store,
    BadgeIndianRupee,
    Layout,
    ApertureIcon,
    Aperture,
    Bolt,
    Crown,
    ReceiptIndianRupee,
    Scale,
    QrCode,
    Boxes,
    Trello,
    LocateFixed,
} from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

const AppMenu = () => {
    const authData = useAppSelector((state) => state?.persistedReducers?.authSlice?.data);
    console.log('🚀 ~ AppMenu ~ authData:', authData.userType);

    const modelAdmin: AppMenuItem[] = [
        {
            label: '',
            items: [
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
                            label: 'Sub Category',
                            icon: Layers,
                            to: '/product-subcategory',
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
                        // {
                        //     label: 'Discounts',
                        //     icon: BadgePercent,
                        //     to: '/offers',
                        // },
                        {
                            label: 'Banner',
                            icon: Image,
                            to: '/app-banner',
                        },

                        {
                            label: 'Zone',
                            icon: LocateFixed,
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

                        // {
                        //     label: 'Store Details',
                        //     icon: Store,
                        //     to: '/store-details',
                        // },
                    ],
                },
                {
                    label: 'CMS',
                    icon: Layout,
                    to: '/cms',
                },
                // {
                //     label: 'User Management',
                //     icon: FileText,
                //     to: '/',
                // },
                // {
                //     label: 'Sales & Reports',
                //     icon: BadgeIndianRupee,
                //     // to: '/products/add-edit',
                // },
            ],
        },
    ];
    const modelDriver: AppMenuItem[] = [
        {
            label: '',
            items: [
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
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu bg-topbarBackground">
                {authData?.userType === 'Admin' ? (
                    <>
                        {modelAdmin.map((item, i) => {
                            return !item?.seperator ? (
                                <AppMenuitem item={item} root={true} index={i} key={i} />
                            ) : (
                                <li className="menu-separator"></li>
                            );
                        })}
                    </>
                ) : (
                    <>
                        {modelDriver.map((item, i) => {
                            return !item?.seperator ? (
                                <AppMenuitem item={item} root={true} index={i} key={i} />
                            ) : (
                                <li className="menu-separator"></li>
                            );
                        })}
                    </>
                )}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
