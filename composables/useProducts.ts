import { computed, reactive } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import { Product, ProductsState, ProductTypes } from '~/types';
import { getProducts, getProductsByVendorCode } from '~/composables/useApiService';

const INITIAL_DUMMY_PRODUCT: Product = {
  title: '',
  description: '',
  vendorCode: '',
  images: [],
  thumbnail: '',
  order: 0,
  type: 'wedding',
  price: 0
};

const INITIAL_PRODUCTS_STATE: ProductsState = {
  types: {
    wedding: [],
    batMitzvah: [],
    barMitzvah: [],
    giftcard: []
  },
  activeProduct: INITIAL_DUMMY_PRODUCT
};

// JSON parse and stringify are needed to prevent making INITIAL_PRODUCTS_STATE to be mutated
const productsState = reactive<ProductsState>(JSON.parse(JSON.stringify(INITIAL_PRODUCTS_STATE)));

export const getProductsByType = (prodType: ProductTypes): ComputedRef<Product[]> => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(prodType);
  console.log(productsState.types);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  return computed(() => productsState.types[prodType] || []);
};

export const addToProductsByType = ({ prodType, value }: { prodType: ProductTypes; value: Product[] }): void => {
  // set products by type only if it is exists in state
  if (productsState.types[prodType]) {
    productsState.types[prodType].push(...value);
  }
};

export const resetProductsByType = (prodType: ProductTypes): void => {
  if (productsState.types[prodType]) {
    productsState.types[prodType] = [...INITIAL_PRODUCTS_STATE.types[prodType]];
  }
};

export const loadProductsByType = async (prodType: ProductTypes) => {
  const data = await getProducts(prodType);
  addToProductsByType({ prodType, value: data });
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
