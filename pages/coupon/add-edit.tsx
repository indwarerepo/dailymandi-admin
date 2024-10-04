import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddEditComponent from '@/components/coupon/add-edit';
import { ICoupon } from '@/types/interfaces/coupon';
import { useGetCouponByIdQuery } from '@/features/coupon/couponAPI';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const initialCoupon: ICoupon = {
    id: '',
    name: '',
    couponCode: '',
    policy: '',
    description: '',
    minOrderAmount: 0,
    offerPercentage: 0,
    couponValidity: 0,
    useLimit: 0,
};

const AddEditIndex = () => {
    const router = useRouter();
    const [coupons, setCoupons] = useState<ICoupon>(initialCoupon);
    const { id } = router.query;
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

    const { data: CouponData } = useGetCouponByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ CouponData:', CouponData);

    useEffect(() => {
        if (CouponData?.data) {
            setCoupons(CouponData?.data);
        }
    }, [CouponData]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedCoupons={coupons}
                setSelectedCoupons={setCoupons}
            />
        </div>
    );
};

export default AddEditIndex;
