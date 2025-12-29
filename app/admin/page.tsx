// "use client";
import PageContainer from "@/components/PageContainer";
// import React, { useEffect, useState } from "react";

import { deleteProduct, getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import Image from "next/image";
import PlaceholderImage from "@/public/images/placeholder.jpeg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, Pencil, Trash } from "lucide-react";
import TableProduct from "@/components/TableProduct";
import { ToastContainer } from "react-toastify";
const AdminPage = async () => {
  // const [dataProducts, setDataProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);
  const dataProducts = await getProducts();
  // useEffect(() => {
  //   // fetch data products from api
  //   const fetchDataProducts = async () => {
  //     try {
  //       const response = await getProducts();
  //       setDataProducts(response);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDataProducts();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  if (dataProducts.length === 0) {
    return (
      <div>
        <PageContainer>
          <h1>Product not found</h1>
        </PageContainer>
      </div>
    );
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Link href={"/admin/create"}>
        <Button className="mb-4">Add New Product</Button>
      </Link>
      <TableProduct dataProducts={dataProducts} />
      <ToastContainer />
    </PageContainer>
  );
};

export default AdminPage;
