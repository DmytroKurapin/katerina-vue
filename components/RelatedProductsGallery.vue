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
            'absolute inset-0 flex justify-center transition-all duration-1000 ease-in-out transform',
            `bg-pink-${(idx + 1) * 100}`,
            `w-1/${picsAmount}`,
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
  setup(props, { root }) {
    const smallestVisibleSlideIdx = ref(0);
    const isRtl = computed(() => root.$dir() === 'rtl');
    const picsAmount = computed(() =>
      props.visibleAmount > props.products.length ? props.products.length : props.visibleAmount
    );

    const translateClass = computed(() => (idx: number): string => {
      const firstVisIdx = smallestVisibleSlideIdx.value;
      if (firstVisIdx > idx) {
        // slide is already scrolled
        return isRtl ? 'start-0 translate-x-full z-10 opacity-0' : 'start-0 -translate-x-full z-10 opacity-0';
      } else if (firstVisIdx + picsAmount.value <= idx) {
        // slide is not reached yet
        return `${isRtl ? '-' : ''}translate-x-full start-${picsAmount.value - 1}/${picsAmount.value} z-10 opacity-0`;
      }
      const startPos = firstVisIdx === idx ? 'start-0' : `start-${idx - firstVisIdx}/${picsAmount.value}`;
      return `${startPos} z-20`;
    });

    const nextSlide = () => {
      props.products.length - picsAmount.value === smallestVisibleSlideIdx.value
        ? (smallestVisibleSlideIdx.value = 0)
        : smallestVisibleSlideIdx.value++;
    };
    const previousSlide = () => {
      smallestVisibleSlideIdx.value === 0
        ? (smallestVisibleSlideIdx.value = props.products.length - picsAmount.value)
        : smallestVisibleSlideIdx.value--;
    };
    return {
      productsList: props.products,
      picsAmount,
      smallestVisibleSlideIdx,
      translateClass,
      previousSlide,
      nextSlide
    };
  }
});
</script>
