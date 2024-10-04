import DeliveryDashboardComponent from '@/components/delivery-dashboard/delivery-dashboard';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function DeliveryDashboardIndex() {
    const router = useRouter();
    const aone_token = getCookie('aone_token');
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);
    if (aone_token) {
        if (userType === 'Admin') {
            router.push('/dashboard');
        }
    } else {
        router.push('/');
    }
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
            <DeliveryDashboardComponent />
        </>
    );
}
