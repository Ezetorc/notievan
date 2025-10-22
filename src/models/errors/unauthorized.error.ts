export class UnauthorizedError extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ error: value || "No autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
