import { computed, reactive } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import { Product, ProductsState, ProductCategories } from '@/types';
import { Helpers } from '@/utils/helpers';
import { fetchProducts, getProductsByVendorCode } from '@/composables/useApiService';
import { activeFilter$ } from '@/composables/useFilter';

const DEFAULT_AMOUNT_PER_PAGE = 12;

const INITIAL_PRODUCTS_STATE: ProductsState = {
  categories: {
    wedding: [],
    batMitzvah: [],
    barMitzvah: [],
    forBusinesses: []
  },
  activeProduct: { obj: null, relatedProducts: [], similarProducts: [] },
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

const paginateFilteredList = (arr: Product[]): Array<Product[]> => {
  return arr.reduce((acc, val, i: number) => {
    const idx = Math.floor(i / DEFAULT_AMOUNT_PER_PAGE);
    const page = acc[idx] || (acc[idx] = []);
    page.push(val);

    return acc;
  }, [] as Array<Product[]>);
};

const convertListToVendorCodesObject = (vCodes: string[]): { [id: string]: number } =>
  vCodes.reduce((res, vCode, idx) => Object.assign(res, { [vCode]: idx }), {});

const setRelatedSimilarProducts = async () => {
  productsState.activeProduct.relatedProducts = [];
  productsState.activeProduct.similarProducts = [];
  const activeProdObj = productsState.activeProduct.obj;

  if (
    activeProdObj &&
    activeProdObj.related &&
    (activeProdObj.related.length > 0 || activeProdObj.similar.length > 0)
  ) {
    const clonedRelatedVendors = convertListToVendorCodesObject(activeProdObj.related);
    const clonedSimilarVendors = convertListToVendorCodesObject(activeProdObj.similar);

    const productsByCategory = Object.values(productsState.categories);

    let isAllRelatedFound = false;
    let isAllSimilarFound = false;
    for (let i = 0; i < productsByCategory.length; i++) {
      if (isAllRelatedFound && isAllSimilarFound) {
        return;
      }

      const productsList = productsByCategory[i];
      const prodListLength = productsList.length;

      for (let k = 0; k < prodListLength; k++) {
        if (isAllRelatedFound && isAllSimilarFound) {
          return;
        }

        const { vendorCode } = productsList[k];

        if (typeof clonedRelatedVendors[vendorCode] !== 'undefined') {
          productsState.activeProduct.relatedProducts.push(productsList[k]);
          delete clonedRelatedVendors[vendorCode];
          isAllRelatedFound = Object.keys(clonedRelatedVendors).length === 0;
        }

        if (typeof clonedSimilarVendors[vendorCode] !== 'undefined') {
          productsState.activeProduct.similarProducts.push(productsList[k]);
          delete clonedSimilarVendors[vendorCode];
          isAllSimilarFound = Object.keys(clonedSimilarVendors).length === 0;
        }
      }
    }

    const respData = await getProductsByVendorCode(Object.assign({}, clonedRelatedVendors, clonedSimilarVendors));
    respData.map(prod => {
      const { vendorCode } = prod;
      if (typeof clonedRelatedVendors[vendorCode] !== 'undefined') {
        productsState.activeProduct.relatedProducts.splice(clonedRelatedVendors[vendorCode], 0, prod);
      }

      if (typeof clonedSimilarVendors[vendorCode] !== 'undefined') {
        productsState.activeProduct.similarProducts.splice(clonedSimilarVendors[vendorCode], 0, prod);
      }
    });
  }
};

/** **** Below only EXPORTED variables **** **/

export const filteredList$: ComputedRef<Array<Product[]>> = computed(() => productsState.filteredList);

export const initProductsPage = async () => {
  updateFilteredProductsFromState();

  const { currCategory: category, subCat: sub } = activeFilter$.value;
  const data = await fetchProducts({ category, sub, amount: DEFAULT_AMOUNT_PER_PAGE, skip: 0 });
  setCategoryProductsFromDB(data);
};

export const setActiveProduct = async (vendorCode: string, prodData?: Product): Promise<void> => {
  if (!prodData && productsState.activeProduct.obj?.vendorCode !== vendorCode) {
    const respData = await getProductsByVendorCode([vendorCode]);
    productsState.activeProduct.obj = respData[0];
  } else if (prodData) {
    productsState.activeProduct.obj = prodData;
  }

  setRelatedSimilarProducts();
};

export const activeProduct$: ComputedRef<Product | null> = computed(() => productsState.activeProduct.obj);

// related products of active product
export const relatedProducts$ = computed(() => productsState.activeProduct.relatedProducts);

// similar products of active product
export const similarProducts$ = computed(() => productsState.activeProduct.similarProducts);

export const resetProductsByCategory = (prodCategory: ProductCategories): void => {
  if (productsState.categories[prodCategory]) {
    productsState.categories[prodCategory] = [...INITIAL_PRODUCTS_STATE.categories[prodCategory]];
  }
};

export const applyFilterToProductList = () => {
  const { currCategory: category, subCat: sub } = activeFilter$.value;
  const entireProductList = productsState.categories[category];
  if (sub === null) {
    productsState.filteredList = paginateFilteredList(entireProductList);
  } else {
    const filteredProdList = entireProductList.filter(prodObj => prodObj.subCategories.includes(sub));
    productsState.filteredList = paginateFilteredList(filteredProdList);
  }
};
