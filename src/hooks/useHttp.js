import { useAxios } from '@vueuse/integrations/useAxios';
import { http } from '/@/utils/http';

export function useHttp(url, config) {
  return useAxios(url, config, http, {
    immediate: false,
    onError: (error) => {
      console.error(error);
    },
  });
}
