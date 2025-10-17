export class UnauthorizedError extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ error: value || "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
