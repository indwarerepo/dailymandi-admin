/* eslint-disable react/display-name */
import { forwardRef, useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

import { ArrowRightCircle, Menu } from 'lucide-react';
import { UserNav } from '@/components/ui-lib/user-nav';
import { ThemeToggle } from '@/components/ui-lib/theme-toggler';
import Notification from '@/components/ui-lib/notification';
import { Search } from '@/components/ui-lib/search';

const AppTopbar = forwardRef<any>((props, ref) => {
    const { layoutState, onMenuToggle, onHoverMenuToggle, onHoverMenuHideToggle } = useContext(LayoutContext);

    return (
        <div className="layout-topbar topbar-cus border-b-[1px] border-borderColor bg-topbarBackground">
            <div onMouseEnter={onHoverMenuToggle} onMouseLeave={onHoverMenuHideToggle} ref={ref}>
                {layoutState.menuHideState === true && (
                    <>
                        {layoutState.hoverMenuState ? (
                            <ArrowRightCircle
                                className="h-5 w-5 text-[var(--workspaceColor1)]"
                                style={{ cursor: 'pointer' }}
                                onClick={onMenuToggle}
                            />
                        ) : (
                            <Menu className="h-5 w-5 des_menu" style={{ cursor: 'pointer' }} onClick={onMenuToggle} />
                        )}
                    </>
                )}
                <Menu className="h-6 w-6 mobile_menu" style={{ cursor: 'pointer' }} onClick={onMenuToggle} />
            </div>
            <div className="flex flex-row items-center justify-end gap-3 md:gap-6 w-2/5 max-[500px]:w-4/5">
                {/* <Search className="search-cus rounded-full px-3" /> */}
                {/* <ThemeToggle /> */}
                {/* <Notification /> */}
                <UserNav />
            </div>
        </div>
    );
});

export default AppTopbar;
