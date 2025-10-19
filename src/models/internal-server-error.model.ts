export class InternalServerError extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ error: value || "Error interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
