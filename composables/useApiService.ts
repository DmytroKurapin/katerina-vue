import { useContext } from '@nuxtjs/composition-api';
import { Product, ProductTypes } from '~/types';

async function findFakeProdTypeByVendor(vendorCodes: string[]): Promise<Product[]> {
  const { $axios } = useContext();
  const requestsArr = vendorCodes.reduce((prev: string[], curr) => {
    const firstChar = curr.charAt(0);
    let prodType = '';
    if (firstChar === 'w') {
      prodType = 'wedding';
    } else if (firstChar === 'm') {
      prodType = 'mitzvah';
    } else if (firstChar === 'g') {
      prodType = 'giftcard';
    }

    if (prodType !== '' && prev.findIndex(str => str.includes(prodType)) === -1) {
      prev.push(`/_fake-data/${prodType}.json`);
    }
    return prev;
  }, []);
  const allProdsByType = await Promise.all(requestsArr.map(reqStr => $axios.get<Product[]>(reqStr)));
  return vendorCodes.reduce((res: Product[], vCode) => {
    allProdsByType.find(prods => {
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
    const prods = await findFakeProdTypeByVendor(vendorCodes);
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

export const getProducts = async (prodType: ProductTypes): Promise<Product[]> => {
  const { $axios, error: nuxtError } = useContext();
  try {
    const response = await $axios.get(`/_fake-data/${prodType}.json`);
    return response.data;
  } catch (e) {
    console.log('~~~~~error in reaching product type data~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(prodType);
    console.log(e);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // navigate user to default error page
    nuxtError({ statusCode: 404, message: 'err message' });
    return [];
  }
};
