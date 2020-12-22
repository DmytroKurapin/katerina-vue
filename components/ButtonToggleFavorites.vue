<template>
  <button
    class="bg-transparent focus:outline-none flex space-s-2"
    @click="toggleFavorites(isLiked(prodObj.vendorCode))"
  >
    <HeartIcon :is-liked="isLiked(prodObj.vendorCode)" class="h-6 w-6" />
    <span class="self-center text-sm">
      {{ isLiked(prodObj.vendorCode) ? $t('product.remove_from_favorites') : $t('product.add_to_favorites') }}
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import { Product } from '@/types';
import { isCurrentLiked, pushPopFavorites } from '@/composables/useFavorites';
import HeartIcon from '@/components/HeartIcon.vue';

export default defineComponent({
  components: { HeartIcon },
  props: {
    productData: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup(props) {
    const prodObj = computed(() => props.productData);
    const toggleFavorites = (toRemove: boolean) => {
      pushPopFavorites([prodObj.value], toRemove);
    };

    return { prodObj, isLiked: isCurrentLiked, toggleFavorites };
  }
});
</script>

<style scoped></style>
