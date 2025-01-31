import { ref, computed } from "vue";

export const useSearch = (items) => {
  const searchTerm = ref("");
  const activeFilters = ref(["title"]);

  const filteredItems = computed(() => {
    if (!searchTerm.value) {
      return items.value;
    }

    return items.value.filter(item => {
      return activeFilters.value.some(filter => {
        const field = item[filter];
        return field && field.toLowerCase().includes(searchTerm.value.toLowerCase());
      });
    });
  });

  return {
    searchTerm,
    filteredItems,
    activeFilters,
  };
};
