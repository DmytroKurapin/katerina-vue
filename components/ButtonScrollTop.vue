<template>
  <div
    class="sticky inline-flex bottom-6 start-85/100 sm:bottom-8 sm:start-90/100 md:start-93/100 xl:start-95/100 z-50"
  >
    <button
      class="focus:outline-none bg-primary-light py-3 px-3 rounded-full border border-white"
      :class="isClicking ? 'shadow-inner' : 'hover:bg-primary hover:text-white'"
      @mousedown="isClicking = true"
      @click="
        isClicking = false;
        $emit('click');
      "
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="h-5 w-5 sm:h-6 sm:w-6 fill-current">
        <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    isLiked: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isClicking = ref(false);
    return { isClicking };
  }
});
</script>

<style scoped></style>
