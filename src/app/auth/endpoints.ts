import endpoints from './endpoints.json';

export const getEndpoint = (path: string, params: { [key: string]: string | number } = {}): string => {
  let endpoint = path;
  for (const key in params) {
    endpoint = endpoint.replace(`:${key}`, params[key].toString());
  }
  return endpoint;
};

export const endpointsConfig = endpoints;