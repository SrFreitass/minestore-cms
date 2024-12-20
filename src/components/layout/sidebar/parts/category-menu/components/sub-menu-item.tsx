import { joinClasses } from '@helpers/join-classes';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

type SubMenuItemProps = {
    name: string;
    url: string;
};

export const SumMenuItem: FC<SubMenuItemProps> = ({ name, url }) => {
    const pathname = usePathname();
    const isActive = pathname === url;

    const handleClick = () => {
        setCookie('lastCategoryClicked', url);
    };

    return (
        <Link className="group h-12 flex-row items-center bg-[#30313A]" href={url} onClick={handleClick}>
            <div
                className={joinClasses(
                    'h-7 w-1 rounded-r-lg transition-all',
                    isActive
                        ? 'text-orange'
                        : 'bg-[#30313A] group-hover:bg-accent-foreground'
                )}
            />
            <span className={`ml-4 font-bold ${isActive ? 'text-orange' : ''}`}>{name}</span>
        </Link>
    );
};
