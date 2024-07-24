// Utility function to transform the id
export const transformId = (id: string) => {
  return id
    .toLowerCase()
    .normalize("NFD") // Normalize to decompose combined characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/ \/ /g, "-") // Replace " / " with hyphen
    .replace(/\s+/g, "-"); // Remove spaces
};
