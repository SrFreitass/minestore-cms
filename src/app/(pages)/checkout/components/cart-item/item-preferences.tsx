import { TCart } from '@/types/cart';

export function ItemPreferences({ item }: { item: TCart['items'][number] }) {
    const itemHasPreferences =
        item.vars.length > 0 || item.is_any_price === 1 || item.allowed_servers.length > 0;

    if (!itemHasPreferences) return null;

    return (
       <></>
        // <TableRow>
        //     <TableCell colSpan={6}>
        //         <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        //             <SelectItemVariable item={item} />
        //             <InputItemVariable item={item} />
        //             <SelectItemServer item={item} />
        //             <InputItemCustomPrice item={item} />
        //         </div>
        //     </TableCell>
        // </TableRow>
    );
}
