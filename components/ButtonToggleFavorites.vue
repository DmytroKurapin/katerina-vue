<template>
  <div class="py-2">
    <button
      class="flex bg-transparent focus:outline-none space-s-2"
      @click="toggleFavorites(isLiked(prodObj.vendorCode))"
    >
      <HeartIcon :is-liked="isLiked(prodObj.vendorCode)" class="w-8 h-6 -ms-1" />

      <span class="self-center text-sm">
        {{ isLiked(prodObj.vendorCode) ? $t('product.remove_from_favorites') : $t('product.add_to_favorites') }}
      </span>
    </button>
  </div>
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
