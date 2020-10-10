import { ProductSubCategoriesList } from '@/constatnts/productSubCategories';

export interface NavData {
  link: string;
  label: string;
  subCategories: typeof ProductSubCategoriesList | [];
  isLastItem?: boolean; // need it for breadcrumbs.
}

export type ProductCategories = 'wedding' | 'batMitzvah' | 'barMitzvah' | 'giftcard';
export type ProductSubCategories = typeof ProductSubCategoriesList[number];

interface ProductDescription {
  en: string;
  he: string;
}
export interface Product {
  title: string;
  description: ProductDescription;
  shortDescription: ProductDescription;
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
