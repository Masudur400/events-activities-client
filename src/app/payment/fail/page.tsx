import { PaymentFail } from "@/components/payment/PaymentFail";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PaymentFailPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  
  const transactionId = (params.transactionId as string) || "UNKNOWN_ID";
  const amount = (params.amount as string) || "0.00";
  const message = (params.message as string) || "Your transaction could not be completed.";

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] flex items-center justify-center p-6">
      <PaymentFail 
        transactionId={transactionId}
        amount={amount}
        message={message}
      />
    </main>
  );
}