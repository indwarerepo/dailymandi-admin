import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddEditComponent from '@/components/qrcode/add-edit';
import { IQRCode } from '@/types/interfaces/qrcode';
import { useGetQRCodeByIdQuery } from '@/features/qrcode/qrcodeAPI';

const initialQRCode: IQRCode = {
    id: '',
    name: '',
    image: '',
};

const AddEditIndex = () => {
    const [qrcodes, setQRCodes] = useState<IQRCode>(initialQRCode);
    const router = useRouter();
    const { id } = router.query;
    const isUpdate = id === undefined || id === '' || id === null ? false : true;

    const { data: QRCodeData } = useGetQRCodeByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ CouponData:', CouponData);

    useEffect(() => {
        if (QRCodeData?.data) {
            setQRCodes(QRCodeData?.data);
        }
    }, [QRCodeData]);
    QRCodeData;
    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedQRCodes={qrcodes}
                setSelectedQRCodes={setQRCodes}
            />
        </div>
    );
};

export default AddEditIndex;
