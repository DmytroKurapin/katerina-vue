import { computed, reactive } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import { Product, ProductsState, ProductCategories } from '@/types';
import { Helpers } from '@/utils/helpers';
import { fetchProducts, getProductsByVendorCode } from '@/composables/useApiService';
import { activeFilter$ } from '@/composables/useFilter';

const DEFAULT_AMOUNT_PER_PAGE = 10;

const INITIAL_PRODUCTS_STATE: ProductsState = {
  categories: {
    wedding: [],
    batMitzvah: [],
    barMitzvah: [],
    giftcard: []
  },
  activeProduct: null,
  filteredList: []
};

const productsState = reactive<ProductsState>(Helpers.cloneDeep(INITIAL_PRODUCTS_STATE));

const setCategoryProductsFromDB = (newProdList: Product[]) => {
  productsState.categories[activeFilter$.value.currCategory] = Helpers.cloneDeep<Product[]>(newProdList);
  applyFilterToProductList();
};

const updateFilteredProductsFromState = () => {
  const { currCategory } = activeFilter$.value;
  const prodListFromState = productsState.categories[currCategory];

  if (prodListFromState.length === 0) {
    productsState.filteredList = [];
  } else {
    applyFilterToProductList();
  }
};

/** **** Below only EXPORTED variables **** **/

export const filteredList$: ComputedRef<Product[]> = computed(() => productsState.filteredList);

export const initProductsPage = async () => {
  updateFilteredProductsFromState();

  const { currCategory: category, subCat: sub } = activeFilter$.value;
  const data = await fetchProducts({ category, sub, amount: DEFAULT_AMOUNT_PER_PAGE, skip: 0 });
  setCategoryProductsFromDB(data);
};

export const setActiveProduct = async (vendorCode: string, prodData?: Product): Promise<void> => {
  if (!prodData && productsState.activeProduct?.vendorCode !== vendorCode) {
    const respData = await getProductsByVendorCode([vendorCode]);
    productsState.activeProduct = respData[0];
  } else if (prodData) {
    productsState.activeProduct = prodData;
  }
};

export const activeProduct$: ComputedRef<Product | null> = computed(() => productsState.activeProduct);

export const resetProductsByCategory = (prodCategory: ProductCategories): void => {
  if (productsState.categories[prodCategory]) {
    productsState.categories[prodCategory] = [...INITIAL_PRODUCTS_STATE.categories[prodCategory]];
  }
};

export const applyFilterToProductList = () => {
  const { currCategory: category, subCat: sub } = activeFilter$.value;
  const entireProductList = productsState.categories[category];
  if (sub === null) {
    productsState.filteredList = entireProductList;
  } else {
    productsState.filteredList = entireProductList.filter(prodObj => prodObj.subCategories.includes(sub));
  }
};
