const BASE_URL = "/api/v1.4";
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

interface ApiError {
    message?: string | string[];
}


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
        const body: ApiError | null = await response.json().catch(() => null);

        const message = Array.isArray(body?.message)
            ? body.message.join(". ")
            : body?.message;

        throw new Error(message ?? `Не удалось загрузить данные (${response.status})`);
    }

    return (await response.json()) as T;
}