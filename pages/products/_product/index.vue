<template>
  <div>
    <Breadcrumbs class="ps-5" />

    <LoadingIcon v-show="isLoading" />

    <section class="flex flex-wrap -mx-6 sm:-mx-4">
      <ProductCard
        v-for="(prod, index) in productData[currPage]"
        :key="`${prod.vendorCode}_${index}`"
        :product="prod"
        :class="index === 0 ? 'pt-3 sm:pt-0' : null"
        class="w-full px-6 my-4 sm:px-4 sm:w-1/2 sm:my-4 lg:w-1/3"
        @select="chooseProduct(prod.vendorCode, prod)"
      />
    </section>
    <section class="pt-8">
      <Pagination :current-page="currPage" :amount="pagesAmount$" @change="setCurrPage" />
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, useMeta, watch } from '@nuxtjs/composition-api';
import ProductCard from '@/components/ProductCard.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';
import Pagination from '@/components/Pagination.vue';
import { applyFilterToProductList, filteredList$, initProductsPage, setActiveProduct } from '@/composables/useProducts';
import { activePage$, setActiveFilterProp, setActivePage, initSubCategoryFromUrl } from '@/composables/useFilter';
import { isLoading } from '@/composables/useApiService';
import { createSEOMeta } from '@/utils/seo.js';
import { Product, ProductFilter, ProductSubCategories } from '@/types';

export default defineComponent({
  components: { ProductCard, Breadcrumbs, Pagination, LoadingIcon },
  head: {},
  setup(props, ctx) {
    const { root } = ctx as any;
    const prodCategory = root.$route.params.product;

    const metaTitle = root.$t(`navbar.${root.$toKebabCase(prodCategory)}`);
    const metaDescription = root.$t('general.site_description');
    const pagesAmount$ = computed(() => Math.ceil(filteredList$.value.length));

    useMeta({
      title: metaTitle,
      meta: createSEOMeta({
        title: metaTitle,
        description: metaDescription,
        image: '/logo.png',
        url: root.$route.path
      })
    });

    // todo check if product in url is instance of Product Categories

    const chooseProduct = (vendorCode: string, prodData: Product) => {
      setActiveProduct(vendorCode, prodData);
    };

    setActiveFilterProp({ prop: 'currCategory', value: prodCategory as ProductFilter[keyof ProductFilter] });
    initSubCategoryFromUrl(root.$route.query.s);

    // watcher on query subCategory change
    watch(
      () => root.$route.query.s,
      selectedSub => {
        const value = selectedSub === undefined ? null : (selectedSub as ProductSubCategories);
        setActiveFilterProp({ prop: 'subCat', value });
        applyFilterToProductList();
        setActivePage(0);
      }
    );

    // listen on change of current page
    watch(activePage$, newVal => {
      const queries = JSON.parse(JSON.stringify(root.$route.query));
      // newVal === 0 - means first page
      if (newVal === 0 && !queries.p) {
        // no need to update url if it does not contain this query property
        return;
      } else if (newVal === 0) {
        // no need this query param in url for first page
        delete queries.p;
      } else {
        // assign new page
        queries.p = newVal;
      }

      // update url with new query data
      root.$router.replace({ query: queries });
    });

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
      pagesAmount$,
      currPage: activePage$,
      setCurrPage: setActivePage,
      isLoading
    };
  }
});
</script>

<style scoped></style>
