export class OkResponse extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ value: value || "Ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
