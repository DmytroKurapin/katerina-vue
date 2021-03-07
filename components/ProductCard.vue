<template>
  <article v-lazyload :class="{ 'opacity-0': true, 'animate-showUp': didLoad }">
    <nuxt-link :to="localePath(`/products/${$route.params.product}/${product.vendorCode}`)">
      <figure @click="$emit('select')">
        <img
          :alt="product.title[$i18n.locale]"
          :data-url="product.thumbnail"
          class="w-full h-auto"
          @load="didLoad = !didLoad"
        />

        <header class="flex items-center justify-between py-2 leading-tight">
          <h1 class="text-lg hover:underline">
            {{ product.title[$i18n.locale] }}
          </h1>

          <!-- eslint-disable-next-line -->
          <p class="text-lg text-grey-darker">{{ product.price }} ₪</p>
        </header>
      </figure>
    </nuxt-link>
    <footer class="flex items-center justify-between">
      <p class="flex-1 truncate">
        {{ product.shortDescription[$i18n.locale] }}
      </p>

      <HeartIcon :is-liked="isLiked" class="w-10 h-8 -me-1" @click="toggleFavorites" />
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
