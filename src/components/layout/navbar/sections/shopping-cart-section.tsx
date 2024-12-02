import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/core/auth/client/use-auth';
import { useCartStore } from '@/stores/cart';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

export const ShoppingCartSection: FC = () => {
    const { user } = useAuth();
    const { cart } = useCartStore();

    const t = useTranslations('navbar');

    const isCartEmpty = cart?.items === 0;

    if (!user) {
        return (
            <div className='bg-white-opaque p-2 rounded-md relative left-32'>
                <div className='w-4 h-4 bg-zinc-200 absolute rounded-full -mt-3 ml-5'></div>
                <ReactSVG src="/icons/shopping-cart.svg" className='text-white' />
            </div>
        );
    }

    return (
        <>
           <div className='bg-white-opaque p-2 rounded-md relative left-32'>
              <div className={`w-4 h-4 absolute rounded-full -mt-3 ml-5 ${isCartEmpty ? 'bg-zinc-400' : 'bg-orange'}`}>
                 <p className='relative bottom-[2px] left-1 font-bold text-white text-sm'>3</p>
              </div>
               <ReactSVG src="/icons/shopping-cart.svg" className='text-white' />
             <DropdownMenu open={true} />
           </div>
            {/* <ReactSVG
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
            </div> */}
        </>
    );
};
