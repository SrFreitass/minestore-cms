'use client';

import { DiscountTag } from '@/components/base/price/price';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { useCartStore } from '@/stores/cart';
import { TCategory, TSubCategory } from '@/types/category-details';
import { TItem } from '@/types/item';
import { Card } from '@layout/card/card';
import { CardActions } from '@layout/card/card-actions';
import { BadgeCheck, XCircle } from 'lucide-react';
import { LegacyRef, useEffect, useRef } from 'react';
import { extractCategoryComparisons, extractSubCategoryComparisons } from '../utils/utils';

type ComparisonProps = {
    category: TCategory;
    subCategory?: TSubCategory;
    categoryItems: TItem[];
};

export const Comparison = ({ categoryItems, category, subCategory }: ComparisonProps) => {
    const selectedItems = subCategory?.items || categoryItems;

    const subCategoryComparisons = extractSubCategoryComparisons(subCategory) || [];
    const categoryComparisons = extractCategoryComparisons(category, categoryItems) || [];

    const comparisons = subCategory ? subCategoryComparisons : categoryComparisons;

    const tableHeadContainerRef = useRef<HTMLDivElement>(null);

    const { items } = useCartStore();

    useEffect(() => {
        const adjustHeights = () => {
            const container = tableHeadContainerRef.current;
            if (!container) return;

            const cards = container.querySelectorAll<HTMLDivElement>('.card');
            const maxHeight = Array.from(cards).reduce(
                (max, card) => Math.max(max, card.offsetHeight),
                0
            );

            cards.forEach((card) => {
                card.style.height = `${maxHeight}px`;
            });
        };

        adjustHeights();

        window.addEventListener('resize', adjustHeights);
        return () => window.removeEventListener('resize', adjustHeights);
    }, [selectedItems]);

    return (
        <div className="border-1 m-4">
            <Table className="w-full table-fixed overflow-x-auto text-muted-foreground">
                <TableCaption hidden>A list with all the comparisons</TableCaption>
                <TableHeader>
                    <TableRow
                        ref={tableHeadContainerRef as LegacyRef<HTMLTableRowElement>}
                        className="border-x-transparent"
                    >
                        <TableHead className="sticky left-0 z-10 w-[200px]">
                            <span className="sr-only">Features</span>
                        </TableHead>
                        {selectedItems.map((item) => (
                            <TableHead key={item.id} className="w-[270px] py-4">
                                <div className="card">
                                    <Card item={item} />
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {comparisons.map((comparison, index) => {
                        const bgColor = 'bg-card';

                        return (
                            <>
                                <TableRow key={comparison.id} className={'divide-accentt divide-x'}>
                                    <TableCell
                                        className={`sticky left-0 z-10 flex w-[200px] items-center justify-center ${bgColor} group relative transition-colors`}
                                    >
                                        <span
                                            className={`py-1 absolute ${comparison.description && comparison.description.length >= 20 ? '-mt-12' : '-mt-7'} hidden w-[102%] rounded-md bg-royal-sec px-4 text-white transition-all group-hover:block group-hover:animate-up`}
                                            style={{ animationFillMode: 'forwards' }}
                                        >
                                            {comparison.description}
                                        </span>
                                        <span className={`hidden absolute left-[5.5rem] ${comparison.name.length >= 20 ? 'top-1' : '-top-2'} z-0 h-4 w-4 rotate-45 transform bg-royal-sec group-hover:block group-hover:animate-up`}></span>
                                        <p className="w-full font-medium text-white">
                                            {comparison.name}
                                        </p>
                                    </TableCell>
                                    {comparison.comparisons.map((item, i) => {
                                        return (
                                            <TableCell
                                                key={item.comparison_id}
                                                className="text-center"
                                            >
                                                <ComparisonIcon
                                                    value={item.value}
                                                    type={comparison.type}
                                                    prefixId={i}
                                                    prefix={
                                                        index === 0
                                                            ? selectedItems[i].name
                                                            : undefined
                                                    }
                                                />
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </>
                        );
                    })}
                    <TableRow>
                        <TableCell></TableCell>
                        {selectedItems.map((item, i) => (
                            <TableCell key={i} className="border border-[#333] text-center">
                                <span className="flex justify-center gap-2 text-lg line-through">
                                    {/* item.discount not discount :) */}
                                    {item.discount <= 0 ? (
                                        <br></br>
                                    ) : (
                                        <>
                                            R${' '}
                                            {(item.price + item.discount)
                                                .toFixed(2)
                                                .replace('.', ',')}
                                            <DiscountTag
                                                discount={
                                                    (item.discount / (item.price + item.discount)) *
                                                    100
                                                }
                                            />
                                        </>
                                    )}
                                </span>
                                <span className="flex items-end justify-center gap-1 text-2xl font-bold text-white">
                                    <span className="mb-[1.1px] text-base font-normal">R$</span>
                                    {item.price.toFixed(2).replace('.', ',')}
                                </span>
                                <br />
                                <CardActions
                                    item={item}
                                    isItemInCart={items.some((x) => x.id === item.id)}
                                    setShowModal={() => 1}
                                />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

function ComparisonIcon({
    value,
    type,
    prefix,
    prefixId
}: {
    value: string;
    type: number;
    prefix?: string;
    prefixId?: number;
}) {
    const isNumber = !isNaN(Number(value));
    console.log(value);
    if (isNumber && type === 0 && !prefix) {
        const valueToNumber = Number(value);

        if (valueToNumber === 1) {
            return <BadgeCheck className="mx-auto text-zinc-900" fill="#7e49ff" />;
        } else if (valueToNumber === 0) {
            return <XCircle className="mx-auto text-zinc-900" fill="#71717a" />;
        }
    }

    if (type === 1 && !prefix) {
        return <span className="font-inter text-sm font-medium text-white">{value}</span>;
    }

    const prefixColors = ['#55FE54', '#FE52DF', '#FF8401'];

    const color = prefixColors[prefixId || 0];

    return (
        <span
            className={`font-minecraft text-lg font-bold`}
            style={{ color: `${color || prefixColors[0]}` }}
        >
            {prefix}
        </span>
    );
}
