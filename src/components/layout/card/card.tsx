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
    isCash?: boolean;
};

export function Card({ item, direction = 'col', hideButton, isCash }: CardProps) {
    const [showModal, setShowModal] = useState(false);

    const { items } = useCartStore();

    const isItemInCart = items.some((x) => x.id === item.id);
    const isItemUnavailable = !item.is_unavailable;

    const path = usePathname();

    return (
        <div className={cn('relative', direction === 'col' ? 'h-full' : '')}>
            <CardLayout direction={direction} className={item.featured ? 'featured-package' : ''}>
                <CardHeader item={item} direction={direction} setShowModal={isCash ? () => 0: setShowModal}/>    
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
