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
import { CardActionButtons } from '@layout/card/card-actions';
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
            <DialogContent className="w-full max-w-[800px] bg-royal-sec-2">
                <DialogHeader className="">
                    <DialogTitle className="text-card-foreground text-white">{details?.name}</DialogTitle>
                </DialogHeader>
                <div className='flex items-start gap-6'>
                    
                    <Image 
                        // This is a placeholder image, replace it with the actual image, details?.image is the actual image
                        src={'https://s3-alpha-sig.figma.com/img/9280/a618/5a2bce247fc75a6b21e4b878ee20c885?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gY9oy377rR~m6vjZdocR1y4xiwmyIO8pCIHTydzWjLYg6IHNu3jgtJCuwX~kkaLvS8~1hzOCNWgmiP87jtXZC4FGqdWJTKv~cR~edmNgRyRXcemRmXGKu4NmnsckezLPmP~ZkOTOXUEg8DTm6I7yUVT~NRZ9kD-OPjMlP2t7Ntcv6pM~a2xWdaEMls326QhJH0p~5nbvpWV36rtiLXfqR0oEomZheqC4WwnIUnpIkGe-gWKv13b~Lev5r4yTJEiAzPTjQhYP48cnjCr21h2EIO-IZx6lAIi0fFPAZ2l80W~1YtaGVVI8Q5e0~HEzwnYy4Y3RUfwKmxfkS2Q5XOKpdA__'}
                        alt={details?.name || ''}
                        width={250}
                        height={250}
                        className='bg-[#404254] rounded-lg'
                    />

                    <div>
                        <h3 className='font-bold text-white'>O que está incluso:</h3>
                        {/* (insert ul > li tags here on CMS) delete this next line */}
                        <ul className='text-white list-disc px-5' dangerouslySetInnerHTML={{ __html: details?.description?.split('<ul>')[1]?.split('</ul>')[0] || '<li>Item 1</li>'}}/>
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
