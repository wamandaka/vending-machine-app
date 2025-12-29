export const getProducts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
};

export const getProductById = async (productId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data;
};

export const updateProductStock = async (
  productId: number,
  newStock: number
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: newStock }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update product stock");
  }
  const data = await response.json();
  return data;
};

export const deleteProduct = async (productId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
  const data = await response.json();
  return data;
};

export const createProduct = async (productData: {
  name: string;
  price: number;
  stock: number;
  image: string;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  const data = await response.json();
  return data;
};
