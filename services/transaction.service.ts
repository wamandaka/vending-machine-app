export const createTransaction = async (transaction: {
  productId: number;
  productName: string;
  price: number;
  paid: number;
  change: number;
  createdAt: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  const data = await res.json();

  return data;
};
export const getTransactions = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions?_limit=5&_sort=createdAt`
  );
  const data = await res.json();

  return data;
};
