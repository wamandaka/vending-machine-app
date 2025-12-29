"use client";
import PageContainer from "@/components/PageContainer";
import { Card } from "@/components/ui/card";
import { currencyFormatter } from "@/lib/utils";
import { getTransactions } from "@/services/transaction.service";
import { Transaction } from "@/types/transcation";
import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [dataHistory, setDataHistory] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDataHistory = async () => {
      try {
        const response = await getTransactions();
        setDataHistory(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>loading...</h1>
      </div>
    );
  }

  if (dataHistory.length === 0) {
    return (
      <div>
        <PageContainer>
          <h1 className="text-4xl font-bold">Transaction History</h1>
          <div className="mt-8">
            <p>No transaction history found</p>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div>
      <PageContainer>
        <h1 className="text-4xl font-bold">Transaction History</h1>
        <div className="mt-8">
          {dataHistory.map((transaction) => (
            <Card key={transaction.id} className="mb-4 p-4">
              <h2 className="text-2xl font-semibold mb-2">
                {transaction.productName}
              </h2>
              <p className="mb-2">
                Price: {currencyFormatter(transaction.price)}
              </p>
              <p className="mb-2">
                Paid: {currencyFormatter(transaction.paid)}
              </p>
              <p className="mb-2">
                Change: {currencyFormatter(transaction.change)}
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      </PageContainer>
    </div>
  );
};

export default HistoryPage;
