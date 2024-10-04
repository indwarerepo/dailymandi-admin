import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CommandList } from 'cmdk';
import { useGetTaxDDQuery } from '@/features/tax/taxAPI';

import { Spinner } from '@/components/ui/spinner';

const TaxDropdown = ({ onChange, taxId }: any) => {
    const [open, setOpen] = useState(false);
    const { data: ddTax, isLoading } = useGetTaxDDQuery();

    const [isActive, setActive] = useState(false);
    const selectClass = () => {
        setActive(!isActive);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full rounded-full px-3 justify-between drop-button"
                    // onClick={selectClass}
                >
                    <p className="my-auto">
                        {taxId ? ddTax?.data?.find((framework: any) => framework.id === taxId)?.slab : 'Select Tax'}
                    </p>

                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-[1000] p-0">
                <Command className="w-full ">
                    <CommandInput placeholder="Search Tax" className="h-9 w-full" />
                    {isLoading ? (
                        <div className="p-4">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            <CommandEmpty>No Tax found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList className="max-h-[10rem] overflow-y-scroll">
                                    {ddTax?.data?.map((tax: any) => {
                                        return (
                                            <CommandItem
                                                disabled={false}
                                                key={tax?.id}
                                                value={tax?.slab}
                                                onSelect={() => {
                                                    onChange({
                                                        target: {
                                                            name: 'taxId',
                                                            value: tax?.id,
                                                        },
                                                    });
                                                    setOpen(false);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                {tax?.slab}
                                                <Check
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        taxId === tax?.id ? 'opacity-100' : 'opacity-0',
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

export default TaxDropdown;
