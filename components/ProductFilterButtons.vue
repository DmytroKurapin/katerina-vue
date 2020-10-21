<template>
  <div v-if="currNavObj" class="inline-flex">
    <nuxt-link
      v-for="(sub, idx) in [null, ...currNavObj.subCategories]"
      :key="`filter_button_${idx}`"
      :to="localePath(`${currNavObj.link}${sub === null ? '' : `?s=${sub}`}`)"
    >
      <span
        :class="selectedFilter.subCat === sub ? 'selected-filter-btn' : 'unselected-filter-btn'"
        class="font-semibold py-2 px-6 border border-primary focus:outline-none sm:px-12 md:px-16"
      >
        {{ sub === null ? $t('products.all') : $t(`navbar.${sub}`) }}
      </span>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from '@nuxtjs/composition-api';
import { ProductSubCategories } from '@/types';
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
      }
    } = ctx.root;

    const selectedFilter = activeFilter$;
    const subCatFromUrl: any = query.s;

    setActiveFilterProp({ prop: 'currCategory', value: prodCategory });
    toggleSubCategoryFromUrl(subCatFromUrl);

    const currNavObj = navDataList.find(navData => navData.link.indexOf(`/${prodCategory}`));

    // watcher on query subCategory change
    watch(
      () => ctx.root.$route.query.s,
      selectedSub => {
        const value = selectedSub === undefined ? null : (selectedSub as ProductSubCategories);
        setActiveFilterProp({ prop: 'subCat', value });
      }
    );

    return { selectedFilter, currNavObj };
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
