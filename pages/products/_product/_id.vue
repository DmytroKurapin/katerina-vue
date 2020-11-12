<template>
  <div class="px-6 sm:px-5">
    <Breadcrumbs />

    <section v-if="productData" class="sm:flex mb-3">
      <h1 class="sm:hidden text-3xl mb-3">
        {{ productData.title[$i18n.locale] }}
      </h1>
      <section class="sm:w-2/5 md:w-1/2">
        <div class="relative img-wrapper">
          <figure
            v-for="(img, idx) in productData.images"
            :key="`main-pic${idx}`"
            class="absolute inset-0 duration-2000 ease-in-out transition"
            :class="selectedImgIdx === idx ? 'opacity-100' : 'opacity-0'"
          >
            <img :src="img" :alt="productData.title[$i18n.locale]" class="" />
          </figure>
        </div>
        <div class="flex flex-row justify-start">
          <figure
            v-for="(img, idx) in productData.images"
            :key="idx"
            class="py-2 m-2 max-w-1/5 cursor-pointer"
            @click="selectedImgIdx = idx"
          >
            <img :src="img" alt="" class="min-w-10" />
          </figure>
        </div>
      </section>

      <article class="hidden sm:block sm:w-3/5 md:w-1/2 px-8">
        <h1 class="text-3xl lg:text-4xl">
          {{ productData.title[$i18n.locale] }}
        </h1>

        <ProductItemDetailsSection :product-data="productData" />
      </article>
    </section>

    <ProductItemDetailsSection v-if="productData" :product-data="productData" class="block sm:hidden" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useMeta, watch } from '@nuxtjs/composition-api';
import { activeProduct$, setActiveProduct } from '@/composables/useProducts';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProductItemDetailsSection from '@/components/ProductItemDetailsSection.vue';
import { createSEOMeta } from '@/utils/seo';

export default defineComponent({
  components: { Breadcrumbs, ProductItemDetailsSection },
  head: {},
  setup(props, ctx) {
    const { root } = ctx as any;

    const { id: vendorCode } = root.$route.params;

    setActiveProduct(vendorCode);

    const selectedImgIdx = ref(0);
    const { title, meta } = useMeta();
    watch(activeProduct$, pObj => {
      if (!pObj) {
        return;
      }
      const metaTitle = pObj.title[root.$i18n.locale as 'en' | 'he'];
      title.value = metaTitle;
      meta.value = createSEOMeta({
        title: metaTitle,
        description: pObj.shortDescription[root.$i18n.locale as 'en' | 'he'],
        image: pObj.thumbnail,
        url: root.$route.path
      });
    });

    return { productData: activeProduct$, selectedImgIdx };
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
