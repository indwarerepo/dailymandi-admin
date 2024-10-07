import Head from 'next/head';
import { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { ChildContainerProps } from '@/types/layout';
import { cn } from '@/lib/utils';
import { LayoutContext } from './context/layoutcontext';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from '@/components/ui-lib/theme-toggler';
import { Toaster } from 'sonner';
import AppSidebar from './Appsidebar';
import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import { Card, CardContent } from '@/components/ui/card';

const Layout = ({ children }: ChildContainerProps) => {
    const { layoutState } = useContext(LayoutContext);

    const { pathname } = useRouter();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const containerClass = cn('layout-wrapper', {
        'layout-static-inactive': layoutState.menuHideState,
        'layout-mobile-active': layoutState.menuMobileHideState,
    });

    return (
        <>
            <Head>
                <title>Admin | DailyMandi</title>
                <meta charSet="UTF-8" />
                <meta
                    name="description"
                    content="The ultimate collection of design-agnostic, flexible and accessible React UI Components."
                />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta property="og:type" content="website"></meta>
                <meta property="og:ttl" content="604800"></meta>
                <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
            </Head>
            {/* <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                themes={['light', 'dark', 'system']}
            > */}
            <Toaster richColors closeButton position="top-right" />
            {pathname === '/404' ||
            pathname === '/' ||
            pathname === '/auth/forget-password' ||
            pathname === '/auth/otp' ||
            pathname === '/auth/reset-password' ? (
                <>
                    <div className="layout-main relative">
                        <div className="fixed top-5 right-5" style={{ zIndex: '100' }}>
                            <ThemeToggle />
                        </div>
                        {children}
                    </div>
                    {/* <AppFooter /> */}
                </>
            ) : (
                <>
                    <div className={containerClass}>
                        <AppTopbar ref={containerRef} />
                        <div ref={sidebarRef} className={`layout-sidebar side-barbg`}>
                            <AppSidebar />
                        </div>
                        <Card className="sm:py-2 sm:mt-1">
                            <div className="layout-main-container">
                                <div className="layout-main">{children}</div>
                            </div>
                        </Card>
                        {/* <AppFooter /> */}
                        <div className="layout-mask"></div>
                    </div>
                </>
            )}
            {/* </ThemeProvider> */}
        </>
    );
};

export default Layout;
