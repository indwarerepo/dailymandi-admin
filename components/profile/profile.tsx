import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';

export function Profile() {
    const router = useRouter();
    let authData = useAppSelector((state) => state.persistedReducers.authSlice.data);

    return (
        <>
            <Card className="w-[450px] px-8 py-6 pb-0 cus-form max-[500px]:px-6 max-[500px]:py-6">
                <CardContent className="pb-3 mb-0">
                    <h6 className="mb-4 text-2xls">Profile Details</h6>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-1 md:grid-cols-1 w-full items-center gap-5 mb-5">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name: {authData?.name}</Label>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="userType">User Type: {authData?.userType}</Label>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
