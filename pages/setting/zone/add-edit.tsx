import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/setting/zone/add-edit';
import { IZone } from '@/types/interfaces/zone';
import { useGetZoneByIdQuery } from '@/features/zone/zoneAPI';

const initialZone: IZone = {
    id: '',
    zoneName: '',
    area: '',
    district: '',
    deliveryCharge: 0,
};

const AddEditIndex = () => {
    const [zones, setZones] = useState<IZone>(initialZone);
    const router = useRouter();
    const { id } = router.query;
    const isUpdate = id === undefined || id === '' || id === null ? false : true;

    const { data: ZoneData } = useGetZoneByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ ProductData:', ProductData);

    useEffect(() => {
        if (ZoneData?.data) {
            setZones(ZoneData?.data);
        }
    }, [ZoneData]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedZones={zones}
                setSelectedZones={setZones}
            />
        </div>
    );
};

export default AddEditIndex;
