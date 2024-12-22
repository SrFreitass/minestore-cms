import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { Price } from '@/components/base/price/price';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { useCartStore } from '@/stores/cart';
import { TItem } from '@/types/item';
import { imagePath } from '@helpers/image-path';
import { CardActionButtons } from '@layout/card/card-actions';
import { name } from 'assert';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

const { getItem } = getEndpoints(fetcher);

type DetailsProps = {
    show: boolean;
    id: number;
    onHide(): void;
    available?: boolean;
    route?: 'checkout';
};

export const ItemDetails: FC<DetailsProps> = ({ show, onHide, id, route }) => {
    const { items } = useCartStore();

    const isItemInCart = items.some((x) => x.id === id);

    const [details, setDetails] = useState<TItem>();
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        getItem(id, route)
            .then((data) => {
                setDetails(data);
            })
            .catch(() => {
                setDetails(undefined);
            });
    }, [id, route]);

    return (
        <Dialog open={show} onOpenChange={onHide}>
            <DialogContent className="w-full max-w-[800px] bg-royal-sec">
                <DialogHeader className="">
                    <DialogTitle className="text-card-foreground text-white">{details?.name}</DialogTitle>
                </DialogHeader>
                <div className='flex items-start gap-6'>

                    <Image
                        src={imagePath(details?.image || "")}
                        alt={details?.name || ''}
                        width={250}
                        height={250}
                        className='bg-[#404254] rounded-lg'
                    />

                    <div>
                        <h3 className='font-bold text-white'>O que está incluso:</h3>
                        {/* (insert ul > li tags here on CMS) delete this next line */}
                        <ul className='text-white' dangerouslySetInnerHTML={{ __html: details?.description || '' }}/>
                    </div>
                </div>

                <DialogFooter className="items-center justify-between gap-2 sm:justify-between">
                    <Price
                        value={details?.price || 0}
                        isVirtual={details?.is_virtual_currency_only}
                        className="font-bold"
                    />

                    <div className="flex gap-2">
                        <CardActionButtons
                            isItemInCart={isItemInCart}
                            item={details as TItem}
                            displayFull={false}
                            setAddToCartPressed={setIsAddingToCart}
                            addToCartPressed={isAddingToCart}
                        />
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
