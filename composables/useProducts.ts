import { computed, ComputedRef, ref } from '@vue/composition-api';
import { Product, ProductsState, ProductTypes } from '~/types';

const INITIAL_PRODUCTS_STATE: ProductsState = {
  wedding: [],
  mitzvah: [],
  giftcard: []
};

const productsState = ref<ProductsState>(INITIAL_PRODUCTS_STATE);

function getProductsByType(prodType: ProductTypes): ComputedRef<Product[]> {
  return computed(() => productsState.value[prodType]);
}

function addToProductsByType({ prodType, value }: { prodType: ProductTypes; value: Product[] }): void {
  // set products by type only if it is exists in state
  if (productsState.value[prodType]) {
    productsState.value[prodType].push(...value);
  }
}

export { getProductsByType, addToProductsByType };
