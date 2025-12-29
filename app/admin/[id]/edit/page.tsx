import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProductStock } from "@/services/product.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  async function updateProduct(formData: FormData) {
    "use server";

    const stock = formData.get("stock");
    // Handle your update logic here
    console.log(`Updating product ${id} with stock: ${stock}`);
    await updateProductStock(parseInt(id, 10), parseInt(stock as string, 10));

    // Revalidate the page or redirect
    revalidatePath(`/products/${id}`);
    redirect(`/admin/${id}`);
  }

  return (
    <div>
      <PageContainer>
        <h1>Edit Product</h1>
        <form action={updateProduct} className="space-y-4">
          <Label htmlFor="product-stock">Product Stock</Label>
          <Input id="product-stock" name="stock" placeholder="Product Stock" />
          <Button type="submit">Save</Button>
        </form>
      </PageContainer>
    </div>
  );
};

export default EditProductPage;
