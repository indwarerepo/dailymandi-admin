import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pen, Save, Trash } from 'lucide-react';
import * as React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import DataTable from '@/components/ui-lib/data-table';
import { TooltipComponent } from '@/components/ui-lib/hover-tooltip';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import { PermissionData } from '@/types/interfaces/permission';
import { Switch } from '@/components/ui/switch';
import { toast, useToast } from '@/components/ui/use-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IPermission } from '@/types/interfaces/permission';
import { useFormik } from 'formik';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
type props = {
    selectedPermissions: IPermission;
    permissionId: string;
    isUpdate: boolean;
};

export function StoreDetails() {
    // Form handling & validation using formik & yup schemas
    // const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    //     initialValues: selectedPermissions,
    //     validationSchema: permissionSchema,
    //     validateOnChange: true,
    //     validateOnBlur: false,
    //     enableReinitialize: true,

    //     onSubmit: async (values, action) => {
    //         console.log(values);
    //     },
    // });
    const [date, setDate] = React.useState<Date>();
    return (
        <>
            <Card className="w-full px-14 py-14 cus-form max-[500px]:px-6 max-[500px]:py-6 border-[1px] mt-5">
                {' '}
                <form className="grid w-full items-center">
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-7 mb-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">
                                    Product Name<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    // value={values?.name}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {/* {touched.name && errors.name ? ( */}
                                <small id="name-help" className="text-rose-600">
                                    {/* {errors.name} */}
                                </small>
                                {/* ) : null} */}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="stock-alert">Upload Image</Label>
                                <Input id="picture" type="file" className="" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="category">
                                    Category<sup className="text-rose-600">*</sup>
                                </Label>
                                <Select>
                                    <SelectTrigger className="border-borderColor focus:border-borderColor bg-card outline-none">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="hsncode">
                                    HSN Code<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    // value={values?.name}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">
                                    GST % <sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    // value={values?.name}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="description">
                                    Package Size <sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    // value={values?.name}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="mrp">
                                    MRP<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    // value={values?.name}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="discounted-price">
                                    Discounted Price<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    // value={values?.name}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="stock-in-hand">
                                    Stock in hand<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    // value={values?.name}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="stock-alert">
                                    Stock Alert<sup className="text-rose-600">*</sup>
                                </Label>
                                <Input
                                    // value={values?.name}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="fmg-date">
                                    FMG Date<sup className="text-rose-600">*</sup>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !date && 'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="exp-date">
                                    EXP Date<sup className="text-rose-600">*</sup>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !date && 'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="col-span-1 flex flex-col space-y-1.5">
                                <Label htmlFor="name">Description</Label>
                                <Input
                                    // value={values?.name}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                                />
                                {/* {touched.name && errors.name ? ( */}
                                <small id="name-help" className="text-rose-600">
                                    {/* {errors.name} */}
                                </small>
                                {/* ) : null} */}
                            </div>
                            <div className="flex  gap-6 space-y-1.5">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <Label htmlFor="terms">Best Selling</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <Label htmlFor="terms">Best Selling</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <Label htmlFor="terms">Best Selling</Label>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button
                            className="rounded-lg px-6 bg-[var(--workspaceColor3)] text-[var(--workspaceColor4)]"
                            variant="outline"
                            onClick={() => {
                                toast({
                                    title: 'Uh oh! Something went wrong.',
                                });
                            }}
                        >
                            <Save className="mr-3 w-4 h-4" />
                            Save
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}
export default StoreDetails;
