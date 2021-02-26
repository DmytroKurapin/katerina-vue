<template>
  <div>
    <section class="mb-3 sm:flex">
      <h1 class="mb-3 text-3xl sm:hidden">
        {{ productTitle }}
      </h1>

      <section class="flex flex-col-reverse md:flex-row justify-end sm:w-2/5 md:w-3/5">
        <div class="flex md:flex-col flex-row justify-start pt-3 md:pt-0 md:max-w-1/5">
          <figure
            v-for="(img, idx) in productData.images"
            :key="idx"
            :class="{
              'me-2 md:me-0 mt-0 md:mb-4 max-w-1/5 md:max-w-none transition-opacity duration-1000': true,
              'cursor-pointer opacity-50': selectedImgIdx !== idx
            }"
            @click="selectedImgIdx = idx"
          >
            <img :src="img" alt="" class="min-w-10" />
          </figure>
        </div>

        <div class="relative md:flex-grow md:ms-8 img-wrapper">
          <figure
            v-for="(img, idx) in productData.images"
            :key="`main-pic${idx}`"
            class="absolute inset-0 transition ease-in-out duration-2000"
            :class="selectedImgIdx === idx ? 'opacity-100' : 'opacity-0'"
          >
            <img :src="img" :alt="productData.title[$i18n.locale]" class="" />
          </figure>
        </div>
      </section>

      <ProductItemDetailsSection :product-data="productData" class="sm:ms-8 sm:w-3/5 md:w-2/5">
        <template slot="section-top">
          <h1 class="hidden text-3xl sm:block lg:text-4xl">
            {{ productTitle }}
          </h1>
        </template>

        <template slot="related-prod">
          <RelatedProductsGallery
            v-if="relatedProducts$.length > 0"
            :products="relatedProducts$"
            :title="$t('products.related')"
            class="mt-8"
          />
        </template>
      </ProductItemDetailsSection>
    </section>
    <RelatedProductsGallery
      v-if="similarProducts$.length > 0"
      :products="similarProducts$"
      :title="$t('products.similar')"
      class="xl:mt-8"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import ProductItemDetailsSection from '@/components/ProductItemDetailsSection.vue';
import RelatedProductsGallery from '@/components/RelatedProductsGallery.vue';
import { Product } from '@/types';
import { relatedProducts$, similarProducts$, setRelatedSimilarProducts } from '@/composables/useProducts';

export default defineComponent({
  props: {
    productData: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  components: { ProductItemDetailsSection, RelatedProductsGallery },
  setup({ productData }, ctx) {
    const { root } = ctx as any;
    const selectedImgIdx = ref(0);
    const productTitle = productData.title[root.$i18n.locale as 'en' | 'he'];

    setRelatedSimilarProducts();

    return { productTitle, relatedProducts$, similarProducts$, selectedImgIdx };
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
