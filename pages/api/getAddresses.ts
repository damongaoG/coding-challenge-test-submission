import type { NextApiRequest, NextApiResponse } from "next";
import generateMockAddresses from "../../src/utils/generateMockAddresses";

interface ValidationRule {
  field: string;
  value: string;
  displayName: string;
  errorMessage: string;
}

interface ValidationResult {
  isValid: boolean;
  errorResponse?: {
    status: "error";
    errorMessage: string;
  };
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { postcode, streetnumber },
  } = req;

  if (!postcode || !streetnumber) {
    return res.status(400).send({
      status: "error",
      // DO NOT MODIFY MSG - used for grading
      errormessage: "Postcode and street number fields mandatory!",
    });
  }

  if (postcode.length < 4) {
    return res.status(400).send({
      status: "error",
      // DO NOT MODIFY MSG - used for grading
      errormessage: "Postcode must be at least 4 digits!",
    });
  }

  /** TODO: Implement the validation logic to ensure input value
   *  is all digits and non negative
   */
  const isStrictlyNumeric = (value: string) => {
    return /^\d+$/.test(value) && parseInt(value, 10) >= 0;
  };

  /** TODO: Refactor the code below so there is no duplication of logic for postCode/streetNumber digit checks. */

  /**
   * Numeric validation function
   * @param rule - Validation rule
   * @returns Validation result with error response if invalid
   */
  const validateNumericField = (rule: ValidationRule): ValidationResult => {
    if (!isStrictlyNumeric(rule.value)) {
      return {
        isValid: false,
        errorResponse: {
          status: "error",
          errorMessage: rule.errorMessage,
        },
      };
    }
    return {
      isValid: true,
    };
  };

  const numericValidations: ValidationRule[] = [
    {
      field: "postcode",
      value: postcode as string,
      displayName: "Postcode",
      errorMessage: "Postcode must be all digits and non negative!",
    },
    {
      field: "streetnumber",
      value: streetnumber as string,
      displayName: "Street Number",
      errorMessage: "Street Number must be all digits and non negative!",
    },
  ];

  // Validate all numeric fields
  for (const rule of numericValidations) {
    const result = validateNumericField(rule);
    if (!result.isValid) {
      return res.status(400).send(result.errorResponse);
    }
  }

  const mockAddresses = generateMockAddresses(
    postcode as string,
    streetnumber as string
  );
  if (mockAddresses) {
    const timeout = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    // delay the response by 500ms - for loading status check
    await timeout(500);
    return res.status(200).json({
      status: "ok",
      details: mockAddresses,
    });
  }

  return res.status(404).json({
    status: "error",
    // DO NOT MODIFY MSG - used for grading
    errormessage: "No results found!",
  });
}
