import axios from 'axios';
import { context, propagation } from '@opentelemetry/api';

export const api = axios.create({
  baseURL: `http://localhost:8080`,
});

api.interceptors.request.use((config) => {
  const headers = config.headers || {};

  // Injeta os headers do OpenTelemetry
  propagation.inject(context.active(), headers);

  console.log('Headers da requisição Axios:', headers); // Verifique se traceparent aparece

  config.headers = headers;
  return config;
});
