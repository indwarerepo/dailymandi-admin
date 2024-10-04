import Dashboard from '@/components/dashboard/dashboard';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function DashboardIndex() {
    const router = useRouter();
    const aone_token = getCookie('aone_token');
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);

    // Use useEffect for side effects like navigation
    useEffect(() => {
        if (aone_token) {
            if (userType === 'Driver') {
                router.push('/delivery-dashboard');
            }
        } else {
            router.push('/');
        }
    }, [aone_token, userType, router]);
    return (
        <>
            {/* Breadcrumb and Header Start==================== */}
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 sm:col-span-4">
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">Dashboard</h2>
                </div>
                <div className="col-span-12 sm:col-span-8"></div>
            </div>
            {/* Breadcrumb and Header End ==================== */}
            <Dashboard />
        </>
    );
}
