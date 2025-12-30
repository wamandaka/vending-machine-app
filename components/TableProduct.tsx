"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import PlaceholderImage from "@/public/images/placeholder.jpeg";
import { Product } from "@/types/product";
import Link from "next/link";
import { Button } from "./ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
// import { deleteProduct } from "@/services/product.service";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { deleteProduct } from "@/services/product.service";
interface TableProductProps {
  dataProducts: Product[];
  pageSize?: number;
  //   handleDelete: (id: number) => void;
}
const TableProduct = ({ dataProducts, pageSize = 5 }: TableProductProps) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(dataProducts.length / pageSize));
  // Avoid calling setState inside an effect: derive the page to render
  const currentPage = Math.min(page, totalPages);

  const start = (currentPage - 1) * pageSize;
  const paginated = dataProducts.slice(start, start + pageSize);

  const handleDelete = async (id: number) => {
    // console.log(id);
    const isConfirmed = confirm(`Delete product with id: ${id}`);
    if (!isConfirmed) return;
    await deleteProduct(id);
    // Optionally, you might want to refresh the product list or update the state here
    window.location.reload();
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-right">{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Image
                  src={product.image ? product.image : PlaceholderImage}
                  alt={product.name}
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell className="">
                <Link href={`/admin/${product.id}`}>
                  <Button variant="ghost">
                    <Eye className="w-6 h-6" />
                  </Button>
                </Link>
                <Link href={`/admin/${product.id}/edit`}>
                  <Button variant="ghost">
                    <Pencil className="w-6 h-6" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash className="w-6 h-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setPage(currentPage - 1);
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TableProduct;
