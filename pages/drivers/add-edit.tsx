import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/drivers/add-edit';
import { IDriver } from '@/types/interfaces/driver';
import { useGetDriverByIdQuery } from '@/features/driver/driverAPI';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const initialDrivers: IDriver = {
    // description: '',
    email: '',
    name: '',
    phone: '',
    id: '',
    address: '',
    landmark: '',
    panNo: '',
    aadharNo: '',
    licenseNo: '',
    password: '',
    zoneId: [],
};

const AddEditIndex = () => {
    const [drivers, setDrivers] = useState<IDriver>(initialDrivers);
    const router = useRouter();
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

    // useEffect(() => {
    //   const selectedPermissions = permissionList.find((p) => p.id === id);
    //   if (selectedPermissions) {
    //     setPermission({
    //       name: selectedPermissions?.name,
    //       description: selectedPermissions?.description,
    //     });
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [id, router.query]);
    const { data: DriverData } = useGetDriverByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ CouponData:', CouponData);

    useEffect(() => {
        console.log('🚀 ~ AddEditIndex ~ DriverData:', DriverData);
        if (DriverData?.data) {
            setDrivers(DriverData?.data);
        }
    }, [DriverData]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                // selectedPermissions={permission}
                thisId={id as string}
                selectedDrivers={drivers}
                setSelectedDrivers={setDrivers}
            />
        </div>
    );
};

export default AddEditIndex;
