import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Icons } from '../ui/icons';

import { Login } from '@/types/interfaces/user';
import { loginSchema } from '@/types/schemas';
import { toast } from 'sonner';
import { CustomPasswordInput } from '../ui-lib/custom-password-input';
import { useRouter } from 'next/router';
import google from '@/public/images/gicon.png';
import Image from 'next/image';
import { useFormik } from 'formik';
import { LockKeyhole, Mail, User } from 'lucide-react';
import { useLoginMutation } from '@/features/auth/authApi';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/store/hooks';
import { getCookie } from 'cookies-next';

let initialValues: Login = {
    email: '',
    password: '',
};

export function UserLoginAuthForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const [login] = useLoginMutation();
    const aone_token = getCookie('aone_token');
    let authState = useAppSelector((state) => state.persistedReducers.authSlice);

    if (aone_token) {
        if (authState?.data?.userType === 'Driver') {
            router.push('/delivery-dashboard');
        } else {
            router.push('dashboard');
        }
    }

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            // router.push('/dashboard/');
            const payload = {
                email: values.email,
                password: values.password,
            };
            try {
                let res = await login(payload).unwrap();
                if (res.statusCode === 200) {
                    // toast({
                    //     variant: 'sucess',
                    //     title: '🎉 You have successfully logged in.',
                    //     duration: 3500,
                    // });
                    toast.success(`🎉 You have successfully logged in.`);
                    if (res.userType === 'Admin') {
                        router.push(`/dashboard`);
                    } else {
                        router.push(`/delivery-dashboard`);
                    }
                } else {
                    // toast({
                    //     variant: 'error',
                    //     title: `🛑 ${res?.message}`,
                    //     duration: 1500,
                    // });
                    toast.error(`🛑 ${res?.message}`);
                }
                // action.resetForm();
            } catch (error: any) {
                console.log('🚀 ~ file: login1.tsx:59 ~ onSubmit: ~ error:', error);
                // toast({
                //     variant: 'error',
                //     title: `🛑 ${error?.data?.message}`,
                //     duration: 1500,
                // });
                toast.error(`🛑 ${error?.data?.message}`);
            }
            setIsLoading(false);
        },
    });

    return (
        <Card className="border-none shadow-none">
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>

                        <Input
                            prefixIcon={<Mail className="h-5 w-5 text-pophover-foreground" />}
                            id="email"
                            placeholder="Email"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="border-borderColor focus:border-borderColor bg-card outline-none"
                        />
                        {touched.email && errors.email ? (
                            <small id="email-help" className="text-rose-600">
                                {errors.email}
                            </small>
                        ) : null}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <CustomPasswordInput
                            id="password"
                            placeholder="Password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="border-borderColor focus:border-borderColor bg-card outline-none"
                        />
                        {touched.password && errors.password ? (
                            <small id="password-help" className="text-rose-600">
                                {errors.password}
                            </small>
                        ) : null}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isLoading} className="w-full shadow-inner">
                        Sign In
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
