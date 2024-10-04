import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CommandList } from 'cmdk';

import { Spinner } from '@/components/ui/spinner';
import { useGetAllBrandDropdownlistQuery } from '@/features/brand/brandAPI';

const BrandDropdown = ({ onChange, brandId }: any) => {
    const [open, setOpen] = useState(false);
    const { data: ddBrand, isLoading } = useGetAllBrandDropdownlistQuery();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full  text-xs sm:text-sm flex justify-between items-center bg-transparent border"
                    role="combobox"
                    aria-expanded={open}
                >
                    {brandId ? ddBrand?.data?.find((framework: any) => framework.id === brandId)?.name : 'Select Brand'}
                    <ChevronDown className="ml-1 w-4 h-4" />
                </Button>
                {/* <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full rounded-full px-3 justify-between drop-button"
                >
                    <p className="my-auto">
                        {brandId
                            ? ddBrand?.data?.find((framework: any) => framework.id === brandId)?.name
                            : 'Select Brand'}
                    </p>

                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button> */}
            </PopoverTrigger>
            <PopoverContent className="z-[1000] p-0">
                <Command className="w-full ">
                    <CommandInput placeholder="Search Brand" className="h-9 w-full" />
                    {isLoading ? (
                        <div className="p-4">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            <CommandEmpty>No Brand found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList className="max-h-[10rem] overflow-y-scroll">
                                    {ddBrand?.data?.map((brand: any) => {
                                        return (
                                            <CommandItem
                                                disabled={false}
                                                key={brand?.id}
                                                value={brand?.name}
                                                onSelect={() => {
                                                    onChange({
                                                        target: {
                                                            name: 'brandId',
                                                            value: brand?.id,
                                                        },
                                                    });
                                                    setOpen(false);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                {brand?.name}
                                                <Check
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        brandId === brand?.id ? 'opacity-100' : 'opacity-0',
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

export default BrandDropdown;
