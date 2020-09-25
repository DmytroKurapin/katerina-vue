<template>
  <div class="flex flex-wrap flex-col sm:-mx-1 lg:-mx-4 mx-1">
    <section>
      <Breadcrumbs />
    </section>
    <section class="flex justify-center">
      <div class="inline-flex">
        <button :class="filterBtnClasses(null)" @click="selectNewFilter(null)">
          {{ $t('products.all') }}
        </button>
        <button
          v-for="(sub, idx) in currNavObj.subCategories"
          :key="`${sub}_${idx}`"
          :class="filterBtnClasses(sub)"
          @click="selectNewFilter(sub)"
        >
          {{ $t(`navbar.${sub}`) }}
        </button>
      </div>
    </section>
    <section>
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
import { defineComponent, reactive, onUnmounted } from '@nuxtjs/composition-api';
import ProductCard from '@/components/ProductCard.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { Product, ProductCategories, ProductSubCategories } from '@/types';
import navDataList from '@/constatnts/navData';
import {
  getProductsByCategory,
  resetProductsByCategory,
  loadProductsByCategory,
  setActiveProduct
} from '@/composables/useProducts';
import { ComputedRef } from '@vue/composition-api';
import { ProductSubCategoriesList } from '~/constatnts/productSubCategories';

export default defineComponent({
  components: { ProductCard, Breadcrumbs },
  setup(props, ctx) {
    // todo check if product in url is instance of Product Categories

    const {
      $route: { params: routeParams, query },
      $router
    } = ctx.root;
    const prodCategory = routeParams.product as ProductCategories;
    // init products list for current product page
    loadProductsByCategory(prodCategory);
    const selectedFilter = reactive<{ subCat: ProductSubCategories | null }>({ subCat: null });
    const subCatFromUrl: any = query.s;
    if (subCatFromUrl && ProductSubCategoriesList.includes(subCatFromUrl)) {
      selectedFilter.subCat = subCatFromUrl;
    }

    const currNavObj = navDataList.find(navData => navData.link === `/${prodCategory}`) || {};
    const productData = reactive<ComputedRef<Product[]>>(getProductsByCategory(prodCategory));

    const activeClasses = ['bg-primary', 'text-white', 'border-transparent'];
    const mainFilterBtnClasses = `bg-transparent font-semibold py-2 px-4 border border-primary focus:outline-none
    ${activeClasses.reduce((res, cl) => `${res}hover:${cl}`, '')}`;

    function filterBtnClasses(catToCompare: string) {
      return [mainFilterBtnClasses, selectedFilter.subCat === catToCompare ? activeClasses : 'text-primary-dark'];
    }

    function chooseProduct(prodData: Product) {
      setActiveProduct(prodData);
    }

    function selectNewFilter(flag: ProductSubCategories | null) {
      // clicked on the same filter
      if (selectedFilter.subCat === flag) {
        return;
      }
      selectedFilter.subCat = flag;
      const queries = JSON.parse(JSON.stringify(query));
      // selected 'all'. Remove query param if existed
      if (flag === null) {
        delete queries.s;
      } else {
        // assign new filter
        queries.s = flag;
      }
      // update url with new query data
      $router.replace({ query: queries });
    }

    onUnmounted(() => {
      resetProductsByCategory(prodCategory);
    });

    return { productData, chooseProduct, filterBtnClasses, selectedFilter, currNavObj, selectNewFilter };
  }
});
</script>

<style scoped></style>
