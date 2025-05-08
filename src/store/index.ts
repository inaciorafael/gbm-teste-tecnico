import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  user: {
    email: string;
  };
  handleLogin: (email: string) => void;
  handleLogout: () => void;
  isLogged: () => boolean;
}

const defaultUser = {
  email: "",
};

const useStore = create<AppState>()(
  persist((set, get) => ({
    user: defaultUser,
    isLogged: () => Boolean(get()?.user?.email),
    handleLogin: (email: string) => set({ user: { email } }),
    handleLogout: () => set({ user: defaultUser }),
  }), { name: 'app-store' }),
);

export default useStore;
