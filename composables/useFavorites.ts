import { computed, ref } from '@nuxtjs/composition-api';
import { Product } from '@/types';

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

function pushPopFavorites(product: Product, toRemove: boolean) {
  if (toRemove) {
    removeFromFavorites(product);
  } else {
    addToFavorites(product);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value.vendorCodes));
}

// load favorites from localstorage and send request to server to get absent ones
function initFavorites() {
  try {
    const vendorCodesListStr = localStorage.getItem('favorites');
    if (vendorCodesListStr) {
      // const vendorCodesList = JSON.parse(vendorCodesListStr);
      // todo send GET request to server to get products by vendorCode. Save them locally in objs
    }
  } catch (e) {}
}

// todo few problems:
//  1. on refresh/open page there can be favorites in localStorage while favorites in state are empty
//     must load absent ones and not override already existed ones

// async function loadPost(id) {
//   const post = await fetchPost(id)
//   setPost(post)
// }

const getFavoriteProducts = computed<Product[]>(() => favorites.value.objs);
const getFavoriteVendorCodes = computed<string[]>(() => favorites.value.vendorCodes);

export { initFavorites, pushPopFavorites, getFavoriteProducts, getFavoriteVendorCodes };
