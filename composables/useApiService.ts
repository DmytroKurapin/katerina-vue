import { useContext } from '@nuxtjs/composition-api';
import { Product, ProductCategories } from '@/types';
import { findFakeProdCategoryByVendor } from '@/composables/useFakeData';

export const getProductsByVendorCode = async (vendorCodes: string[]): Promise<Product[]> => {
  const { error: nuxtError } = useContext();
  try {
    const prods = await findFakeProdCategoryByVendor(vendorCodes);
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
