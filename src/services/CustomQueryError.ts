/**
 * Erreur normalisée levée par les services pour tout échec applicatif :
 * le message est destiné à l'utilisateur (affiché via notify).
 */
class CustomQueryError extends Error {
  code?: number | string;
  errors?: Record<string, string[]>;
  data?: unknown;

  constructor(
    message: string,
    code?: number | string,
    extra?: { errors?: Record<string, string[]>; data?: unknown },
  ) {
    super(message);
    this.name = "CustomQueryError";
    this.code = code;
    this.errors = extra?.errors;
    this.data = extra?.data;
  }
}

export default CustomQueryError;
