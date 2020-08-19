export interface NavData {
  link: string;
  label: string;
}

export type ProductTypes = 'wedding' | 'mitzvah' | 'giftcard';

export interface Product {
  title: string;
  description: string;
  vendorCode: string;
  images: string[];
  thumbnail: string;
  order: number;
  type: ProductTypes;
}

export interface ProductsState {
  wedding: Product[];
  mitzvah: Product[];
  giftcard: Product[];
}
