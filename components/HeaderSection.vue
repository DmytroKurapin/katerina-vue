<template>
  <header>
    <TopPanel
      v-resize
      :style="{ marginTop: isMobileView ? 0 : `${headerMarginTop}px` }"
      :class="{
        'shadow-xl lg:mt-auto': isMobileView && didScrolled,
        'flex items-center relative justify-between mt-0 z-10 px-6': true,
        'transform transition-all duration-500 ease-in-out': true
      }"
      @init-size="onHeaderResize"
      @resize="onHeaderResize"
    >
      <template slot="small-navbar">
        <!-- Navigation Bar For Small Screens -->
        <NavMenuSmall class="lg:hidden flex" />
      </template>
      <template slot="favorites">
        <FavoritesNavigationIcon class="relative flex justify-center py-1" />
      </template>
    </TopPanel>

    <!-- Navigation Bar For Large Screens -->
    <NavMenuLarge
      :class="{ 'shadow-xl': didScrolled }"
      class="hidden lg:flex relative justify-center py-2 px-4 transition-shadow duration-700 ease"
    >
      <transition name="fade">
        <FavoritesNavigationIcon v-show="didScrolled" class="absolute flex end-0 me-6" />
      </transition>
    </NavMenuLarge>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import NavMenuLarge from '@/components/NavMenuLarge.vue';
import NavMenuSmall from '@/components/NavMenuSmall.vue';
import FavoritesNavigationIcon from '@/components/FavoritesNavigationIcon.vue';
import TopPanel from '@/components/TopPanel.vue';
import mobileBreakpoint from '@/constants/mobileBreakpoint';

export default defineComponent({
  components: { NavMenuLarge, NavMenuSmall, FavoritesNavigationIcon, TopPanel },
  props: {
    didScrolled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isMobileView = ref(false);
    const initHeaderHeight = ref(0);
    const headerMarginTop = computed(() => (props.didScrolled ? -initHeaderHeight.value : 0));

    const onHeaderResize = ({ height, width }: { height?: number; width?: number }) => {
      if (typeof height !== 'undefined') {
        initHeaderHeight.value = height;
      }
      if (typeof width !== 'undefined') {
        isMobileView.value = width <= mobileBreakpoint;
      }
    };
    return { initHeaderHeight, headerMarginTop, isMobileView, onHeaderResize };
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500;
}
.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
</style>
