export class CreatedResponse extends Response {
  constructor(value?: any) {
    super(JSON.stringify({ value: value || "Creado" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }
}
