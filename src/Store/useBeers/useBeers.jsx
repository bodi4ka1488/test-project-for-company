import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useBeers = create(
  devtools((set) => ({
    startIndex: 0,
    endIndex: 4,
    beersPart: 0,
    beers: [],
    selectedCards: [],
    loading: false,
    currentPageOfBeers: 1,
    error: null,

    setbeersPart: (newbeersPart) =>
      set((state) => ({ beersPart: newbeersPart })),

    setStartIndex: (newStartIndex) =>
      set((state) => ({ startIndex: newStartIndex })),

    setEndIndex: (newEndIndex) => set((state) => ({ endIndex: newEndIndex })),

    setVisible: (newStartIndex) =>
      set((state) => ({ visibleBeers: newStartIndex })),

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
        // const beers = await res.json();
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
