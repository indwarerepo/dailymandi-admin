import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { CircleUserRound, UserRoundCog, LogOut } from 'lucide-react';
import { logout } from '@/features/auth/authApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function UserNav() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    let authData = useAppSelector((state) => state.persistedReducers.authSlice.data);

    const handleLogOut = () => {
        setIsOpen(false);
        dispatch(logout());
        router.push('/');
    };

    return (
        <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
            <DropdownMenuTrigger asChild>
                <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <Button variant="outline">
                        <CircleUserRound className="w-6 h-6 mr-1 text-topbarForeground" />{' '}
                        {authData?.name ? authData?.name : 'User'}
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-50 p-0 border border-borderColor"
                align="center"
                forceMount
                style={{ zIndex: 998 }}
            >
                <DropdownMenuGroup>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/profile')}
                        className="border-none outline-none rounded-none w-full justify-start font-normal px-2 bg-popover hover:text-[var(--workspaceColor2)] hover:bg-[var(--workspaceColor1)]"
                    >
                        <UserRoundCog className="w-5 h-5 mr-2" /> Profile
                    </Button>
                    <Button
                        variant="outline"
                        className="border-none outline-none rounded-none w-full justify-start font-normal px-2 bg-popover hover:text-[var(--workspaceColor2)] hover:bg-[var(--workspaceColor1)]"
                        onClick={handleLogOut}
                    >
                        <LogOut className="w-5 h-5 mr-2" /> Logout
                    </Button>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
