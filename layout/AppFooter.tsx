/* eslint-disable react/display-name */
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useState } from 'react';

const AppFooter = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => {
    const [isAuthPage, setIsAuthPage] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (router.pathname.startsWith('/auth') || router.pathname === '/') setIsAuthPage(true);
    }, [router.pathname]);

    return (
        <div className={cn(`${isAuthPage ? 'auth-layout-footer' : 'layout-footer'} bg-footbarbg border-0`, className)}>
            <span className="font-normal text-sm text-foreground font-popp">
                {' '}
                © 2024 Aonemart Admin. All Rights Reserved.
            </span>
        </div>
    );
});

export default AppFooter;
