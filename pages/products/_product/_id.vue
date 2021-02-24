<template>
  <div class="xl:px-5">
    <Breadcrumbs />

    <SelectedProductPage v-if="productData" :product-data="productData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useMeta, watch } from '@nuxtjs/composition-api';
import { activeProduct$, setActiveProduct } from '@/composables/useProducts';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import SelectedProductPage from '@/components/SelectedProductPage.vue';
import { createSEOMeta } from '@/utils/seo';

export default defineComponent({
  components: { Breadcrumbs, SelectedProductPage },
  head: {},
  setup(props, ctx) {
    const { root } = ctx as any;
    const { id: vendorCode } = root.$route.params;

    setActiveProduct(vendorCode);

    const { title, meta } = useMeta();

    watch(activeProduct$, pObj => {
      if (!pObj) {
        return;
      }
      const metaTitle = pObj.title[root.$i18n.locale as 'en' | 'he'];
      title.value = metaTitle;
      meta.value = createSEOMeta({
        title: metaTitle,
        description: pObj.shortDescription[root.$i18n.locale as 'en' | 'he'],
        image: pObj.thumbnail,
        url: root.$route.path
      });
    });

    return { productData: activeProduct$ };
  }
});
</script>
