import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Login } from '@/types/interfaces/user';
import { forgotPasswordSchema, loginSchema } from '@/types/schemas';
import { useToast } from '../ui/use-toast';
import { CustomPasswordInput } from '../ui-lib/custom-password-input';
import { useRouter } from 'next/router';
import google from '@/public/images/gicon.png';
import Image from 'next/image';

import { useFormik } from 'formik';
import { Code, LockKeyhole, Mail, User } from 'lucide-react';
import { useLoginMutation } from '@/features/auth/authApi';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function UserOtpForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const router = useRouter();

    // const [login] = useLoginMutation();

    // Form handling & validation using formik & yup schemas
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: { email: '' },
        validationSchema: forgotPasswordSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,

        onSubmit: async (values, action) => {
            console.log('🚀 ~ onSubmit: ~ values:', values);
            setIsLoading(true);
            router.push('/auth/reset-password');
            // const payload = {
            //   email: values.email,
            //   password: values.password,
            // };
            // try {
            //   let res = await login(payload).unwrap();
            //   if (res.statusCode === 200) {
            //     toast({
            //       variant: "sucess",
            //       title: "🎉 You have successfully logged in.",
            //       duration: 3500,
            //     });
            //     router.push(`/dashboard`);
            //   } else {
            //     toast({
            //       variant: "error",
            //       title: `🛑 ${res?.message}`,
            //       duration: 1500,
            //     });
            //   }
            //   action.resetForm();
            // } catch (error: any) {
            //   console.log("🚀 ~ file: login1.tsx:59 ~ onSubmit: ~ error:", error);
            //   toast({
            //     variant: "error",
            //     title: `🛑 ${error?.data?.message}`,
            //     duration: 1500,
            //   });
            // }
            // setIsLoading(false);
        },
    });

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit} className="relative">
                <Card className="border-0 shadow-none">
                    <CardHeader className="text-center">
                        <CardTitle className="mb-1">OTP</CardTitle>
                        <CardDescription>
                            Enter your OTP.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-2">
                            <Label className="sr-only" htmlFor="email">
                                OTP
                            </Label>
                            <Input
                                prefixIcon={<Code className="h-5 w-5 text-pophover-foreground" />}
                                id="email"
                                placeholder="Otp"
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
                    </CardContent>

                    <CardFooter className="mb-6 flex-wrap">
                        <Button
                            disabled={isLoading}
                            className="px-8 rounded-lg w-full mt-0 button-col hover:bg-appColor/90"
                        >
                            {isLoading ? (
                                <Icons.spinner className="h-4 w-4 animate-spin" />
                            ) : (
                                <p className="uppercase text-xs tracking-wide text-white font-raleway">Submit</p>
                            )}
                        </Button>
                    </CardFooter>
                    <div className="w-full flex items-center justify-center mt-4 text-sm forget">
                        Already Have An Account? &nbsp;
                        <Link href="/" className="text-sm font-normal font-popp">
                            Login
                        </Link>
                    </div>
                </Card>
            </form>
        </div>
    );
}
