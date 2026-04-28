import type { ErrorCode } from "../../../shared/src/models/error-code.model"

export const messages: Record<string, Record<string, string>> = {
    title: {
        too_small: 'El título es obligatorio',
        too_big: 'El título es demasiado largo',
        invalid_type: 'El título debe ser texto',
    },
    subtitle: {
        too_small: 'El subtítulo es obligatorio',
        too_big: 'El subtítulo es demasiado largo',
    },
    description: {
        too_small: 'La descripción es obligatoria',
        too_big: 'La descripción es demasiado larga',
    },
    content: {
        too_small: 'El contenido es obligatorio',
        too_big: 'El contenido es demasiado largo',
    },

    email: {
        invalid_string: 'El email no es válido',
        too_small: 'El email es obligatorio',
        too_big: 'El email es demasiado largo',
    },

    password: {
        too_small: 'La contraseña es demasiado corta',
        too_big: 'La contraseña es demasiado larga',
        invalid_string: 'La contraseña no es válida',
    },

    image: {
        invalid_type: 'La imagen no es válida',
        too_small: 'Debes subir una imagen',
    },
}

export const fallbackMessages: Record<string, string> = {
    invalid_type: 'Tipo de dato inválido',
    invalid_string: 'Formato inválido',
    too_small: 'Valor demasiado corto',
    too_big: 'Valor demasiado largo',
    invalid_enum_value: 'Valor no permitido',
    unrecognized_keys: 'Campos no permitidos',
    invalid_union: 'Datos inválidos',
    invalid_literal: 'Valor incorrecto',
    custom: 'Valor inválido',
}

export const backendMessages: Record<ErrorCode, string> = {
  EMAIL_IN_USE: 'El email ya está en uso',
  NAME_IN_USE: 'El nombre ya está en uso',

  WRONG_EMAIL: 'El email es incorrecto',
  WRONG_PASSWORD: 'La contraseña es incorrecta',

  INVALID_TOKEN: 'El token no es válido',
  TOKEN_NOT_FOUND: 'Token no encontrado',

  USER_NOT_FOUND: 'Usuario no encontrado',
  COMMENT_NOT_FOUND: 'Comentario no encontrado',
  ARTICLE_NOT_FOUND: 'Artículo no encontrado',

  FORBIDDEN: 'No tienes permiso para realizar esta acción',
}