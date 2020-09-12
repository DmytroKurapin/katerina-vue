import { computed, reactive } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import { Product, ProductsState, ProductCategories } from '~/types';
import { getProducts, getProductsByVendorCode } from '~/composables/useApiService';

const INITIAL_DUMMY_PRODUCT: Product = {
  title: '',
  description: '',
  vendorCode: '',
  images: [],
  thumbnail: '',
  order: 0,
  category: 'wedding',
  price: 0,
  subCategories: []
};

const INITIAL_PRODUCTS_STATE: ProductsState = {
  categories: {
    wedding: [],
    batMitzvah: [],
    barMitzvah: [],
    giftcard: []
  },
  activeProduct: INITIAL_DUMMY_PRODUCT
};

// JSON parse and stringify are needed to prevent making INITIAL_PRODUCTS_STATE to be mutated
const productsState = reactive<ProductsState>(JSON.parse(JSON.stringify(INITIAL_PRODUCTS_STATE)));

export const getProductsByCategory = (prodCategory: ProductCategories): ComputedRef<Product[]> => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(prodCategory);
  console.log(productsState.categories);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  return computed(() => productsState.categories[prodCategory] || []);
};

export const addToProductsByCategory = ({
  prodCategory,
  value
}: {
  prodCategory: ProductCategories;
  value: Product[];
}): void => {
  // set products by type only if it is exists in state
  if (productsState.categories[prodCategory]) {
    productsState.categories[prodCategory].push(...value);
  }
};

export const resetProductsByCategory = (prodCategory: ProductCategories): void => {
  if (productsState.categories[prodCategory]) {
    productsState.categories[prodCategory] = [...INITIAL_PRODUCTS_STATE.categories[prodCategory]];
  }
};

export const loadProductsByCategory = async (prodCategory: ProductCategories) => {
  const data = await getProducts(prodCategory);
  addToProductsByCategory({ prodCategory, value: data });
};

export const setActiveProduct = (prodData: Product): void => {
  productsState.activeProduct = prodData;
};

export const getActiveProduct = (vendorCode: string): ComputedRef<Product> => {
  if (productsState.activeProduct.vendorCode !== vendorCode) {
    getProductsByVendorCode([vendorCode]).then(prodData => setActiveProduct(prodData[0]));
  }
  return computed(() => productsState.activeProduct);
};
