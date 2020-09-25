export default function(ctx, inject) {
  const toKebabCase = (/* String */ str) => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1_$2').toLowerCase();
  inject('toKebabCase', toKebabCase);
}
