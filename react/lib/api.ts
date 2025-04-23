import {
  type BackendMoodType,
  type MoodType,
  parseMoodToBackend,
} from "@/types/mood";

// Get the API URL from environment variables
const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337/api/";

// Types for Strapi responses
export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  mood_entries: StrapiMoodEntry[];
}

export interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

export interface StrapiMoodEntry {
  id: number;
  note: string;
  date: string;
  mood: BackendMoodType;
  createdAt: string;
  updatedAt: string;
  user: {
    data: {
      id: number;
      attributes: StrapiUser;
    };
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Helper function to get the auth token
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Helper function to set the auth token
export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

// Helper function to remove the auth token
export const removeToken = (): void => {
  localStorage.removeItem("token");
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
};

// Register a new user
export const register = async (
  username: string,
  email: string,
  password: string,
): Promise<StrapiAuthResponse> => {
  const response = await fetch(`${API_URL}auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || "Registration failed");
  }

  const data = await response.json();
  setToken(data.jwt);
  return data;
};

// Login a user
export const login = async (
  identifier: string,
  password: string,
): Promise<StrapiAuthResponse> => {
  const response = await fetch(`${API_URL}auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || "Login failed");
  }

  const data = await response.json();
  setToken(data.jwt);
  return data;
};

// Logout a user
export const logout = (): void => {
  removeToken();
};

// Get the current user
export const getCurrentUser = async (
  populate = false,
): Promise<StrapiUser | null> => {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch(
      `${API_URL}users/me${
        populate
          ? "?populate[mood_entries][filters][publishedAt][$notNull]=true"
          : ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      removeToken();
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    removeToken();
    return null;
  }
};

// Get all mood entries for the current user
export const getMoodEntries = async (): Promise<StrapiMoodEntry[]> => {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const response = await getCurrentUser(true);
  console.log(response);

  if (response) return response.mood_entries;

  return [];
};

// Create a new mood entry
export const createMoodEntry = async (
  note: string,
  mood: MoodType,
  date: string,
): Promise<StrapiMoodEntry> => {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(`${API_URL}mood-entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        note: note,
        mood: parseMoodToBackend(mood),
        date,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || "Failed to create mood entry");
  }

  return (await response.json()).data;
};

// Update a mood entry
export const updateMoodEntry = async (
  id: number,
  note: string,
  mood: MoodType,
  date: string,
): Promise<StrapiMoodEntry> => {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(`${API_URL}mood-entries/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        note,
        mood: parseMoodToBackend(mood),
        date,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || "Failed to update mood entry");
  }

  return (await response.json()).data;
};

// Delete a mood entry
export const deleteMoodEntry = async (id: number): Promise<void> => {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(`${API_URL}mood-entries/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || "Failed to delete mood entry");
  }
};

// Convert Strapi mood entries to our app format
export const convertStrapiEntriesToAppFormat = (
  strapiEntries: StrapiMoodEntry[],
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
): any[] => {
  return strapiEntries
    ? strapiEntries.map((entry) => ({
        id: entry.id.toString(),
        date: entry.date,
        mood: entry.mood,
        note: entry.note,
      }))
    : [];
};
