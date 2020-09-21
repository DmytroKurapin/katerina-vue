import { ProductSubCategoriesList } from '~/constatnts/productSubCategories';

export interface NavData {
  link: string;
  label: string;
  subCategories: typeof ProductSubCategoriesList;
}

export type ProductCategories = 'wedding' | 'batMitzvah' | 'barMitzvah' | 'giftcard';
export type ProductSubCategories = typeof ProductSubCategoriesList[number];

export interface Product {
  title: string;
  description: string;
  vendorCode: string;
  images: string[];
  thumbnail: string;
  order: number;
  category: ProductCategories;
  price: number;
  subCategories: string[];
}

export interface ProductsState {
  categories: {
    wedding: Product[];
    batMitzvah: Product[];
    barMitzvah: Product[];
    giftcard: Product[];
  };
  activeProduct: Product;
  // activeProduct: Product | null; // currently activeProduct has initial dummy value, because setup() can't be async
}
