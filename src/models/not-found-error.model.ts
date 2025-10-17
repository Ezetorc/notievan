export class NotFoundError extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ error: value || "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
