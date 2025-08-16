export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      cache: 'no-store', // luôn lấy mới -> SSR
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (!json.success) {
      throw new Error(json.message || 'API response error');
    }

    return json.data as T;
  } catch (error: any) {
    console.error('Fetch API Error:', error.message);
    throw new Error(error.message || 'Unexpected error');
  }
}
