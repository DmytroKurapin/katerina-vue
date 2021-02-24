<template>
  <div>
    <button class="px-6 py-2 bg-primary-light" @click="orderViaWassap">
      {{ $t('general.order_via_wassap') }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import HeartIcon from '@/components/HeartIcon.vue';

export default defineComponent({
  components: { HeartIcon },
  props: {},
  setup(props, ctx) {
    const { root } = ctx as any;

    const orderViaWassap = () => {
      alert(root.$t('general.order_via_wassap'));
    };

    return { orderViaWassap };
  }
});
</script>

<style scoped></style>
