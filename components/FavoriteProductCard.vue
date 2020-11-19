<template>
  <article>
    <figure class="w-1/3">
      <img :src="prod.thumbnail" :alt="prod.title[$i18n.locale]" />
    </figure>

    <div class="w-2/3 ps-4 lg:ps-8">
      <p class="flex my-2 justify-between">
        <span class="flex-1">{{ prod.title[$i18n.locale] }}</span>

        <HeartIcon :is-liked="true" class="w-6 h-6" @click="removeFromFavorites()" />
      </p>
      <p>{{ prod.shortDescription[$i18n.locale] }}</p>
      <p>
        <b>{{ prod.vendorCode }}</b>
      </p>
      <p class="my-4 text-xl">
        <i>{{ prod.price }} ₪</i>
      </p>
    </div>

    <button class="w-full py-2 px-6 mt-4 bg-primary-light" @click="orderViaWassap">
      {{ $t('general.order_via_wassap') }}
    </button>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import HeartIcon from '@/components/HeartIcon.vue';
import { pushPopFavorites } from '@/composables/useFavorites';
import { Product } from '@/types';

export default defineComponent({
  components: { HeartIcon },
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },
  setup(props, ctx) {
    const { root } = ctx as any;
    const { product } = props;

    const removeFromFavorites = () => {
      pushPopFavorites([product], true);
    };

    const orderViaWassap = () => {
      alert(root.$t('general.order_via_wassap'));
    };

    return { prod: product, removeFromFavorites, orderViaWassap };
  }
});
</script>

<style scoped></style>
