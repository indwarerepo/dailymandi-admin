import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CommandList } from 'cmdk';

import { useGetZoneDDQuery } from '@/features/zone/zoneAPI';
import { Spinner } from '@/components/ui/spinner';

const ZoneDropdown = ({ onChange, zoneId }: any) => {
    const [open, setOpen] = useState(false);
    const { data: ddZone, isLoading } = useGetZoneDDQuery();

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
                        {zoneId
                            ? ddZone?.data?.find((framework: any) => framework.id === zoneId)?.zoneName
                            : 'Select Zone'}
                    </p>

                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-[1000] p-0">
                <Command className="w-full ">
                    <CommandInput placeholder="Search Zone" className="h-9 w-full" />
                    {isLoading ? (
                        <div className="p-4">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            <CommandEmpty>No zone found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList className="max-h-[10rem] overflow-y-scroll">
                                    {ddZone?.data?.map((zone: any) => {
                                        return (
                                            <CommandItem
                                                disabled={false}
                                                key={zone?.id}
                                                value={zone?.zoneName}
                                                onSelect={() => {
                                                    onChange({
                                                        target: {
                                                            name: 'zoneId',
                                                            value: zone?.id,
                                                        },
                                                    });
                                                    setOpen(false);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                {zone?.zoneName}
                                                <Check
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        zoneId === zone?.id ? 'opacity-100' : 'opacity-0',
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

export default ZoneDropdown;
