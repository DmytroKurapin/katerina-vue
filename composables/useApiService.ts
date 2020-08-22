import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Context } from '@nuxt/types';
import { NuxtError } from '@nuxt/types/app';
import { Product, ProductTypes } from '~/types';

let $axios: NuxtAxiosInstance;
// eslint-disable-next-line
let nuxtError = (params: NuxtError) => {};

export function initApiService(ctx: Context) {
  $axios = ctx.$axios;
  nuxtError = ctx.error;
}

export const getProductsByVendorCode = (vendorCodes: string[]) => {
  $axios.get('/_fake-data/wedding.json').then((response: any) => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(response);
    console.log(vendorCodes);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  });
};

export const getProducts = async (prodType: ProductTypes): Promise<Product[]> => {
  try {
    const response = await $axios.get(`/_fake-data/${prodType}.json`);
    return response.data;
  } catch (e) {
    // todo maybe not errors which returned from server must navigate user to error page
    console.log('~~~~~error in reaching product type data~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(prodType);
    console.log(e);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // navigate user to default error page
    nuxtError({ statusCode: 404, message: 'err message' });
    return [];
  }
};
