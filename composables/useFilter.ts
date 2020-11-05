import { ProductCategories, ProductFilter, ProductSubCategories } from '@/types';
import { computed, reactive } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import ProductCategoriesList from '@/constatnts/productCategories';
import ProductSubCategoriesList from '@/constatnts/productSubCategories';

const INITIAL_FILTER_STATE: ProductFilter = {
  currCategory: 'wedding',
  subCat: null,
  activePage: 0,
  sort: { order: 'desc', price: 'desc' }
};

// JSON parse and stringify are needed to prevent making INITIAL_PRODUCTS_STATE to be mutated
const filterState = reactive<ProductFilter>(JSON.parse(JSON.stringify(INITIAL_FILTER_STATE)));

export const setActiveFilterProp = (filter: {
  prop: keyof ProductFilter;
  value: ProductFilter[keyof ProductFilter];
}): void => {
  const { prop: filterProp, value: filterVal } = filter;
  switch (filterProp) {
    case 'currCategory': {
      if (ProductCategoriesList.includes(<ProductCategories>filterVal)) {
        Object.assign(filterState, { [filterProp]: filterVal });
      }
      break;
    }
    case 'subCat': {
      if (ProductSubCategoriesList.includes(<ProductSubCategories>filterVal) || filterVal === null) {
        Object.assign(filterState, { [filterProp]: filterVal });
      }
      break;
    }
    default: {
      Object.assign(filterState, { [filterProp]: filterVal });
    }
  }
};

export const initSubCategoryFromUrl = (subCat: ProductSubCategories) => {
  if (subCat) {
    // set active filter if specific query param exists in url
    if (ProductSubCategoriesList.includes(subCat)) {
      setActiveFilterProp({ prop: 'subCat', value: subCat });
    }
  } else if (filterState.subCat !== null) {
    // reset active filter if url does not contain specific filter query param, but object has value
    setActiveFilterProp({ prop: 'subCat', value: null });
  }
};

export const setActivePage = (num: number) => {
  filterState.activePage = num;
};

export const activeFilter$: ComputedRef<ProductFilter> = computed(() => filterState);
export const activePage$: ComputedRef<number> = computed(() => filterState.activePage);
