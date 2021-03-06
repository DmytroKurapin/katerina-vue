import ProductSubCategoriesList from '@/constants/productSubCategories';
import ProductCategoriesList from '@/constants/productCategories';

export type ProductCategories = typeof ProductCategoriesList[number];
export type ProductSubCategories = typeof ProductSubCategoriesList[number];

export interface NavData {
  link: string;
  label: string;
  category: ProductCategories;
  subCategories: typeof ProductSubCategoriesList | [];
  isLastItem?: boolean; // need it for breadcrumbs.
}

interface ProductDescription {
  en: string;
  he: string;
}
export interface Product {
  title: ProductDescription;
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
    forBusinesses: Product[];
  };
  activeProduct: Product | null;
  filteredList: Array<Product[]>;
  // activeProduct: Product | null; // currently activeProduct has initial dummy value, coz setup() can't be async
}

type SortDirection = 'desc' | 'asc';
interface ProductSorting {
  order: SortDirection;
  price: SortDirection;
}

export interface ProductFilter {
  currCategory: ProductCategories;
  subCat: ProductSubCategories | null;
  activePage: number;
  sort: ProductSorting;
}

export interface FooterGroup {
  title: string;
  items: {
    label: string;
    link: string;
  }[];
  isExternalSrc: boolean;
}
