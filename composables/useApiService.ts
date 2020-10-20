import { useContext } from '@nuxtjs/composition-api';
import { Product, ProductCategories } from '@/types';

export const getProductsByVendorCode = async (vendorCodes: string[]): Promise<Product[]> => {
  const { $axios, error: nuxtError } = useContext();
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

    // todo improve behavior if prods is empty
    if (prods.length === 0) {
      nuxtError({ statusCode: 404, message: 'err message' });
    }
    return prods;
  } catch (e) {
    console.error('getProductsByVendorCode', e);
    nuxtError({ statusCode: 404, message: 'err message' });
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
  const { $axios, error: nuxtError } = useContext();
  const { category } = data;

  try {
    const response = await $axios.get(`/api/products/category/${category}`);

    return response.data;
  } catch (e) {
    console.error(`error in reaching product category data ${category}`, e);
    // navigate user to default error page
    nuxtError({ statusCode: 404, message: 'err message' });
    return [];
  }
};
