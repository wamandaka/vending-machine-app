import PageContainer from "@/components/PageContainer";
import { currencyFormatter } from "@/lib/utils";
import { getProductById } from "@/services/product.service";
import Image from "next/image";
import PlaceholderImage from "@/public/images/placeholder.jpeg";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await getProductById(parseInt(id, 10));
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-4">
        <Link href={"/admin"}>
          <Button>
            <ArrowLeft />
            <span>Back</span>
          </Button>
        </Link>
        <Link href={`/admin/${id}/edit`}>
          <Button variant="secondary">
            <Pencil />
            <span>Edit Product</span>
          </Button>
        </Link>
      </div>
      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-200 text-sm">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Name</dt>

            <dd className="text-gray-700 sm:col-span-2">{product.name}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Price</dt>

            <dd className="text-gray-700 sm:col-span-2">
              {currencyFormatter(product.price)}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Stock</dt>

            <dd className="text-gray-700 sm:col-span-2">{product.stock}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Image</dt>

            <dd className="text-gray-700 sm:col-span-2">
              <Image
                src={product.image ? product.image : PlaceholderImage}
                alt={product.name}
                width={100}
                height={100}
              />
            </dd>
          </div>
        </dl>
      </div>
    </PageContainer>
  );
};

export default ProductDetail;
