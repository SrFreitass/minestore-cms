'use client';

import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { TItem } from '@/types/item';
import { ItemDetails } from '@layout/item-details/item-details';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CardActions } from './card-actions';
import { CardHeader } from './card-header';
import { CardLayout } from './card-layout';

type CardProps = {
    item: TItem;
    hideButton?: boolean;
    direction?: 'row' | 'col';
    calledFromCheckout?: boolean;
    className?: string;
    showProduct?: boolean;
};

export function Card({ item, direction = 'col', hideButton, showProduct = true }: CardProps) {
    const [showModal, setShowModal] = useState(false);

    const { items } = useCartStore();

    const isItemInCart = items.some((x) => x.id === item.id);
    const isItemUnavailable = !item.is_unavailable;

    const path = usePathname();

    return (
        <div
            className={cn(
                'relative',
                direction === 'col' ? 'h-full' : '',
                '!border-none',
                'group flex justify-center hover:cursor-pointer'
            )}
            title={'Clique para saber mais'}
        >
            <span className="absolute -mt-[17.5px] hidden rounded-xl bg-[#0A0A0C] p-2 font-medium text-white group-hover:block group-hover:animate-up">
                Clique p/ saber mais
                <span className="absolute right-[4.5rem] top-7 z-0 h-4 w-4 rotate-45 transform bg-[#0A0A0C]"></span>
            </span>
            <CardLayout direction={direction} className={item.featured ? 'featured-package' : ''}>
                <CardHeader item={item} direction={direction} setShowModal={setShowModal} />
                <CardActions
                    hideButton={hideButton}
                    item={item}
                    direction={direction}
                    isItemInCart={isItemInCart}
                    setShowModal={setShowModal}
                    available={isItemUnavailable}
                    displayFull={direction === 'col'}
                />
            </CardLayout>
            <ItemDetails
                show={showModal}
                onHide={() => setShowModal(false)}
                id={item.id}
                available={isItemUnavailable}
                route={path === '/checkout' ? 'checkout' : undefined}
            />
        </div>
    );
}
