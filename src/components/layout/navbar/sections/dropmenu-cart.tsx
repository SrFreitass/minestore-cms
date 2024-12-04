
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/stores/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { DropmenuCartItem } from "./dropmenu-cart-item";

export function DropmenuCart() {
   const { cart, items, setCart } = useCartStore();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <div className="cursor-pointer bg-white/45 p-2 rounded-md absolute right-4">
            <span className={`${items.length >= 1 ? 'bg-orange' : 'bg-white'}  size-4 rounded-full absolute text-center font-semibold -top-2 -right-2`}>
               <span className="relative bottom-[2.5px] left-[1px]">{items.length}</span>
            </span>
            <ShoppingCart/>
         </div>
      </DropdownMenuTrigger>
      {items.length >= 1  ? <DropdownMenuContent className="w-96 flex flex-col items-end bg-royal-sec-2 p-4">
        <DropdownMenuLabel className="text-lg text-center self-center">Meu carrinho</DropdownMenuLabel>

        <DropdownMenuGroup className="w-full">
               {
                  items.map((item) => (
                     <DropmenuCartItem item={item} key={item.id}/>
                  ))
               }
              {/* {items.map((item) => (
                  <DropdownMenuItem key={item.id} onSelect={(e) => e.preventDefault()}>
                     <div className="flex items-center gap-2 font-bold">
                        <div className="flex items-center w-36">
                           <Image src={process.env.NEXT_PUBLIC_API_URL+item.image} alt={item.name} width={32} height={32} className="w-10"/>
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
                        <p className="font-medium ml-4 grow">R${item.price}</p>
                     </div>
                  </DropdownMenuItem>
              ))} */}
        </DropdownMenuGroup>
        <Link href="/checkout">
           <Button className="mt-2">Finalizar compra</Button>
        </Link>
      </DropdownMenuContent> : null}
    </DropdownMenu>
  )
}
