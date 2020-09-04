<template>
  <div class="flex flex-wrap sm:-mx-1 lg:-mx-4 mx-1">
    <ProductCard
      v-for="(prod, index) in productData"
      :key="`${prod.vendorCode}_${index}`"
      :product="prod"
      :class="index === 0 ? 'pt-3 sm:pt-0' : null"
      @chooseProduct="chooseProduct(prod)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onUnmounted } from '@nuxtjs/composition-api';
import ProductCard from '@/components/ProductCard.vue';
import { Product, ProductTypes } from '@/types';
import {
  getProductsByType,
  resetProductsByType,
  loadProductsByType,
  setActiveProduct
} from '@/composables/useProducts';

export default defineComponent({
  components: {
    ProductCard
  },
  setup(props, ctx) {
    // todo check if product in url is instance of Product Types

    const prodType = ctx.root.$route.params.product as ProductTypes;
    // init products list for current product page
    loadProductsByType(prodType);
    const productData = reactive<Product[]>(getProductsByType(prodType).value);
    const test = reactive([]);

    function chooseProduct(prodData: Product) {
      setActiveProduct(prodData);
    }

    onUnmounted(() => {
      resetProductsByType(prodType);
    });

    return { productData, chooseProduct, test };
  }
});
</script>

<style scoped></style>
