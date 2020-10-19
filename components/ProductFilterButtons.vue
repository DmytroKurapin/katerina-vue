<template>
  <div v-if="currNavObj" class="inline-flex">
    <button
      v-for="(sub, idx) in [null, ...currNavObj.subCategories]"
      :key="`filter_button_${idx}`"
      :class="selectedFilter.subCat === sub ? 'selected-filter-btn' : 'unselected-filter-btn'"
      class="font-semibold py-2 px-6 border border-primary focus:outline-none sm:px-12 md:px-16"
      @click="selectNewFilter(sub)"
    >
      {{ sub === null ? $t('products.all') : $t(`navbar.${sub}`) }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import ProductSubCategories from '@/types';
import ProductSubCategoriesList from '@/constatnts/productSubCategories';
import navDataList from '@/constatnts/navData';
import { activeFilter$, setActiveFilterProp } from '@/composables/useFilter';

const toggleSubCategoryFromUrl = (subCat: ProductSubCategories) => {
  if (subCat) {
    // set active filter if specific query param exists in url
    if (ProductSubCategoriesList.includes(subCat)) {
      setActiveFilterProp({ prop: 'subCat', value: subCat });
    }
  } else if (activeFilter$.value.subCat !== null) {
    // reset active filter if url does not contain specific filter query param, but object has value
    setActiveFilterProp({ prop: 'subCat', value: null });
  }
};

export default defineComponent({
  components: {},
  setup(props, ctx) {
    const {
      $route: {
        params: { product: prodCategory },
        query
      },
      $router
    } = ctx.root;

    const selectedFilter = activeFilter$;
    const subCatFromUrl: any = query.s;

    setActiveFilterProp({ prop: 'currCategory', value: prodCategory });
    toggleSubCategoryFromUrl(subCatFromUrl);

    const currNavObj = navDataList.find(navData => navData.link.indexOf(`/${prodCategory}`));

    const selectNewFilter = (flag: ProductSubCategories | null) => {
      // clicked on the same filter
      if (selectedFilter.value.subCat === flag) {
        return;
      }
      setActiveFilterProp({ prop: 'subCat', value: flag });

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
    };

    return { selectNewFilter, selectedFilter, currNavObj };
  }
});
</script>

<style scoped>
.selected-filter-btn {
  @apply text-white bg-primary;
}
.unselected-filter-btn {
  @apply text-primary-dark bg-transparent;
}
.unselected-filter-btn:hover {
  @apply selected-filter-btn bg-primary;
}
</style>
