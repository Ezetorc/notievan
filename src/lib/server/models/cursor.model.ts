export class Cursor {
	createdAt: Date
	id: string

	constructor(createdAt: Date, id: string) {
		this.createdAt = createdAt
		this.id = id
	}

	encode(): string {
		return Buffer.from(JSON.stringify(this)).toString('base64')
	}

	static decode(cursor: string): Cursor {
		const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString())
		return new Cursor(new Date(decoded.createdAt), decoded.id)
	}

	static encodedFrom(input?: { createdAt: Date; id: string }): string | null {
		return input ? new Cursor(input.createdAt, input.id).encode() : null
	}
}
