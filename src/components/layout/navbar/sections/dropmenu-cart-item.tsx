import { getEndpoints } from "@/api";
import { fetcher } from "@/api/client/fetcher";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { notify } from "@/core/notifications";
import { imagePath } from "@/helpers/image-path";
import { useCartStore } from "@/stores/cart";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from 'react';

const { updateItemCount, removeItemFromCart, getCart } = getEndpoints(fetcher);

type TItemCart = {
   name: string;
   image: string;
   cid: number;
   price: number;
   virtual_price: number;
   is_virtual_currency_only: number;
   id: number;
   payment_type: number;
   count: number;
   quantityGlobalLimit: number | null;
   quantityGlobalCurrentLimit: number | null;
   quantityUserLimit: number | null;
   quantityUserCurrentLimit: number | null;
   is_unavailable: boolean;
   allow_select_server: number;
   allowed_servers: Array<{
       server_id: number;
       server_name: string;
   }>;
   selected_server: number;
   is_any_price: number;
   min_price: number;
   is_subs: number;
}

export const DropmenuCartItem = ({ item }: { item: TItemCart }) => {
   const { setCart } = useCartStore();


   const [quantity, setQuantity] = useState(item.count);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
       updateItemCount(item.id, quantity);
   }, [quantity, item.id]);

   const [show, setShow] = useState(false);

   const isPriceVirtual = item.is_virtual_currency_only === 1;
   const price = isPriceVirtual ? item.virtual_price : item.price;

   const handleRemoveItemFromCart = async (id: number) => {
       try {
           setLoading(true);
           await removeItemFromCart(id);
           const cart = await getCart();
           setCart(cart);
       } catch (e) {
           console.error('Error removing item from cart', e);
       } finally {
           setLoading(false);
       }
   };

   const handleQuantity = async (id: number, quantity: number) => {
       try {
           setLoading(true);
           const response = await updateItemCount(id, quantity);
           if (response.success) {
              setQuantity(quantity);
           } else {
              notify(response.message ?? 'Unexpected error. Try again later.', 'red')
           }

           const cart = await getCart();
           setCart(cart);
       } catch (e) {
           console.error(e);
       } finally {
           setLoading(false);
       }
   };

   return (<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <div className="flex items-center gap-2 font-bold bg-[#31323B] pl-2 pr-4 rounded-lg w-full h-12">
         <div className="flex items-center w-36">
            <Image src={imagePath(item.image)} alt={item.name} width={32} height={32} className="w-10"/>
            <p>{item.name}</p>
         </div>

         <div className="flex items-center justify-center gap-2 grow">
             <div>
                 <button
                     aria-label="Decrease quantity"
                     // hidden={!!item.is_subs}
                     className="size-7 rounded-lg text-xl font-bold  text-white transition disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-700 flex items-center justify-center"
                     disabled={item.count === 1}
                     onClick={() => {
                         if (item.count === 1) return;
                         handleQuantity(item.id, item.count - 1);
                     }}
                 >
                     <Minus/>
                 </button>
             </div>
             <div className="flex h-6 w-6 items-center justify-center rounded text-center text-sm md:h-8 md:w-8 md:text-lg">
                 {item.count}x
             </div>
             <div>
                 <button
                     aria-label="Increase quantity"
                     // hidden={!!item.is_subs}
                     className="size-7 rounded-lg text-xl font-bold  text-white transition disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-700 flex items-center justify-center"
                     onClick={() => handleQuantity(item.id, item.count + 1)}
                 >
                     <Plus/>
                 </button>
             </div>
         </div>
         <p className="font-medium ml-4 grow">R${item.price.toFixed(2).replace('.',',')}</p>
      </div>
   </DropdownMenuItem>)
}
