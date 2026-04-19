import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();

  // 1. Validar que el pago fue exitoso
  if (payload.bizStatus === "PAY_SUCCESS") {
    const orderId = payload.merchantTradeNo;
    const userEmail = payload.orderDetail?.goods?.goodsDetail?.split(": ")[1];

    console.log(`Pago confirmado para ${userEmail}. Orden: ${orderId}`);

    // 2. DISPARAR ENVÍO DE EMAIL AQUÍ
    // await sendCredentialsEmail(userEmail);

    return NextResponse.json({ returnCode: "SUCCESS", returnMsg: null });
  }

  return NextResponse.json({ returnCode: "FAIL", returnMsg: "Invalid Status" });
}
