"use client";

import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProduct } from "@/services/product.service";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

interface ProductFormData {
  name: string;
  price: number;
  stock: number;
}

export default function CreateProductPage() {
  const { register, handleSubmit } = useForm<ProductFormData>();

  const onSubmit = async (data: ProductFormData) => {
    await createProduct({
      name: data.name,
      price: data.price,
      stock: data.stock,
      image: "",
    });
    toast.success("Product created successfully");
    setTimeout(() => {
      redirect("/admin");
    }, 3000);
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Label>Product Name</Label>
        <Input {...register("name")} placeholder="Product name" />
        <Label>Price</Label>
        <Input
          {...register("price")}
          placeholder="Product price"
          type="number"
        />
        <Label>Stock</Label>
        <Input
          {...register("stock")}
          placeholder="Product stock"
          type="number"
        />
        <Button type="submit">Save</Button>
      </form>
      <ToastContainer autoClose={3000} />
    </PageContainer>
  );
}
