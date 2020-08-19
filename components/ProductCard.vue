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
        <p class="text-grey-darker text-sm">
          11/1/19
        </p>
      </header>

      <footer class="flex items-center justify-between leading-none p-2 sm:p-4">
        <a class="flex items-center no-underline hover:underline text-black" href="#">
          <p class="ml-2 text-sm">
            {{ product.description }}
          </p>
        </a>
        <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
          <span class="hidden">Like</span>

          <!--     todo     no font awesome. use other icons-->

          <i class="fa fa-heart"></i>
        </a>
      </footer>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Product } from '@/types';

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup() {
    // const prodPath = localePath(`/${this.$route.params.product}/${this.product.vendorCode}`);
    return {};
  }
});
</script>

<style scoped></style>
