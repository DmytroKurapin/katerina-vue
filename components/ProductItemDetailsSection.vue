<template>
  <section class="">
    <slot name="section-top" />

    <ButtonToggleFavorites :product-data="prodObj" class="block sm:hidden" />

    <ProductSizesSection v-if="prodObj.sizes && prodObj.sizes.length > 0" :sizes="prodObj.sizes" class="mb-2 text-sm" />

    <p class="text-sm" v-html="$sanitize(prodObj.description[$i18n.locale])"></p>
    <p class="pt-4 text-xl">
      <b>{{ prodObj.price }} ₪</b>
    </p>

    <ButtonToggleFavorites :product-data="prodObj" class="hidden sm:block" />

    <ButtonWassap class="py-4" :message="wassapMsgTxt" />

    <slot name="related-prod" />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import ButtonWassap from '@/components/ButtonWassap.vue';
import ProductSizesSection from '@/components/ProductSizesSection.vue';
import ButtonToggleFavorites from '@/components/ButtonToggleFavorites.vue';
import { Product } from '@/types';

export default defineComponent({
  components: { ButtonWassap, ButtonToggleFavorites, ProductSizesSection },
  props: {
    productData: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup(props, ctx) {
    const { root } = ctx as any;
    const prodTitle = props.productData.title[root.$i18n.locale as 'en' | 'he'];

    return {
      wassapMsgTxt: `${prodTitle} (${props.productData.vendorCode}) `,
      prodObj: computed(() => props.productData)
    };
  }
});
</script>
