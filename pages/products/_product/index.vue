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
import { defineComponent, ref, onMounted, useMeta } from '@nuxtjs/composition-api';
import ProductCard from '@/components/ProductCard.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProductFilterButtons from '@/components/ProductFilterButtons.vue';
import { Product } from '@/types';
import { currPageList$, initProductsPage, setActiveProduct } from '@/composables/useProducts';
import { createSEOMeta } from '@/utils/seo.js';

export default defineComponent({
  components: { ProductCard, Breadcrumbs, ProductFilterButtons },
  head() {},
  setup(props, ctx) {
    /*
    TODO SSR returns product = '<no source>' on refresh the page. Check it when issue will be solved
    https://github.com/nuxt/nuxt.js/issues/7696
    https://github.com/nuxt/nuxt.js/pull/8068
    https://github.com/nuxt/nuxt.js/pull/8132
    */

    const metaTitle = ref<string>(ctx.root.$t(`navbar.${ctx.root.$toKebabCase(ctx.root.$route.params.product)}`));
    const metaDescription = ref<string>(ctx.root.$t('general.site_description'));

    useMeta({
      title: metaTitle.value,
      meta: createSEOMeta({
        title: metaTitle.value,
        description: metaDescription.value,
        image: '/logo.png',
        url: ctx.root.$route.path
      })
    });

    // todo check if product in url is instance of Product Categories

    const chooseProduct = (prodData: Product) => {
      setActiveProduct(prodData);
    };

    onMounted(() => {
      // init products list for current product page
      initProductsPage();
    });

    // onUnmounted(() => {
    //   resetProductsByCategory(prodCategory);
    // });

    return {
      productData: currPageList$,
      chooseProduct
    };
  }
});
</script>

<style scoped></style>
