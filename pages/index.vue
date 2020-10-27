<template>
  <div>
    {{ $t('navbar.home_page') }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import { createSEOMeta } from '@/utils/seo';

export default defineComponent({
  components: {},
  head() {},
  setup(props, ctx) {
    // const { fetchArticleForUserLang, article } = usePosts({ ctx });
    // const slug = ctx.root.$route.params?.article;
    const metaTitle = ref(ctx.root.$t('navbar.home_page'));

    useMeta({
      title: metaTitle.value,
      meta: createSEOMeta({
        title: metaTitle.value,
        description: null,
        image: '/logo.png',
        url: ''
      })
    });
    return {};
  }
});
</script>

<style></style>
