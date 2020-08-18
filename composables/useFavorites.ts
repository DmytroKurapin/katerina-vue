import { computed, ref } from '@vue/composition-api';
import { Product } from '~/types';

const favorites = ref<Product[]>([]);

function addToFavorites(product: Product) {
  favorites.value.push(product);
  localStorage.setItem('favorites', JSON.stringify(favorites.value.map(p => p.vendorCode)));
}

// load favorites from localstorage and send request to server to get absent ones
function initFavorites() {
  try {
    const vendorCodesListStr = localStorage.getItem('favorites');
    if (vendorCodesListStr) {
      // const vendorCodesList = JSON.parse(vendorCodesListStr);

      // todo send GET request to server to get products by vendorCode
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

const getFavorites = computed(() => favorites.value);

export { initFavorites, addToFavorites, getFavorites };
