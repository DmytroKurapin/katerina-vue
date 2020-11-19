<template>
  <div class="flex flex-wrap -mx-6 sm:-mx-4">
    <template v-if="favoriteProducts.length > 0">
      <div
        v-for="(prod, idx) in favoriteProducts"
        :key="`favorite_${idx}`"
        class="w-full px-6 md:px-4 md:w-1/2 border-gray-400"
      >
        <FavoriteProductCard
          :product="prod"
          :class="[
            idx === 0 ? 'border-none' : 'border-t',
            idx !== 0 && idx % 2 === 0 ? 'md:border-t' : 'md:border-none'
          ]"
          class="flex flex-wrap border-gray-400 py-4"
        />
      </div>
    </template>
    <template v-else-if="!isLoading">
      <div class="text-center">
        {{ $t('general.no_favorites_selected') }}
      </div>
    </template>
    <template v-else>
      <LoadingIcon />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import FavoriteProductCard from '@/components/FavoriteProductCard.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';
import HeartIcon from '@/components/HeartIcon.vue';
import { favoriteProducts$ } from '@/composables/useFavorites';
import { isLoading } from '@/composables/useApiService';
import { createSEOMeta } from '@/utils/seo';

export default defineComponent({
  components: { FavoriteProductCard, LoadingIcon, HeartIcon },
  head: {},
  setup(props, ctx) {
    const { root } = ctx as any;

    const metaTitle = ref<string>(root.$t('navbar.favorites'));
    const metaDescription = ref<string>(`${metaTitle.value} | ${root.$t('general.site_description')}`);

    const metaImg$ = computed(() =>
      favoriteProducts$.value.length > 0 ? favoriteProducts$.value[0].thumbnail : '/logo.png'
    );

    useMeta({
      title: metaTitle.value,
      meta: createSEOMeta({
        title: metaTitle.value,
        description: metaDescription.value,
        image: metaImg$.value,
        url: root.$route.path
      })
    });

    return { favoriteProducts: favoriteProducts$, isLoading };
  }
});
</script>

<style scoped></style>
