import { ProductCategories, ProductFilter, ProductSubCategories } from '@/types';
import { computed, reactive } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import ProductCategoriesList from '@/constatnts/productCategories';
import ProductSubCategoriesList from '@/constatnts/productSubCategories';

const INITIAL_FILTER_STATE: ProductFilter = {
  currCategory: 'wedding',
  subCat: null,
  activePage: 1,
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

export const activeFilter$: ComputedRef<ProductFilter> = computed(() => filterState);
