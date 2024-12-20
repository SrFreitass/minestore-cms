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
      <Table className="w-full table-fixed overflow-x-auto text-muted-foreground rounded-lg border-none">
         <TableCaption hidden>A list with all the comparisons</TableCaption>
         <TableHeader>
            <TableRow ref={tableHeadContainerRef as LegacyRef<HTMLTableRowElement>}>
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
                  <TableRow
                     key={comparison.id}
                     className={
                        'divide-x divide-accentt'
                     }
                  >
                     <TableCell
                        className={`sticky left-0 z-10 flex w-[200px] items-center justify-between ${bgColor} transition-colors group relative`}
                     >
                        <span className="hidden absolute group-hover:animate-up group-hover:block rounded-md transition-all bg-royal-sec/80 px-4 text-white" style={{ animationFillMode: 'forwards' }}>
                           {comparison.description}
                        </span>
                        <p className='text-white font-medium'>{comparison.name}</p>
                     </TableCell>
                     {comparison.comparisons.map((item, i) => {   
                        return (
                           <TableCell key={item.comparison_id} className="text-center">
                              <ComparisonIcon value={item.value} type={comparison.type} prefixId={i} prefix={index === 0 ? selectedItems[i].name : undefined}/>
                           </TableCell>
                        );
                     })}
                  </TableRow>
                  </>
               );
            })}
            <TableRow>
               <TableCell>

               </TableCell>
               {
                  selectedItems.map((item, i) => (
                     <TableCell key={i} className='text-center border border-[#333]'>
                        <span className='text-lg line-through flex justify-center gap-2'>

                           {/* item.discount not discount :) */}
                           { item.discount <= 0 ?  <br></br> :
                              <>
                                 R$ {(item.price + item.discount).toFixed(2).replace('.', ',')}
                                 <DiscountTag discount={item.discount / (item.price + item.discount) * 100}/>
                              </>
                           }
                        </span>
                        <span className="font-bold text-2xl text-white flex justify-center items-end gap-1">
                           <span className='text-base mb-[1.1px] font-normal'>R$</span>{item.price.toFixed(2).replace('.', ',')}
                        </span>
                        <br/>
                        <CardActions item={item} isItemInCart={items.some((x) => x.id === item.id)} setShowModal={() => 1}/>
                     </TableCell>
                  ))
               }

            </TableRow>
         </TableBody>
      </Table>
   );
};

function ComparisonIcon({ value, type, prefix, prefixId }: { value: string; type: number, prefix?: string, prefixId?: number }) {
   const isNumber = !isNaN(Number(value));
   console.log(value);
   if (isNumber && type === 0 && !prefix) {
      const valueToNumber = Number(value);

      if (valueToNumber === 1) {
         return <BadgeCheck className="mx-auto text-zinc-900" fill="#7e49ff"/>;
      } else if (valueToNumber === 0) {
         return <XCircle className="mx-auto text-zinc-900" fill='#71717a' />;
      }
   }

   if(type === 1 && !prefix) {
      return <span className="text-sm text-white font-inter font-medium">{value}</span>
   }

   const prefixColors = [
      "#55FE54",
      "#FE52DF",
      "#FF8401"
   ]

   const color = prefixColors[prefixId || 0];

   return <span className={`font-bold text-lg font-minecraft`} style={{ color: `${color || prefixColors[0]}` }}>{prefix}</span>
}
