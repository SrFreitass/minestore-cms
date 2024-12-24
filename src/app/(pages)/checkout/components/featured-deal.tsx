'use client';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { TItem } from '@/types/item';
import { Card } from '@layout/card/card';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';

const { getRecommends } = getEndpoints(fetcher);

export const FeaturedDeal: FC = () => {
    const t = useTranslations('checkout');

    const [recommends, setRecommends] = useState<Array<TItem>>([]);

    useEffect(() => {
        getRecommends().then((data) => {
            setRecommends(data);
        });
    }, []);

    if (recommends.length === 0) return null;

    return (
        <div>
            <h3 className="text-center text-[30px] uppercase text-primary">{t('featured-deal')}</h3>

            <hr className="border border-primary" />

            <div className="mt-6 grid gap-4">
                {recommends.map((item, index) => (
                    <Card
                        calledFromCheckout={true}
                        key={index}
                        direction="row"
                        item={{
                            ...item,
                            description: t('this-item-is-popular-among-us-customers')
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
