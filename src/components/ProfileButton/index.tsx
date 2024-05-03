'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Cookies from 'js-cookie';
import { useUser } from '@/store/useUser';
import { useRouter } from 'next/navigation';
import routes from '@/routes';

interface Props {
  imageUrl: string | undefined;
}

const ProfileButton = ({ imageUrl }: Props) => {
  const { setCurrentUser, setIsLogined } = useUser();
  const router = useRouter();
  const handleLogOut = () => {
    Cookies.remove('userInfo');
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');
    Cookies.remove('isLogined');
    setCurrentUser(undefined);

    setIsLogined(false);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {imageUrl ? (
          <></>
        ) : (
          <Avatar>
            <AvatarImage src="@/public/image/default-avatar.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            router.push(routes.order);
          }}
        >
          Your Order
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
