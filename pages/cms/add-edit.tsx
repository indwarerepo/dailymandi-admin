import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddEditComponent from '@/components/cms/add-edit';
import { ICMS } from '@/types/interfaces/cms';
import { useGetCMSByIdQuery } from '@/features/cms/cmsAPI';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const initialCMS: ICMS = {
    id: '',
    name: '',
    cmsKey: '',
    description: '',
    url: '',
    icon: '',
    metaTitle: '',
    metaDescription: '',
};

const AddEditIndex = () => {
    const router = useRouter();
    const [cmss, setCMSs] = useState<ICMS>(initialCMS);
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

    const { data: CMSData } = useGetCMSByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ ProductData:', ProductData);

    useEffect(() => {
        if (CMSData?.data) {
            setCMSs(CMSData?.data);
        }
    }, [CMSData]);

    return (
        <div>
            <AddEditComponent isUpdate={isUpdate} thisId={id as string} selectedCMSs={cmss} setSelectedCMSs={setCMSs} />
        </div>
    );
};

export default AddEditIndex;
