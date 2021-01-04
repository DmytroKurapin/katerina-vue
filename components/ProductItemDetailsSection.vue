<template>
  <section class="mb-3">
    <ProductSizesSection v-if="prodObj.sizes && prodObj.sizes.length > 0" :sizes="prodObj.sizes" class="text-sm mb-2" />

    <p class="text-sm" v-html="$sanitize(prodObj.description[$i18n.locale])"></p>
    <p class="my-4 text-xl">
      <b>{{ prodObj.price }} ₪</b>
    </p>
    <ButtonWassap />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import { Product } from '@/types';
import ButtonWassap from '@/components/ButtonWassap.vue';
import ProductSizesSection from '@/components/ProductSizesSection.vue';

export default defineComponent({
  components: { ButtonWassap, ProductSizesSection },
  props: {
    productData: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup(props) {
    return { prodObj: computed(() => props.productData) };
  }
});
</script>

<style scoped>
.img-wrapper:before {
  padding-bottom: 100%;
  content: '';
  display: block;
}
</style>
