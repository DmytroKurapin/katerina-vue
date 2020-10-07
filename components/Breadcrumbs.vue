<!-- eslint-disable max-len -->

<template>
  <nav class="my-6" aria-label="Breadcrumb">
    <ol class="list-none p-0 text-xs inline-flex">
      <li
        v-for="(bData, idx) in breadcrumbsList"
        :key="`${bData.label}_${idx}`"
        :class="['flex items-center', bData.isLastItem ? 'text-primary font-bold text-sm' : null]"
      >
        <nuxt-link :to="localePath(bData.link)">
          {{ bData.isLastItem ? bData.label : $t(`${bData.label}`) }}
        </nuxt-link>
        <svg
          v-if="!bData.isLastItem"
          class="fill-current w-3 h-3 mx-3 transform"
          :class="$dir() === 'rtl' ? 'rotate-180' : null"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
          />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { NavData } from '@/types';

export default defineComponent({
  components: {},
  setup(props, ctx) {
    const {
      $route: { params: routeParams },
      $toKebabCase
    } = ctx.root;
    const breadcrumbsList: NavData[] = [
      { link: '/', label: 'navbar.home_page', subCategories: [], isLastItem: false },
      ...Object.values(routeParams).reduce((res, curr, idx, srcArr) => {
        const isLastItem = typeof srcArr[idx + 1] === 'undefined';
        res.push({
          link: `${idx === 0 ? '' : res[idx - 1].link}/${curr}`,
          label: isLastItem ? curr : `navbar.${$toKebabCase(curr)}`,
          subCategories: [],
          isLastItem
        });
        return res;
      }, [] as NavData[])
    ];

    return { breadcrumbsList };
  }
});
</script>

<style scoped></style>
