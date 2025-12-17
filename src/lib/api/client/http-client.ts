import { getAccessToken } from "@/lib/auth/server";
import type { ApiResponse } from "./api-response";

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    if (!baseUrl) {
      throw new Error("API_URL is missing.");
    }

    this.baseUrl = baseUrl;
  }

  private async buildAuthorizationHeaders(): Promise<HeadersInit> {
    const tokenResult = await getAccessToken();
    console.log(
      "buildAuthorizationHeaders tokenResult:",
      JSON.stringify(tokenResult)
    );
    const headers: HeadersInit = {};

    if (tokenResult?.accessToken) {
      headers.Authorization = `Bearer ${tokenResult.accessToken}`;
    } else {
      console.log("PANIC! No access token available for HttpClient request.");
    }

    return headers;
  }

  private async execute<T>(
    path: string,
    init: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, init);

      if (!response.ok) {
        return {
          success: false,
          error: `Status ${response.status}`,
        };
      }

      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const json = (await response.json()) as T;

        return {
          success: true,
          payload: json,
        };
      }

      const text = (await response.text()) as unknown as T;

      return {
        success: true,
        payload: text,
      };
    } catch (err) {
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

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const headers = await this.buildAuthorizationHeaders();

    return this.execute<T>(path, {
      method: "DELETE",
      headers,
    });
  }
}
