import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebounce, usePagination, useSorting } from '@/lib/utils';
import { ColumnFiltersState } from '@tanstack/react-table';

import ViewOrderDeliveryComponent from '@/components/delivery-order/view-order-delivery';
import { useGetOrderDeliveryDetailsByIdQuery } from '@/features/order-delivery/order-delivery-api';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const DeliveryOrderDetailsIndex = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { id } = router.query as { id: string };
    const aone_token = getCookie('aone_token');
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);
    if (aone_token) {
        if (userType === 'Admin') {
            router.push('/dashboard');
        }
    } else {
        router.push('/');
    }
    const { data: orderData } = useGetOrderDeliveryDetailsByIdQuery(id, { refetchOnMountOrArgChange: true });

    return (
        <div>
            {/* <ViewOrder OrderDetails={orderDetails?.data || []} /> */}
            <ViewOrderDeliveryComponent orderData={orderData?.data ? orderData.data : []} />
        </div>
    );
};

export default DeliveryOrderDetailsIndex;
