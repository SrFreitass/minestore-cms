import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { TableCell, TableRow } from '@/components/ui/table';
import { notify } from "@/core/notifications";
import { useCartStore } from '@/stores/cart';
import { TCart } from '@/types/cart';
import { ItemDetails } from '@layout/item-details/item-details';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { ItemPreferences } from './item-preferences';

const { updateItemCount, removeItemFromCart, getCart } = getEndpoints(fetcher);

type CartItemProps = {
    item: TCart['items'][number];
};

export const CartItem: FC<CartItemProps> = ({ item }) => {
    const { setCart } = useCartStore();
    const [quantity, setQuantity] = useState(item.count);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        updateItemCount(item.id, quantity);
    }, [quantity, item.id]);

    const [show, setShow] = useState(false);

    const isPriceVirtual = item.is_virtual_currency_only === 1;
    const price = isPriceVirtual ? item.virtual_price : item.price;

    const handleRemoveItemFromCart = async (id: number) => {
        try {
            setLoading(true);
            await removeItemFromCart(id);
            const cart = await getCart();
            setCart(cart);
        } catch (e) {
            console.error('Error removing item from cart', e);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantity = async (id: number, quantity: number) => {
        try {
            setLoading(true);
            const response = await updateItemCount(id, quantity);
            if (response.success) {
               setQuantity(quantity);
            } else {
               notify(response.message ?? 'Unexpected error. Try again later.', 'red')
            }

            const cart = await getCart();
            setCart(cart);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TableRow>
                <TableCell className="md:block rounded-s-xl">
                    {item.image ? (
                        <div className='flex items-center gap-22 font-bold text-white text-base'>
                            <Image
                                src={item.image}
                                alt=""
                                width={80}
                                height={80}
                                className="h-20 w-20 object-contain"
                            />
                            {item.name}
                        </div>
                    ) : (
                        <div className="h-20 w-20 rounded-md bg-card-foreground/5"></div>
                    )}
                </TableCell>
      
                <TableCell className="text-right">
                    <div className="flex items-center justify-center gap-2">
                        <div>
                            <button
                                aria-label="Decrease quantity"
                                // hidden={!!item.is_subs}
                                className="size-7 rounded-lg text-xl font-bold  text-white transition disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-700 flex items-center justify-center"
                                disabled={quantity === 1 || loading}
                                onClick={() => {
                                    if (quantity === 1) return;
                                    handleQuantity(item.id, quantity - 1);
                                }}
                            >
                                <Minus/>
                            </button>
                        </div>
                        <div className="flex h-6 w-6 items-center justify-center rounded text-center text-sm md:h-8 md:w-8 md:text-lg">
                            {quantity}x
                        </div>
                        <div>
                            <button
                                aria-label="Increase quantity"
                                // hidden={!!item.is_subs}
                                className="size-7 rounded-lg text-xl font-bold  text-white transition disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-700 flex items-center justify-center"
                                disabled={loading}
                                onClick={() => handleQuantity(item.id, quantity + 1)}
                            >
                                <Plus/>
                            </button>
                        </div>
                    </div>
                </TableCell>
                
                <TableCell className='rounded-r-xl'>
                    <div className='flex items-center gap-6'>
                        <span className='text-white'>
                            R$
                            {' '}
                            <span className='text-xl font-medium'>{price.toFixed(2).replace('.', ',')}</span>
                        </span>
                        {/* <Price
                            value={price}
                            isVirtual={isPriceVirtual}
                            className="text-sm md:text-lg"
                        /> */}
                        <button
                            onClick={() => handleRemoveItemFromCart(item.id)}
                            aria-label="Remove item from cart"
                            className="flex h-6 w-6 items-center justify-center rounded bg-red-500 text-base font-bold text-red-900 transition disabled:cursor-not-allowed disabled:opacity-50 md:h-8 md:w-8 md:text-lg"
                            disabled={loading}
                        >
                            <Trash2 aria-hidden={true} size={20} />
                        </button>
                    </div>
                </TableCell>
            </TableRow>

            <ItemPreferences item={item} />

            <ItemDetails show={show} onHide={() => setShow(false)} id={item.id} route="checkout" />
        </>
    );
};
