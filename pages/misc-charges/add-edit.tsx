import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddEditComponent from '@/components/misc-charges/add-edit';
import { IMiscCharges } from '@/types/interfaces/miscCharges';
import { useGetMiscChargesByIdQuery } from '@/features/miscCharges/miscChargesAPI';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const initialMiscCharges: IMiscCharges = {
    id: '',
    defaultDiscountRate: 0,
    specialDiscountRate: 0,
    defaultTaxRate: 0,
    specialTaxRate: 0,
    defaultDeliveryCharge: 0,
    specialDeliveryRate: 0,
    welcomeWalletAmt: 0,
    walletDeductionRateOnOrder: 0,
    orderReturnCommRateOA: 0,
    orderReturnCommRateNOA: 0,
    refByAddCommRate: 0,
};

const AddEditIndex = () => {
    const router = useRouter();
    const [miscChargess, setMiscChargess] = useState<IMiscCharges>(initialMiscCharges);
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

    const { data: MiscChargesData } = useGetMiscChargesByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ MiscChargesData:', MiscChargesData);

    useEffect(() => {
        if (MiscChargesData?.data) {
            setMiscChargess(MiscChargesData?.data);
        }
    }, [MiscChargesData]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedMiscChargess={miscChargess}
                setSelectedMiscChargess={setMiscChargess}
            />
        </div>
    );
};

export default AddEditIndex;
