<template>
  <div class="inline-flex">
    <button
      :class="selectedFilter.subCat === null ? 'selected-filter-btn' : 'unselected-filter-btn'"
      class="filter-btn"
      @click="selectNewFilter(null)"
    >
      {{ $t('products.all') }}
    </button>
    <button
      v-for="(sub, idx) in currNavObj.subCategories"
      :key="`${sub}_${idx}`"
      :class="selectedFilter.subCat === sub ? 'selected-filter-btn' : 'unselected-filter-btn'"
      class="filter-btn"
      @click="selectNewFilter(sub)"
    >
      {{ $t(`navbar.${sub}`) }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api';
import { ProductSubCategories } from '~/types';
import { ProductSubCategoriesList } from '~/constatnts/productSubCategories';
import navDataList from '~/constatnts/navData';

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

    const selectedFilter = reactive<{ subCat: ProductSubCategories | null }>({ subCat: null });

    const subCatFromUrl: any = query.s;
    if (subCatFromUrl && ProductSubCategoriesList.includes(subCatFromUrl)) {
      selectedFilter.subCat = subCatFromUrl;
    }

    const currNavObj = navDataList.find(navData => navData.link === `/${prodCategory}`) || {};

    const selectNewFilter = (flag: ProductSubCategories | null) => {
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
    };

    return { selectNewFilter, selectedFilter, currNavObj };
  }
});
</script>

<style scoped>
.filter-btn {
  @apply font-semibold py-2 px-4 border border-primary;
}
.filter-btn:focus {
  @apply outline-none;
}
.selected-filter-btn {
  @apply text-white bg-primary;
}
.unselected-filter-btn {
  @apply text-primary-dark bg-transparent;
}
.filter-btn:hover {
  @apply selected-filter-btn bg-primary;
}
</style>
