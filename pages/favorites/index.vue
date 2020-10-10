<template>
  <div class="flex flex-wrap flex-col sm:-mx-1 lg:-mx-4 mx-1">
    <section>
      <div class="divide-y divide-gray-400">
        <template v-if="favoriteProducts.length > 0">
          <div v-for="(prod, idx) in favoriteProducts" :key="`favorite_${idx}`" class="flex flex-wrap py-4">
            <figure class="w-1/3">
              <img :src="prod.thumbnail" :alt="prod.title" class="" />
            </figure>

            <div class="w-2/3 ps-4 lg:ps-8">
              <p>{{ prod.title }}</p>
              <p>{{ prod.shortDescription[$i18n.locale] }}</p>
              <p>
                <b>{{ prod.vendorCode }}</b>
              </p>
              <p class="my-4 text-xl">
                <i>{{ prod.price }} ₪</i>
              </p>
            </div>

            <button class="w-full py-2 px-6 mt-4 bg-green-400" @click="orderViaWassap">
              {{ $t('general.order_via_wassap') }}
            </button>
          </div>
        </template>
        <template v-else>
          <div class="text-center">
            {{ $t('general.no_favorites_selected') }}
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { getFavoriteProducts } from '@/composables/useFavorites';

export default defineComponent({
  components: { Breadcrumbs },
  setup() {
    // const prodCategory = ctx.root.$route.params.product;
    //
    // /*
    // TODO SSR returns product = '<no source>' on refresh the page. Check it when issue will be solved
    // https://github.com/nuxt/nuxt.js/issues/7696
    // https://github.com/nuxt/nuxt.js/pull/8068
    // https://github.com/nuxt/nuxt.js/pull/8132
    // */
    //
    // const metaTitle = ref<string>(ctx.root.$t(`navbar.${ctx.root.$toKebabCase(prodCategory)}`));
    // const metaDescription = ref<string>(ctx.root.$t('general.site_description'));
    //
    // /*
    // TODO uncomment useMeta and update head using this function once nuxt fix its issues (do it in each component)
    // https://github.com/nuxt-community/composition-api/issues/244
    // */
    //
    // // init products list for current product page
    // loadProductsByCategory(prodCategory);
    //
    // const productData = productsByCategory(prodCategory);
    //
    // const chooseProduct = (prodData: Product) => {
    //   setActiveProduct(prodData);
    // };
    //
    // onUnmounted(() => {
    //   resetProductsByCategory(prodCategory.value);
    // });
    //
    // return {
    //   metaTitle,
    //   metaDescription,
    //   prodCategory,
    //   productData,
    //   chooseProduct
    // };
    const orderViaWassap = () => {
      alert(this.$t('general.order_via_wassap'));
    };
    return { favoriteProducts: getFavoriteProducts, orderViaWassap };
  }
});
</script>

<style scoped></style>
