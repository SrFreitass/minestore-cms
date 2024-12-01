import { Price } from '@/components/base/price/price';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TItem } from '@/types/item';
import { getModifiedCacheBuster } from '@helpers/cache-buster';
import { imagePath } from '@helpers/image-path';
import { joinClasses } from '@helpers/join-classes';
import { BadgeCheck, Check, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type CardHeaderProps = {
    item: TItem;
    direction?: 'row' | 'col';
    setShowModal: (show: boolean) => void;
};

export function CardHeader({ item, direction, setShowModal }: CardHeaderProps) {
    const price = item.is_virtual_currency_only ? item.virtual_price || 0 : item.price;
    const isPriceVirtual = item.is_virtual_currency_only;

    const cardHeaderClasses = joinClasses(
        'gap-4',
        direction === 'col' && 'grid mt-auto',
        direction === 'col' && !item.image && 'mt-auto',
        direction === 'row' && 'flex-col md:flex-row items-center',
        'relative flex flex-col items-center justify-center'
    );

    

    return (
        <div className={cardHeaderClasses} onClick={() => setShowModal(true)}>
            <FeaturedBadge item={item} className="absolute -top-8" />
            {
                item.last_units ?  
                <div className='relative bottom-8'>
                    <Badge variant="success" className="mx-auto w-max px-4 py-2 bg-red-500 flex gap-1 hover:bg-red-500">
                        <Clock size={22} />
                        <h2 className='text-base font-bold'>{item.last_units} itens restantes</h2>
                    </Badge>
                </div> : null
            }
            {direction === 'col' ? <QuantityBadge item={item} /> : null}

            <CardHeaderImage
                item={item}
                direction={direction}
                className={direction === 'row' && item.featured ? 'mt-4 md:mt-0' : ''}
            />
            <div className={direction === 'col' ? 'text-center' : 'text-center md:text-start'}>
                {direction === 'row' ? <QuantityBadge item={item} className="mb-2" /> : null}
                <h3 className="text-xl break-words break-all font-bold text-accent-foreground">{item.name}</h3>
               <Price
                  originalPrice={item.original_price}
                  discount={item.discount}
                    value={price}
                    isVirtual={isPriceVirtual}
                    className={`flex flex-col items-center text-base ${direction === 'col' ? 'justify-center' : ''}`}
                />
            </div>
        </div>
    );
}

function QuantityBadge({ item, className }: { item: TItem; className?: string }) {
    const t = useTranslations('card');

    const hasGlobalLimit =
        item.quantityGlobalLimit != null && item.quantityGlobalCurrentLimit != null;
    const hasUserLimit = item.quantityUserLimit != null && item.quantityUserCurrentLimit != null;

    if (!hasGlobalLimit && !hasUserLimit) return null;

    const {
        quantityGlobalLimit = 0,
        quantityGlobalCurrentLimit = 0,
        quantityUserLimit = 0,
        quantityUserCurrentLimit = 0
    } = item;

    const globalQuantityLeft = hasGlobalLimit
        ? quantityGlobalLimit - quantityGlobalCurrentLimit
        : 0;
    const userQuantityLeft = hasUserLimit ? quantityUserLimit - quantityUserCurrentLimit : 0;

    const quantityLeft = hasUserLimit ? userQuantityLeft : globalQuantityLeft;

    return (
        <div className="flex flex-wrap items-center gap-2">
            {hasUserLimit && userQuantityLeft > 0 && (
                <Badge
                    variant="success"
                    className={joinClasses(
                        'mx-auto max-w-[220px] justify-center gap-2 p-2',
                        className
                    )}
                >
                    <Check size={16} />
                    <p>{t('available-for-you')}</p>
                </Badge>
            )}
            <Badge
                variant="destructive"
                className={joinClasses('mx-auto max-w-[220px] justify-center gap-2 p-2', className)}
            >
                <Clock size={16} />
                <p>
                    {quantityLeft} {t('items-left')}
                </p>
            </Badge>
        </div>
    );
}

function CardHeaderImage({
    item,
    direction,
    className
}: {
    item: TItem;
    direction?: 'row' | 'col';
    className?: string;
}) {
    const image = imagePath(item.image);
    if (!image) return null;

    const cacheBuster = getModifiedCacheBuster(5);
    let imageWithCacheBuster = `${image}?${cacheBuster}`;
    console.log(imageWithCacheBuster);

    // delete this line in production
    imageWithCacheBuster = 'https://s3-alpha-sig.figma.com/img/9280/a618/5a2bce247fc75a6b21e4b878ee20c885?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gY9oy377rR~m6vjZdocR1y4xiwmyIO8pCIHTydzWjLYg6IHNu3jgtJCuwX~kkaLvS8~1hzOCNWgmiP87jtXZC4FGqdWJTKv~cR~edmNgRyRXcemRmXGKu4NmnsckezLPmP~ZkOTOXUEg8DTm6I7yUVT~NRZ9kD-OPjMlP2t7Ntcv6pM~a2xWdaEMls326QhJH0p~5nbvpWV36rtiLXfqR0oEomZheqC4WwnIUnpIkGe-gWKv13b~Lev5r4yTJEiAzPTjQhYP48cnjCr21h2EIO-IZx6lAIi0fFPAZ2l80W~1YtaGVVI8Q5e0~HEzwnYy4Y3RUfwKmxfkS2Q5XOKpdA__'

    const imageSize = direction === 'row' ? 64 : 140;

    return (
        <div>
            <Image
                src={imageWithCacheBuster}
                alt={item.name}
                width={imageSize}
                height={imageSize}
                className={cn(
                    `mx-auto object-contain w-[${imageSize}px] h-[${imageSize}px]`,
                    className
                )}
            />
        </div>
    );
}

function FeaturedBadge({ item, className }: { item: TItem; className?: string }) {
    const t = useTranslations('card');
    if (!item.featured) return null;

    return (
        <Badge variant="default" className={cn('mx-auto w-max px-4 py-2 absolute mb-[19rem] flex gap-2 text-white', className)}>
            <BadgeCheck size={16}/>
            {t('featured')}
        </Badge>
    );
}
