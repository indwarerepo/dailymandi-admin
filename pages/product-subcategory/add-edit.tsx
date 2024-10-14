import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/product-subcategory/add-edit';
import { ProductSubCategory } from '@/types/interfaces/productSubCategory';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';
import { useGetProductSubCategoryByIdQuery } from '@/features/productSubcategory/productSubcategoryAPI';

const initialProduct: ProductSubCategory = {
    id: '',
    name: '',
    coverImage: '',
    categoryId: '',
    description: '',
    metaTitle: '',
    metaDescription: '',
};

const AddEditIndex = () => {
    const [products, setProducts] = useState<ProductSubCategory>(initialProduct);
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

    const { data: ProductData } = useGetProductSubCategoryByIdQuery(id as string, {
        skip: isUpdate ? false : true,
    });
    // console.log('🚀 ~ AddEditIndex ~ ProductData:', ProductData);

    useEffect(() => {
        if (ProductData?.data) {
            const { product_category, ...rest } = ProductData?.data;
            setProducts({ ...rest, categoryId: product_category?.id as string });
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
