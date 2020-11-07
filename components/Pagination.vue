<template>
  <div
    :class="{ invisible: pagesAmount$ === 0 }"
    class="flex-1 flex px-4 py-3 mt-8 border-gray-200 sm:px-6 justify-center"
  >
    <nav class="relative z-0 inline-flex shadow-sm">
      <PaginationButton
        v-for="(page, idx) in pageButtons"
        :key="`${page}_${idx}`"
        :page="page"
        :active="page - 1 === currPage"
        :disabled="(page === 'prev' && currPage === 0) || (page === 'next' && currPage === pagesAmount$ - 1)"
        @click="selectPage(page)"
      >
        <template v-if="page === 'next' || page === 'prev'">
          <svg
            :class="{
              'rotate-180': ($dir() === 'rtl' && page === 'prev') || ($dir() === 'ltr' && page === 'next'),
              'h-5 w-5 transform': true
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              :d="
                `M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0
            011.414 0z`
              "
              fill-rule="evenodd"
              clip-rule="evenodd"
            />
          </svg>
        </template>
      </PaginationButton>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import PaginationButton from '@/components/PaginationButton.vue';

const MAX_VISIBLE_PAGES = 3;

export default defineComponent({
  components: { PaginationButton },
  props: {
    amount: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const pagesAmount$ = computed(() => props.amount);
    const currPage$ = computed(() => props.currentPage);

    const filteredPages = computed<number[]>(() => {
      const toFilterPages = [...Array(pagesAmount$.value).keys()];

      if (pagesAmount$.value > MAX_VISIBLE_PAGES + 2) {
        if (currPage$.value < MAX_VISIBLE_PAGES - 1) {
          return toFilterPages.slice(1, MAX_VISIBLE_PAGES);
        } else if (currPage$.value > pagesAmount$.value - MAX_VISIBLE_PAGES) {
          return toFilterPages.slice(pagesAmount$.value - MAX_VISIBLE_PAGES, -1);
        } else {
          return toFilterPages.filter(page => {
            const diffPage = currPage$.value - page;
            const diff = MAX_VISIBLE_PAGES / 2;

            return diffPage < 0 ? Math.abs(diffPage) <= diff : diffPage < diff;
          });
        }
      }

      return toFilterPages;
    });

    const pageButtons = computed<any[]>(() => {
      const filteredPagesVal = filteredPages.value.map(page => page + 1);
      if (filteredPagesVal.length < pagesAmount$.value) {
        const firstPages = filteredPagesVal[0] === 2 ? [] : ['...'];
        const isLastIdx = filteredPagesVal[filteredPagesVal.length - 1] === pagesAmount$.value - 1;
        const lastPages = isLastIdx ? [] : ['...'];
        return ['prev', 1, ...firstPages, ...filteredPagesVal, ...lastPages, pagesAmount$.value, 'next'];
      }
      return ['prev', ...filteredPagesVal, 'next'];
    });

    const selectPage = (clickedBtn: number | 'prev' | 'next') => {
      if (typeof clickedBtn === 'number') {
        emit('change', clickedBtn - 1);
      } else if (clickedBtn === 'prev') {
        emit('change', currPage$.value - 1);
      } else {
        emit('change', currPage$.value + 1);
      }
    };

    return { currPage: currPage$, pagesAmount$, pageButtons, selectPage };
  }
});
</script>

<style scoped></style>
