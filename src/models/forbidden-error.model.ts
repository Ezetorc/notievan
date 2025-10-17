export class ForbiddenError extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ error: value || "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
}
