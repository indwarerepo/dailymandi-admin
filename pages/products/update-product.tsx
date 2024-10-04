import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { useGetProductByIdQuery } from '@/features/product/productAPI';
import { useAppSelector } from '@/store/hooks';
import { getCookie } from 'cookies-next';
import { CornerUpLeft, Slash } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const UpdateProductComponent = dynamic(() => import('@/components/products/update-product'), {
    ssr: false,
});
const UpdateProductIndex = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const aone_token = getCookie('aone_token');
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);
    if (aone_token) {
        if (userType === 'Driver') {
            router.push('/delivery-dashboard');
        }
    } else {
        router.push('/');
    }
    let { data } = useGetProductByIdQuery(id, { skip: !id });
    console.log('🚀 ~ UpdateAgency ~ data:', data);
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
                                <BreadcrumbPage>Update Product</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">Update Product</h2>
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
            <UpdateProductComponent
                selectedProducts={data?.data}
                isUpdate={router?.query?.id ? true : false}
                productId={id}
            />
        </div>
    );
};

export default UpdateProductIndex;
