<template>
  <div v-if="!isInfoBlockHidden" class="bg-primary-light px-8 py-3 relative text-center z-20">
    <span class="uppercase me-4">{{ $t('general.info_text') }}</span>

    <!-- close icon -->
    <button type="button" class="absolute h-full top-0 end-4 focus:outline-none" @click="hideInfoBlock">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-3 h-3 fill-current">
        <path
          :d="
            `M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071
               1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z`
          "
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api';

const STORAGE_TOGGLE_PROP_NAME = 'hiddenInfoBlock';

export default defineComponent({
  components: {},
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
