import { Profile } from '@/components/profile/profile';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ProfileIndex() {
    const router = useRouter();
    return (
        <>
            <div className="py-3">
                <div className="mb-8 flex justify-between max-[500px]:items-center">
                    <div className="max-[500px]:w-full max-[500px]:mb-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        onClick={() => router.push('/dashboard')}
                                        className="text-[#00A8E1] cursor-pointer"
                                    >
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>

                                <BreadcrumbItem>
                                    <BreadcrumbPage>Profile</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h2 className="text-2xl tracking-tight mb-0 mt-0 font-poppins font-thin">Profile</h2>
                    </div>
                </div>

                {/* <Card className="w-full px-24 py-20 cus-form max-[500px]:px-6 max-[500px]:py-6"> */}
                {/* <CardContent> */}
                {/* <h6 className="mb-12">Add Machinery</h6> */}
                {/* <form className="grid w-full items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-5 mb-5">
              <div className="flex flex-col space-y-1.5">
                <Label>Name</Label>
                <Input className="border-borderColor focus:border-borderColor bg-card outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Email</Label>
                <Input className="border-borderColor focus:border-borderColor bg-card outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Phone Number</Label>
                <Input className="border-borderColor focus:border-borderColor bg-card outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Old Password</Label>
                <Input className="border-borderColor focus:border-borderColor bg-card outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">New Password</Label>
                <Input className="border-borderColor focus:border-borderColor bg-card outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Confirm Password</Label>
                <Input className="border-borderColor focus:border-borderColor bg-card outline-none"
                />
              </div>
              

            </div>


            <div className="flex justify-end gap-4 mt-5">
              <Button variant="ghost">Cancel</Button>
              <Button className="rounded-lg button-col px-6">
                <Save className="mr-3 w-4 h-4" />Save
              </Button>
            </div>
          </form> */}
                {/* </CardContent> */}
                {/* </Card> */}

                <Profile />
            </div>
        </>
    );
}
