export class ForbiddenError extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ error: value || "Prohibido" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
}
