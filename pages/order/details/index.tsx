import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebounce, usePagination, useSorting } from '@/lib/utils';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useGetOrderByIdQuery } from '@/features/order/orderApi';
import ViewOrder from '@/components/order/view-order';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const OrderIndex = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { id } = router.query as { id: string };
    const aone_token = getCookie('aone_token');
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);
    if (aone_token) {
        if (userType === 'Driver') {
            router.push('/delivery-dashboard');
        }
    } else {
        router.push('/');
    }
    const { data: orderData } = useGetOrderByIdQuery(id, { refetchOnMountOrArgChange: true });

    return (
        <div>
            {/* <ViewOrder OrderDetails={orderDetails?.data || []} /> */}
            <ViewOrder orderData={orderData?.data ? orderData.data : []} />
        </div>
    );
};

export default OrderIndex;
