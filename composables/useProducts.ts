import { computed, ComputedRef, reactive } from '@vue/composition-api';
import { Product, ProductsState, ProductTypes } from '~/types';
import { getProducts } from '~/composables/useApiService';

const INITIAL_PRODUCTS_STATE: ProductsState = {
  wedding: [],
  mitzvah: [],
  giftcard: []
};

// JSON parse and stringify are needed to prevent making INITIAL_PRODUCTS_STATE to be mutated
const productsState = reactive<ProductsState>(JSON.parse(JSON.stringify(INITIAL_PRODUCTS_STATE)));

function getProductsByType(prodType: ProductTypes): ComputedRef<Product[]> {
  return computed(() => productsState[prodType]);
}

function addToProductsByType({ prodType, value }: { prodType: ProductTypes; value: Product[] }): void {
  // set products by type only if it is exists in state
  if (productsState[prodType]) {
    productsState[prodType].push(...value);
  }
}

function resetProductsByType(prodType: ProductTypes): void {
  if (productsState[prodType]) {
    productsState[prodType] = [...INITIAL_PRODUCTS_STATE[prodType]];
  }
}

async function loadProductsByType(prodType: ProductTypes) {
  const data = await getProducts(prodType);
  addToProductsByType({ prodType, value: data });
}

export { getProductsByType, addToProductsByType, resetProductsByType, loadProductsByType };
