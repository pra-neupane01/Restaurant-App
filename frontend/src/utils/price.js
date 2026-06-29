export function getFoodPrice(food) {
  return 120 + (food.rating || 3) * 45;
}

export function formatPrice(amount) {
  return `Rs. ${amount}`;
}
