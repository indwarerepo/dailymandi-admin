import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Login } from "@/types/interfaces/user";
import { loginSchema } from "@/types/schemas";
import { useToast } from "../ui/use-toast";
import { CustomPasswordInput } from "../ui-lib/custom-password-input";
import { useRouter } from "next/router";
import google from "@/public/images/gicon.png";
import Image from "next/image";

import { useFormik } from "formik";
import { LockKeyhole, Mail, User } from "lucide-react";
import { useLoginMutation } from "@/features/auth/authApi";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

let initialValues: Login = {
  email: "",
  password: "",
};

export function UserResetPassForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  // const [login] = useLoginMutation();

  // Form handling & validation using formik & yup schemas
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      validateOnChange: true,
      validateOnBlur: false,
      enableReinitialize: true,

      onSubmit: async (values, action) => {
        setIsLoading(true);
        router.push("/dashboard/");
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
            <CardTitle className="mb-1">Reset Password</CardTitle>
            <CardDescription>
              Please make sure your new password must be different form previous used password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label className="sr-only" htmlFor="password">
                New Password
              </Label>
              <CustomPasswordInput
                id="password"
                placeholder="New Password"
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
            <div className="space-y-2">
              <Label className="sr-only" htmlFor="password">
                Confirm Password
              </Label>
              <CustomPasswordInput
                id="password"
                placeholder="Confirm Password"
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

          <CardFooter className="mb-6 flex-wrap">
            <Button
              disabled={isLoading}
              className="px-8 rounded-lg w-full mt-0 button-col hover:bg-appColor/90"
            >
              {isLoading ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : (
                <p className="uppercase text-xs tracking-wide text-white font-raleway">
                  Reset Password
                </p>
              )}
            </Button>

          </CardFooter>
          <div className="w-full flex items-center justify-center mt-4 text-sm forget">
            Already Have An Account? &nbsp;<Link
              href="/"
              className="text-sm font-normal font-popp"
            >Login</Link>

          </div>

        </Card>




      </form>
    </div>
  );
}
