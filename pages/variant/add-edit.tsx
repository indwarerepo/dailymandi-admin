import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddEditComponent from '@/components/variant/add-edit';
import { IVariant } from '@/types/interfaces/variant';
import { useGetVariantByIdQuery } from '@/features/variant/variantAPI';

const initialVariant: IVariant = {
    id: '',
    variantName: '',
    description: '',
};
const AddEditIndex = () => {
    const [variants, setVariants] = useState<IVariant>(initialVariant);
    const router = useRouter();
    const { id } = router.query;
    const isUpdate = id === undefined || id === '' || id === null ? false : true;

    const { data: VariantData } = useGetVariantByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ ProductData:', ProductData);

    useEffect(() => {
        if (VariantData?.data) {
            setVariants(VariantData?.data);
        }
    }, [VariantData]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedVariants={variants}
                setSelectedVariants={setVariants}
            />
        </div>
    );
};

export default AddEditIndex;
