const PercentageErrorType = {
  DIVIDE_BY_ZERO_ERROR: "DIVIDE_BY_ZERO_ERROR",
  INVALID_NUMERATOR: "INVALID_NUMERATOR",
  INVALID_DENOMINATOR: "INVALID_DENOMINATOR",
  INVALID_DECIMAL_PLACES: "INVALID_DECIMAL_PLACES",
  CALCULATION_ERROR: "CALCULATION_ERROR",
} as const;

export class PercentageError extends Error {
  constructor(
    public readonly type: keyof typeof PercentageErrorType,
    message: string,
  ) {
    super(message);
    this.name = "PercentageError";
  }
}

interface PercentageResult {
  percentage: number;
  formattedPercentage: string;
}

const ERROR_MESSAGES = {
  [PercentageErrorType.DIVIDE_BY_ZERO_ERROR]: "Cannot divide by zero",
  [PercentageErrorType.INVALID_NUMERATOR]: "Numerator must be a valid number",
  [PercentageErrorType.INVALID_DENOMINATOR]:
    "Denominator must be a valid number",
  [PercentageErrorType.INVALID_DECIMAL_PLACES]:
    "Decimal places must be a non-negative integer",
  [PercentageErrorType.CALCULATION_ERROR]:
    "Error occurred during percentage calculation",
} as const;

/**
 * Calculates the percentage of numerator relative to denominator
 * @param numerator - The value to calculate percentage for
 * @param denominator - The total value
 * @param options - Optional configuration for decimal places and formatting
 * @returns Object containing both numeric and formatted percentage
 * @throws PercentageError with specific error type and message
 */
export function getPercentage(
  numerator: number,
  denominator: number,
  options: {
    decimalPlaces?: number;
    includeSymbol?: boolean;
  } = {},
): PercentageResult {
  const { decimalPlaces = 2, includeSymbol = true } = options;

  if (typeof numerator !== "number" || isNaN(numerator)) {
    throw new PercentageError(
      PercentageErrorType.INVALID_NUMERATOR,
      ERROR_MESSAGES[PercentageErrorType.INVALID_NUMERATOR],
    );
  }

  if (typeof denominator !== "number" || isNaN(denominator)) {
    throw new PercentageError(
      PercentageErrorType.INVALID_DENOMINATOR,
      ERROR_MESSAGES[PercentageErrorType.INVALID_DENOMINATOR],
    );
  }

  if (denominator === 0) {
    throw new PercentageError(
      PercentageErrorType.DIVIDE_BY_ZERO_ERROR,
      ERROR_MESSAGES[PercentageErrorType.DIVIDE_BY_ZERO_ERROR],
    );
  }

  if (decimalPlaces < 0 || !Number.isInteger(decimalPlaces)) {
    throw new PercentageError(
      PercentageErrorType.INVALID_DECIMAL_PLACES,
      ERROR_MESSAGES[PercentageErrorType.INVALID_DECIMAL_PLACES],
    );
  }

  try {
    const percentage = (numerator / denominator) * 100;
    const roundedPercentage = Number(percentage.toFixed(decimalPlaces));
    const formattedPercentage = `${roundedPercentage}${includeSymbol ? "%" : ""}`;

    return {
      percentage: roundedPercentage,
      formattedPercentage,
    };
  } catch (error) {
    throw new PercentageError(
      PercentageErrorType.CALCULATION_ERROR,
      `${ERROR_MESSAGES[PercentageErrorType.CALCULATION_ERROR]}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
