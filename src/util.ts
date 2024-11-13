export function validateLengths(
  str: string,
  options?: { minLength?: number; maxLength?: number; regex?: string },
  what: string = "Value"
): string | null {
  if (options?.minLength && str.length < options.minLength)
    return `${what} must be at least ${options.minLength} characters long`;

  if (options?.maxLength && str.length > options.maxLength)
    return `${what} must be less than ${options.maxLength} characters long`;

  if (options?.regex && !new RegExp(options.regex).test(str))
    return `${what} must match regex ${options.regex}`;

  return null;
}
