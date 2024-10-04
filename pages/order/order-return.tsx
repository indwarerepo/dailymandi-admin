import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/order/add-edit';
import { useAppSelector } from '@/store/hooks';
import { IPermission } from '@/types/interfaces/permission';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import {
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
    Eye,
} from 'lucide-react';

const initialPermissions = {
    name: '',
    description: '',
};

const AddEditIndex = () => {
    const [permission, setPermission] = useState<IPermission>(initialPermissions);
    const router = useRouter();
    const { id } = router.query;

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
        <>
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
                            <BreadcrumbLink href="#" className="text-[#00A8E1]">
                                Orders
                            </BreadcrumbLink>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>

                            <BreadcrumbItem>
                                <BreadcrumbPage>Order Return</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">All Order Return</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" className="py-1 px-3">
                            <Upload className="mr-2 h-4 w-4" /> Export Order Return
                        </Button>
                    </div>
                </div>
            </div>
            {/* Breadcrumb and Header End ==================== */}

            {/* Filter and Search Start==================== */}
            <div className="grid grid-cols-12 gap-3 my-3">
                <div className="col-span-12">
                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" className="py-1 px-3">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                        <div className="relative">
                            <Label htmlFor="search"></Label>
                            <Input
                                id="search"
                                placeholder="Search..."
                                className="border-borderColor focus:border-borderColor bg-card outline-none py-1 px-3"
                            />
                            <div className="absolute top-3 right-2  max-[500px]:hidden">
                                <Search className="mr-2 w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Order /> */}
        </>
        // <div>
        //   <AddEditComponent
        //     isUpdate={id ? true : false}
        //     selectedPermissions={permission}
        //     permissionId={id as string}
        //   />
        // </div>
    );
};

export default AddEditIndex;
