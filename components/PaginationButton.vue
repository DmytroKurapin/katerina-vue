<template>
  <span
    v-if="typeof page === 'number'"
    :class="{ 'page-num-btn px-3 md:px-4 inline-flex': true, 'selected-page': active }"
    @click="active ? noop : $emit('click')"
  >
    {{ page }}
  </span>

  <span
    v-else-if="page === 'prev' || page === 'next'"
    :class="{
      'page-arrow-btn': true,
      'rounded-s-md': page === 'prev',
      '-me-px rounded-e-md': page === 'next',
      'cursor-default': disabled
    }"
    :aria-label="$t(`general.${page === 'prev' ? 'previous' : 'next'}`)"
    @click="disabled ? noop : $emit('click')"
  >
    <slot />
  </span>

  <span v-else class="inline-flex md:px-3 page-dots cursor-default">...</span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {},
  props: {
    page: {
      type: [Number, String],
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      noop: () => {}
    };
  }
});
</script>

<style scoped>
.anim {
  @apply transition ease-in-out duration-150;
}
.common-page-btn-style {
  @apply py-2 border border-gray-300 text-sm font-medium cursor-pointer anim;
}
.page-num-btn {
  @apply common-page-btn-style;
  @apply -ml-px text-gray-700;
}
.page-arrow-btn {
  @apply common-page-btn-style;
  @apply inline-flex px-2 text-gray-500;
}
.page-dots {
  @apply page-num-btn px-2;
}
.page-num-btn:hover:not(.selected-page),
.page-arrow-btn:hover {
  @apply text-gray-400;
}
.page-num-btn:active,
.page-arrow-btn:active {
  @apply text-gray-500 bg-gray-100;
}
.page-num-btn:focus,
.page-arrow-btn:focus {
  @apply z-10 outline-none border-primary;
}
.selected-page {
  @apply shadow-outline-primary border-primary text-primary z-10 cursor-default anim;
}
</style>
