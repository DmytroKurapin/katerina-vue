import { computed, ref, useContext } from '@nuxtjs/composition-api';
import { Product, ProductCategories } from '@/types';

const requestsQueue = ref<number>(0);

const errorHandling = (message: string) => {
  const { error: nuxtError } = useContext();
  requestsQueue.value = 0;
  // navigate user to default error page
  nuxtError({ statusCode: 404, message });
};

export const isLoading = computed(() => {
  // 1 - first request; 0 - all requests are finished
  return requestsQueue.value > 0;
});

export const getProductsByVendorCode = async (vendorCodes: string[]): Promise<Product[]> => {
  requestsQueue.value++;
  const { $axios } = useContext();
  try {
    let prods: Product[] = [];
    if (vendorCodes.length === 1) {
      const response = await $axios.get(`/api/products/vendor/${vendorCodes[0]}`);
      prods = [response.data];
    } else {
      const queryStr = vendorCodes.reduce((arrStr, vCode) => `${arrStr}vc[]=${vCode}&`, '?');
      const response = await $axios.get(`/api/products/vendors/${queryStr}`);
      prods = response.data;
    }
    requestsQueue.value--;

    // todo improve behavior if prods is empty
    if (prods.length === 0) {
      errorHandling('err message');
    }
    return prods;
  } catch (e) {
    console.error('getProductsByVendorCode', e);
    errorHandling('err message');
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
  const { $axios } = useContext();
  const { category } = data;

  try {
    const response = await $axios.get(`/api/products/category/${category}`);
    requestsQueue.value--;

    return response.data;
  } catch (e) {
    console.error(`error in reaching product category data ${category}`, e);
    errorHandling('err message');
    return [];
  }
};
