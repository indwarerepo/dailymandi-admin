import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersRound, ArrowDownUp, Layers2, Wallet } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartConfig, ChartTooltip, ChartTooltipContent, ChartContainer } from '@/components/ui/chart';

const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#93da29',
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--workspaceColor2)',
    },
} satisfies ChartConfig;

const Dashboard = () => {
    return (
        <div className="w-[100%] flex flex-col gap-8">
            <div>{/* <p className="text-sm mb-0">Welcome to Aonemart Admin</p> */}</div>
            <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-6">
                <Card className="w-full p-8 shadow-md hover:shadow ">
                    <CardHeader className=" p-1 mb-5 w-10 h-10 bg-[#f5f5f5] rounded-md">
                        <Layers2 className="p-3-600 w-8 h-8 text-[var(--workspaceColor2)]" />
                    </CardHeader>
                    <CardContent className="py-0">
                        <p className="text-md sm:text-lg font-medium leading-4 mb-2 text-[#868686] pr-5">Revenue</p>
                        <p className="text-base sm:text-3xl leading-4 font-medium text-black">₹ 6545</p>
                    </CardContent>
                    <CardFooter className="justify-start mt-2 text-lg">
                        <ArrowDownUp className="mr-2 h-4 w-4 " /> +74.20%
                    </CardFooter>
                </Card>
                <Card className="w-full p-8 shadow-md hover:shadow ">
                    <CardHeader className=" p-1 mb-5 w-10 h-10 bg-[#f5f5f5] rounded-md">
                        <Layers2 className="p-3-600 w-8 h-8 text-[var(--workspaceColor2)]" />
                    </CardHeader>
                    <CardContent className="py-0">
                        <p className="text-md sm:text-lg font-medium leading-4 mb-2 text-[#868686] pr-5">Revenue</p>
                        <p className="text-base sm:text-3xl leading-4 font-medium text-black">₹ 6545</p>
                    </CardContent>
                    <CardFooter className="justify-start mt-2 text-lg">
                        <ArrowDownUp className="mr-2 h-4 w-4 " /> +74.20%
                    </CardFooter>
                </Card>
                <Card className="w-full p-8 shadow-md hover:shadow ">
                    <CardHeader className=" p-1 mb-5 w-10 h-10 bg-[#f5f5f5] rounded-md">
                        <Layers2 className="p-3-600 w-8 h-8 text-[var(--workspaceColor2)]" />
                    </CardHeader>
                    <CardContent className="py-0">
                        <p className="text-md sm:text-lg font-medium leading-4 mb-2 text-[#868686] pr-5">Revenue</p>
                        <p className="text-base sm:text-3xl leading-4 font-medium text-black">₹ 6545</p>
                    </CardContent>
                    <CardFooter className="justify-start mt-2 text-lg">
                        <ArrowDownUp className="mr-2 h-4 w-4 " /> +74.20%
                    </CardFooter>
                </Card>
                <Card className="w-full p-8 shadow-md hover:shadow">
                    <CardHeader className=" p-1 w-10 h-10 mb-5 bg-[#f5f5f5] rounded-md">
                        <Wallet className="p-3-600 w-8 h-8 text-[var(--workspaceColor2)]" />
                    </CardHeader>
                    <CardContent className="py-0">
                        <p className="text-md sm:text-lg font-medium leading-4 mb-2 text-[#868686] pr-5">Profit</p>
                        <p className="text-base sm:text-3xl leading-4 font-medium text-black">₹ 6545</p>
                    </CardContent>
                    <CardFooter className="justify-start mt-2 text-lg">
                        <ArrowDownUp className="mr-2 h-4 w-4" /> +74.20%
                    </CardFooter>
                </Card>
                <Card className="w-full p-8 shadow-md hover:shadow">
                    <CardHeader className=" p-1 w-10 h-10 mb-5 bg-[#f5f5f5] rounded-md">
                        <Wallet className="p-3-600 w-8 h-8 text-[var(--workspaceColor2)]" />
                    </CardHeader>
                    <CardContent className="py-0">
                        <p className="text-md sm:text-lg font-medium leading-4 mb-2 text-[#868686] pr-5">Profit</p>
                        <p className="text-base sm:text-3xl leading-4 font-medium text-black">₹ 6545</p>
                    </CardContent>
                    <CardFooter className="justify-start mt-2 text-lg">
                        <ArrowDownUp className="mr-2 h-4 w-4" /> +74.20%
                    </CardFooter>
                </Card>
                <Card className="w-full p-8 shadow-md hover:shadow">
                    <CardHeader className=" p-1 w-10 h-10 mb-5 bg-[#f5f5f5] rounded-md">
                        <Wallet className="p-3-600 w-8 h-8 text-[var(--workspaceColor2)]" />
                    </CardHeader>
                    <CardContent className="py-0">
                        <p className="text-md sm:text-lg font-medium leading-4 mb-2 text-[#868686] pr-5">Profit</p>
                        <p className="text-base sm:text-3xl leading-4 font-medium text-black">₹ 6545</p>
                    </CardContent>
                    <CardFooter className="justify-start mt-2 text-lg">
                        <ArrowDownUp className="mr-2 h-4 w-4" /> +74.20%
                    </CardFooter>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-3">
                <div className="col-12 sm:col-4">
                    <Card className="shadow-md p-4">
                        <CardHeader>
                            <p className="text-md sm:text-lg font-medium leading-6 mb-4 text-[#383838] pr-5">
                                Order Wise Revenue
                            </p>
                        </CardHeader>
                        <ChartContainer config={chartConfig} className="min-h-[160px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </Card>
                </div>
                <div className="col-12 sm:col-4">
                    <Card className="shadow-md p-4">
                        <CardHeader>
                            <p className="text-md sm:text-lg font-medium leading-1 mb-4 text-[#383838] pr-5">
                                Product Wise Sales
                            </p>
                        </CardHeader>
                        <ChartContainer config={chartConfig} className="min-h-[160px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </Card>
                </div>
                <div className="col-12 sm:col-4">
                    <Card className="shadow-md p-4">
                        <CardHeader>
                            <p className="text-md sm:text-lg font-medium leading-1 mb-4 text-[#383838] pr-5">Order</p>
                        </CardHeader>
                        <ChartContainer config={chartConfig} className="min-h-[160px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
