import { envConfig } from './env.config';
import {
  getAccessTokenFromLocalStorage,
  normalizePath,
  setAccessTokenToLocalStorage,
  removeAccessTokenFromLocalStorage,
} from './utils';

type CustomOptions = Omit<RequestInit, 'body'> & {
  baseUrl?: string | undefined;
  body?: unknown;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type HttpErrorPayload = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
};

const isClient = typeof window !== 'undefined';
export class HttpError extends Error {
  status: number;
  payload: HttpErrorPayload;

  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: HttpErrorPayload;
  }) {
    super(payload.message || 'Http Error');
    this.status = status;
    this.payload = payload;
  }

  getMessage(): string {
    return this.payload.message;
  }
}

export const api = async <Response>(
  method: HttpMethod,
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;

  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: Record<string, string> =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json',
        };

  if (isClient) {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }

  // Validate API URL
  const baseUrl = options?.baseUrl ?? envConfig.API_URL;
  if (!baseUrl) {
    throw new Error('API URL is not configured');
  }

  const fullUrl = `${baseUrl}/${normalizePath(url)}`;

  try {
    const res = await fetch(fullUrl, {
      ...options,
      method,
      body,
      headers: {
        ...baseHeaders,
        ...options?.headers,
      },
      credentials: 'include',
    });

    // Handle empty responses
    let data: any = null;
    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      try {
        data = await res.json();
      } catch (parseError) {
        console.warn('Failed to parse JSON response:', parseError);
        data = { message: 'Invalid JSON response' };
      }
    } else {
      // Handle non-JSON responses
      const text = await res.text();
      data = { message: text || 'No response data' };
    }

    if (!res.ok) {
      const errorPayload: HttpErrorPayload = {
        success: false,
        statusCode: res.status,
        message: data?.message || `HTTP ${res.status}: ${res.statusText}`,
        data: data?.data,
      };
      throw new HttpError({
        status: res.status,
        payload: errorPayload,
      });
    }

    // Handle authentication tokens
    if (isClient) {
      const normalizeUrl = normalizePath(url);
      if (normalizeUrl === 'auth/login' && data?.success) {
        const accessToken = data.data?.accessToken;
        if (accessToken && typeof accessToken === 'string') {
          setAccessTokenToLocalStorage(accessToken);
        }
      } else if (normalizeUrl === 'auth/logout') {
        removeAccessTokenFromLocalStorage();
      }
    }

    return {
      status: res.status,
      payload: data as Response,
    };
  } catch (error) {
    // Handle network errors
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError({
      status: 0,
      payload: {
        success: false,
        statusCode: 0,
        message:
          error instanceof Error ? error.message : 'Network error occurred',
      },
    });
  }
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return api<Response>('GET', url, options);
  },
  post<Response>(
    url: string,
    body: unknown,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return api<Response>('POST', url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: unknown,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return api<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body?: unknown,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return api<Response>('DELETE', url, { ...options, body });
  },
};

export default http;
