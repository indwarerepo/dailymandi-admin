import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CommandList } from 'cmdk';
import { Spinner } from '@/components/ui/spinner';
import { useGetTaxDDQuery } from '@/features/tax/taxAPI';
interface VarienDropdownProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    taxId: string;
    name: string;
}
const TaxProductDropdown = ({ onChange, taxId, name }: VarienDropdownProps) => {
    const [open, setOpen] = useState(false);
    const { data: taxList, isLoading } = useGetTaxDDQuery();

    const [isActive, setActive] = useState(false);
    const selectClass = () => {
        setActive(!isActive);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full  text-xs sm:text-sm font-normal flex justify-between items-center bg-transparent border"
                    role="combobox"
                    aria-expanded={open}
                >
                    {taxId ? taxList?.data?.find((framework: any) => framework.id === taxId)?.slab : 'Select Tax'}
                    <ChevronDown className="ml-1 w-4 h-4" />
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
                            <CommandEmpty>No Tax Found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList className="max-h-[10rem] overflow-y-scroll">
                                    {taxList?.data?.map((tax: any) => {
                                        return (
                                            <CommandItem
                                                disabled={false}
                                                key={tax?.id}
                                                value={tax?.slab}
                                                onSelect={() => {
                                                    onChange({
                                                        target: {
                                                            name: name,
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

export default TaxProductDropdown;
