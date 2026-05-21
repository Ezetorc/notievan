import type { ValidationMessageField } from 'client/models/validation-message-field.model'

export const VALIDATION_MESSAGES: Record<
	ValidationMessageField,
	Partial<Record<string, string>>
> = {
	title: {
		too_small: 'El título es obligatorio',
		too_big: 'El título es demasiado largo',
		invalid_type: 'El título debe ser texto'
	},

	subtitle: {
		too_small: 'El subtítulo es obligatorio',
		too_big: 'El subtítulo es demasiado largo'
	},

	description: {
		too_small: 'La descripción es obligatoria',
		too_big: 'La descripción es demasiado larga'
	},

	content: {
		too_small: 'El contenido es obligatorio',
		too_big: 'El contenido es demasiado largo'
	},

	email: {
		invalid_string: 'El email no es válido',
		too_small: 'El email es obligatorio',
		too_big: 'El email es demasiado largo'
	},

	password: {
		too_small: 'La contraseña es demasiado corta',
		too_big: 'La contraseña es demasiado larga',
		invalid_string: 'La contraseña no es válida'
	},

	image: {
		invalid_type: 'La imagen no es válida',
		too_small: 'Debes subir una imagen'
	}
}
