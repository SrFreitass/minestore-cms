import { FC } from "react";

type PaymentTotalProps = {
    total: number;
    subTotal: number;
    discount?: number;
}

export const PaymentTotal: FC<PaymentTotalProps> = ({ total, subTotal, discount }) => {
    return (
        <div className="flex flex-col justify-between items-start gap-6 py-4 px-8 bg-[#25262F] rounded-md max-w-96">
            <div className="w-full">
                <h2 className="font-bold text-white">Finalizando sua compra</h2>

                <p className="text-base text-white font-medium flex items-center justify-between mt-2">
                    <span>Sub-total:</span>
                    <div className="flex items-center text-base">
                        <span className="text-[13px]">R$</span>
                        {subTotal.toFixed(2).replace('.', ',') || '0,00'}
                    </div>
                </p>
                <p className="text-base text-white font-medium flex items-center justify-between">
                    <span>Desconto:</span> 
                    <div className="flex items-center text-base">
                        <span className="text-[13px]">R$</span>
                        {discount?.toFixed(2).replace('.', ',') || '0,00'}
                    </div>
                </p>
            </div>

            <div className="w-full">
                <p className="text-base text-white flex items-center justify-between font-bold">
                        <span>Total: </span>
                        <div className="flex items-center text-base">
                            <span className="text-[13px]">R$</span>
                            {total.toFixed(2).replace('.', ',') || '0,00'}
                        </div>
                </p>
            </div>
        </div>
    )
}