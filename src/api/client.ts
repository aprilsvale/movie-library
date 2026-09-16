const BASE_URL = "/api/v1.4";
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export async function apiGet<T>(
    path: string,
    params: Record<string, string | number> = {}
): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`, window.location.origin);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
    });

    const response = await fetch(url.toString(), {
        headers: {
            "X-API-KEY": API_KEY,
            accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
}