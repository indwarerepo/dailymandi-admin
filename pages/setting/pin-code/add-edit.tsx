import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/setting/pin-code/add-edit';
import { IPINCode } from '@/types/interfaces/pinCode';
import { useGetPINCodeByIdQuery } from '@/features/pinCode/pinCodeAPI';

const initialPINCode: IPINCode = {
    id: '',
    area: '',
    district: '',
    pincode: 0,
    zoneId: '',
};

const AddEditIndex = () => {
    const [pinCodes, setPINCodes] = useState<IPINCode>(initialPINCode);
    const router = useRouter();
    const { id } = router.query;
    const isUpdate = id === undefined || id === '' || id === null ? false : true;

    const { data: PINCodeData } = useGetPINCodeByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ ProductData:', ProductData);

    useEffect(() => {
        if (PINCodeData?.data) {
            const { zone, ...rest } = PINCodeData?.data;
            setPINCodes({ ...rest, zoneId: zone?.id as string });
        }
    }, [PINCodeData]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedPINCodes={pinCodes}
                setSelectedPINCodes={setPINCodes}
            />
        </div>
    );
};

export default AddEditIndex;
