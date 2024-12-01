import { joinClasses } from '@helpers/join-classes';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { TLevel } from './level';

type NotificationProps = {
    id: string;
    message: string;
    level: TLevel;
    customIcon?: string;
    t?: Toast;
};

export const Notification: FC<NotificationProps> = ({ id, message, level, customIcon }) => {
    const styles = {
        defaults: {
            container: 'rounded w-96 py-4 px-6 border-b-4 flex-row text-white'
        },

        basic: {
            container: 'bg-gray-600/70 border-gray-900'
        },
        red: {
            container: 'bg-[#FF4949]'
        },
        green: {
            container: 'bg-[#67C05F]'
        }
    };

    const [isEntering, setIsEntering] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);

    const remove = () => {
        toast.remove(id);
        setIsLeaving(true);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsEntering(false);
        }, 150);

        return () => clearTimeout(timeoutId);
    }, []);

    const transitionClassNames = joinClasses({
        'opacity-0 scale-50': isEntering,
        'opacity-100 scale-100': !isEntering && !isLeaving,
        'opacity-0 scale-75': isLeaving,
        'transition-all duration-150': isEntering || isLeaving,
    });

    return (
        <div
            onClick={remove}
            className={joinClasses(
                styles.defaults.container,
                styles[level].container,
                transitionClassNames,
                'rounded-3xl drop-shadow-none'
            )}
        >
            {level === 'green' && 
            (customIcon ?
            <Image src={customIcon} alt='' width={24} height={24}/> 
            : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>)
            }

            {level === 'red' && (
                <div className="text-2xl">
                    {customIcon ? <Image src={customIcon} alt='' width={24} height={24}/> : <Image src="/icons/control-game.svg" alt='' width={24} height={24}/>}
                </div>
            )}
            <span className="ml-4 font-bold">{message}</span>
        </div>
    );
};
