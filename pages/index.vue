<template>
  <div>
    {{ $t('navbar.home_page') }}
  </div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api';
import { createSEOMeta } from '@/utils/seo';

export default defineComponent({
  components: {},
  head: {},
  setup(props, ctx) {
    const { root } = ctx as any;

    // const { fetchArticleForUserLang, article } = usePosts({ ctx });
    // const slug = ctx.root.$route.params?.article;
    const metaTitle = root.$t('navbar.home_page');

    useMeta({
      title: metaTitle,
      meta: createSEOMeta({
        title: metaTitle,
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
