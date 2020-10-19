import { Product } from '@/types';
import { useContext } from '@nuxtjs/composition-api';

export async function findFakeProdCategoryByVendor(vendorCodes: string[]): Promise<Product[]> {
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
