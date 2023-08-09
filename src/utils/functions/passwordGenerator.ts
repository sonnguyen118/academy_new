// passwordGenerator.ts

export function generatePassword(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const passwordLength = 8;

  const passwordArray = Array.from({ length: passwordLength }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  });

  return passwordArray.join('');
}
