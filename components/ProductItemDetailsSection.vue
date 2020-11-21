<template>
  <section>
    <p class="text-sm" v-html="$sanitize(prodObj.description[$i18n.locale])"></p>
    <p class="my-4 text-xl">
      <b>{{ prodObj.price }} ₪</b>
    </p>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import { Product } from '@/types';

export default defineComponent({
  components: {},
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
