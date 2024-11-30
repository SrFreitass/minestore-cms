import { Price } from '@/components/base/price/price';
import { useAuth } from '@/core/auth/client/use-auth';
import { useCartStore } from '@/stores/cart';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

export const ShoppingCartSection: FC = () => {
    const { user } = useAuth();
    const { cart } = useCartStore();

    const t = useTranslations('navbar');

    const isCartEmpty = cart?.items === 0;

    if (!user) {
        return (
            <div className='bg-white-opaque p-2 rounded-md'>
                <div className='w-4 h-4 bg-zinc-200 absolute rounded-full -mt-3 ml-5'></div>
                <ReactSVG src="/icons/shopping-cart.svg" className='text-white dark:text-accent-foreground' />
            </div>
        );
    }

    return (
        <>
            <ReactSVG
                src="/icons/shopping-cart.svg"
                className="text-white dark:text-accent-foreground"
            />
            <div className="ml-4 flex-col">
                <Link
                    href="/checkout"
                    className="cursor-pointer font-bold uppercase text-white dark:text-accent-foreground"
                >
                    {t('cart')}
                </Link>
                {user ? (
                    <div className="flex text-xs uppercase text-muted-foreground">
                        {isCartEmpty ? (
                            t('empty-cart')
                        ) : (
                            <>
                                {cart?.items} {t('cart-hint')}&nbsp;
                                <Price value={cart?.price || 0} />
                            </>
                        )}
                    </div>
                ) : (
                    <span className="text-xs uppercase text-muted-foreground">
                        {t('not-logged')}
                    </span>
                )}
            </div>
        </>
    );
};
