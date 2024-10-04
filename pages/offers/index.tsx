import { Offers } from '@/components/offers/offers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
} from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { useRouter } from 'next/router';

export default function GeneratewarrantyIndex() {
    const router = useRouter();
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

                            <BreadcrumbItem>
                                <BreadcrumbPage>Discount</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="text-2xl tracking-tight mb-1 mt-1 font-poppins font-medium">All Discount</h2>
                </div>
                <div className="col-span-12 sm:col-span-8">
                    <div className="flex justify-end flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="py-1 px-3">
                            <MonitorUp className="mr-2 h-4 w-4" /> Import Discount
                        </Button>
                        <Button className="py-1 px-3" onClick={() => router.push('/products/add-edit')}>
                            <BadgePlus className="mr-2 w-4 h-4" /> New Discount
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
            {/* Filter and Search End ==================== */}
            <Offers />
        </>
    );
}
