import { computed, reactive } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import { Product, ProductsState, ProductCategories } from '@/types';
import { Helpers } from '@/utils/helpers';
import { fetchProducts, getProductsByVendorCode } from '@/composables/useApiService';
import { activeFilter$ } from '@/composables/useFilter';

const DEFAULT_AMOUNT_PER_PAGE = 10;

const INITIAL_DUMMY_PRODUCT: Product = {
  title: { en: '', he: '' },
  description: { en: '', he: '' },
  shortDescription: { en: '', he: '' },
  vendorCode: '',
  images: [],
  thumbnail: '',
  order: 0,
  category: 'wedding',
  price: 0,
  subCategories: []
};

const INITIAL_PRODUCTS_STATE: ProductsState = {
  categories: {
    wedding: [],
    batMitzvah: [],
    barMitzvah: [],
    giftcard: []
  },
  activeProduct: INITIAL_DUMMY_PRODUCT,
  currPageList: []
};

const productsState = reactive<ProductsState>(Helpers.cloneDeep(INITIAL_PRODUCTS_STATE));

const setProductsForCurrPageFromDB = (newProdList: Product[]) => {
  productsState.currPageList = newProdList;
  updateProductsByCategory({ prodCategory: activeFilter$.value.currCategory, value: newProdList });
};

const setProductsForCurrPageFromState = () => {
  const { currCategory, activePage } = activeFilter$.value;
  const prodListFromState = productsState.categories[currCategory];
  const amountProdListFromState = prodListFromState.length;

  if (amountProdListFromState === 0 || amountProdListFromState < DEFAULT_AMOUNT_PER_PAGE * (activePage - 1)) {
    productsState.currPageList = [];
  } else {
    const startIdx = DEFAULT_AMOUNT_PER_PAGE * (activePage - 1);
    const endBeforeIdx = startIdx + DEFAULT_AMOUNT_PER_PAGE;
    productsState.currPageList = prodListFromState.slice(startIdx, endBeforeIdx);
  }
};
const updateProductsByCategory = ({
  prodCategory,
  value
}: {
  prodCategory: ProductCategories;
  value: Product[];
}): void => {
  const initialList = productsState.categories[prodCategory];
  const clonedReceivedData = Helpers.cloneDeep<Product[]>(value);

  productsState.categories[prodCategory] = initialList.map(prodObj => {
    const foundObj = clonedReceivedData.find(obj => obj.vendorCode === prodObj.vendorCode);
    if (foundObj) {
      return foundObj;
    }
    return prodObj;
  });
};

/** **** Below EXPORTED variables **** **/

export const currPageList$: ComputedRef<Product[]> = computed(() => productsState.currPageList);

export const initProductsPage = async () => {
  setProductsForCurrPageFromState();

  const { currCategory: category, subCat: sub } = activeFilter$.value;
  const data = await fetchProducts({ category, sub, amount: DEFAULT_AMOUNT_PER_PAGE, skip: 0 });
  setProductsForCurrPageFromDB(data);
};

export const setActiveProduct = (prodData: Product): void => {
  productsState.activeProduct = prodData;
};

export const activeProduct$ = (vendorCode: string): ComputedRef<Product> => {
  if (productsState.activeProduct.vendorCode !== vendorCode) {
    getProductsByVendorCode([vendorCode]).then(prodData => setActiveProduct(prodData[0]));
  }
  return computed(() => productsState.activeProduct);
};

export const resetProductsByCategory = (prodCategory: ProductCategories): void => {
  if (productsState.categories[prodCategory]) {
    productsState.categories[prodCategory] = [...INITIAL_PRODUCTS_STATE.categories[prodCategory]];
  }
};
