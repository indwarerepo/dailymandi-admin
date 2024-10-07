import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CommandList } from 'cmdk';
import { Spinner } from '@/components/ui/spinner';
import { useGetVariantDDQuery } from '@/features/variant/variantAPI';
interface VarienDropdownProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    variantId: string;
    name: string;
}
const VarienDropdown = ({ onChange, variantId, name }: VarienDropdownProps) => {
    const [open, setOpen] = useState(false);
    const { data: varientList, isLoading } = useGetVariantDDQuery();

    const [isActive, setActive] = useState(false);
    const selectClass = () => {
        setActive(!isActive);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full text-xs font-normal flex justify-between items-center bg-transparent border"
                    role="combobox"
                    aria-expanded={open}
                >
                    {variantId
                        ? varientList?.data?.find((framework: any) => framework.id === variantId)?.variantName
                        : 'Select Varient'}
                    <ChevronDown className="ml-1 w-4 h-4" />
                </Button>
                {/* <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full rounded-md px-3 justify-between drop-button"
                    // onClick={selectClass}
                >
                    <p className="my-auto">
                        {variantId
                            ? varientList?.data?.find((framework: any) => framework.id === variantId)?.variantName
                            : 'Select Varient'}
                    </p>

                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button> */}
            </PopoverTrigger>
            <PopoverContent className="z-[1000] p-0">
                <Command className="w-full ">
                    <CommandInput placeholder="Search Varient" className="h-9 w-full" />
                    {isLoading ? (
                        <div className="p-4">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            <CommandEmpty>No Varient Found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList className="max-h-[10rem] overflow-y-scroll">
                                    {varientList?.data?.map((varient: any) => {
                                        return (
                                            <CommandItem
                                                disabled={false}
                                                key={varient?.id}
                                                value={varient?.variantName}
                                                onSelect={() => {
                                                    onChange({
                                                        target: {
                                                            name: name,
                                                            value: varient?.id,
                                                        },
                                                    });
                                                    setOpen(false);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                {varient?.variantName}
                                                <Check
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        variantId === varient?.id ? 'opacity-100' : 'opacity-0',
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

export default VarienDropdown;
