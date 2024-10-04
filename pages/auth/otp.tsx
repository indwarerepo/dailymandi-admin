import Image from "next/image";
import logo from "../../public/images/logo1.png";
import { UserOtpForm } from "@/components/auth/otp";

export default function AuthenticationPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center flex">
      <div className="main-body flex gap-8 flex-col">
        <Image
          src={logo}
          width={200}
          height={100}
          alt="logo"
          className="logo_image"
        />
        <div className="authCardContainer bg-cardBg border border-borderColor">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6">
            {/* <div className="flex flex-col space-y-2 text-center">
              <h1 className="sm:text-3xl text-2xl  font-bold tracking-tight mb-0 font-raleway">
                Welcome Back
              </h1>
              <p className="text-sm mt-0 mb-1">
                Enter credentials to
                <span className="font-bold">Sign In</span>
              </p>
            </div> */}
            <UserOtpForm />
          </div>
        </div>
      </div>
      <div className="auth-bg-image w-full absolute top-0 left-0 right-0 bottom-0 mr-auto h-full -z-10"></div>
    </div>
  );
}
