import { useContext } from '@nuxtjs/composition-api';
import { Product, ProductCategories } from '~/types';

async function findFakeProdCategoryByVendor(vendorCodes: string[]): Promise<Product[]> {
  const { $axios } = useContext();
  const requestsArr = vendorCodes.reduce((prev: string[], curr) => {
    const firstChar = curr.charAt(0);
    let prodCategory = '';
    if (firstChar === 'w') {
      prodCategory = 'wedding';
    } else if (firstChar === 't') {
      prodCategory = 'batMitzvah';
    } else if (firstChar === 'r') {
      prodCategory = 'barMitzvah';
    } else if (firstChar === 'g') {
      prodCategory = 'giftcard';
    }

    if (prodCategory !== '' && prev.findIndex(str => str.includes(prodCategory)) === -1) {
      prev.push(`/_fake-data/${prodCategory}.json`);
    }
    return prev;
  }, []);
  const allProdsByCategory = await Promise.all(requestsArr.map(reqStr => $axios.get<Product[]>(reqStr)));
  return vendorCodes.reduce((res: Product[], vCode) => {
    allProdsByCategory.find(prods => {
      const foundProd = prods.data.find(prod => prod.vendorCode === vCode);
      if (foundProd) {
        res.push(foundProd);
        return true;
      }
      return false;
    });
    return res;
  }, []);
}

export const getProductsByVendorCode = async (vendorCodes: string[]): Promise<Product[]> => {
  const { error: nuxtError } = useContext();
  try {
    const prods = await findFakeProdCategoryByVendor(vendorCodes);
    if (prods.length === 0) {
      nuxtError({ statusCode: 404, message: 'err message' });
    }
    return prods;
  } catch (e) {
    console.log('~error~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(e);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    nuxtError({ statusCode: 404, message: 'err message' });
    return [];
  }
};

export const getProducts = async (prodCategory: ProductCategories): Promise<Product[]> => {
  const { $axios, error: nuxtError } = useContext();
  try {
    const response = await $axios.get(`/_fake-data/${prodCategory}.json`);
    return response.data;
  } catch (e) {
    console.log('~~~~~error in reaching product category data~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(prodCategory);
    console.log(e);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // navigate user to default error page
    nuxtError({ statusCode: 404, message: 'err message' });
    return [];
  }
};
