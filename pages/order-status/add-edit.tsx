import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/order-status/add-edit';
import { IOrderStatus } from '@/types/interfaces/orderStatus';
import { useGetOrderStatusByIdQuery } from '@/features/orderStatus/orderStatusAPI';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const initialOrderStatus: IOrderStatus = {
    id: '',
    statusTitle: '',
    remarks: '',
};

const AddEditIndex = () => {
    const router = useRouter();
    const { id } = router.query;
    const [orderStatuses, setOrderStatuses] = useState<IOrderStatus>(initialOrderStatus);
    const aone_token = getCookie('aone_token');
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);
    if (aone_token) {
        if (userType === 'Driver') {
            router.push('/delivery-dashboard');
        }
    } else {
        router.push('/');
    }
    const isUpdate = id === undefined || id === '' || id === null ? false : true;

    const { data: OrderStatusData } = useGetOrderStatusByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ OrderStatusData:', OrderStatusData);

    useEffect(() => {
        if (OrderStatusData?.data) {
            setOrderStatuses(OrderStatusData?.data);
        }
    }, [OrderStatusData]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedOrderStatuses={orderStatuses}
                setSelectedOrderStatuses={setOrderStatuses}
            />
        </div>
    );
};

export default AddEditIndex;
