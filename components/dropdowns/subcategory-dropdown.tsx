import { useEffect, useState } from 'react';
import { ArrowDown, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CommandList } from 'cmdk';

import { Spinner } from '@/components/ui/spinner';
// import { useGetProductSubCategoryDDQuery } from '@/features/productSubcategory/productSubcategoryAPI';
import { useGetSubCategoryByCategoryIdQuery } from '@/features/product/productAPI';
import { toast } from 'sonner';

const SubCategoryByCategory = ({ onChange, categoryId, subCategoryId }: any) => {
    const [open, setOpen] = useState(false);
    const {
        data: subCategoryData,
        error,
        isLoading,
    } = useGetSubCategoryByCategoryIdQuery(categoryId, { skip: !categoryId });
    // console.log('🚀 ~ SubCategoryByCategory ~ subCategoryData:', subCategoryData);

    useEffect(() => {
        if (error) {
            toast.error('Failed to fetch Subcategory');
        }
    }, [error]);

    const [isActive, setActive] = useState(false);
    const selectClass = () => {
        setActive(!isActive);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full  text-xs sm:text-sm flex justify-between items-center bg-transparent border"
                    role="combobox"
                    aria-expanded={open}
                    // onClick={selectClass}
                >
                    <p className={isActive ? 'select my-auto' : 'my-auto'}>
                        {subCategoryId
                            ? subCategoryData?.data?.find((subCategory: any) => subCategory.id === subCategoryId)?.name
                            : 'Select Sub Category'}
                    </p>
                    <ArrowDown className="ml-1 w-4 h-4" />
                </Button>

                {/* <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full rounded-full px-3 justify-between drop-button"
                    onClick={selectClass}
                >
                    <p className="my-auto">
                        {categoryId
                            ? ddProductCategory?.data?.find((framework: any) => framework.id === categoryId)?.name
                            : 'Select Category'}
                    </p>

                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button> */}
            </PopoverTrigger>
            <PopoverContent className="z-[1000] p-0">
                <Command className="w-full ">
                    <CommandInput placeholder="Search Category" className="h-9 w-full" />
                    {isLoading ? (
                        <div className="p-4">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            <CommandEmpty>No Sub Category found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList className="max-h-[10rem] overflow-y-scroll">
                                    {subCategoryData?.data?.map((subCategory: any) => {
                                        return (
                                            <CommandItem
                                                disabled={false}
                                                key={subCategory?.id}
                                                value={subCategory?.name}
                                                onSelect={() => {
                                                    onChange({
                                                        target: {
                                                            name: 'subCategoryId',
                                                            value: subCategory?.id,
                                                        },
                                                    });
                                                    setOpen(false);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                {subCategory?.name}
                                                <Check
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        subCategoryId === subCategory?.id ? 'opacity-100' : 'opacity-0',
                                                    )}
                                                />
                                            </CommandItem>
                                        );
                                    })}
                                </CommandList>
                            </CommandGroup>
                        </>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SubCategoryByCategory;
