import { UserLoginAuthForm } from '@/components/auth/login';
import { useTheme } from 'next-themes';
import { MoonStar, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../public/images/logo.png';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AuthenticationPage() {
    const { setTheme, theme, systemTheme } = useTheme();
    const [themeType, setThemeType] = useState<string | undefined>(undefined);
    useEffect(() => {
        if (theme == 'system') {
            setThemeType(systemTheme);
        } else {
            setThemeType(theme);
        }
    }, [theme, systemTheme]);

    // const toggleTheme = () => {
    //     const newTheme = themeType === 'dark' ? 'light' : 'dark';
    //     setTheme(newTheme);
    //     setThemeType(newTheme);
    // };
    return (
        <div className="relative">
            <div className="grid grid-cols-12  w-full h-fit sm:h-screen">
                <div className="col-span-12 sm:col-span-4  hidden sm:block">
                    <div className="flex flex-col h-fit sm:h-full ">
                        <div className="flex justify-between flex-col h-fit sm:h-full auth-bg-image ">
                            <div className="content-div px-10 py-10 hidden sm:block">
                                <h2 className='"text-3xl sm:text-4xl font-semibold leading-10	text-slate-100 pr-5'>
                                    Your Online Marketplace for Quality Groceries
                                </h2>
                                <p className="text-base sm:text-base font-thin text-slate-100">
                                    Delivering fresh groceries to your doorstep with ease, convenience, and quality.
                                    Your trusted online market for all essentials.
                                </p>
                            </div>
                        </div>
                        <div className="foot px-10 py-5 bg-[#345817] hidden sm:block">
                            <p className="text-sm font-ight text-[var(--green-text-ind)]">
                                © 2024 DailyMandi. All Rights Reserved
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-8 p-3 h-full bg-white login-bg-right">
                    <div className="flex flex-col justify-center items-center h-full">
                        <div className="logo mb-2 sm:mb-7 px-3 py-3 sm:px-10 sm:py-3">
                            {themeType === 'dark' ? (
                                <Image src={logo} alt="logo" width={225} className="" />
                            ) : (
                                <Image src={logo} alt="logo" width={225} className="" />
                            )}
                        </div>
                        <Card className="w-full sm:w-[28rem] border-[1px] shadow-md p-7 sm:px-10 sm:py-9">
                            <CardHeader>
                                <CardTitle className="text-2xl sm:text-2xl mb-1">Welcome to DailyMandi</CardTitle>
                                <CardDescription className="text-xs sm:text-sm ">
                                    Sign in by entering information below
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <UserLoginAuthForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
