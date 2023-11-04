const isPasswordStrong = (password) => {
  if (password.length < 4 || (!password.includes("-") && !password.includes("_"))) {
    return "Пароль недостаточно надёжный";
  }

  return "Пароль надёжный";
}

console.log(isPasswordStrong("1234-"));
console.log(isPasswordStrong("qwe_123"));
console.log(isPasswordStrong("_-_"));
console.log(isPasswordStrong("123456789"));