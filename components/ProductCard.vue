<template>
  <div class="my-1 px-1 w-full sm:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
    <article class="overflow-hidden rounded-lg shadow-lg">
      <nuxt-link :to="localePath(`/${$route.params.product}/${product.vendorCode}`)">
        <img alt="Placeholder" class="block h-auto w-full" :src="product.thumbnail" />
      </nuxt-link>

      <header class="flex items-center justify-between leading-tight p-2 sm:p-4">
        <h1 class="text-lg">
          <a class="no-underline hover:underline text-black" href="#">
            {{ product.title }}
          </a>
        </h1>
        <p class="text-grey-darker text-sm">{{ product.price }} ₪</p>
      </header>

      <footer class="flex items-center justify-between leading-none p-2 sm:p-4">
        <a class="flex items-center no-underline hover:underline text-black" href="#">
          <p class="ml-2 text-sm">
            {{ product.description }}
          </p>
        </a>
        <svg
          :class="isLiked ? 'text-primary' : 'text-primary-light'"
          class="h-6 w-6 cursor-pointer fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="toggleFavorites"
        >
          <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
        </svg>
      </footer>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { getFavoriteVendorCodes, pushPopFavorites } from '@/composables/useFavorites';
import { Product } from '@/types';

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup(props) {
    const { product } = props;
    // const prodPath = localePath(`/${this.$route.params.product}/${this.product.vendorCode}`);

    const isLiked = computed<boolean>(() => getFavoriteVendorCodes.value.includes(product.vendorCode));

    function toggleFavorites() {
      pushPopFavorites(product, isLiked.value);
    }
    return { isLiked, toggleFavorites };
  }
});
</script>

<style scoped></style>
