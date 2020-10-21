import { computed, ref } from '@nuxtjs/composition-api';
import { Product } from '@/types';
import { getProductsByVendorCode } from '@/composables/useApiService';

const INITIAL_FAVORITES = { objs: [], vendorCodes: [] };
const favorites = ref<{ objs: Product[]; vendorCodes: string[] }>(INITIAL_FAVORITES);

function addToFavorites(products: Product[]) {
  products.map(pObj => {
    favorites.value.objs.push(pObj);
    favorites.value.vendorCodes.push(pObj.vendorCode);
  });
}

function removeFromFavorites(products: Product[]) {
  products.map(pObj => {
    const idx = favorites.value.vendorCodes.indexOf(pObj.vendorCode);
    favorites.value.objs.splice(idx, 1);
    favorites.value.vendorCodes.splice(idx, 1);
  });
}

/** **** Below only EXPORTED variables **** **/

export const pushPopFavorites = (products: Product[], toRemove: boolean) => {
  if (toRemove) {
    removeFromFavorites(products);
  } else {
    addToFavorites(products);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value.vendorCodes));
};

// load favorites from localstorage and send request to server to get absent ones
// todo currently called from setup function of pages. means its open page call this function. Refactor it
export const initFavorites = async () => {
  // prevent init favorites if still ssr process or there are already vendor codes in the state
  if (!process.browser || favorites.value.vendorCodes.length > 0) {
    return;
  }
  try {
    const vendorCodesListStr = localStorage.getItem('favorites');
    if (vendorCodesListStr) {
      const vendorCodesList = JSON.parse(vendorCodesListStr);

      // todo send GET request to server to get products by vendorCode. Save them locally in objs

      const products = await getProductsByVendorCode(vendorCodesList);
      addToFavorites(products);
    }
  } catch (e) {
    console.error('initFavorites error', e);
  }
};

// todo few problems:
//  1. on refresh/open page there can be favorites in localStorage while favorites in state are empty
//     must load absent ones and not override already existed ones

export const favoriteProducts$ = computed<Product[]>(() => favorites.value.objs);
export const favoriteVendorCodes$ = computed<string[]>(() => favorites.value.vendorCodes);
