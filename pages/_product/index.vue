<template>
  <div class="flex flex-wrap sm:-mx-1 lg:-mx-4 mx-1">
    <ProductCard
      v-for="(prod, index) in productData"
      :key="`${prod.vendorCode}_${index}`"
      :product="prod"
      :class="index === 0 ? 'pt-3 sm:pt-0' : null"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onUnmounted } from '@nuxtjs/composition-api';
import ProductCard from '@/components/ProductCard.vue';
import { Product, ProductTypes } from '@/types';
import { getProductsByType, resetProductsByType, loadProductsByType } from '@/composables/useProducts';

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

    // root.$nuxt.context.app.$apiService.getByVendorCodes(['sdasdasdw']);

    onUnmounted(() => {
      resetProductsByType(prodType);
    });

    return { productData };
  }
});
</script>

<style scoped></style>
