import { getAccessToken } from "@/lib/auth/server";
import type { ApiResponse } from "./api-response";

const logRequest = (method: string, path: string) =>
  console.info(`[API] → ${method} ${path}`);

const logSuccess = (status: number, durationMs: number) =>
  console.info(`[API] ✓ ${status} OK (${durationMs} ms)`);

const logError = (
  status: number | "ERR",
  message: string,
  durationMs: number,
) => console.error(`[API] ✗ ${status} ${message} (${durationMs} ms)`);

export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    if (!baseUrl) {
      throw new Error("API_URL is missing.");
    }

    this.baseUrl = baseUrl;
  }

  private async buildAuthorizationHeaders(): Promise<HeadersInit> {
    const tokenResult = await getAccessToken();
    const headers: HeadersInit = {};

    if (tokenResult?.accessToken) {
      headers.Authorization = `Bearer ${tokenResult.accessToken}`;
    }

    return headers;
  }

  private async execute<T>(
    path: string,
    init: RequestInit,
  ): Promise<ApiResponse<T>> {
    const method = init.method ?? "GET";
    const start = Date.now();

    logRequest(method, path);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, init);
      const duration = Date.now() - start;

      if (!response.ok) {
        logError(response.status, response.statusText, duration);

        return {
          success: false,
          error: `Status ${response.status}`,
        };
      }

      const contentType = response.headers.get("content-type");
      let payload: T;

      if (contentType?.includes("application/json")) {
        payload = (await response.json()) as T;
      } else {
        payload = (await response.text()) as unknown as T;
      }

      logSuccess(response.status, duration);

      return {
        success: true,
        payload,
      };
    } catch (err) {
      const duration = Date.now() - start;

      logError("ERR", (err as Error).message, duration);

      return {
        success: false,
        error: (err as Error).message,
      };
    }
  }

  async get<T>(path: string): Promise<ApiResponse<T>> {
    const headers = await this.buildAuthorizationHeaders();

    return this.execute<T>(path, {
      method: "GET",
      headers,
    });
  }

  async post<T>(path: string, body: BodyInit): Promise<ApiResponse<T>> {
    const headers = await this.buildAuthorizationHeaders();

    return this.execute<T>(path, {
      method: "POST",
      body,
      headers,
    });
  }

  async put<T>(path: string, body?: BodyInit): Promise<ApiResponse<T>> {
    const headers = await this.buildAuthorizationHeaders();

    return this.execute<T>(path, {
      method: "PUT",
      body,
      headers,
    });
  }

  async patch<T>(path: string, body: BodyInit): Promise<ApiResponse<T>> {
    const baseHeaders = await this.buildAuthorizationHeaders();
    const headers = new Headers(baseHeaders);

    if (typeof body === "string") {
      headers.set("Content-Type", "application/json");
    }

    return this.execute<T>(path, {
      method: "PATCH",
      body,
      headers,
    });
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const headers = await this.buildAuthorizationHeaders();

    return this.execute<T>(path, {
      method: "DELETE",
      headers,
    });
  }
}
