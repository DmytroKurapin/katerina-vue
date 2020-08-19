import { initApiService } from '@/composables/useApiService';

export default function(ctx) {
  if (!ctx.$axios) {
    console.log('Please make sure $axios module is added');
  } else {
    // Pass Nuxt AXIOS context to service to get access to its properties
    initApiService(ctx);
  }
}
