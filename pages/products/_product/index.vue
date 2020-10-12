<template>
  <div>
    <section class="ps-4">
      <Breadcrumbs />
    </section>
    <section class="flex justify-center">
      <ProductFilterButtons />
    </section>
    <section class="flex flex-wrap px-1">
      <ProductCard
        v-for="(prod, index) in productData"
        :key="`${prod.vendorCode}_${index}`"
        :product="prod"
        :class="index === 0 ? 'pt-3 sm:pt-0' : null"
        @select="chooseProduct(prod)"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from '@nuxtjs/composition-api';
import ProductCard from '@/components/ProductCard.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProductFilterButtons from '@/components/ProductFilterButtons.vue';
import { Product } from '@/types';
import {
  productsByCategory,
  resetProductsByCategory,
  loadProductsByCategory,
  setActiveProduct
} from '@/composables/useProducts';
import { createSEOMeta } from '@/utils/seo.js';

export default defineComponent({
  components: { ProductCard, Breadcrumbs, ProductFilterButtons },
  head() {
    const { metaTitle: title, metaDescription: description, prodCategory } = this;

    // todo add image url of one of the products

    return { title, meta: createSEOMeta({ title, description, image: '/logo.png', url: prodCategory }) };
  },
  setup(props, ctx) {
    // todo check if product in url is instance of Product Categories

    const prodCategory = ctx.root.$route.params.product;

    /*
    TODO SSR returns product = '<no source>' on refresh the page. Check it when issue will be solved
    https://github.com/nuxt/nuxt.js/issues/7696
    https://github.com/nuxt/nuxt.js/pull/8068
    https://github.com/nuxt/nuxt.js/pull/8132
    */

    const metaTitle = ref<string>(ctx.root.$t(`navbar.${ctx.root.$toKebabCase(prodCategory)}`));
    const metaDescription = ref<string>(ctx.root.$t('general.site_description'));

    /*
    TODO uncomment useMeta and update head using this function once nuxt fix its issues (do it in each component)
    https://github.com/nuxt-community/composition-api/issues/244
    */
    // useMeta({
    //   title: metaTitle,
    //   meta: createSEOMeta({ title: metaTitle, description: metaDescription, image: '/logo.png', url: prodCategory })
    // });

    // init products list for current product page
    loadProductsByCategory(prodCategory);

    const productData = productsByCategory(prodCategory);

    const chooseProduct = (prodData: Product) => {
      setActiveProduct(prodData);
    };

    onUnmounted(() => {
      resetProductsByCategory(prodCategory.value);
    });

    return {
      metaTitle,
      metaDescription,
      prodCategory,
      productData,
      chooseProduct
    };
  }
});
</script>

<style scoped></style>
