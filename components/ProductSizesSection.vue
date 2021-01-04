<template>
  <p>{{ $t('product.sizes') }}: {{ prodSizes.join(', ') }} {{ $t('product.cm') }}</p>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {},
  props: {
    sizes: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup(props) {
    return { prodSizes: computed(() => props.sizes) };
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
