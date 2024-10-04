import { useState } from 'react';
import { ArrowDown, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CommandList } from 'cmdk';
import { useGetProductCategoryDDQuery } from '@/features/productCategory/productCategoryAPI';

import { Spinner } from '@/components/ui/spinner';

const ProductCategoryDropdown = ({ onChange, categoryId }: any) => {
    const [open, setOpen] = useState(false);
    const { data: ddProductCategory, isLoading } = useGetProductCategoryDDQuery();

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
                >
                    {categoryId
                        ? ddProductCategory?.data?.find((framework: any) => framework.id === categoryId)?.name
                        : 'Select Category'}
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
                            <CommandEmpty>No Category found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList className="max-h-[10rem] overflow-y-scroll">
                                    {ddProductCategory?.data?.map((category: any) => {
                                        return (
                                            <CommandItem
                                                disabled={false}
                                                key={category?.id}
                                                value={category?.name}
                                                onSelect={() => {
                                                    onChange({
                                                        target: {
                                                            name: 'categoryId',
                                                            value: category?.id,
                                                        },
                                                    });
                                                    setOpen(false);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                {category?.name}
                                                <Check
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        categoryId === category?.id ? 'opacity-100' : 'opacity-0',
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

export default ProductCategoryDropdown;
