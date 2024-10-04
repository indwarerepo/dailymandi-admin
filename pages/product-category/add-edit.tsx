import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/product-category/add-edit';
import { ProductCategory } from '@/types/interfaces/productCategory';
import { useGetProductCategoryByIdQuery } from '@/features/productCategory/productCategoryAPI';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const initialProduct: ProductCategory = {
    id: '',
    name: '',
    description: '',
    coverImage: '',
    coverVideo: '',
    displayOrder: 0,
};

const AddEditIndex = () => {
    const [products, setProducts] = useState<ProductCategory>(initialProduct);
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

    const { data: ProductData } = useGetProductCategoryByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ ProductData:', ProductData);

    useEffect(() => {
        if (ProductData?.data) {
            setProducts(ProductData?.data);
        }
    }, [ProductData]);

    return (
        <div>
            <AddEditComponent
                isUpdate={isUpdate}
                thisId={id as string}
                selectedProducts={products}
                setSelectedProducts={setProducts}
            />
        </div>
    );
};

export default AddEditIndex;
