import { useContext, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import logo from '../public/images/Frame 14.png';
// import whiteLogo from '../public/images/logow.png';
import AppMenu from './AppMenu';
import AppMenuIcon from './AppMenuIcon';

import { ArrowLeftCircle, Power, Search, User } from 'lucide-react';
import { UserNav } from '@/components/ui-lib/user-nav';
import { ThemeToggle } from '@/components/ui-lib/theme-toggler';
import Notification from '@/components/ui-lib/notification';
import router, { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';

const AppSidebar = () => {
    const { onMenuHideToggle, layoutState } = useContext(LayoutContext);
    const { resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // let authData = useAppSelector((state) => state.persistedReducers.authSlice.data);
    // console.log('🚀 ~ AppSidebar ~ authData:', authData);

    const handleLogOut = () => {
        setIsOpen(false);
        router.push('/');
    };

    return (
        <>
            <>
                <div className="layout-sidebar-top px-3 border-b border-borderColor border-r bg-topbarBackground">
                    {(layoutState.menuMobileHideState && layoutState.menuHideState) || !layoutState.menuHideState ? (
                        <>
                            {resolvedTheme == 'light' || resolvedTheme == 'dark' ? (
                                <Image src={logo} width={150} height={80} alt="logo" />
                            ) : (
                                <Image src={logo} width={150} height={80} alt="logo" />
                            )}
                            <ArrowLeftCircle
                                className="h-5 w-5 text-[var(--workspaceColor1)]"
                                style={{ cursor: 'pointer' }}
                                onClick={onMenuHideToggle}
                            />
                        </>
                    ) : (
                        <Image src={logo} width={150} height={100} alt="logo" />
                    )}
                </div>
                {/* <AllProcessSheet /> */}
                <aside className="p-0 pt-[3.6rem] min-h-[100vh] flex flex-col border-r-[1px] justify-between bg-topbarBackground border-borderColor">
                    {(layoutState.menuMobileHideState && layoutState.menuHideState) || !layoutState.menuHideState ? (
                        <div className="bg-topbarBackground">
                            <AppMenu />
                        </div>
                    ) : (
                        <AppMenuIcon />
                    )}
                </aside>
            </>
        </>
    );
};

export default AppSidebar;
