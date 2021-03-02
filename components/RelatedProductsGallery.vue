<template>
  <section class="border-t-3 border-primary-light">
    <p class="py-2 text-2xl text-primary-dark">
      {{ title }}
    </p>
    <ImagesSlideshow
      :items="products"
      :visible-amount="visibleAmount"
      pics-wrapper-class="text-center h-40 xs:h-48 lg:h-56 text-08"
      class="py-2"
    >
      <template v-slot="{ item }">
        <figure class="self-start px-4 cursor-pointer lg:px-5">
          <img :src="item.thumbnail" :alt="item.title[$i18n.locale]" class="max-h-36 sm:max-h-40" />
          <p class="pt-2">
            {{ item.title[$i18n.locale] }}
          </p>
          <p>{{ item.price }} ₪</p>
        </figure>
      </template>
    </ImagesSlideshow>
  </section>
</template>

<script lang="ts">
import { Product } from '@/types';
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import ImagesSlideshow from '@/components/ImagesSlideshow.vue';

export default defineComponent({
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    visibleAmount: {
      type: Number,
      default: 2
    }
  },
  components: { ImagesSlideshow },
  setup() {
    return {};
  }
});
</script>
