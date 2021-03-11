import ProductSubCategoriesList from '@/constants/productSubCategories';
// import ProductWeddingSubCategoriesList from '@/constants/productWeddingSubCategories';
import ProductCategoriesList from '@/constants/productCategories';

export type ProductCategories = typeof ProductCategoriesList[number];
export type ProductSubCategories = typeof ProductSubCategoriesList[number];
// export type ProductWeddingSubCategories = typeof ProductWeddingSubCategoriesList[number];

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
  sizes: string[];
  related: string[]; // ids: complete your suite
  similar: string[]; // ids: you may also like
  video: string | null;
}

export interface ProductsState {
  categories: {
    wedding: Product[];
    batMitzvah: Product[];
    barMitzvah: Product[];
    forBusinesses: Product[];
  };
  activeProduct: {
    obj: Product | null;
    relatedProducts: Product[];
    similarProducts: Product[];
  };
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
