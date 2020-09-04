<template>
  <div>
    <section>
      <h1>{{ productData.title }}</h1>
    </section>
    <figure class="relative img-wrapper">
      <div
        v-for="(img, idx) in productData.images"
        :key="`main-pic${idx}`"
        class="absolute inset-0 duration-2000 ease-in-out transition"
        :class="selectedImgIdx === idx ? 'opacity-100' : 'opacity-0'"
      >
        <img :src="img" :alt="productData.title" class="" />
      </div>
    </figure>
    <section class="flex flex-row justify-start">
      <div v-for="(img, idx) in productData.images" :key="idx" class="py-2 m-2 max-w-1/5" @click="selectedImgIdx = idx">
        <img :src="img" alt="" class="min-w-10" />
      </div>
    </section>
    <section>
      <b>{{ productData.price }} ₪</b>
      <p>
        {{ productData.description }}
      </p>
    </section>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api';
import { getActiveProduct } from '@/composables/useProducts';

export default defineComponent({
  setup(props, ctx) {
    const { id: vendorCode } = ctx.root.$route.params;
    // const { product } = ctx.root.$route.params;
    const productData = reactive(getActiveProduct(vendorCode));
    const selectedImgIdx = ref(0);

    return { productData, selectedImgIdx };
  }
});
</script>

<style scoped>
.img-wrapper:before {
  padding-bottom: 100%;
  content: '';
  display: block;
}
</style>
