"use client";

import { useEffect, useState } from "react";
import { getProducts, updateProductStock } from "@/services/product.service";
import type { Product } from "@/types/product";
import { ToastContainer, toast } from "react-toastify";
import ProductList from "@/components/ProductList";
import { createTransaction } from "@/services/transaction.service";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { currencyFormatter } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import PageContainer from "@/components/PageContainer";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [money, setMoney] = useState(0);
  const [inputMoney, setInputMoney] = useState(0);
  const [change, setChange] = useState(0);
  // const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const ACCEPTED_DENOMINATIONS = [2000, 5000, 10000, 20000, 50000];

  // console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // get money from localstorage
    const storedMoney = localStorage.getItem("money");
    if (storedMoney) {
      setMoney(parseInt(storedMoney, 10));
    }
  }, []);

  const handleBuy = async (product: Product) => {
    // setError(null);

    if (money <= 0) {
      // setError("Silakan masukkan uang terlebih dahulu");
      toast.error("Silakan masukkan uang terlebih dahulu");
      return;
    }

    if (product.stock === 0) {
      // setError("Stok habis");
      toast.error("Stok habis");
      return;
    }

    if (money < product.price) {
      // setError("Uang tidak cukup");
      toast.error("Uang tidak cukup");
      return;
    }

    const change = money - product.price;
    setChange(change);

    try {
      // 1. Update stok produk
      await updateProductStock(product.id, product.stock - 1);

      // 2. Simpan transaksi
      await createTransaction({
        productId: product.id,
        productName: product.name,
        price: product.price,
        paid: money,
        change,
        createdAt: new Date().toISOString(),
      });

      // 3. Update state lokal (jika perlu)
      localStorage.setItem("money", change.toString());
      const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      );
      setProducts(updatedProducts);
      setMoney(change);
      toast.success("Transaksi berhasil");
    } catch (error) {
      console.log(error);
      // setError("Terjadi kesalahan saat transaksi");
      toast.error("Terjadi kesalahan saat transaksi");
    }
    setMoney(0);
    localStorage.setItem("money", "0");
  };

  const handleInsertMoney = () => {
    if (!ACCEPTED_DENOMINATIONS.includes(inputMoney)) {
      toast.error(
        `Denominasi tidak valid. Silakan masukkan salah satu dari: ${ACCEPTED_DENOMINATIONS.join(
          ", "
        )}`
      );
      return;
    }
    if (inputMoney < 0) {
      // setError("Jumlah uang tidak boleh negatif");
      toast.error("Jumlah uang tidak boleh negatif");
      return;
    }
    if (isNaN(inputMoney)) {
      // setError("Jumlah uang tidak valid");
      toast.error("Jumlah uang tidak valid");
      return;
    }
    if (inputMoney === 0) {
      // setError("Jumlah uang tidak boleh nol");
      toast.error("Jumlah uang tidak boleh nol");
      return;
    }
    setMoney(inputMoney);
    localStorage.setItem("money", inputMoney.toString());
    setInputMoney(0);
    setOpenDialog(false);
    toast.success("Uang berhasil dimasukkan");
  };

  const handleRefund = () => {
    if (money === 0) {
      // setError("Tidak ada uang untuk dikembalikan");
      toast.error("Tidak ada uang untuk dikembalikan");
      return;
    }
    // setChange(money);
    setMoney(0);
    localStorage.setItem("money", "0");
    // setError(null);
    toast.success("Uang berhasil dikembalikan");
  };

  const handleTakeChange = () => {
    if (change === 0) {
      toast.error("Tidak ada kembalian untuk diambil");
      return;
    }
    setChange(0);
    toast.success("Kembalian berhasil diambil");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No products available.</p>
      </div>
    );

  return (
    <PageContainer>
      {/* <div className="max-w-7xl mx-auto pt-10 px-4"> */}
      <div className="flex flex-col md:flex-row w-full gap-4 my-4 justify-between">
        <Card className="w-full relative">
          <CardContent>
            <h2 className="text-xl font-medium">
              Money: {currencyFormatter(money)}
            </h2>
            <Button
              className="absolute right-5 top-5"
              onClick={() => setOpenDialog(true)}
            >
              Insert Money
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full relative">
          <CardContent>
            <h2 className="text-xl font-medium">
              Change: {currencyFormatter(change)}
            </h2>
            <Button
              className="absolute right-5 top-5"
              onClick={handleTakeChange}
            >
              Take Change
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <form>
          {/* <DialogTrigger asChild>
            <Button variant="outline">Insert Money</Button>
          </DialogTrigger> */}
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Input Money</DialogTitle>
              <DialogDescription>
                Please enter the amount of money you want to insert.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="money">Money</Label>
                <div className="flex items-center gap-2">
                  <span>Rp</span>
                  <Input
                    id="money"
                    name="money"
                    type="number"
                    onChange={(e) =>
                      setInputMoney(parseInt(e.target.value, 10))
                    }
                    placeholder="Enter money amount"
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  Accepted denominations:{" "}
                  {ACCEPTED_DENOMINATIONS.map((d) => currencyFormatter(d)).join(
                    ", "
                  )}
                </span>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleInsertMoney}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <Button variant="default" onClick={handleRefund} className="mb-4">
        Refund
      </Button>
      {/* <div> */}
      <h1 className="text-3xl font-bold mb-2">Products</h1>
      <ProductList products={products} onBuy={handleBuy} />
      {/* </div> */}
      <ToastContainer />
      {/* </div> */}
    </PageContainer>
  );
}
