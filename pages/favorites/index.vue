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
              <p>{{ prod.title[$i18n.locale] }}</p>
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
        <template v-else>
          <div class="text-center">
            {{ $t('general.no_favorites_selected') }}
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { favoriteProducts$ } from '@/composables/useFavorites';
import { createSEOMeta } from '@/utils/seo';

export default defineComponent({
  components: { Breadcrumbs },
  head: {},
  setup(props, ctx) {
    const metaTitle = ref<string>(ctx.root.$t('navbar.favorites'));
    const metaDescription = ref<string>(`${metaTitle.value} | ${ctx.root.$t('general.site_description')}`);

    const metaImg$ = computed(() =>
      favoriteProducts$.value.length > 0 ? favoriteProducts$.value[0].thumbnail : '/logo.png'
    );

    useMeta({
      title: metaTitle.value,
      meta: createSEOMeta({
        title: metaTitle.value,
        description: metaDescription.value,
        image: metaImg$.value,
        url: ctx.root.$route.path
      })
    });

    const orderViaWassap = () => {
      alert(this.$t('general.order_via_wassap'));
    };
    return { favoriteProducts: favoriteProducts$, orderViaWassap };
  }
});
</script>

<style scoped></style>
