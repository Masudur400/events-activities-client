import { PaymentSuccess } from "@/components/payment/PaymentSuccess";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  
  const transactionId = (params.transactionId as string) || "N/A";
  const amount = (params.amount as string) || "0.00";
  const message = (params.message as string) || "Payment Successfully Completed";

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] flex items-center justify-center p-6">
      <PaymentSuccess 
        transactionId={transactionId}
        amount={amount}
        message={message}
      />
    </main>
  );
}