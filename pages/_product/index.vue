<template>
  <div>
    <div class="flex flex-wrap sm:-mx-1 lg:-mx-4 mx-1">
      <ProductCard v-for="prod in productData" :key="prod.vendorCode" :product="prod" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
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
    const productData = ref<Array<Product>>(getProductsByType(prodType).value);
    // init products list for current product page
    loadProductsByType(prodType);

    // getProductsByVendorCode(['sdasdasdw']);
    // root.$nuxt.context.app.$apiService.getByVendorCodes(['sdasdasdw']);

    return { productData };
  }
});
</script>

<style scoped></style>
