<template>
  <div v-if="!isInfoBlockHidden" class="bg-primary-light px-8 py-3 relative text-center z-20">
    <span class="uppercase me-4">{{ $t('general.info_text') }}</span>

    <!-- close icon -->
    <button type="button" class="absolute h-full top-0 end-4 focus:outline-none" @click="hideInfoBlock">
      <XIcon class="w-3 h-3" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api';
import XIcon from '@/components/XIcon.vue';

const STORAGE_TOGGLE_PROP_NAME = 'hiddenInfoBlock';

export default defineComponent({
  components: { XIcon },
  setup() {
    const isInfoBlockHidden = ref(true);

    onMounted(() => {
      isInfoBlockHidden.value = sessionStorage.getItem(STORAGE_TOGGLE_PROP_NAME) === 'true';
    });

    const hideInfoBlock = () => {
      sessionStorage.setItem(STORAGE_TOGGLE_PROP_NAME, 'true');
      isInfoBlockHidden.value = true;
    };

    return { isInfoBlockHidden, hideInfoBlock };
  }
});
</script>

<style scoped></style>
