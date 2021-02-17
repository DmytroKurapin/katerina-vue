import { computed, ref, useContext } from '@nuxtjs/composition-api';
import { Product, ProductCategories } from '@/types';

const requestsQueue = ref<number>(0);

const errorHandling = (message: string, errCB: Function) => {
  requestsQueue.value = 0;
  // navigate user to default error page
  errCB({ statusCode: 404, message });
};

export const isLoading = computed(() => {
  // 1 - first request; 0 - all requests are finished
  return requestsQueue.value > 0;
});

export const getProductsByVendorCode = async (vendorCodes: string[] | { [vCode: string]: any }): Promise<Product[]> => {
  const vCodesList = Array.isArray(vendorCodes) ? vendorCodes : Object.keys(vendorCodes);

  if (vCodesList.length === 0) {
    return [];
  }
  requestsQueue.value++;
  const { $axios, error: nuxtError } = useContext();
  try {
    let prods: Product[] = [];

    if (vCodesList.length === 1) {
      const response = await $axios.get(`/api/products/vendor/${vCodesList[0]}`);
      prods = [response.data];
    } else {
      const queryStr = vCodesList.reduce((arrStr, vCode) => `${arrStr}vc[]=${vCode}&`, '?');
      const response = await $axios.get(`/api/products/vendors/${queryStr}`);
      prods = response.data;
    }
    requestsQueue.value--;

    return prods;
  } catch (e) {
    console.error('getProductsByVendorCode', e);
    errorHandling('err message', nuxtError);
    return [];
  }
};

interface IProductsRequest {
  category: ProductCategories;
  skip: number;
  amount: number;
  sub: string | null;
}

export const fetchProducts = async (data: IProductsRequest): Promise<Product[]> => {
  requestsQueue.value++;
  const { $axios, error: nuxtError } = useContext();
  const { category } = data;

  try {
    const response = await $axios.get(`/api/products/category/${category}`);
    requestsQueue.value--;

    return response.data;
  } catch (e) {
    console.error(`error in reaching product category data ${category}`, e);
    errorHandling('err message', nuxtError);
    return [];
  }
};
