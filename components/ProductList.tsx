import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/types/product";
import PlaceholderImage from "@/public/images/placeholder.jpeg";
import { currencyFormatter } from "@/lib/utils";
interface ProductListProps {
  products: Product[];
  onBuy: (product: Product) => void;
}

const ProductList = ({ products, onBuy }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
      {products.map((product) => (
        <Card key={product.id} className="w-full max-w-sm">
          <CardHeader>
            <Image
              src={product.image || PlaceholderImage}
              width={450}
              height={450}
              alt={product.name}
              className="w-full h-48 object-contain rounded-md"
            />
          </CardHeader>
          <CardContent>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>
              Price: {currencyFormatter(product.price)}
            </CardDescription>
            <CardDescription>Stock: {product.stock}</CardDescription>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="button"
              className="w-full"
              onClick={() => onBuy(product)}
            >
              Buy
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
