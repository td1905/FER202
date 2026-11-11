import type { Product } from "@/types";

export async function getProduct(id: string): Promise<Product | null> {
  if (!/^[1-9]\d*$/.test(id)) return null;

  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Không tải được sản phẩm (${response.status})`);
  return (await response.json()) as Product;
}
