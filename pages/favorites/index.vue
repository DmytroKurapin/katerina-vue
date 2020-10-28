<template>
  <div class="flex flex-wrap flex-col sm:-mx-1 lg:-mx-4 mx-1">
    <section>
      <div class="divide-y divide-gray-400">
        <template v-if="favoriteProducts.length > 0">
          <div v-for="(prod, idx) in favoriteProducts" :key="`favorite_${idx}`" class="flex flex-wrap py-4">
            <figure class="w-1/3">
              <img :src="prod.thumbnail" :alt="prod.title[$i18n.locale]" class="" />
            </figure>

            <div class="w-2/3 ps-4 lg:ps-8">
              <p class="flex my-2 justify-between">
                <span>{{ prod.title[$i18n.locale] }}</span>

                <HeartIcon :is-liked="true" class="w-6 h-6 me-5" @click="removeFromFavorites(prod)" />
              </p>
              <p>{{ prod.shortDescription[$i18n.locale] }}</p>
              <p>
                <b>{{ prod.vendorCode }}</b>
              </p>
              <p class="my-4 text-xl">
                <i>{{ prod.price }} ₪</i>
              </p>
            </div>

            <button class="w-full py-2 px-6 mt-4 bg-green-400" @click="orderViaWassap">
              {{ $t('general.order_via_wassap') }}
            </button>
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
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';
import HeartIcon from '@/components/HeartIcon.vue';
import { favoriteProducts$, pushPopFavorites } from '@/composables/useFavorites';
import { isLoading } from '@/composables/useApiService';
import { createSEOMeta } from '@/utils/seo';
import { Product } from '@/types';

export default defineComponent({
  components: { Breadcrumbs, LoadingIcon, HeartIcon },
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

    const orderViaWassap = () => {
      alert(root.$t('general.order_via_wassap'));
    };

    const removeFromFavorites = (prod: Product) => {
      pushPopFavorites([prod], true);
    };

    return { favoriteProducts: favoriteProducts$, isLoading, orderViaWassap, removeFromFavorites };
  }
});
</script>

<style scoped></style>
