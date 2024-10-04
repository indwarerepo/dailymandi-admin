import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/app-banner/add-edit';
import { IBanner } from '@/types/interfaces/banner';
import { useGetBannerByIdQuery } from '@/features/banner/bannerAPI';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const initialBanner: IBanner = {
    name: '',
    categoryId: '',
    remarks: '',
    bannerDisplay: '',
    bannerType: '',
    image: '',
};

const AddEditIndex = () => {
    const router = useRouter();
    const [banners, setBanners] = useState<IBanner>(initialBanner);
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

    const { data: BannerData } = useGetBannerByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    console.log('🚀 ~ AddEditIndex ~ data:', BannerData);

    useEffect(() => {
        if (BannerData?.data) {
            const { bannerType, ...rest } = BannerData?.data;
            setBanners({ ...rest, bannerType: bannerType as string });
        }
    }, [BannerData]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedBanners={banners}
                setSelectedBanners={setBanners}
            />
        </div>
    );
};

export default AddEditIndex;
