import { useHttp } from '/@/hooks/useHttp';

export function querySingleBlock() {
  return useHttp('//blockchain.info/rawblock/?cors=true', { method: 'GET' });
}
