<template>
  <article>
    <figure class="w-1/3 pb-4 cursor-pointer" @click="navigateToProductPage">
      <img :src="prod.thumbnail" :alt="prodTitle" onContextMenu="return false;" />
    </figure>

    <div class="w-2/3 ps-4 lg:ps-8 flex flex-col justify-between">
      <div>
        <p class="flex justify-between">
          <span class="flex-1 cursor-pointer" @click="navigateToProductPage">
            {{ prodTitle }}
          </span>

          <HeartIcon :is-liked="true" class="w-6 h-6" @click="removeFromFavorites()" />
        </p>
        <ProductSizesSection v-if="prod.sizes && prod.sizes.length > 0" :sizes="prod.sizes" class="text-xs my-2" />

        <p class="text-08">
          {{ prod.shortDescription[$i18n.locale] }}
        </p>
        <p>
          <span dir="ltr">{{ prod.price }} ₪</span>
        </p>
      </div>

      <ButtonWassap :message="wassapMsgTxt" class="w-full hidden lg:block" />
    </div>
    <ButtonWassap :message="wassapMsgTxt" class="w-full lg:hidden" />
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import HeartIcon from '@/components/HeartIcon.vue';
import ButtonWassap from '@/components/ButtonWassap.vue';
import ProductSizesSection from '@/components/ProductSizesSection.vue';
import { pushPopFavorites } from '@/composables/useFavorites';
import { Product } from '@/types';

export default defineComponent({
  components: { ButtonWassap, HeartIcon, ProductSizesSection },
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },
  setup(props, ctx) {
    const { root } = ctx as any;
    const { product } = props;
    const prodTitle = product.title[root.$i18n.locale as 'en' | 'he'];

    const removeFromFavorites = () => {
      pushPopFavorites([product], true);
    };

    const navigateToProductPage = () => {
      root.$router.push({ path: root.localePath(`/products/${product.category}/${product.vendorCode}`) });
    };

    return {
      prod: product,
      prodTitle,
      wassapMsgTxt: `${prodTitle} (${product.vendorCode}) `,
      removeFromFavorites,
      navigateToProductPage
    };
  }
});
</script>

<style scoped>
.wassap-btn {
  @apply py-2 px-6 bg-primary-light;
}
</style>
