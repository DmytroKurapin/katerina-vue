<template>
  <div>
    <div class="flex flex-wrap sm:-mx-1 lg:-mx-4 mx-1">
      <ProductCard
        v-for="prod in productData"
        :key="prod.vendorCode"
        :product="prod"
        class="my-1 px-1 w-full sm:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 animate-show-up transform translate-y-64 scale-50 "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import ProductCard from '@/components/ProductCard.vue';
import { Product, ProductTypes } from '@/types';
import { getProductsByType } from '@/composables/useProducts';
import { loadProductsByType } from '~/composables/useApiService';

export default defineComponent({
  components: {
    ProductCard
  },
  setup(props, ctx) {
    // todo check if product in url is instance of Product Types
    const prodType = ctx.root.$route.params.product as ProductTypes;
    const productData = reactive<Array<Product>>(getProductsByType(prodType).value);
    // init products list for current product page
    loadProductsByType(prodType);

    // getProductsByVendorCode(['sdasdasdw']);
    // root.$nuxt.context.app.$apiService.getByVendorCodes(['sdasdasdw']);

    return { productData };
  }
});
</script>

<style scoped></style>
