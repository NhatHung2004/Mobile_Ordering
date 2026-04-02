const BASE_URL = 'http://192.168.1.11:5000';

export async function normalRequest<T>(
  url: string,
  options?: {
    method?: string;
    headers?: Record<string, string>;
    body?: Record<string, any> | string;
    next?: { revalidate?: number };
    signal?: AbortSignal;
    timeout?: number;
  },
): Promise<T | null> {
  const { method = 'GET', headers = {}, body, next, signal, timeout = 10000 } = options || {};

  let defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  let requestBody: BodyInit | undefined;
  if (body && typeof body === 'object' && defaultHeaders['Content-Type'] === 'application/json') {
    requestBody = JSON.stringify(body);
  } else if (typeof body === 'string') {
    requestBody = body;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const baseUrl = `${BASE_URL}${url}`;
    const response = await fetch(baseUrl, {
      method,
      headers: defaultHeaders,
      body: requestBody,
      signal: signal || controller.signal,
      ...(next && { next }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json();
      throw {
        statusCode: response.status,
        message: errData.message || 'An error occurred',
        ...errData,
      };
    }

    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as T;
    }

    return (await response.text()) as T;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return null;
    }
    throw err;
  }
}
