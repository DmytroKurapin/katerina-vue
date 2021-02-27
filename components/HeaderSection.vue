<template>
  <header>
    <TopPanel
      v-resize
      :style="{ marginTop: isMobileView ? 0 : `${headerMarginTop}px` }"
      :class="{
        'shadow-xl lg:mt-auto': isMobileView && didScrolled,
        'flex items-center relative justify-between z-10 px-6': true,
        'transform transition-all duration-500 ease-in-out': true
      }"
      @init-size="onHeaderResize"
      @resize="onHeaderResize"
    >
      <template slot="small-navbar">
        <!-- Navigation Bar For Small Screens -->
        <NavMenuSmall class="flex lg:hidden" />
      </template>
      <template slot="favorites">
        <FavoritesNavigationIcon class="relative flex justify-center py-1" />
      </template>
    </TopPanel>

    <!-- Navigation Bar For Large Screens -->
    <NavMenuLarge
      :class="{ 'shadow-xl': didScrolled }"
      class="relative justify-center hidden px-4 py-2 transition-shadow duration-700 lg:flex ease"
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
import customBreakpoints from '@/constants/customBreakpoints';
import { didScrolled$, currBreakpoint$, setBreakpoint } from '@/composables/usePageHandler';

export default defineComponent({
  components: { NavMenuLarge, NavMenuSmall, FavoritesNavigationIcon, TopPanel },
  setup() {
    const isMobileView = computed(() => customBreakpoints[currBreakpoint$.value] <= customBreakpoints.lg);
    const initHeaderHeight = ref(0);
    const headerMarginTop = computed(() => (didScrolled$.value ? -initHeaderHeight.value : 0));

    const onHeaderResize = ({ height, width }: { height?: number; width?: number }) => {
      if (typeof height !== 'undefined') {
        initHeaderHeight.value = height;
      }
      setBreakpoint(width);
    };

    return { didScrolled: didScrolled$, headerMarginTop, isMobileView, onHeaderResize };
  }
});
</script>

<style scoped></style>
