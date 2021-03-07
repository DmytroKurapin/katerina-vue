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
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { root } = ctx as any;

    const orderViaWassap = () => {
      const msgTxt = props.message ? `${root.$t('general.wassap_msg_start')} ${props.message}` : '';
      window.open(`https://wa.me/${process.env.phone}?text=${encodeURIComponent(msgTxt)}`, '_blank');
    };

    return { orderViaWassap };
  }
});
</script>

<style scoped></style>
