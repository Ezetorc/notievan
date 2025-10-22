export class BadRequestError extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ error: value || "Petición incorrecta" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
