'use client';

import { Price } from '@/components/base/price/price';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCartStore } from '@/stores/cart';
import { useSettingsStore } from '@/stores/settings';
import { TCart } from '@/types/cart';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { CartItem } from './cart-item';

export const Cart: FC = () => {
    const t = useTranslations('checkout');
    const { cart, items } = useCartStore();
    const { settings} = useSettingsStore();

    return (
        <>
            <div className="stone-pattern flex-row items-center rounded-md h-24">
                <div className='px-6 flex justify-between items-center w-full'>
                    <p className="text-3xl font-bold text-white">
                        {t('title')}
                    </p>2
                    <span className="ml-auto flex items-center gap-2 text-2xl font-bold">
                        <span className='font-normal text-base relative top-1'>Total:</span> <Price value={cart?.price || 0} />
                    {cart?.virtual_price
                        ? ` / ${cart.virtual_price} ${settings?.virtual_currency}`
                        : ''}
                        {cart?.tax ? (
                        <span className="flex gap-2">
                                {' '}
                            + <Price value={cart.tax}/> (tax)
                            </span>
                        ) : (
                        ''
                        )}
                    </span>
                </div>
            </div>

            <CartItems items={items} />
        </>
    );
};

function CartItems({ items }: { items: TCart['items'] }) {
    const t = useTranslations('checkout');

    if (items.length === 0) {
        return (
            <div className="mt-12 flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-primary">{t('empty-cart-title')}</h1>
                <p className="text-balance">{t('empty-cart-description')}</p>
            </div>
        );
    }

    return (
        <div className='bg-[#25262F]'>
            <Table className="my-4 bg-[#25262F]">
                <TableHeader className="[&_tr]:border-b-4">
                    <TableRow>
                        
                        <TableHead className="w-[250px] text-base font-bold text-white md:text-lg">
                            {/* {t('name')} */} Produto
                        </TableHead>
                        <TableHead className="w-[650px] text-base font-bold text-white md:text-lg text-center">
                            {/* {t('quantity')} */} Quantidade
                        </TableHead>
                        <TableHead className="w-[200px] text-base font-bold text-white md:text-lg text-start">
                            {/* {t('price')} */} Valor
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="[&_tr]:border-b-4">
                    {items?.map((item) => <CartItem key={item.id} item={item} />)}
                </TableBody>
            </Table>
        </div>
    );
}
