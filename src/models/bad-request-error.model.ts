export class BadRequestError extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ error: value || "Bad Request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
