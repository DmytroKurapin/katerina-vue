<template>
  <article
    v-lazyload
    class="my-4 px-6 w-full sm:w-1/2 sm:my-4 sm:px-4 lg:w-1/3 opacity-0"
    :class="{ 'animate-showUp': didLoad }"
  >
    <nuxt-link :to="localePath(`/products/${$route.params.product}/${product.vendorCode}`)">
      <figure @click="$emit('select')">
        <img
          :alt="product.title[$i18n.locale]"
          :data-url="product.thumbnail"
          class="h-auto w-full"
          @load="didLoad = !didLoad"
        />

        <header class="flex items-center justify-between leading-tight p-2 sm:p-4">
          <h1 class="text-lg">
            {{ product.title[$i18n.locale] }}
          </h1>
          <p class="text-grey-darker text-lg">{{ product.price }} ₪</p>
        </header>
      </figure>
    </nuxt-link>
    <footer class="flex items-center justify-between p-2 sm:p-4">
      <p class="flex-1 truncate">
        {{ product.shortDescription[$i18n.locale] }}
      </p>

      <HeartIcon :is-liked="isLiked" class="h-8 w-10" @click="toggleFavorites" />
    </footer>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import HeartIcon from '@/components/HeartIcon.vue';
import { favoriteVendorCodes$, pushPopFavorites } from '@/composables/useFavorites';
import { Product } from '@/types';

export default defineComponent({
  components: { HeartIcon },
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },
  // emits: ['select'],
  setup(props) {
    const { product } = props;
    const didLoad = ref(false);
    // const prodPath = localePath(`/${this.$route.params.product}/${this.product.vendorCode}`);

    const isLiked = computed<boolean>(() => favoriteVendorCodes$.value.includes(product.vendorCode));

    const toggleFavorites = () => {
      pushPopFavorites([product], isLiked.value);
    };

    return { isLiked, toggleFavorites, didLoad };
  }
});
</script>

<style scoped></style>
