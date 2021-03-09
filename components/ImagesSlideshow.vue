<template>
  <div class="relative flex overflow-hidden">
    <div
      :class="[
        'z-30 flex items-center justify-center w-8 text-4xl cursor-pointer text-primary-light',
        stylesObj$.arrowMargin
      ]"
      @click="$dir() === 'rtl' ? previousSlide() : nextSlide()"
    >
      &#x276E;
    </div>

    <div :class="['relative flex-grow', picsWrapperClass]">
      <div
        v-for="(item, idx) in items"
        :key="`slide${idx}`"
        :class="[
          'absolute inset-0 flex justify-center transition-all duration-1000 ease-in-out transform',
          stylesObj$.slidesWidth,
          `${translateClass(idx)}`
        ]"
      >
        <slot :item="item" :idx="idx"></slot>
      </div>
    </div>

    <div
      :class="[
        'z-30 flex items-center justify-center w-8 text-4xl cursor-pointer text-primary-light',
        stylesObj$.arrowMargin
      ]"
      @click="$dir() === 'rtl' ? nextSlide() : previousSlide()"
    >
      &#x276F;
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true
    },
    visibleAmount: {
      type: Number,
      default: 2
    },
    picsWrapperClass: {
      type: String,
      default: ''
    },
    slideClass: {
      type: String,
      default: ''
    }
  },
  setup(props, { root }) {
    const smallestVisibleSlideIdx = ref(0);
    const isRtl = computed(() => root.$dir() === 'rtl');
    const picsAmount = computed(() =>
      props.visibleAmount > props.items.length ? props.items.length : props.visibleAmount
    );
    const stylesObj$ = computed<{ slidesWidth: string; arrowMargin: string }>(() => {
      return picsAmount.value <= 1
        ? { slidesWidth: 'w-full', arrowMargin: 'mx-4' }
        : { slidesWidth: `w-1/${picsAmount.value}`, arrowMargin: '' };
    });

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
      props.items.length - picsAmount.value === smallestVisibleSlideIdx.value
        ? (smallestVisibleSlideIdx.value = 0)
        : smallestVisibleSlideIdx.value++;
    };
    const previousSlide = () => {
      smallestVisibleSlideIdx.value === 0
        ? (smallestVisibleSlideIdx.value = props.items.length - picsAmount.value)
        : smallestVisibleSlideIdx.value--;
    };
    return {
      picsAmount,
      stylesObj$,
      translateClass,
      previousSlide,
      nextSlide
    };
  }
});
</script>
