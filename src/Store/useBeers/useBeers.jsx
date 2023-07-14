import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useBeers = create(
  devtools((set) => ({
    beers: [],
    visibleBeers: [],
    selectedCards: [],
    loading: false,
    currentPageOfBeers: 1,
    error: null,

    toggledCard: (cardId) =>
      set((state) => ({
        selectedCards: state.selectedCards.includes(cardId)
          ? state.selectedCards.filter((id) => id !== cardId)
          : [...state.selectedCards, cardId],
      })),
    deleteCard: () =>
      set((state) => ({
        beers: state.beers.filter(
          (beer) => !state.selectedCards.includes(beer.id)
        ),
        selectedCards: [],
      })),
    fetchBeers: async (currentPageOfBeers) => {
      set({ loading: true });
      try {
        const res = await fetch(
          `https://api.punkapi.com/v2/beers?page=${currentPageOfBeers}&per_page=15`
        );
        if (!res.ok) throw new Error("Failed to fetch, try again");
        set({ currentPageOfBeers: currentPageOfBeers + 1 });
        set({
          beers: await res.json(),
          error: null,
        });
      } catch (error) {
        set({ error: error.massege });
      } finally {
        set({ loading: false });
      }
    },
  }))
);
