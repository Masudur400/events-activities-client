import { PaymentCancel } from "@/components/payment/PaymentCancel";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // searchParams থেকে ডেটা নেওয়া হচ্ছে
  const params = await searchParams;
  
  const transactionId = (params.transactionId as string) || "N/A";
  const amount = (params.amount as string) || "0";
  const message = (params.message as string) || "Payment Cancelled";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#050505] flex items-center justify-center p-4">
      <PaymentCancel 
        transactionId={transactionId}
        amount={amount}
        message={message}
      />
    </main>
  );
}