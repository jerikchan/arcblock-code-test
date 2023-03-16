import axios from 'axios';

export function createHttp(options = { joinTime: false }) {
  const http = axios.create();

  http.interceptors.request.use(
    (config) => {
      const prefix = window.blocklet ? window.blocklet.prefix : '/';
      config.baseURL = prefix || '';
      config.timeout = 200000;

      return config;
    },
    (error) => Promise.reject(error)
  );

  http.interceptors.request.use((config) => {
    const params = config.params || {};
    const data = config.data || false;

    if (config.method?.toUpperCase() === 'GET') {
      if (typeof params !== 'string') {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(options.joinTime, false));
      } else {
        // 兼容restful风格
        config.url = joinUrlQuery(joinRestfulUrl(config.url, params), joinTimestamp(options.joinTime, true));
        config.params = undefined;
      }
    } else {
      if (typeof params !== 'string') {
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
      } else {
        // 兼容restful风格
        config.url = joinRestfulUrl(config.url, params);
        config.params = undefined;
      }
    }
    return config;
  });

  return http;
}

function joinRestfulUrl(url, params) {
  const queryIndex = url.indexOf('?');
  if (queryIndex === -1) {
    return url + params;
  } else {
    const path = url.slice(0, queryIndex);
    const query = url.slice(queryIndex);
    return path + params + query;
  }
}

function joinUrlQuery(url, ...args) {
  const queryIndex = url.indexOf('?');
  const query = args.join('&');
  if (queryIndex === -1) {
    return url + '?' + query;
  } else {
    return url + (query ? '&' + query : '');
  }
}

function joinTimestamp(join, restful) {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `_t=${now}`;
  }
  return { _t: now };
}

export const http = createHttp();
