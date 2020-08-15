<template>
  <div>
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <ProductCard v-for="prod in productData" :key="prod.articul" :product="prod" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from '@vue/composition-api';
import axios from 'axios';
import ProductCard from '@/components/ProductCard.vue';
import { Product } from '@/types';

export default defineComponent({
  components: {
    ProductCard
  },
  setup() {
    const productData: Ref<Array<Product>> = ref([]);

    onBeforeMount(() => {
      axios.get('http://localhost:3000/_fake-data/content.json').then(response => {
        productData.value = response.data;
      });
    });

    return { productData };
  }
});
</script>

<style scoped></style>
