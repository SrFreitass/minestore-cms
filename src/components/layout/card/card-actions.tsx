import { useCartActions } from '@/app/(pages)/categories/utils/use-cart-actions';
import { Button } from '@/components/ui/button';
import { TItem } from '@/types/item';
import { joinClasses } from '@helpers/join-classes';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type CardActionsProps = {
    hideButton?: boolean;
    direction?: 'row' | 'col';
    isItemInCart: boolean;
    setShowModal: (value: boolean) => void;
    available?: boolean;
    item: TItem;
    displayFull?: boolean;
};

type CardActionButtonProps = Omit<CardActionsProps, 'direction' | 'setShowModal'> & {
    addToCartPressed?: boolean;
    setAddToCartPressed: (value: boolean) => void;
};

export function CardActions({
    hideButton,
    direction = 'col',
    isItemInCart,
    setShowModal,
    item,
    displayFull = true
}: CardActionsProps) {
    const [addToCartPressed, setAddToCartPressed] = useState(false);
    return (
        <div
            className={joinClasses(
                'flex items-center gap-2',
                direction === 'col' && 'mt-auto grid',
                hideButton && direction === 'col' && 'w-full grid-cols-[1fr]',
                direction === 'row' && 'grid md:flex'
            )}
        >
            <CardActionButtons
                isItemInCart={isItemInCart}
                item={item}
                displayFull={displayFull}
                addToCartPressed={addToCartPressed}
                setAddToCartPressed={setAddToCartPressed}
            />
        </div>
    );
}

export function CardActionButtons({
    isItemInCart,
    item,
    displayFull,
    addToCartPressed,
    setAddToCartPressed
}: CardActionButtonProps) {
    return (
        <>
            <AddToCartButton
                isItemInCart={isItemInCart}
                item={item}
                displayFull={displayFull}
                addToCartPressed={addToCartPressed}
                setAddToCartPressed={setAddToCartPressed}
            />
            <SubscriptionsButton
                isItemInCart={isItemInCart}
                item={item}
                displayFull={displayFull}
                addToCartPressed={addToCartPressed}
                setAddToCartPressed={setAddToCartPressed}
            />
            <RemoveFromCartButton
                isItemInCart={isItemInCart}
                item={item}
                displayFull={displayFull}
                addToCartPressed={false}
                setAddToCartPressed={setAddToCartPressed}
            />
        </>
    );
}

function AddToCartButton({
    isItemInCart,
    item,
    displayFull,
    addToCartPressed,
    setAddToCartPressed
}: CardActionButtonProps) {
    const isAvailable = item.is_unavailable ? false : true;

    const [loading, setLoading] = useState(false);
    const { handleAddItem } = useCartActions();

    const path = usePathname();

    const t = useTranslations('card');

    const handleItem = async () => {
        try {
            setLoading(true);
            setAddToCartPressed(true);
            await handleAddItem({
                id: item.id,
                calledFromCheckout: path === '/checkout',
                payment_type: 'regular',
                itemType: 'regular'
            });
        } catch (error) {
            console.error('Error while adding item:', error);
        } finally {
            setLoading(false);
            setAddToCartPressed(false);
        }
    };

    if (isItemInCart) return null;

    const actionText = isAvailable ? t('buy') : t('unavailable');

    return (
        <Button
            onClick={handleItem}
            disabled={!isAvailable || loading || addToCartPressed}
            className={joinClasses('h-[50px] px-4', !displayFull && 'min-w-auto')}
        >
            <ButtonIcon isItemInCart={isItemInCart} loading={loading} />
            {isAvailable ? 'Adicionar ao carrinho' : 'Indisponível'}
        </Button>
    );
}

function SubscriptionsButton({
    isItemInCart,
    item,
    displayFull,
    addToCartPressed,
    setAddToCartPressed
}: CardActionButtonProps) {
    const t = useTranslations('card');
    const [loading, setLoading] = useState(false);
    const { handleAddItem } = useCartActions();

    const path = usePathname();

    const handleItem = async () => {
        try {
            setAddToCartPressed(true);
            setLoading(true);
            await handleAddItem({
                id: item.id,
                calledFromCheckout: path === '/checkout',
                payment_type: 'subscription',
                itemType: 'subscription'
            });
        } catch (error) {
            console.error('Error while adding item:', error);
        } finally {
            setLoading(false);
            setAddToCartPressed(false);
        }
    };

    if (isItemInCart) return null;
    if (!item.is_subs) return null;

    return (
        <Button
            disabled={loading || addToCartPressed}
            onClick={handleItem}
            className={joinClasses('col-span-2 h-[50px] gap-2', !displayFull && 'min-w-[180px]')}
        >
            <ButtonIcon isItemInCart={isItemInCart} loading={loading} />
            {t('subscribe')}
        </Button>
    );
}

function RemoveFromCartButton({ isItemInCart, item, displayFull }: CardActionButtonProps) {
    const t = useTranslations('card');

    const [loading, setLoading] = useState(false);
    const { handleRemoveItem } = useCartActions();

    const handleItem = async () => {
        try {
            setLoading(true);
            await handleRemoveItem(item.id);
        } catch (error) {
            console.error('Error while removing item:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isItemInCart) return null;

    return (
        <Button
            disabled={loading}
            onClick={handleItem}
            className={joinClasses('h-[50px] gap-2', !displayFull && 'min-w-[180px]')}
        >
            <ButtonIcon isItemInCart={isItemInCart} loading={loading} />
            {t('remove')}
        </Button>
    );
}

export function ButtonIcon({
    isItemInCart,
    loading
}: {
    isItemInCart: boolean;
    loading?: boolean;
}) {
    if (loading) {
        return <Loader2 className="animate-spin" size={24} />;
    }

    if (isItemInCart) {
        return <Trash2 aria-hidden={true} size={24} />;
    }

    return <Plus aria-hidden={true} size={24} />;
}
