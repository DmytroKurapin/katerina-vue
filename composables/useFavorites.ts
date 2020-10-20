import { computed, ref } from '@nuxtjs/composition-api';
import { Product } from '@/types';
import { getProductsByVendorCode } from '@/composables/useApiService';

const INITIAL_FAVORITES = { objs: [], vendorCodes: [] };
const favorites = ref<{ objs: Product[]; vendorCodes: string[] }>(INITIAL_FAVORITES);

function addToFavorites(product: Product) {
  favorites.value.objs.push(product);
  favorites.value.vendorCodes.push(product.vendorCode);
}

function removeFromFavorites(product: Product) {
  const idx = favorites.value.vendorCodes.indexOf(product.vendorCode);
  favorites.value.objs.splice(idx, 1);
  favorites.value.vendorCodes.splice(idx, 1);
}

/** **** Below only EXPORTED variables **** **/

export const pushPopFavorites = (product: Product, toRemove: boolean) => {
  if (toRemove) {
    removeFromFavorites(product);
  } else {
    addToFavorites(product);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value.vendorCodes));
};

// load favorites from localstorage and send request to server to get absent ones
export const initFavorites = () => {
  try {
    const vendorCodesListStr = localStorage.getItem('favorites');
    if (vendorCodesListStr) {
      const vendorCodesList = JSON.parse(vendorCodesListStr);

      // todo send GET request to server to get products by vendorCode. Save them locally in objs

      getProductsByVendorCode(vendorCodesList);
    }
  } catch (e) {}
};

// todo few problems:
//  1. on refresh/open page there can be favorites in localStorage while favorites in state are empty
//     must load absent ones and not override already existed ones

export const favoriteProducts$ = computed<Product[]>(() => favorites.value.objs);
export const favoriteVendorCodes$ = computed<string[]>(() => favorites.value.vendorCodes);
