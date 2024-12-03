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
import { useEffect, useRef } from 'react';
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
            <TableRow ref={tableHeadContainerRef}>
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
                        className={`sticky left-0 z-10 flex w-[200px] items-center justify-between ${bgColor} transition-colors`}
                     >
                        <p>{comparison.name}</p>
                     </TableCell>
                     {comparison.comparisons.map((item) => (
                        console.log(item, 'item'),
                        <TableCell key={item.comparison_id} className="text-center">
                           <ComparisonIcon value={item.value} type={comparison.type}/>
                        </TableCell>
                     ))}
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
                                 <DiscountTag discount={item.discount}/>
                              </>
                           }
                        </span>
                        <span className="font-bold text-2xl text-white flex justify-center items-end">
                           <span className='text-lg'>R$</span>{item.price.toFixed(2).replace('.', ',')}
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

function ComparisonIcon({ value, type }: { value: string; type: number }) {
   const isNumber = !isNaN(Number(value));

   if (isNumber && type === 0) {
      const valueToNumber = Number(value);

      if (valueToNumber === 1) {
         return <BadgeCheck className="mx-auto text-zinc-900" fill="#7e49ff"/>;
      } else if (valueToNumber === 0) {
         return <XCircle className="mx-auto text-zinc-900" fill='#71717a' />;
      }
   }

   return <span dangerouslySetInnerHTML={{ __html: value }} className={`font-bold ${value.includes('<p') ? 'text-lg font-minecraft' : ''} `}></span>;
}
