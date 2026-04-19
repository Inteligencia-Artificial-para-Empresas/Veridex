import { NextResponse } from "next/server";
import { generateBinanceHeaders } from "@/lib/binance";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const orderBody = {
      env: { terminalType: "WEB" },
      orderAmount: 199.0,
      orderCurrency: "USDT",
      merchantTradeNo: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      goods: {
        goodsType: "01",
        goodsCategory: "6000",
        referenceGoodsId: "bybit-premium-acc",
        goodsName: "Cuenta Bybit Latam Premium",
        goodsDetail: `Entrega para: ${email}`,
      },
      checkoutFetchReturnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    };

    const payload = JSON.stringify(orderBody);
    const headers = generateBinanceHeaders(payload);

    const response = await fetch("https://bpay.binanceapi.com/binancepay/openapi/v2/order", {
      method: "POST",
      headers: headers as any,
      body: payload,
    });

    const data = await response.json();

    if (data.status === "SUCCESS") {
      return NextResponse.json({ url: data.data.checkoutUrl });
    } else {
      console.error("Error Binance:", data);
      return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
  }
}
