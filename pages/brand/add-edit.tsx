import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useGetZoneByIdQuery } from '@/features/zone/zoneAPI';
import { IBrand } from '@/types/interfaces/brand';
import { useGetBrandByIdQuery } from '@/features/brand/brandAPI';
import AddEditComponent from '@/components/setting/brand/add-edit';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const initialZone: IBrand = {
    id: '',
    name: '',
    description: '',
    metaTitle: '',
    metaDescription: '',
};

const AddEditIndex = () => {
    const router = useRouter();
    const [brands, setBrands] = useState<IBrand>(initialZone);
    const { id } = router.query;
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
    const isUpdate = id === undefined || id === '' || id === null ? false : true;

    const { data: brandData } = useGetBrandByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ ProductData:', ProductData);

    useEffect(() => {
        if (brandData?.data && id) {
            setBrands(brandData?.data);
        }
    }, [brandData && id]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedBrands={brands}
                setSelectedBrands={setBrands}
            />
        </div>
    );
};

export default AddEditIndex;
