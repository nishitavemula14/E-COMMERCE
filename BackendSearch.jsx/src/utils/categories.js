export function getProductCategorySlug(product) {
  const productText = `${product.title ?? ""} ${product.description ?? ""} ${
    product.category ?? ""
  }`.toLowerCase();

  if (
    product.category === "pet-supplies" ||
    productText.includes("cat food") ||
    productText.includes("dog food") ||
    productText.includes("pet food")
  ) {
    return "pet-food";
  }

  return product.category;
}

export function getCategorySlug(category) {
  return category === "pet-supplies" ? "pet-food" : category;
}

export function formatCategoryName(category) {
  return getCategorySlug(category)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
