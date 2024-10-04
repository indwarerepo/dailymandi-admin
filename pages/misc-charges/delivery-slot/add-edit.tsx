import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddEditComponent from '@/components/misc-charges/delivery-slot/add-edit';
import { RDeliverySlot } from '@/types/interfaces/miscCharges';
import { useGetDeliverySlotByIdQuery } from '@/features/miscCharges/miscChargesAPI';
import moment from 'moment';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';
const initialDeliverySlot: RDeliverySlot = {
    id: '',
    displayContent: '',
    timeFrom: new Date(),
    timeTo: new Date(),
};

const AddEditIndex = () => {
    const router = useRouter();
    const [deliverySlots, setDeliverySlot] = useState<RDeliverySlot>(initialDeliverySlot);
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

    const { data: DeliverySlotsData } = useGetDeliverySlotByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ DeliverySlotsData:', DeliverySlotsData);

    useEffect(() => {
        if (DeliverySlotsData?.data && id) {
            setDeliverySlot({
                id: DeliverySlotsData?.data?.id,
                displayContent: DeliverySlotsData?.data?.displayContent,
                // timeFrom: DeliverySlotsData?.data?.id,
                // timeFrom: DeliverySlotsData?.data?.id,
                timeFrom: new Date(moment(DeliverySlotsData?.data?.timeFrom).format()) as unknown as string,
                timeTo: new Date(moment(DeliverySlotsData?.data?.timeTo).format()) as unknown as string,
            });
        }
    }, [DeliverySlotsData, IDBDatabase]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedDeliverySlots={deliverySlots}
                setSelectedDeliverySlots={setDeliverySlot}
            />
        </div>
    );
};

export default AddEditIndex;
