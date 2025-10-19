export class ConflictError extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ error: value || "Conflicto" }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }
}
