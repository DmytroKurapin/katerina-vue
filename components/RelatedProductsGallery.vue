<template>
  <section class="border-t-3 border-primary-light">
    <p class="py-2 text-2xl text-primary-dark">
      {{ title }}
    </p>
    <div class="relative flex py-2 overflow-hidden">
      <div
        class="z-30 flex items-center justify-center w-8 text-4xl cursor-pointer text-primary-light"
        @click="$dir() === 'rtl' ? previousSlide() : nextSlide()"
      >
        {{ $dir() === 'rtl' ? '&#x276E;' : '&#x276F;' }}
      </div>

      <div class="relative flex-grow h-40 text-center xs:h-48 lg:h-56 text-08">
        <div
          v-for="(prod, idx) in productsList"
          :key="`slide${idx}`"
          :class="[
            'absolute inset-0 flex justify-center w-1/2 transition-all duration-1000 ease-in-out transform',
            `bg-pink-${(idx + 1) * 100}`,
            translateClass(idx)
          ]"
        >
          <figure class="self-start px-4 cursor-pointer lg:px-5">
            <img :src="prod.thumbnail" :alt="prod.title[$i18n.locale]" class="max-h-36 sm:max-h-40" />
            <p class="pt-2">
              {{ prod.title[$i18n.locale] }}
            </p>
            <p>{{ prod.price }} ₪</p>
          </figure>
        </div>
      </div>

      <div
        class="z-30 flex items-center justify-center w-8 text-4xl cursor-pointer text-primary-light"
        @click="$dir() === 'rtl' ? nextSlide() : previousSlide()"
      >
        {{ $dir() === 'rtl' ? '&#x276F;' : '&#x276E;' }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Product } from '@/types';
import { computed, defineComponent, PropType, ref } from '@nuxtjs/composition-api';

const NUM_VISIBLE_SLIDES = 2;
type AVAILABLE_POSITIONS =
  | 'start-0 z-20'
  | 'start-0 translate-x-full z-10 opacity-0'
  | 'start-0 -translate-x-full z-10 opacity-0'
  | 'start-1/2 translate-x-full z-10 opacity-0'
  | 'start-1/2 -translate-x-full z-10 opacity-0'
  | 'start-1/2 z-20';

export default defineComponent({
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup({ products }, { root }) {
    const smallestVisibleSlideIdx = ref(0);
    const isRtl = computed(() => root.$dir() === 'rtl');
    // const productsList = [1, 2, 3, 4, 5, 6, 7];

    const translateClass = computed(() => (idx: number): AVAILABLE_POSITIONS => {
      if (smallestVisibleSlideIdx.value === idx) {
        // the first visible slide
        return 'start-0 z-20';
      } else if (smallestVisibleSlideIdx.value > idx) {
        // slide is already scrolled
        return isRtl ? 'start-0 translate-x-full z-10 opacity-0' : 'start-0 -translate-x-full z-10 opacity-0';
      } else if (smallestVisibleSlideIdx.value + NUM_VISIBLE_SLIDES <= idx) {
        // slide is not reached yet
        return isRtl ? 'start-1/2 -translate-x-full z-10 opacity-0' : 'start-1/2 translate-x-full z-10 opacity-0';
      }
      // second visible slide
      return 'start-1/2 z-20';
    });

    const nextSlide = () => {
      products.length - 1 === smallestVisibleSlideIdx.value
        ? (smallestVisibleSlideIdx.value = 0)
        : smallestVisibleSlideIdx.value++;
    };
    const previousSlide = () => {
      smallestVisibleSlideIdx.value === -1
        ? (smallestVisibleSlideIdx.value = products.length - 1)
        : smallestVisibleSlideIdx.value--;
    };
    return { productsList: products, smallestVisibleSlideIdx, translateClass, previousSlide, nextSlide };
  }
});
</script>
