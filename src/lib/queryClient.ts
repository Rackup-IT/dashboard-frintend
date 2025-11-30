import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest<T>(
  method: string,
  url: string,
  data?: unknown
): Promise<T> {
  const baseUrl =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
  const res = await fetch(`${baseUrl}/${url}`, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  const responseData: T = await res.json();
  return responseData;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export function getQueryFn<T>(options: { on401: UnauthorizedBehavior }) {
  return async ({ queryKey }: { queryKey: [string] }): Promise<T | null> => {
    const res = await fetch(queryKey[0], {
      credentials: "include",
    });

    if (options.on401 === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
