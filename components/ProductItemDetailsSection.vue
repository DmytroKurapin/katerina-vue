<template>
  <section class="mb-3">
    <template v-if="prodObj.sizes && prodObj.sizes.length > 0">
      <p class="text-sm mb-3">{{ $t('product.sizes') }}: {{ prodObj.sizes.join(', ') }} {{ $t('product.cm') }}</p>
    </template>
    <p class="text-sm" v-html="$sanitize(prodObj.description[$i18n.locale])"></p>
    <p class="my-4 text-xl">
      <b>{{ prodObj.price }} ₪</b>
    </p>
    <ButtonWassap class="" />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import { Product } from '@/types';
import ButtonWassap from '@/components/ButtonWassap.vue';

export default defineComponent({
  components: { ButtonWassap },
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
