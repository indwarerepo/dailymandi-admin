import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/product/add-edit';
import { useAppSelector } from '@/store/hooks';
import { IPermission } from '@/types/interfaces/permission';
import { Product } from '@/types/interfaces/product';
import { useGetProductByIdQuery } from '@/features/product/productAPI';

const initialProduct: Product = {
    id: '',
    name: '',
    description: '',
    specification: '',
    qrCode: '',
    manufacturer: '',
    productVariant: {
        variantId: '',
        skuNo: '',
        purchaseCost: 0,
        mrp: 0,
        sellingPrice: 0,
        offerPrice: 0,
        taxId: '',
        stock: 0,
        isReturnable: false,
        returnDaysLimit: 0,
        productImage: '',
        batchNo: '',
        remarks: '',
    },
    categoryId: '',
    productAttributes: '',
};

const AddEditIndex = () => {
    const [products, setProducts] = useState<Product>(initialProduct);
    const router = useRouter();
    const { id } = router.query;
    const isUpdate = id === undefined || id === '' || id === null ? false : true;

    const { data: ProductData } = useGetProductByIdQuery(id as string, {
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
