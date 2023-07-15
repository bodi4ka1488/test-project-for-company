import { create } from "zustand";

export const useSingleBeer = create((set) => ({
  beer: [],
  loading: false,
  error: null,
  fetchBeer: async (id) => {
    set({ loading: true });
    try {
      const res = await fetch(`https://api.punkapi.com/v2/beers/${id}?`);
      if (!res.ok) throw new Error("Failed to fetch, try again");
      set({
        beer: await res.json(),
        error: null,
      });
    } catch (error) {
      set({ error: error.massege });
    } finally {
      set({ loading: false });
    }
  },
}));
