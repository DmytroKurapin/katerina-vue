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
        @select="chooseProduct(prod.vendorCode, prod)"
      />
    </section>
    <section>
      <Pagination :amount="pagesAmount" />
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, useMeta, watch } from '@nuxtjs/composition-api';
import ProductCard from '@/components/ProductCard.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import ProductFilterButtons from '@/components/ProductFilterButtons.vue';
import { Product } from '@/types';
import { applyFilterToProductList, filteredList$, initProductsPage, setActiveProduct } from '@/composables/useProducts';
import { activeFilter$ } from '@/composables/useFilter';
import { createSEOMeta } from '@/utils/seo.js';
import Pagination from '@/components/Pagination.vue';

const PRODUCTS_PER_PAGE = 10;

export default defineComponent({
  components: { ProductCard, Breadcrumbs, ProductFilterButtons, Pagination },
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
    const pagesAmount = computed(() => Math.ceil(filteredList$.value.length / PRODUCTS_PER_PAGE));

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

    const chooseProduct = (vendorCode: string, prodData: Product) => {
      setActiveProduct(vendorCode, prodData);
    };

    // listen on change of subCategory and apply new filter to products list
    watch(
      () => activeFilter$.value.subCat,
      () => {
        applyFilterToProductList();
      }
    );

    onMounted(() => {
      // init products list for current product page
      initProductsPage();
    });

    // onUnmounted(() => {
    //   resetProductsByCategory(prodCategory);
    // });

    return {
      productData: filteredList$,
      chooseProduct,
      pagesAmount
    };
  }
});
</script>

<style scoped></style>
