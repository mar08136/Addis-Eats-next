export function validateOrder(name, phone) {
  if (!name || !phone) {
    return "Name and phone are required";
  }

  if (typeof name !== "string" || typeof phone !== "string") {
    return "Name and phone must be text";
  }

  if (!name.trim() || !phone.trim()) {
    return "Name and phone cannot be empty";
  }

  const phonePattern = /^09\d{8}$/;

  if (!phonePattern.test(phone.trim())) {
    return "Phone number must be 10 digits and start with 09";
  }

  return null;
}