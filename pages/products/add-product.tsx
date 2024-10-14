import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { useToast } from '@/components/ui/use-toast';
import { IPermission } from '@/types/interfaces/permission';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import {
    CornerUpLeft,
    ChevronLeft,
    FileDown,
    FileUp,
    Plus,
    Search,
    BadgePlus,
    Filter,
    ExternalLink,
    ArrowDown,
    Upload,
    MonitorUp,
    Save,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { IAddProduct } from '@/types/interfaces/product';
import AddProductComponent from '@/components/products/add-product';
import { getCookie } from 'cookies-next';

const initialProducts = {
    name: '',
    manufacturer: '',
    specification: '',
    description: '',
    productImage: '',
    categoryId: '',
    subCategoryId: '',
    brandId: '',
    isFeatured: false,
    isNewProduct: true,
    isBestSeller: false,
    paymentTerm: '',
    warrantyPolicy: '',
    metaTitle: '',
    metaDescription: '',
    // productVariant: [],
    productVariant: [
        {
            variantId: '',
            skuNo: '',
            qrCode: '',
            purchaseCost: 0,
            mrp: 0,
            sellingPrice: 0,
            offerPrice: 0,
            taxId: '',
            stock: 0,
            isReturnable: false,
            returnDaysLimit: 0,
            batchNo: '',
            remarks: '',
            manufacturingDate: new Date(),
            expiryDate: new Date(),
            productVariantImage: [],
        },
    ],
};

const AddEditIndex = () => {
    const [product, setProduct] = useState<IAddProduct>(initialProducts);
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
    // const [engineer, setEngineer] = useState<ICreateEngineer>(initialValues);
    // const router = useRouter();
    // const { id } = router.query as { id: string };
    // const { data } = useGetEngineerDetailsByIdQuery(id,{ skip: !id });
    // useEffect(() => {
    //   const selectedPermissions = permissionList.find((p) => p.id === id);
    //   if (selectedPermissions) {
    //     setPermission({
    //       name: selectedPermissions?.name,
    //       description: selectedPermissions?.description,
    //     });
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [id, router.query]);

    return (
        <div>
            {/* Breadcrumb and Header Start==================== */}
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 sm:col-span-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="text-[#00A8E1]">
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>

                            <BreadcrumbItem>
                                <BreadcrumbPage
                                    onClick={() => router.push('/products')}
                                    className="text-[#00A8E1] cursor-pointer"
                                >
                                    Products
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Add Product</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">Add Product</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        <Button onClick={() => router.push('/products')} variant="outline" className="py-1 px-3">
                            <CornerUpLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
            </div>
            {/* Breadcrumb and Header End ==================== */}
            <AddProductComponent isUpdate={id ? true : false} selectedProducts={product} productId={id as string} />
        </div>
    );
};

export default AddEditIndex;
