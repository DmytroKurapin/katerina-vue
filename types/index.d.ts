export interface NavData {
  link: string;
  label: string;
}

export type ProductTypes = 'wedding' | 'batMitzvah' | 'barMitzvah' | 'giftcard';

export interface Product {
  title: string;
  description: string;
  vendorCode: string;
  images: string[];
  thumbnail: string;
  order: number;
  type: ProductTypes;
  price: number;
}

export interface ProductsState {
  types: {
    wedding: Product[];
    batMitzvah: Product[];
    barMitzvah: Product[];
    giftcard: Product[];
  };
  activeProduct: Product;
  // activeProduct: Product | null; // currently activeProduct has initial dummy value, because setup() can't be async
}
