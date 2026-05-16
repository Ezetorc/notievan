import { VALIDATION_MESSAGES } from '$lib/configuration/validation-messages.configuration';
import type { $ZodIssue } from 'zod/v4/core';

type ValidationField = keyof typeof VALIDATION_MESSAGES;

export function parseZodIssue(issue: $ZodIssue): string {
	const field = issue.path[0];

	const isValidationField = (field: PropertyKey): field is ValidationField => {
		return typeof field === 'string' && field in VALIDATION_MESSAGES;
	};

	if (!isValidationField(field)) {
		return '';
	}

	return VALIDATION_MESSAGES[field]?.[issue.code] ?? 'Uno o más datos son inválidos';
}
