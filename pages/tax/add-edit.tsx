import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddEditComponent from '@/components/tax/add-edit';
import { ITax } from '@/types/interfaces/tax';
import { useGetTaxByIdQuery } from '@/features/tax/taxAPI';

const initialTax: ITax = {
    id: '',
    taxHead: '',
    slab: '',
    percentage: 0,
};

const AddEditIndex = () => {
    const [taxs, setTaxs] = useState<ITax>(initialTax);
    const router = useRouter();
    const { id } = router.query;
    const isUpdate = id === undefined || id === '' || id === null ? false : true;

    const { data: TaxData } = useGetTaxByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ ProductData:', ProductData);

    useEffect(() => {
        if (TaxData?.data) {
            setTaxs(TaxData?.data);
        }
    }, [TaxData]);

    return (
        <div>
            <AddEditComponent isUpdate={isUpdate} thisId={id as string} selectedTaxs={taxs} setSelectedTaxs={setTaxs} />
        </div>
    );
};

export default AddEditIndex;
