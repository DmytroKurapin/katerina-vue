<template>
  <div class="bottom-0 end-0 fixed start-0 top-0 z-max">
    <div class="flex h-full justify-center w-full">
      <div class="modal-overlay absolute bg-gray-900 h-full opacity-50 w-full" @click="toggleModal"></div>

      <div class="py-5 w-3/5 z-50">
        <div class="flex flex-col bg-white h-full modal-content">
          <div class="text-right">
            <button class="pt-4 pr-4 focus:outline-none" type="button" @click="toggleModal">
              <XIcon view-box="0 0 24 24" class="h-6 w-6 text-primary-light" />
            </button>
          </div>

          <div class="relative flex-grow pb-4">
            <div v-if="videoSrc" class="h-full relative">
              <figure class="flex absolute inset-0 justify-center">
                <video
                  class="shadow-lg"
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  @contextmenu.prevent
                >
                  <source :src="videoSrc" type="video/mp4" />
                  <source :src="videoSrc" type="video/ogg" />
                </video>
              </figure>
            </div>

            <ImagesSlideshow v-else :items="images" :visible-amount="1" class="h-full">
              <template v-slot="{ item, idx }">
                <figure class="flex px-4">
                  <img
                    :src="item"
                    :alt="`${title} ${idx + 1}`"
                    class="self-center max-h-full mx-auto"
                    onContextMenu="return false;"
                  />
                </figure>
              </template>
            </ImagesSlideshow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import ImagesSlideshow from '@/components/ImagesSlideshow.vue';

import XIcon from '@/components/XIcon.vue';

export default defineComponent({
  props: {
    images: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    visibleAmount: {
      type: Number,
      default: 1
    },
    videoSrc: {
      type: String,
      default: null
    }
  },
  components: { XIcon, ImagesSlideshow },
  setup(props, { emit }) {
    const toggleModal = () => emit('toggle');
    return {
      toggleModal
    };
  }
});
</script>
