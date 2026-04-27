/**
 * Client
 **/

import * as runtime from './runtime/client.js'
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>

/**
 * Model Article
 *
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Comment
 *
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>

/**
 * Enums
 */
export namespace $Enums {
	export const Role: {
		USER: 'USER'
		AUTHOR: 'AUTHOR'
		ADMIN: 'ADMIN'
	}

	export type Role = (typeof Role)[keyof typeof Role]
}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Articles
 * const articles = await prisma.article.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
	ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
	const U = 'log' extends keyof ClientOptions
		? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
			? Prisma.GetEvents<ClientOptions['log']>
			: never
		: never,
	ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
	[K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

	/**
	 * ##  Prisma Client ʲˢ
	 *
	 * Type-safe database client for TypeScript & Node.js
	 * @example
	 * ```
	 * const prisma = new PrismaClient({
	 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
	 * })
	 * // Fetch zero or more Articles
	 * const articles = await prisma.article.findMany()
	 * ```
	 *
	 *
	 * Read more in our [docs](https://pris.ly/d/client).
	 */

	constructor(
		optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>
	)
	$on<V extends U>(
		eventType: V,
		callback: (
			event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent
		) => void
	): PrismaClient

	/**
	 * Connect with the database
	 */
	$connect(): $Utils.JsPromise<void>

	/**
	 * Disconnect from the database
	 */
	$disconnect(): $Utils.JsPromise<void>

	/**
	 * Executes a prepared raw query and returns the number of affected rows.
	 * @example
	 * ```
	 * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
	 * ```
	 *
	 * Read more in our [docs](https://pris.ly/d/raw-queries).
	 */
	$executeRaw<T = unknown>(
		query: TemplateStringsArray | Prisma.Sql,
		...values: any[]
	): Prisma.PrismaPromise<number>

	/**
	 * Executes a raw query and returns the number of affected rows.
	 * Susceptible to SQL injections, see documentation.
	 * @example
	 * ```
	 * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
	 * ```
	 *
	 * Read more in our [docs](https://pris.ly/d/raw-queries).
	 */
	$executeRawUnsafe<T = unknown>(
		query: string,
		...values: any[]
	): Prisma.PrismaPromise<number>

	/**
	 * Performs a prepared raw query and returns the `SELECT` data.
	 * @example
	 * ```
	 * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
	 * ```
	 *
	 * Read more in our [docs](https://pris.ly/d/raw-queries).
	 */
	$queryRaw<T = unknown>(
		query: TemplateStringsArray | Prisma.Sql,
		...values: any[]
	): Prisma.PrismaPromise<T>

	/**
	 * Performs a raw query and returns the `SELECT` data.
	 * Susceptible to SQL injections, see documentation.
	 * @example
	 * ```
	 * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
	 * ```
	 *
	 * Read more in our [docs](https://pris.ly/d/raw-queries).
	 */
	$queryRawUnsafe<T = unknown>(
		query: string,
		...values: any[]
	): Prisma.PrismaPromise<T>

	/**
	 * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
	 * @example
	 * ```
	 * const [george, bob, alice] = await prisma.$transaction([
	 *   prisma.user.create({ data: { name: 'George' } }),
	 *   prisma.user.create({ data: { name: 'Bob' } }),
	 *   prisma.user.create({ data: { name: 'Alice' } }),
	 * ])
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
	 */
	$transaction<P extends Prisma.PrismaPromise<any>[]>(
		arg: [...P],
		options?: {
			maxWait?: number
			timeout?: number
			isolationLevel?: Prisma.TransactionIsolationLevel
		}
	): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

	$transaction<R>(
		fn: (
			prisma: Omit<PrismaClient, runtime.ITXClientDenyList>
		) => $Utils.JsPromise<R>,
		options?: {
			maxWait?: number
			timeout?: number
			isolationLevel?: Prisma.TransactionIsolationLevel
		}
	): $Utils.JsPromise<R>

	$extends: $Extensions.ExtendsHook<
		'extends',
		Prisma.TypeMapCb<ClientOptions>,
		ExtArgs,
		$Utils.Call<
			Prisma.TypeMapCb<ClientOptions>,
			{
				extArgs: ExtArgs
			}
		>
	>

	/**
	 * `prisma.article`: Exposes CRUD operations for the **Article** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Articles
	 * const articles = await prisma.article.findMany()
	 * ```
	 */
	get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.user`: Exposes CRUD operations for the **User** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Users
	 * const users = await prisma.user.findMany()
	 * ```
	 */
	get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Comments
	 * const comments = await prisma.comment.findMany()
	 * ```
	 */
	get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>
}

export namespace Prisma {
	export import DMMF = runtime.DMMF

	export type PrismaPromise<T> = $Public.PrismaPromise<T>

	/**
	 * Validator
	 */
	export import validator = runtime.Public.validator

	/**
	 * Prisma Errors
	 */
	export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
	export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
	export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
	export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
	export import PrismaClientValidationError = runtime.PrismaClientValidationError

	/**
	 * Re-export of sql-template-tag
	 */
	export import sql = runtime.sqltag
	export import empty = runtime.empty
	export import join = runtime.join
	export import raw = runtime.raw
	export import Sql = runtime.Sql

	/**
	 * Decimal.js
	 */
	export import Decimal = runtime.Decimal

	export type DecimalJsLike = runtime.DecimalJsLike

	/**
	 * Extensions
	 */
	export import Extension = $Extensions.UserArgs
	export import getExtensionContext = runtime.Extensions.getExtensionContext
	export import Args = $Public.Args
	export import Payload = $Public.Payload
	export import Result = $Public.Result
	export import Exact = $Public.Exact

	/**
	 * Prisma Client JS version: 7.8.0
	 * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
	 */
	export type PrismaVersion = {
		client: string
		engine: string
	}

	export const prismaVersion: PrismaVersion

	/**
	 * Utility Types
	 */

	export import Bytes = runtime.Bytes
	export import JsonObject = runtime.JsonObject
	export import JsonArray = runtime.JsonArray
	export import JsonValue = runtime.JsonValue
	export import InputJsonObject = runtime.InputJsonObject
	export import InputJsonArray = runtime.InputJsonArray
	export import InputJsonValue = runtime.InputJsonValue

	/**
	 * Types of the values used to represent different kinds of `null` values when working with JSON fields.
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	namespace NullTypes {
		/**
		 * Type of `Prisma.DbNull`.
		 *
		 * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
		 *
		 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
		 */
		class DbNull {
			private DbNull: never
			private constructor()
		}

		/**
		 * Type of `Prisma.JsonNull`.
		 *
		 * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
		 *
		 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
		 */
		class JsonNull {
			private JsonNull: never
			private constructor()
		}

		/**
		 * Type of `Prisma.AnyNull`.
		 *
		 * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
		 *
		 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
		 */
		class AnyNull {
			private AnyNull: never
			private constructor()
		}
	}

	/**
	 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const DbNull: NullTypes.DbNull

	/**
	 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const JsonNull: NullTypes.JsonNull

	/**
	 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const AnyNull: NullTypes.AnyNull

	type SelectAndInclude = {
		select: any
		include: any
	}

	type SelectAndOmit = {
		select: any
		omit: any
	}

	/**
	 * Get the type of the value, that the Promise holds.
	 */
	export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
		infer U
	>
		? U
		: T

	/**
	 * Get the return type of a function which returns a Promise.
	 */
	export type PromiseReturnType<
		T extends (...args: any) => $Utils.JsPromise<any>
	> = PromiseType<ReturnType<T>>

	/**
	 * From T, pick a set of properties whose keys are in the union K
	 */
	type Prisma__Pick<T, K extends keyof T> = {
		[P in K]: T[P]
	}

	export type Enumerable<T> = T | Array<T>

	export type RequiredKeys<T> = {
		[K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
	}[keyof T]

	export type TruthyKeys<T> = keyof {
		[K in keyof T as T[K] extends false | undefined | null ? never : K]: K
	}

	export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

	/**
	 * Subset
	 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
	 */
	export type Subset<T, U> = {
		[key in keyof T]: key extends keyof U ? T[key] : never
	}

	/**
	 * SelectSubset
	 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
	 * Additionally, it validates, if both select and include are present. If the case, it errors.
	 */
	export type SelectSubset<T, U> = {
		[key in keyof T]: key extends keyof U ? T[key] : never
	} & (T extends SelectAndInclude
		? 'Please either choose `select` or `include`.'
		: T extends SelectAndOmit
			? 'Please either choose `select` or `omit`.'
			: {})

	/**
	 * Subset + Intersection
	 * @desc From `T` pick properties that exist in `U` and intersect `K`
	 */
	export type SubsetIntersection<T, U, K> = {
		[key in keyof T]: key extends keyof U ? T[key] : never
	} & K

	type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

	/**
	 * XOR is needed to have a real mutually exclusive union type
	 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
	 */
	type XOR<T, U> = T extends object
		? U extends object
			? (Without<T, U> & U) | (Without<U, T> & T)
			: U
		: T

	/**
	 * Is T a Record?
	 */
	type IsObject<T> = T extends Array<any>
		? False
		: T extends Date
			? False
			: T extends Uint8Array
				? False
				: T extends bigint
					? False
					: T extends object
						? True
						: False

	/**
	 * If it's T[], return T
	 */
	export type UnEnumerate<T> = T extends Array<infer U> ? U : T

	/**
	 * From ts-toolbelt
	 */

	type __Either<O extends object, K extends Key> = Omit<O, K> &
		{
			// Merge all but K
			[P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
		}[K]

	type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

	type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

	type _Either<O extends object, K extends Key, strict extends Boolean> = {
		1: EitherStrict<O, K>
		0: EitherLoose<O, K>
	}[strict]

	type Either<
		O extends object,
		K extends Key,
		strict extends Boolean = 1
	> = O extends unknown ? _Either<O, K, strict> : never

	export type Union = any

	type PatchUndefined<O extends object, O1 extends object> = {
		[K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
	} & {}

	/** Helper Types for "Merge" **/
	export type IntersectOf<U extends Union> = (
		U extends unknown
			? (k: U) => void
			: never
	) extends (k: infer I) => void
		? I
		: never

	export type Overwrite<O extends object, O1 extends object> = {
		[K in keyof O]: K extends keyof O1 ? O1[K] : O[K]
	} & {}

	type _Merge<U extends object> = IntersectOf<
		Overwrite<
			U,
			{
				[K in keyof U]-?: At<U, K>
			}
		>
	>

	type Key = string | number | symbol
	type AtBasic<O extends object, K extends Key> = K extends keyof O
		? O[K]
		: never
	type AtStrict<O extends object, K extends Key> = O[K & keyof O]
	type AtLoose<O extends object, K extends Key> = O extends unknown
		? AtStrict<O, K>
		: never
	export type At<
		O extends object,
		K extends Key,
		strict extends Boolean = 1
	> = {
		1: AtStrict<O, K>
		0: AtLoose<O, K>
	}[strict]

	export type ComputeRaw<A> = A extends Function
		? A
		: {
				[K in keyof A]: A[K]
			} & {}

	export type OptionalFlat<O> = {
		[K in keyof O]?: O[K]
	} & {}

	type _Record<K extends keyof any, T> = {
		[P in K]: T
	}

	// cause typescript not to expand types and preserve names
	type NoExpand<T> = T extends unknown ? T : never

	// this type assumes the passed object is entirely optional
	type AtLeast<O extends object, K extends string> = NoExpand<
		O extends unknown
			?
					| (K extends keyof O ? { [P in K]: O[P] } & O : O)
					| ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
			: never
	>

	type _Strict<U, _U = U> = U extends unknown
		? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
		: never

	export type Strict<U extends object> = ComputeRaw<_Strict<U>>
	/** End Helper Types for "Merge" **/

	export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>

	/**
  A [[Boolean]]
  */
	export type Boolean = True | False

	// /**
	// 1
	// */
	export type True = 1

	/**
  0
  */
	export type False = 0

	export type Not<B extends Boolean> = {
		0: 1
		1: 0
	}[B]

	export type Extends<A1, A2> = [A1] extends [never]
		? 0 // anything `never` is false
		: A1 extends A2
			? 1
			: 0

	export type Has<U extends Union, U1 extends Union> = Not<
		Extends<Exclude<U1, U>, U1>
	>

	export type Or<B1 extends Boolean, B2 extends Boolean> = {
		0: {
			0: 0
			1: 1
		}
		1: {
			0: 1
			1: 1
		}
	}[B1][B2]

	export type Keys<U extends Union> = U extends unknown ? keyof U : never

	type Cast<A, B> = A extends B ? A : B

	export const type: unique symbol

	/**
	 * Used by group by
	 */

	export type GetScalarType<T, O> = O extends object
		? {
				[P in keyof T]: P extends keyof O ? O[P] : never
			}
		: never

	type FieldPaths<
		T,
		U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
	> = IsObject<T> extends True ? U : T

	type GetHavingFields<T> = {
		[K in keyof T]: Or<
			Or<Extends<'OR', K>, Extends<'AND', K>>,
			Extends<'NOT', K>
		> extends True
			? // infer is only needed to not hit TS limit
				// based on the brilliant idea of Pierre-Antoine Mills
				// https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
				T[K] extends infer TK
				? GetHavingFields<
						UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
					>
				: never
			: {} extends FieldPaths<T[K]>
				? never
				: K
	}[keyof T]

	/**
	 * Convert tuple to union
	 */
	type _TupleToUnion<T> = T extends (infer E)[] ? E : never
	type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
	type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

	/**
	 * Like `Pick`, but additionally can also accept an array of keys
	 */
	type PickEnumerable<
		T,
		K extends Enumerable<keyof T> | keyof T
	> = Prisma__Pick<T, MaybeTupleToUnion<K>>

	/**
	 * Exclude all keys with underscores
	 */
	type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
		? never
		: T

	export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

	type FieldRefInputType<Model, FieldType> = Model extends never
		? never
		: FieldRef<Model, FieldType>

	export const ModelName: {
		Article: 'Article'
		User: 'User'
		Comment: 'Comment'
	}

	export type ModelName = (typeof ModelName)[keyof typeof ModelName]

	interface TypeMapCb<ClientOptions = {}>
		extends $Utils.Fn<
			{ extArgs: $Extensions.InternalArgs },
			$Utils.Record<string, any>
		> {
		returns: Prisma.TypeMap<
			this['params']['extArgs'],
			ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
		>
	}

	export type TypeMap<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {}
	> = {
		globalOmitOptions: {
			omit: GlobalOmitOptions
		}
		meta: {
			modelProps: 'article' | 'user' | 'comment'
			txIsolationLevel: Prisma.TransactionIsolationLevel
		}
		model: {
			Article: {
				payload: Prisma.$ArticlePayload<ExtArgs>
				fields: Prisma.ArticleFieldRefs
				operations: {
					findUnique: {
						args: Prisma.ArticleFindUniqueArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
					}
					findFirst: {
						args: Prisma.ArticleFindFirstArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
					}
					findMany: {
						args: Prisma.ArticleFindManyArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
					}
					create: {
						args: Prisma.ArticleCreateArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
					}
					createMany: {
						args: Prisma.ArticleCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
					}
					delete: {
						args: Prisma.ArticleDeleteArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
					}
					update: {
						args: Prisma.ArticleUpdateArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
					}
					deleteMany: {
						args: Prisma.ArticleDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.ArticleUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.ArticleUpdateManyAndReturnArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
					}
					upsert: {
						args: Prisma.ArticleUpsertArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
					}
					aggregate: {
						args: Prisma.ArticleAggregateArgs<ExtArgs>
						result: $Utils.Optional<AggregateArticle>
					}
					groupBy: {
						args: Prisma.ArticleGroupByArgs<ExtArgs>
						result: $Utils.Optional<ArticleGroupByOutputType>[]
					}
					count: {
						args: Prisma.ArticleCountArgs<ExtArgs>
						result: $Utils.Optional<ArticleCountAggregateOutputType> | number
					}
				}
			}
			User: {
				payload: Prisma.$UserPayload<ExtArgs>
				fields: Prisma.UserFieldRefs
				operations: {
					findUnique: {
						args: Prisma.UserFindUniqueArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload>
					}
					findFirst: {
						args: Prisma.UserFindFirstArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload>
					}
					findMany: {
						args: Prisma.UserFindManyArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
					}
					create: {
						args: Prisma.UserCreateArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload>
					}
					createMany: {
						args: Prisma.UserCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
					}
					delete: {
						args: Prisma.UserDeleteArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload>
					}
					update: {
						args: Prisma.UserUpdateArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload>
					}
					deleteMany: {
						args: Prisma.UserDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.UserUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
					}
					upsert: {
						args: Prisma.UserUpsertArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$UserPayload>
					}
					aggregate: {
						args: Prisma.UserAggregateArgs<ExtArgs>
						result: $Utils.Optional<AggregateUser>
					}
					groupBy: {
						args: Prisma.UserGroupByArgs<ExtArgs>
						result: $Utils.Optional<UserGroupByOutputType>[]
					}
					count: {
						args: Prisma.UserCountArgs<ExtArgs>
						result: $Utils.Optional<UserCountAggregateOutputType> | number
					}
				}
			}
			Comment: {
				payload: Prisma.$CommentPayload<ExtArgs>
				fields: Prisma.CommentFieldRefs
				operations: {
					findUnique: {
						args: Prisma.CommentFindUniqueArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload>
					}
					findFirst: {
						args: Prisma.CommentFindFirstArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload>
					}
					findMany: {
						args: Prisma.CommentFindManyArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
					}
					create: {
						args: Prisma.CommentCreateArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload>
					}
					createMany: {
						args: Prisma.CommentCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
					}
					delete: {
						args: Prisma.CommentDeleteArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload>
					}
					update: {
						args: Prisma.CommentUpdateArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload>
					}
					deleteMany: {
						args: Prisma.CommentDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.CommentUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
					}
					upsert: {
						args: Prisma.CommentUpsertArgs<ExtArgs>
						result: $Utils.PayloadToResult<Prisma.$CommentPayload>
					}
					aggregate: {
						args: Prisma.CommentAggregateArgs<ExtArgs>
						result: $Utils.Optional<AggregateComment>
					}
					groupBy: {
						args: Prisma.CommentGroupByArgs<ExtArgs>
						result: $Utils.Optional<CommentGroupByOutputType>[]
					}
					count: {
						args: Prisma.CommentCountArgs<ExtArgs>
						result: $Utils.Optional<CommentCountAggregateOutputType> | number
					}
				}
			}
		}
	} & {
		other: {
			payload: any
			operations: {
				$executeRaw: {
					args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]]
					result: any
				}
				$executeRawUnsafe: {
					args: [query: string, ...values: any[]]
					result: any
				}
				$queryRaw: {
					args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]]
					result: any
				}
				$queryRawUnsafe: {
					args: [query: string, ...values: any[]]
					result: any
				}
			}
		}
	}
	export const defineExtension: $Extensions.ExtendsHook<
		'define',
		Prisma.TypeMapCb,
		$Extensions.DefaultArgs
	>
	export type DefaultPrismaClient = PrismaClient
	export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
	export interface PrismaClientOptions {
		/**
		 * @default "colorless"
		 */
		errorFormat?: ErrorFormat
		/**
		 * @example
		 * ```
		 * // Shorthand for `emit: 'stdout'`
		 * log: ['query', 'info', 'warn', 'error']
		 *
		 * // Emit as events only
		 * log: [
		 *   { emit: 'event', level: 'query' },
		 *   { emit: 'event', level: 'info' },
		 *   { emit: 'event', level: 'warn' }
		 *   { emit: 'event', level: 'error' }
		 * ]
		 *
		 * / Emit as events and log to stdout
		 * og: [
		 *  { emit: 'stdout', level: 'query' },
		 *  { emit: 'stdout', level: 'info' },
		 *  { emit: 'stdout', level: 'warn' }
		 *  { emit: 'stdout', level: 'error' }
		 *
		 * ```
		 * Read more in our [docs](https://pris.ly/d/logging).
		 */
		log?: (LogLevel | LogDefinition)[]
		/**
		 * The default values for transactionOptions
		 * maxWait ?= 2000
		 * timeout ?= 5000
		 */
		transactionOptions?: {
			maxWait?: number
			timeout?: number
			isolationLevel?: Prisma.TransactionIsolationLevel
		}
		/**
		 * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
		 */
		adapter?: runtime.SqlDriverAdapterFactory
		/**
		 * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
		 */
		accelerateUrl?: string
		/**
		 * Global configuration for omitting model fields by default.
		 *
		 * @example
		 * ```
		 * const prisma = new PrismaClient({
		 *   omit: {
		 *     user: {
		 *       password: true
		 *     }
		 *   }
		 * })
		 * ```
		 */
		omit?: Prisma.GlobalOmitConfig
		/**
		 * SQL commenter plugins that add metadata to SQL queries as comments.
		 * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
		 *
		 * @example
		 * ```
		 * const prisma = new PrismaClient({
		 *   adapter,
		 *   comments: [
		 *     traceContext(),
		 *     queryInsights(),
		 *   ],
		 * })
		 * ```
		 */
		comments?: runtime.SqlCommenterPlugin[]
	}
	export type GlobalOmitConfig = {
		article?: ArticleOmit
		user?: UserOmit
		comment?: CommentOmit
	}

	/* Types for Logging */
	export type LogLevel = 'info' | 'query' | 'warn' | 'error'
	export type LogDefinition = {
		level: LogLevel
		emit: 'stdout' | 'event'
	}

	export type CheckIsLogLevel<T> = T extends LogLevel ? T : never

	export type GetLogType<T> = CheckIsLogLevel<
		T extends LogDefinition ? T['level'] : T
	>

	export type GetEvents<T extends any[]> = T extends Array<
		LogLevel | LogDefinition
	>
		? GetLogType<T[number]>
		: never

	export type QueryEvent = {
		timestamp: Date
		query: string
		params: string
		duration: number
		target: string
	}

	export type LogEvent = {
		timestamp: Date
		message: string
		target: string
	}
	/* End Types for Logging */

	export type PrismaAction =
		| 'findUnique'
		| 'findUniqueOrThrow'
		| 'findMany'
		| 'findFirst'
		| 'findFirstOrThrow'
		| 'create'
		| 'createMany'
		| 'createManyAndReturn'
		| 'update'
		| 'updateMany'
		| 'updateManyAndReturn'
		| 'upsert'
		| 'delete'
		| 'deleteMany'
		| 'executeRaw'
		| 'queryRaw'
		| 'aggregate'
		| 'count'
		| 'runCommandRaw'
		| 'findRaw'
		| 'groupBy'

	// tested in getLogLevel.test.ts
	export function getLogLevel(
		log: Array<LogLevel | LogDefinition>
	): LogLevel | undefined

	/**
	 * `PrismaClient` proxy available in interactive transactions.
	 */
	export type TransactionClient = Omit<
		Prisma.DefaultPrismaClient,
		runtime.ITXClientDenyList
	>

	export type Datasource = {
		url?: string
	}

	/**
	 * Count Types
	 */

	/**
	 * Count Type ArticleCountOutputType
	 */

	export type ArticleCountOutputType = {
		comments: number
	}

	export type ArticleCountOutputTypeSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		comments?: boolean | ArticleCountOutputTypeCountCommentsArgs
	}

	// Custom InputTypes
	/**
	 * ArticleCountOutputType without action
	 */
	export type ArticleCountOutputTypeDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the ArticleCountOutputType
		 */
		select?: ArticleCountOutputTypeSelect<ExtArgs> | null
	}

	/**
	 * ArticleCountOutputType without action
	 */
	export type ArticleCountOutputTypeCountCommentsArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		where?: CommentWhereInput
	}

	/**
	 * Count Type UserCountOutputType
	 */

	export type UserCountOutputType = {
		articles: number
		comments: number
	}

	export type UserCountOutputTypeSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		articles?: boolean | UserCountOutputTypeCountArticlesArgs
		comments?: boolean | UserCountOutputTypeCountCommentsArgs
	}

	// Custom InputTypes
	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the UserCountOutputType
		 */
		select?: UserCountOutputTypeSelect<ExtArgs> | null
	}

	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeCountArticlesArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		where?: ArticleWhereInput
	}

	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeCountCommentsArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		where?: CommentWhereInput
	}

	/**
	 * Models
	 */

	/**
	 * Model Article
	 */

	export type AggregateArticle = {
		_count: ArticleCountAggregateOutputType | null
		_min: ArticleMinAggregateOutputType | null
		_max: ArticleMaxAggregateOutputType | null
	}

	export type ArticleMinAggregateOutputType = {
		id: string | null
		title: string | null
		subtitle: string | null
		description: string | null
		content: string | null
		createdAt: Date | null
		authorId: string | null
		image: string | null
	}

	export type ArticleMaxAggregateOutputType = {
		id: string | null
		title: string | null
		subtitle: string | null
		description: string | null
		content: string | null
		createdAt: Date | null
		authorId: string | null
		image: string | null
	}

	export type ArticleCountAggregateOutputType = {
		id: number
		title: number
		subtitle: number
		description: number
		content: number
		createdAt: number
		authorId: number
		image: number
		_all: number
	}

	export type ArticleMinAggregateInputType = {
		id?: true
		title?: true
		subtitle?: true
		description?: true
		content?: true
		createdAt?: true
		authorId?: true
		image?: true
	}

	export type ArticleMaxAggregateInputType = {
		id?: true
		title?: true
		subtitle?: true
		description?: true
		content?: true
		createdAt?: true
		authorId?: true
		image?: true
	}

	export type ArticleCountAggregateInputType = {
		id?: true
		title?: true
		subtitle?: true
		description?: true
		content?: true
		createdAt?: true
		authorId?: true
		image?: true
		_all?: true
	}

	export type ArticleAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Filter which Article to aggregate.
		 */
		where?: ArticleWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Articles to fetch.
		 */
		orderBy?:
			| ArticleOrderByWithRelationInput
			| ArticleOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: ArticleWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Articles from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Articles.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Articles
		 **/
		_count?: true | ArticleCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: ArticleMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: ArticleMaxAggregateInputType
	}

	export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
		[P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateArticle[P]>
			: GetScalarType<T[P], AggregateArticle[P]>
	}

	export type ArticleGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		where?: ArticleWhereInput
		orderBy?:
			| ArticleOrderByWithAggregationInput
			| ArticleOrderByWithAggregationInput[]
		by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
		having?: ArticleScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: ArticleCountAggregateInputType | true
		_min?: ArticleMinAggregateInputType
		_max?: ArticleMaxAggregateInputType
	}

	export type ArticleGroupByOutputType = {
		id: string
		title: string
		subtitle: string
		description: string
		content: string
		createdAt: Date
		authorId: string
		image: string
		_count: ArticleCountAggregateOutputType | null
		_min: ArticleMinAggregateOutputType | null
		_max: ArticleMaxAggregateOutputType | null
	}

	type GetArticleGroupByPayload<T extends ArticleGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<ArticleGroupByOutputType, T['by']> & {
					[P in keyof T & keyof ArticleGroupByOutputType]: P extends '_count'
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], ArticleGroupByOutputType[P]>
						: GetScalarType<T[P], ArticleGroupByOutputType[P]>
				}
			>
		>

	export type ArticleSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetSelect<
		{
			id?: boolean
			title?: boolean
			subtitle?: boolean
			description?: boolean
			content?: boolean
			createdAt?: boolean
			authorId?: boolean
			image?: boolean
			comments?: boolean | Article$commentsArgs<ExtArgs>
			author?: boolean | UserDefaultArgs<ExtArgs>
			_count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['article']
	>

	export type ArticleSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetSelect<
		{
			id?: boolean
			title?: boolean
			subtitle?: boolean
			description?: boolean
			content?: boolean
			createdAt?: boolean
			authorId?: boolean
			image?: boolean
			author?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['article']
	>

	export type ArticleSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetSelect<
		{
			id?: boolean
			title?: boolean
			subtitle?: boolean
			description?: boolean
			content?: boolean
			createdAt?: boolean
			authorId?: boolean
			image?: boolean
			author?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['article']
	>

	export type ArticleSelectScalar = {
		id?: boolean
		title?: boolean
		subtitle?: boolean
		description?: boolean
		content?: boolean
		createdAt?: boolean
		authorId?: boolean
		image?: boolean
	}

	export type ArticleOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetOmit<
		| 'id'
		| 'title'
		| 'subtitle'
		| 'description'
		| 'content'
		| 'createdAt'
		| 'authorId'
		| 'image',
		ExtArgs['result']['article']
	>
	export type ArticleInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		comments?: boolean | Article$commentsArgs<ExtArgs>
		author?: boolean | UserDefaultArgs<ExtArgs>
		_count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
	}
	export type ArticleIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		author?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type ArticleIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		author?: boolean | UserDefaultArgs<ExtArgs>
	}

	export type $ArticlePayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		name: 'Article'
		objects: {
			comments: Prisma.$CommentPayload<ExtArgs>[]
			author: Prisma.$UserPayload<ExtArgs>
		}
		scalars: $Extensions.GetPayloadResult<
			{
				id: string
				title: string
				subtitle: string
				description: string
				content: string
				createdAt: Date
				authorId: string
				image: string
			},
			ExtArgs['result']['article']
		>
		composites: {}
	}

	type ArticleGetPayload<
		S extends boolean | null | undefined | ArticleDefaultArgs
	> = $Result.GetResult<Prisma.$ArticlePayload, S>

	type ArticleCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
		select?: ArticleCountAggregateInputType | true
	}

	export interface ArticleDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {}
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['Article']
			meta: { name: 'Article' }
		}
		/**
		 * Find zero or one Article that matches the filter.
		 * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
		 * @example
		 * // Get one Article
		 * const article = await prisma.article.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends ArticleFindUniqueArgs>(
			args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>
		): Prisma__ArticleClient<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one Article that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
		 * @example
		 * // Get one Article
		 * const article = await prisma.article.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(
			args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>
		): Prisma__ArticleClient<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Article that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ArticleFindFirstArgs} args - Arguments to find a Article
		 * @example
		 * // Get one Article
		 * const article = await prisma.article.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends ArticleFindFirstArgs>(
			args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>
		): Prisma__ArticleClient<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Article that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
		 * @example
		 * // Get one Article
		 * const article = await prisma.article.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(
			args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>
		): Prisma__ArticleClient<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Articles that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Articles
		 * const articles = await prisma.article.findMany()
		 *
		 * // Get first 10 Articles
		 * const articles = await prisma.article.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends ArticleFindManyArgs>(
			args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a Article.
		 * @param {ArticleCreateArgs} args - Arguments to create a Article.
		 * @example
		 * // Create one Article
		 * const Article = await prisma.article.create({
		 *   data: {
		 *     // ... data to create a Article
		 *   }
		 * })
		 *
		 */
		create<T extends ArticleCreateArgs>(
			args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>
		): Prisma__ArticleClient<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Articles.
		 * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
		 * @example
		 * // Create many Articles
		 * const article = await prisma.article.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends ArticleCreateManyArgs>(
			args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Articles and returns the data saved in the database.
		 * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
		 * @example
		 * // Create many Articles
		 * const article = await prisma.article.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Articles and only return the `id`
		 * const articleWithIdOnly = await prisma.article.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(
			args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a Article.
		 * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
		 * @example
		 * // Delete one Article
		 * const Article = await prisma.article.delete({
		 *   where: {
		 *     // ... filter to delete one Article
		 *   }
		 * })
		 *
		 */
		delete<T extends ArticleDeleteArgs>(
			args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>
		): Prisma__ArticleClient<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one Article.
		 * @param {ArticleUpdateArgs} args - Arguments to update one Article.
		 * @example
		 * // Update one Article
		 * const article = await prisma.article.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends ArticleUpdateArgs>(
			args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>
		): Prisma__ArticleClient<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Articles.
		 * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
		 * @example
		 * // Delete a few Articles
		 * const { count } = await prisma.article.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends ArticleDeleteManyArgs>(
			args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Articles.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Articles
		 * const article = await prisma.article.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends ArticleUpdateManyArgs>(
			args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Articles and returns the data updated in the database.
		 * @param {ArticleUpdateManyAndReturnArgs} args - Arguments to update many Articles.
		 * @example
		 * // Update many Articles
		 * const article = await prisma.article.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Articles and only return the `id`
		 * const articleWithIdOnly = await prisma.article.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends ArticleUpdateManyAndReturnArgs>(
			args: SelectSubset<T, ArticleUpdateManyAndReturnArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one Article.
		 * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
		 * @example
		 * // Update or create a Article
		 * const article = await prisma.article.upsert({
		 *   create: {
		 *     // ... data to create a Article
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Article we want to update
		 *   }
		 * })
		 */
		upsert<T extends ArticleUpsertArgs>(
			args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>
		): Prisma__ArticleClient<
			$Result.GetResult<
				Prisma.$ArticlePayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Articles.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
		 * @example
		 * // Count the number of Articles
		 * const count = await prisma.article.count({
		 *   where: {
		 *     // ... the filter for the Articles we want to count
		 *   }
		 * })
		 **/
		count<T extends ArticleCountArgs>(
			args?: Subset<T, ArticleCountArgs>
		): Prisma.PrismaPromise<
			T extends $Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], ArticleCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a Article.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends ArticleAggregateArgs>(
			args: Subset<T, ArticleAggregateArgs>
		): Prisma.PrismaPromise<GetArticleAggregateType<T>>

		/**
		 * Group by Article.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ArticleGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends ArticleGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: ArticleGroupByArgs['orderBy'] }
				: { orderBy?: ArticleGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
		>(
			args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors
		): {} extends InputErrors
			? GetArticleGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the Article model
		 */
		readonly fields: ArticleFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Article.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__ArticleClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {}
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		comments<T extends Article$commentsArgs<ExtArgs> = {}>(
			args?: Subset<T, Article$commentsArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			| $Result.GetResult<
					Prisma.$CommentPayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		author<T extends UserDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, UserDefaultArgs<ExtArgs>>
		): Prisma__UserClient<
			| $Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					'findUniqueOrThrow',
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null
		): $Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null
		): $Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
	}

	/**
	 * Fields of the Article model
	 */
	interface ArticleFieldRefs {
		readonly id: FieldRef<'Article', 'String'>
		readonly title: FieldRef<'Article', 'String'>
		readonly subtitle: FieldRef<'Article', 'String'>
		readonly description: FieldRef<'Article', 'String'>
		readonly content: FieldRef<'Article', 'String'>
		readonly createdAt: FieldRef<'Article', 'DateTime'>
		readonly authorId: FieldRef<'Article', 'String'>
		readonly image: FieldRef<'Article', 'String'>
	}

	// Custom InputTypes
	/**
	 * Article findUnique
	 */
	export type ArticleFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		/**
		 * Filter, which Article to fetch.
		 */
		where: ArticleWhereUniqueInput
	}

	/**
	 * Article findUniqueOrThrow
	 */
	export type ArticleFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		/**
		 * Filter, which Article to fetch.
		 */
		where: ArticleWhereUniqueInput
	}

	/**
	 * Article findFirst
	 */
	export type ArticleFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		/**
		 * Filter, which Article to fetch.
		 */
		where?: ArticleWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Articles to fetch.
		 */
		orderBy?:
			| ArticleOrderByWithRelationInput
			| ArticleOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Articles.
		 */
		cursor?: ArticleWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Articles from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Articles.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Articles.
		 */
		distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
	}

	/**
	 * Article findFirstOrThrow
	 */
	export type ArticleFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		/**
		 * Filter, which Article to fetch.
		 */
		where?: ArticleWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Articles to fetch.
		 */
		orderBy?:
			| ArticleOrderByWithRelationInput
			| ArticleOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Articles.
		 */
		cursor?: ArticleWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Articles from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Articles.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Articles.
		 */
		distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
	}

	/**
	 * Article findMany
	 */
	export type ArticleFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		/**
		 * Filter, which Articles to fetch.
		 */
		where?: ArticleWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Articles to fetch.
		 */
		orderBy?:
			| ArticleOrderByWithRelationInput
			| ArticleOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Articles.
		 */
		cursor?: ArticleWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Articles from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Articles.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Articles.
		 */
		distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
	}

	/**
	 * Article create
	 */
	export type ArticleCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		/**
		 * The data needed to create a Article.
		 */
		data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
	}

	/**
	 * Article createMany
	 */
	export type ArticleCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * The data used to create many Articles.
		 */
		data: ArticleCreateManyInput | ArticleCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Article createManyAndReturn
	 */
	export type ArticleCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * The data used to create many Articles.
		 */
		data: ArticleCreateManyInput | ArticleCreateManyInput[]
		skipDuplicates?: boolean
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleIncludeCreateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Article update
	 */
	export type ArticleUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		/**
		 * The data needed to update a Article.
		 */
		data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
		/**
		 * Choose, which Article to update.
		 */
		where: ArticleWhereUniqueInput
	}

	/**
	 * Article updateMany
	 */
	export type ArticleUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * The data used to update Articles.
		 */
		data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
		/**
		 * Filter which Articles to update
		 */
		where?: ArticleWhereInput
		/**
		 * Limit how many Articles to update.
		 */
		limit?: number
	}

	/**
	 * Article updateManyAndReturn
	 */
	export type ArticleUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * The data used to update Articles.
		 */
		data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
		/**
		 * Filter which Articles to update
		 */
		where?: ArticleWhereInput
		/**
		 * Limit how many Articles to update.
		 */
		limit?: number
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleIncludeUpdateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Article upsert
	 */
	export type ArticleUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		/**
		 * The filter to search for the Article to update in case it exists.
		 */
		where: ArticleWhereUniqueInput
		/**
		 * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
		 */
		create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
		/**
		 * In case the Article was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
	}

	/**
	 * Article delete
	 */
	export type ArticleDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		/**
		 * Filter which Article to delete.
		 */
		where: ArticleWhereUniqueInput
	}

	/**
	 * Article deleteMany
	 */
	export type ArticleDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Filter which Articles to delete
		 */
		where?: ArticleWhereInput
		/**
		 * Limit how many Articles to delete.
		 */
		limit?: number
	}

	/**
	 * Article.comments
	 */
	export type Article$commentsArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		where?: CommentWhereInput
		orderBy?:
			| CommentOrderByWithRelationInput
			| CommentOrderByWithRelationInput[]
		cursor?: CommentWhereUniqueInput
		take?: number
		skip?: number
		distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
	}

	/**
	 * Article without action
	 */
	export type ArticleDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
	}

	/**
	 * Model User
	 */

	export type AggregateUser = {
		_count: UserCountAggregateOutputType | null
		_min: UserMinAggregateOutputType | null
		_max: UserMaxAggregateOutputType | null
	}

	export type UserMinAggregateOutputType = {
		id: string | null
		name: string | null
		email: string | null
		password: string | null
		createdAt: Date | null
		role: $Enums.Role | null
	}

	export type UserMaxAggregateOutputType = {
		id: string | null
		name: string | null
		email: string | null
		password: string | null
		createdAt: Date | null
		role: $Enums.Role | null
	}

	export type UserCountAggregateOutputType = {
		id: number
		name: number
		email: number
		password: number
		createdAt: number
		role: number
		_all: number
	}

	export type UserMinAggregateInputType = {
		id?: true
		name?: true
		email?: true
		password?: true
		createdAt?: true
		role?: true
	}

	export type UserMaxAggregateInputType = {
		id?: true
		name?: true
		email?: true
		password?: true
		createdAt?: true
		role?: true
	}

	export type UserCountAggregateInputType = {
		id?: true
		name?: true
		email?: true
		password?: true
		createdAt?: true
		role?: true
		_all?: true
	}

	export type UserAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Filter which User to aggregate.
		 */
		where?: UserWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: UserWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Users
		 **/
		_count?: true | UserCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: UserMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: UserMaxAggregateInputType
	}

	export type GetUserAggregateType<T extends UserAggregateArgs> = {
		[P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateUser[P]>
			: GetScalarType<T[P], AggregateUser[P]>
	}

	export type UserGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		where?: UserWhereInput
		orderBy?:
			| UserOrderByWithAggregationInput
			| UserOrderByWithAggregationInput[]
		by: UserScalarFieldEnum[] | UserScalarFieldEnum
		having?: UserScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: UserCountAggregateInputType | true
		_min?: UserMinAggregateInputType
		_max?: UserMaxAggregateInputType
	}

	export type UserGroupByOutputType = {
		id: string
		name: string
		email: string
		password: string
		createdAt: Date
		role: $Enums.Role
		_count: UserCountAggregateOutputType | null
		_min: UserMinAggregateOutputType | null
		_max: UserMaxAggregateOutputType | null
	}

	type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
		Array<
			PickEnumerable<UserGroupByOutputType, T['by']> & {
				[P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
					? T[P] extends boolean
						? number
						: GetScalarType<T[P], UserGroupByOutputType[P]>
					: GetScalarType<T[P], UserGroupByOutputType[P]>
			}
		>
	>

	export type UserSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetSelect<
		{
			id?: boolean
			name?: boolean
			email?: boolean
			password?: boolean
			createdAt?: boolean
			role?: boolean
			articles?: boolean | User$articlesArgs<ExtArgs>
			comments?: boolean | User$commentsArgs<ExtArgs>
			_count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['user']
	>

	export type UserSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetSelect<
		{
			id?: boolean
			name?: boolean
			email?: boolean
			password?: boolean
			createdAt?: boolean
			role?: boolean
		},
		ExtArgs['result']['user']
	>

	export type UserSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetSelect<
		{
			id?: boolean
			name?: boolean
			email?: boolean
			password?: boolean
			createdAt?: boolean
			role?: boolean
		},
		ExtArgs['result']['user']
	>

	export type UserSelectScalar = {
		id?: boolean
		name?: boolean
		email?: boolean
		password?: boolean
		createdAt?: boolean
		role?: boolean
	}

	export type UserOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetOmit<
		'id' | 'name' | 'email' | 'password' | 'createdAt' | 'role',
		ExtArgs['result']['user']
	>
	export type UserInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		articles?: boolean | User$articlesArgs<ExtArgs>
		comments?: boolean | User$commentsArgs<ExtArgs>
		_count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
	}
	export type UserIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {}
	export type UserIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {}

	export type $UserPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		name: 'User'
		objects: {
			articles: Prisma.$ArticlePayload<ExtArgs>[]
			comments: Prisma.$CommentPayload<ExtArgs>[]
		}
		scalars: $Extensions.GetPayloadResult<
			{
				id: string
				name: string
				email: string
				password: string
				createdAt: Date
				role: $Enums.Role
			},
			ExtArgs['result']['user']
		>
		composites: {}
	}

	type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
		$Result.GetResult<Prisma.$UserPayload, S>

	type UserCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
		select?: UserCountAggregateInputType | true
	}

	export interface UserDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {}
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['User']
			meta: { name: 'User' }
		}
		/**
		 * Find zero or one User that matches the filter.
		 * @param {UserFindUniqueArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends UserFindUniqueArgs>(
			args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one User that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
			args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first User that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserFindFirstArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends UserFindFirstArgs>(
			args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first User that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
			args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Users that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Users
		 * const users = await prisma.user.findMany()
		 *
		 * // Get first 10 Users
		 * const users = await prisma.user.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends UserFindManyArgs>(
			args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a User.
		 * @param {UserCreateArgs} args - Arguments to create a User.
		 * @example
		 * // Create one User
		 * const User = await prisma.user.create({
		 *   data: {
		 *     // ... data to create a User
		 *   }
		 * })
		 *
		 */
		create<T extends UserCreateArgs>(
			args: SelectSubset<T, UserCreateArgs<ExtArgs>>
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Users.
		 * @param {UserCreateManyArgs} args - Arguments to create many Users.
		 * @example
		 * // Create many Users
		 * const user = await prisma.user.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends UserCreateManyArgs>(
			args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Users and returns the data saved in the database.
		 * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
		 * @example
		 * // Create many Users
		 * const user = await prisma.user.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Users and only return the `id`
		 * const userWithIdOnly = await prisma.user.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
			args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a User.
		 * @param {UserDeleteArgs} args - Arguments to delete one User.
		 * @example
		 * // Delete one User
		 * const User = await prisma.user.delete({
		 *   where: {
		 *     // ... filter to delete one User
		 *   }
		 * })
		 *
		 */
		delete<T extends UserDeleteArgs>(
			args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one User.
		 * @param {UserUpdateArgs} args - Arguments to update one User.
		 * @example
		 * // Update one User
		 * const user = await prisma.user.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends UserUpdateArgs>(
			args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Users.
		 * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
		 * @example
		 * // Delete a few Users
		 * const { count } = await prisma.user.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends UserDeleteManyArgs>(
			args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Users.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Users
		 * const user = await prisma.user.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends UserUpdateManyArgs>(
			args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Users and returns the data updated in the database.
		 * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
		 * @example
		 * // Update many Users
		 * const user = await prisma.user.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Users and only return the `id`
		 * const userWithIdOnly = await prisma.user.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
			args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one User.
		 * @param {UserUpsertArgs} args - Arguments to update or create a User.
		 * @example
		 * // Update or create a User
		 * const user = await prisma.user.upsert({
		 *   create: {
		 *     // ... data to create a User
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the User we want to update
		 *   }
		 * })
		 */
		upsert<T extends UserUpsertArgs>(
			args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
		): Prisma__UserClient<
			$Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Users.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserCountArgs} args - Arguments to filter Users to count.
		 * @example
		 * // Count the number of Users
		 * const count = await prisma.user.count({
		 *   where: {
		 *     // ... the filter for the Users we want to count
		 *   }
		 * })
		 **/
		count<T extends UserCountArgs>(
			args?: Subset<T, UserCountArgs>
		): Prisma.PrismaPromise<
			T extends $Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], UserCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a User.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends UserAggregateArgs>(
			args: Subset<T, UserAggregateArgs>
		): Prisma.PrismaPromise<GetUserAggregateType<T>>

		/**
		 * Group by User.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends UserGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: UserGroupByArgs['orderBy'] }
				: { orderBy?: UserGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
		>(
			args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
		): {} extends InputErrors
			? GetUserGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the User model
		 */
		readonly fields: UserFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for User.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__UserClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {}
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		articles<T extends User$articlesArgs<ExtArgs> = {}>(
			args?: Subset<T, User$articlesArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			| $Result.GetResult<
					Prisma.$ArticlePayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		comments<T extends User$commentsArgs<ExtArgs> = {}>(
			args?: Subset<T, User$commentsArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			| $Result.GetResult<
					Prisma.$CommentPayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null
		): $Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null
		): $Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
	}

	/**
	 * Fields of the User model
	 */
	interface UserFieldRefs {
		readonly id: FieldRef<'User', 'String'>
		readonly name: FieldRef<'User', 'String'>
		readonly email: FieldRef<'User', 'String'>
		readonly password: FieldRef<'User', 'String'>
		readonly createdAt: FieldRef<'User', 'DateTime'>
		readonly role: FieldRef<'User', 'Role'>
	}

	// Custom InputTypes
	/**
	 * User findUnique
	 */
	export type UserFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which User to fetch.
		 */
		where: UserWhereUniqueInput
	}

	/**
	 * User findUniqueOrThrow
	 */
	export type UserFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which User to fetch.
		 */
		where: UserWhereUniqueInput
	}

	/**
	 * User findFirst
	 */
	export type UserFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which User to fetch.
		 */
		where?: UserWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Users.
		 */
		cursor?: UserWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Users.
		 */
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
	}

	/**
	 * User findFirstOrThrow
	 */
	export type UserFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which User to fetch.
		 */
		where?: UserWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Users.
		 */
		cursor?: UserWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Users.
		 */
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
	}

	/**
	 * User findMany
	 */
	export type UserFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which Users to fetch.
		 */
		where?: UserWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Users.
		 */
		cursor?: UserWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Users.
		 */
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
	}

	/**
	 * User create
	 */
	export type UserCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * The data needed to create a User.
		 */
		data: XOR<UserCreateInput, UserUncheckedCreateInput>
	}

	/**
	 * User createMany
	 */
	export type UserCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * The data used to create many Users.
		 */
		data: UserCreateManyInput | UserCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * User createManyAndReturn
	 */
	export type UserCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * The data used to create many Users.
		 */
		data: UserCreateManyInput | UserCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * User update
	 */
	export type UserUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * The data needed to update a User.
		 */
		data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
		/**
		 * Choose, which User to update.
		 */
		where: UserWhereUniqueInput
	}

	/**
	 * User updateMany
	 */
	export type UserUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * The data used to update Users.
		 */
		data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
		/**
		 * Filter which Users to update
		 */
		where?: UserWhereInput
		/**
		 * Limit how many Users to update.
		 */
		limit?: number
	}

	/**
	 * User updateManyAndReturn
	 */
	export type UserUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * The data used to update Users.
		 */
		data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
		/**
		 * Filter which Users to update
		 */
		where?: UserWhereInput
		/**
		 * Limit how many Users to update.
		 */
		limit?: number
	}

	/**
	 * User upsert
	 */
	export type UserUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * The filter to search for the User to update in case it exists.
		 */
		where: UserWhereUniqueInput
		/**
		 * In case the User found by the `where` argument doesn't exist, create a new User with this data.
		 */
		create: XOR<UserCreateInput, UserUncheckedCreateInput>
		/**
		 * In case the User was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
	}

	/**
	 * User delete
	 */
	export type UserDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter which User to delete.
		 */
		where: UserWhereUniqueInput
	}

	/**
	 * User deleteMany
	 */
	export type UserDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Filter which Users to delete
		 */
		where?: UserWhereInput
		/**
		 * Limit how many Users to delete.
		 */
		limit?: number
	}

	/**
	 * User.articles
	 */
	export type User$articlesArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Article
		 */
		select?: ArticleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Article
		 */
		omit?: ArticleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ArticleInclude<ExtArgs> | null
		where?: ArticleWhereInput
		orderBy?:
			| ArticleOrderByWithRelationInput
			| ArticleOrderByWithRelationInput[]
		cursor?: ArticleWhereUniqueInput
		take?: number
		skip?: number
		distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
	}

	/**
	 * User.comments
	 */
	export type User$commentsArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		where?: CommentWhereInput
		orderBy?:
			| CommentOrderByWithRelationInput
			| CommentOrderByWithRelationInput[]
		cursor?: CommentWhereUniqueInput
		take?: number
		skip?: number
		distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
	}

	/**
	 * User without action
	 */
	export type UserDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
	}

	/**
	 * Model Comment
	 */

	export type AggregateComment = {
		_count: CommentCountAggregateOutputType | null
		_min: CommentMinAggregateOutputType | null
		_max: CommentMaxAggregateOutputType | null
	}

	export type CommentMinAggregateOutputType = {
		id: string | null
		createdAt: Date | null
		content: string | null
		articleId: string | null
		authorId: string | null
	}

	export type CommentMaxAggregateOutputType = {
		id: string | null
		createdAt: Date | null
		content: string | null
		articleId: string | null
		authorId: string | null
	}

	export type CommentCountAggregateOutputType = {
		id: number
		createdAt: number
		content: number
		articleId: number
		authorId: number
		_all: number
	}

	export type CommentMinAggregateInputType = {
		id?: true
		createdAt?: true
		content?: true
		articleId?: true
		authorId?: true
	}

	export type CommentMaxAggregateInputType = {
		id?: true
		createdAt?: true
		content?: true
		articleId?: true
		authorId?: true
	}

	export type CommentCountAggregateInputType = {
		id?: true
		createdAt?: true
		content?: true
		articleId?: true
		authorId?: true
		_all?: true
	}

	export type CommentAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Filter which Comment to aggregate.
		 */
		where?: CommentWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Comments to fetch.
		 */
		orderBy?:
			| CommentOrderByWithRelationInput
			| CommentOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: CommentWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Comments from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Comments.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Comments
		 **/
		_count?: true | CommentCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: CommentMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: CommentMaxAggregateInputType
	}

	export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
		[P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateComment[P]>
			: GetScalarType<T[P], AggregateComment[P]>
	}

	export type CommentGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		where?: CommentWhereInput
		orderBy?:
			| CommentOrderByWithAggregationInput
			| CommentOrderByWithAggregationInput[]
		by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
		having?: CommentScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: CommentCountAggregateInputType | true
		_min?: CommentMinAggregateInputType
		_max?: CommentMaxAggregateInputType
	}

	export type CommentGroupByOutputType = {
		id: string
		createdAt: Date
		content: string
		articleId: string
		authorId: string
		_count: CommentCountAggregateOutputType | null
		_min: CommentMinAggregateOutputType | null
		_max: CommentMaxAggregateOutputType | null
	}

	type GetCommentGroupByPayload<T extends CommentGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<CommentGroupByOutputType, T['by']> & {
					[P in keyof T & keyof CommentGroupByOutputType]: P extends '_count'
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], CommentGroupByOutputType[P]>
						: GetScalarType<T[P], CommentGroupByOutputType[P]>
				}
			>
		>

	export type CommentSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetSelect<
		{
			id?: boolean
			createdAt?: boolean
			content?: boolean
			articleId?: boolean
			authorId?: boolean
			article?: boolean | ArticleDefaultArgs<ExtArgs>
			author?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['comment']
	>

	export type CommentSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetSelect<
		{
			id?: boolean
			createdAt?: boolean
			content?: boolean
			articleId?: boolean
			authorId?: boolean
			article?: boolean | ArticleDefaultArgs<ExtArgs>
			author?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['comment']
	>

	export type CommentSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetSelect<
		{
			id?: boolean
			createdAt?: boolean
			content?: boolean
			articleId?: boolean
			authorId?: boolean
			article?: boolean | ArticleDefaultArgs<ExtArgs>
			author?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['comment']
	>

	export type CommentSelectScalar = {
		id?: boolean
		createdAt?: boolean
		content?: boolean
		articleId?: boolean
		authorId?: boolean
	}

	export type CommentOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = $Extensions.GetOmit<
		'id' | 'createdAt' | 'content' | 'articleId' | 'authorId',
		ExtArgs['result']['comment']
	>
	export type CommentInclude<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		article?: boolean | ArticleDefaultArgs<ExtArgs>
		author?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type CommentIncludeCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		article?: boolean | ArticleDefaultArgs<ExtArgs>
		author?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type CommentIncludeUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		article?: boolean | ArticleDefaultArgs<ExtArgs>
		author?: boolean | UserDefaultArgs<ExtArgs>
	}

	export type $CommentPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		name: 'Comment'
		objects: {
			article: Prisma.$ArticlePayload<ExtArgs>
			author: Prisma.$UserPayload<ExtArgs>
		}
		scalars: $Extensions.GetPayloadResult<
			{
				id: string
				createdAt: Date
				content: string
				articleId: string
				authorId: string
			},
			ExtArgs['result']['comment']
		>
		composites: {}
	}

	type CommentGetPayload<
		S extends boolean | null | undefined | CommentDefaultArgs
	> = $Result.GetResult<Prisma.$CommentPayload, S>

	type CommentCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
		select?: CommentCountAggregateInputType | true
	}

	export interface CommentDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {}
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['Comment']
			meta: { name: 'Comment' }
		}
		/**
		 * Find zero or one Comment that matches the filter.
		 * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
		 * @example
		 * // Get one Comment
		 * const comment = await prisma.comment.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends CommentFindUniqueArgs>(
			args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>
		): Prisma__CommentClient<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
		 * @example
		 * // Get one Comment
		 * const comment = await prisma.comment.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(
			args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>
		): Prisma__CommentClient<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Comment that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CommentFindFirstArgs} args - Arguments to find a Comment
		 * @example
		 * // Get one Comment
		 * const comment = await prisma.comment.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends CommentFindFirstArgs>(
			args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>
		): Prisma__CommentClient<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Comment that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
		 * @example
		 * // Get one Comment
		 * const comment = await prisma.comment.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(
			args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>
		): Prisma__CommentClient<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Comments that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Comments
		 * const comments = await prisma.comment.findMany()
		 *
		 * // Get first 10 Comments
		 * const comments = await prisma.comment.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends CommentFindManyArgs>(
			args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a Comment.
		 * @param {CommentCreateArgs} args - Arguments to create a Comment.
		 * @example
		 * // Create one Comment
		 * const Comment = await prisma.comment.create({
		 *   data: {
		 *     // ... data to create a Comment
		 *   }
		 * })
		 *
		 */
		create<T extends CommentCreateArgs>(
			args: SelectSubset<T, CommentCreateArgs<ExtArgs>>
		): Prisma__CommentClient<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Comments.
		 * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
		 * @example
		 * // Create many Comments
		 * const comment = await prisma.comment.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends CommentCreateManyArgs>(
			args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Comments and returns the data saved in the database.
		 * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
		 * @example
		 * // Create many Comments
		 * const comment = await prisma.comment.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Comments and only return the `id`
		 * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(
			args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a Comment.
		 * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
		 * @example
		 * // Delete one Comment
		 * const Comment = await prisma.comment.delete({
		 *   where: {
		 *     // ... filter to delete one Comment
		 *   }
		 * })
		 *
		 */
		delete<T extends CommentDeleteArgs>(
			args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>
		): Prisma__CommentClient<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one Comment.
		 * @param {CommentUpdateArgs} args - Arguments to update one Comment.
		 * @example
		 * // Update one Comment
		 * const comment = await prisma.comment.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends CommentUpdateArgs>(
			args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>
		): Prisma__CommentClient<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Comments.
		 * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
		 * @example
		 * // Delete a few Comments
		 * const { count } = await prisma.comment.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends CommentDeleteManyArgs>(
			args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Comments.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Comments
		 * const comment = await prisma.comment.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends CommentUpdateManyArgs>(
			args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Comments and returns the data updated in the database.
		 * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
		 * @example
		 * // Update many Comments
		 * const comment = await prisma.comment.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Comments and only return the `id`
		 * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(
			args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one Comment.
		 * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
		 * @example
		 * // Update or create a Comment
		 * const comment = await prisma.comment.upsert({
		 *   create: {
		 *     // ... data to create a Comment
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Comment we want to update
		 *   }
		 * })
		 */
		upsert<T extends CommentUpsertArgs>(
			args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>
		): Prisma__CommentClient<
			$Result.GetResult<
				Prisma.$CommentPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Comments.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CommentCountArgs} args - Arguments to filter Comments to count.
		 * @example
		 * // Count the number of Comments
		 * const count = await prisma.comment.count({
		 *   where: {
		 *     // ... the filter for the Comments we want to count
		 *   }
		 * })
		 **/
		count<T extends CommentCountArgs>(
			args?: Subset<T, CommentCountArgs>
		): Prisma.PrismaPromise<
			T extends $Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], CommentCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a Comment.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends CommentAggregateArgs>(
			args: Subset<T, CommentAggregateArgs>
		): Prisma.PrismaPromise<GetCommentAggregateType<T>>

		/**
		 * Group by Comment.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CommentGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends CommentGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: CommentGroupByArgs['orderBy'] }
				: { orderBy?: CommentGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
		>(
			args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors
		): {} extends InputErrors
			? GetCommentGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the Comment model
		 */
		readonly fields: CommentFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Comment.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__CommentClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {}
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		article<T extends ArticleDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, ArticleDefaultArgs<ExtArgs>>
		): Prisma__ArticleClient<
			| $Result.GetResult<
					Prisma.$ArticlePayload<ExtArgs>,
					T,
					'findUniqueOrThrow',
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>
		author<T extends UserDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, UserDefaultArgs<ExtArgs>>
		): Prisma__UserClient<
			| $Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					'findUniqueOrThrow',
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null
		): $Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null
		): $Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
	}

	/**
	 * Fields of the Comment model
	 */
	interface CommentFieldRefs {
		readonly id: FieldRef<'Comment', 'String'>
		readonly createdAt: FieldRef<'Comment', 'DateTime'>
		readonly content: FieldRef<'Comment', 'String'>
		readonly articleId: FieldRef<'Comment', 'String'>
		readonly authorId: FieldRef<'Comment', 'String'>
	}

	// Custom InputTypes
	/**
	 * Comment findUnique
	 */
	export type CommentFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		/**
		 * Filter, which Comment to fetch.
		 */
		where: CommentWhereUniqueInput
	}

	/**
	 * Comment findUniqueOrThrow
	 */
	export type CommentFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		/**
		 * Filter, which Comment to fetch.
		 */
		where: CommentWhereUniqueInput
	}

	/**
	 * Comment findFirst
	 */
	export type CommentFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		/**
		 * Filter, which Comment to fetch.
		 */
		where?: CommentWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Comments to fetch.
		 */
		orderBy?:
			| CommentOrderByWithRelationInput
			| CommentOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Comments.
		 */
		cursor?: CommentWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Comments from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Comments.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Comments.
		 */
		distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
	}

	/**
	 * Comment findFirstOrThrow
	 */
	export type CommentFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		/**
		 * Filter, which Comment to fetch.
		 */
		where?: CommentWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Comments to fetch.
		 */
		orderBy?:
			| CommentOrderByWithRelationInput
			| CommentOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Comments.
		 */
		cursor?: CommentWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Comments from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Comments.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Comments.
		 */
		distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
	}

	/**
	 * Comment findMany
	 */
	export type CommentFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		/**
		 * Filter, which Comments to fetch.
		 */
		where?: CommentWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Comments to fetch.
		 */
		orderBy?:
			| CommentOrderByWithRelationInput
			| CommentOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Comments.
		 */
		cursor?: CommentWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Comments from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Comments.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Comments.
		 */
		distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
	}

	/**
	 * Comment create
	 */
	export type CommentCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		/**
		 * The data needed to create a Comment.
		 */
		data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
	}

	/**
	 * Comment createMany
	 */
	export type CommentCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * The data used to create many Comments.
		 */
		data: CommentCreateManyInput | CommentCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Comment createManyAndReturn
	 */
	export type CommentCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * The data used to create many Comments.
		 */
		data: CommentCreateManyInput | CommentCreateManyInput[]
		skipDuplicates?: boolean
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Comment update
	 */
	export type CommentUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		/**
		 * The data needed to update a Comment.
		 */
		data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
		/**
		 * Choose, which Comment to update.
		 */
		where: CommentWhereUniqueInput
	}

	/**
	 * Comment updateMany
	 */
	export type CommentUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * The data used to update Comments.
		 */
		data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
		/**
		 * Filter which Comments to update
		 */
		where?: CommentWhereInput
		/**
		 * Limit how many Comments to update.
		 */
		limit?: number
	}

	/**
	 * Comment updateManyAndReturn
	 */
	export type CommentUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * The data used to update Comments.
		 */
		data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
		/**
		 * Filter which Comments to update
		 */
		where?: CommentWhereInput
		/**
		 * Limit how many Comments to update.
		 */
		limit?: number
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Comment upsert
	 */
	export type CommentUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		/**
		 * The filter to search for the Comment to update in case it exists.
		 */
		where: CommentWhereUniqueInput
		/**
		 * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
		 */
		create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
		/**
		 * In case the Comment was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
	}

	/**
	 * Comment delete
	 */
	export type CommentDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
		/**
		 * Filter which Comment to delete.
		 */
		where: CommentWhereUniqueInput
	}

	/**
	 * Comment deleteMany
	 */
	export type CommentDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Filter which Comments to delete
		 */
		where?: CommentWhereInput
		/**
		 * Limit how many Comments to delete.
		 */
		limit?: number
	}

	/**
	 * Comment without action
	 */
	export type CommentDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
	> = {
		/**
		 * Select specific fields to fetch from the Comment
		 */
		select?: CommentSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Comment
		 */
		omit?: CommentOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: CommentInclude<ExtArgs> | null
	}

	/**
	 * Enums
	 */

	export const TransactionIsolationLevel: {
		ReadUncommitted: 'ReadUncommitted'
		ReadCommitted: 'ReadCommitted'
		RepeatableRead: 'RepeatableRead'
		Serializable: 'Serializable'
	}

	export type TransactionIsolationLevel =
		(typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]

	export const ArticleScalarFieldEnum: {
		id: 'id'
		title: 'title'
		subtitle: 'subtitle'
		description: 'description'
		content: 'content'
		createdAt: 'createdAt'
		authorId: 'authorId'
		image: 'image'
	}

	export type ArticleScalarFieldEnum =
		(typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]

	export const UserScalarFieldEnum: {
		id: 'id'
		name: 'name'
		email: 'email'
		password: 'password'
		createdAt: 'createdAt'
		role: 'role'
	}

	export type UserScalarFieldEnum =
		(typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]

	export const CommentScalarFieldEnum: {
		id: 'id'
		createdAt: 'createdAt'
		content: 'content'
		articleId: 'articleId'
		authorId: 'authorId'
	}

	export type CommentScalarFieldEnum =
		(typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]

	export const SortOrder: {
		asc: 'asc'
		desc: 'desc'
	}

	export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

	export const QueryMode: {
		default: 'default'
		insensitive: 'insensitive'
	}

	export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]

	/**
	 * Field references
	 */

	/**
	 * Reference to a field of type 'String'
	 */
	export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'String'
	>

	/**
	 * Reference to a field of type 'String[]'
	 */
	export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'String[]'
	>

	/**
	 * Reference to a field of type 'DateTime'
	 */
	export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'DateTime'
	>

	/**
	 * Reference to a field of type 'DateTime[]'
	 */
	export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'DateTime[]'
	>

	/**
	 * Reference to a field of type 'Role'
	 */
	export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Role'
	>

	/**
	 * Reference to a field of type 'Role[]'
	 */
	export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Role[]'
	>

	/**
	 * Reference to a field of type 'Int'
	 */
	export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Int'
	>

	/**
	 * Reference to a field of type 'Int[]'
	 */
	export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Int[]'
	>

	/**
	 * Deep Input Types
	 */

	export type ArticleWhereInput = {
		AND?: ArticleWhereInput | ArticleWhereInput[]
		OR?: ArticleWhereInput[]
		NOT?: ArticleWhereInput | ArticleWhereInput[]
		id?: StringFilter<'Article'> | string
		title?: StringFilter<'Article'> | string
		subtitle?: StringFilter<'Article'> | string
		description?: StringFilter<'Article'> | string
		content?: StringFilter<'Article'> | string
		createdAt?: DateTimeFilter<'Article'> | Date | string
		authorId?: StringFilter<'Article'> | string
		image?: StringFilter<'Article'> | string
		comments?: CommentListRelationFilter
		author?: XOR<UserScalarRelationFilter, UserWhereInput>
	}

	export type ArticleOrderByWithRelationInput = {
		id?: SortOrder
		title?: SortOrder
		subtitle?: SortOrder
		description?: SortOrder
		content?: SortOrder
		createdAt?: SortOrder
		authorId?: SortOrder
		image?: SortOrder
		comments?: CommentOrderByRelationAggregateInput
		author?: UserOrderByWithRelationInput
	}

	export type ArticleWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			AND?: ArticleWhereInput | ArticleWhereInput[]
			OR?: ArticleWhereInput[]
			NOT?: ArticleWhereInput | ArticleWhereInput[]
			title?: StringFilter<'Article'> | string
			subtitle?: StringFilter<'Article'> | string
			description?: StringFilter<'Article'> | string
			content?: StringFilter<'Article'> | string
			createdAt?: DateTimeFilter<'Article'> | Date | string
			authorId?: StringFilter<'Article'> | string
			image?: StringFilter<'Article'> | string
			comments?: CommentListRelationFilter
			author?: XOR<UserScalarRelationFilter, UserWhereInput>
		},
		'id'
	>

	export type ArticleOrderByWithAggregationInput = {
		id?: SortOrder
		title?: SortOrder
		subtitle?: SortOrder
		description?: SortOrder
		content?: SortOrder
		createdAt?: SortOrder
		authorId?: SortOrder
		image?: SortOrder
		_count?: ArticleCountOrderByAggregateInput
		_max?: ArticleMaxOrderByAggregateInput
		_min?: ArticleMinOrderByAggregateInput
	}

	export type ArticleScalarWhereWithAggregatesInput = {
		AND?:
			| ArticleScalarWhereWithAggregatesInput
			| ArticleScalarWhereWithAggregatesInput[]
		OR?: ArticleScalarWhereWithAggregatesInput[]
		NOT?:
			| ArticleScalarWhereWithAggregatesInput
			| ArticleScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'Article'> | string
		title?: StringWithAggregatesFilter<'Article'> | string
		subtitle?: StringWithAggregatesFilter<'Article'> | string
		description?: StringWithAggregatesFilter<'Article'> | string
		content?: StringWithAggregatesFilter<'Article'> | string
		createdAt?: DateTimeWithAggregatesFilter<'Article'> | Date | string
		authorId?: StringWithAggregatesFilter<'Article'> | string
		image?: StringWithAggregatesFilter<'Article'> | string
	}

	export type UserWhereInput = {
		AND?: UserWhereInput | UserWhereInput[]
		OR?: UserWhereInput[]
		NOT?: UserWhereInput | UserWhereInput[]
		id?: StringFilter<'User'> | string
		name?: StringFilter<'User'> | string
		email?: StringFilter<'User'> | string
		password?: StringFilter<'User'> | string
		createdAt?: DateTimeFilter<'User'> | Date | string
		role?: EnumRoleFilter<'User'> | $Enums.Role
		articles?: ArticleListRelationFilter
		comments?: CommentListRelationFilter
	}

	export type UserOrderByWithRelationInput = {
		id?: SortOrder
		name?: SortOrder
		email?: SortOrder
		password?: SortOrder
		createdAt?: SortOrder
		role?: SortOrder
		articles?: ArticleOrderByRelationAggregateInput
		comments?: CommentOrderByRelationAggregateInput
	}

	export type UserWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			name?: string
			email?: string
			AND?: UserWhereInput | UserWhereInput[]
			OR?: UserWhereInput[]
			NOT?: UserWhereInput | UserWhereInput[]
			password?: StringFilter<'User'> | string
			createdAt?: DateTimeFilter<'User'> | Date | string
			role?: EnumRoleFilter<'User'> | $Enums.Role
			articles?: ArticleListRelationFilter
			comments?: CommentListRelationFilter
		},
		'id' | 'name' | 'email'
	>

	export type UserOrderByWithAggregationInput = {
		id?: SortOrder
		name?: SortOrder
		email?: SortOrder
		password?: SortOrder
		createdAt?: SortOrder
		role?: SortOrder
		_count?: UserCountOrderByAggregateInput
		_max?: UserMaxOrderByAggregateInput
		_min?: UserMinOrderByAggregateInput
	}

	export type UserScalarWhereWithAggregatesInput = {
		AND?:
			| UserScalarWhereWithAggregatesInput
			| UserScalarWhereWithAggregatesInput[]
		OR?: UserScalarWhereWithAggregatesInput[]
		NOT?:
			| UserScalarWhereWithAggregatesInput
			| UserScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'User'> | string
		name?: StringWithAggregatesFilter<'User'> | string
		email?: StringWithAggregatesFilter<'User'> | string
		password?: StringWithAggregatesFilter<'User'> | string
		createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string
		role?: EnumRoleWithAggregatesFilter<'User'> | $Enums.Role
	}

	export type CommentWhereInput = {
		AND?: CommentWhereInput | CommentWhereInput[]
		OR?: CommentWhereInput[]
		NOT?: CommentWhereInput | CommentWhereInput[]
		id?: StringFilter<'Comment'> | string
		createdAt?: DateTimeFilter<'Comment'> | Date | string
		content?: StringFilter<'Comment'> | string
		articleId?: StringFilter<'Comment'> | string
		authorId?: StringFilter<'Comment'> | string
		article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
		author?: XOR<UserScalarRelationFilter, UserWhereInput>
	}

	export type CommentOrderByWithRelationInput = {
		id?: SortOrder
		createdAt?: SortOrder
		content?: SortOrder
		articleId?: SortOrder
		authorId?: SortOrder
		article?: ArticleOrderByWithRelationInput
		author?: UserOrderByWithRelationInput
	}

	export type CommentWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			AND?: CommentWhereInput | CommentWhereInput[]
			OR?: CommentWhereInput[]
			NOT?: CommentWhereInput | CommentWhereInput[]
			createdAt?: DateTimeFilter<'Comment'> | Date | string
			content?: StringFilter<'Comment'> | string
			articleId?: StringFilter<'Comment'> | string
			authorId?: StringFilter<'Comment'> | string
			article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
			author?: XOR<UserScalarRelationFilter, UserWhereInput>
		},
		'id'
	>

	export type CommentOrderByWithAggregationInput = {
		id?: SortOrder
		createdAt?: SortOrder
		content?: SortOrder
		articleId?: SortOrder
		authorId?: SortOrder
		_count?: CommentCountOrderByAggregateInput
		_max?: CommentMaxOrderByAggregateInput
		_min?: CommentMinOrderByAggregateInput
	}

	export type CommentScalarWhereWithAggregatesInput = {
		AND?:
			| CommentScalarWhereWithAggregatesInput
			| CommentScalarWhereWithAggregatesInput[]
		OR?: CommentScalarWhereWithAggregatesInput[]
		NOT?:
			| CommentScalarWhereWithAggregatesInput
			| CommentScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'Comment'> | string
		createdAt?: DateTimeWithAggregatesFilter<'Comment'> | Date | string
		content?: StringWithAggregatesFilter<'Comment'> | string
		articleId?: StringWithAggregatesFilter<'Comment'> | string
		authorId?: StringWithAggregatesFilter<'Comment'> | string
	}

	export type ArticleCreateInput = {
		id?: string
		title: string
		subtitle: string
		description: string
		content: string
		createdAt?: Date | string
		image: string
		comments?: CommentCreateNestedManyWithoutArticleInput
		author: UserCreateNestedOneWithoutArticlesInput
	}

	export type ArticleUncheckedCreateInput = {
		id?: string
		title: string
		subtitle: string
		description: string
		content: string
		createdAt?: Date | string
		authorId: string
		image: string
		comments?: CommentUncheckedCreateNestedManyWithoutArticleInput
	}

	export type ArticleUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		title?: StringFieldUpdateOperationsInput | string
		subtitle?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		content?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		image?: StringFieldUpdateOperationsInput | string
		comments?: CommentUpdateManyWithoutArticleNestedInput
		author?: UserUpdateOneRequiredWithoutArticlesNestedInput
	}

	export type ArticleUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		title?: StringFieldUpdateOperationsInput | string
		subtitle?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		content?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		authorId?: StringFieldUpdateOperationsInput | string
		image?: StringFieldUpdateOperationsInput | string
		comments?: CommentUncheckedUpdateManyWithoutArticleNestedInput
	}

	export type ArticleCreateManyInput = {
		id?: string
		title: string
		subtitle: string
		description: string
		content: string
		createdAt?: Date | string
		authorId: string
		image: string
	}

	export type ArticleUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		title?: StringFieldUpdateOperationsInput | string
		subtitle?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		content?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		image?: StringFieldUpdateOperationsInput | string
	}

	export type ArticleUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		title?: StringFieldUpdateOperationsInput | string
		subtitle?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		content?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		authorId?: StringFieldUpdateOperationsInput | string
		image?: StringFieldUpdateOperationsInput | string
	}

	export type UserCreateInput = {
		id?: string
		name: string
		email: string
		password: string
		createdAt?: Date | string
		role?: $Enums.Role
		articles?: ArticleCreateNestedManyWithoutAuthorInput
		comments?: CommentCreateNestedManyWithoutAuthorInput
	}

	export type UserUncheckedCreateInput = {
		id?: string
		name: string
		email: string
		password: string
		createdAt?: Date | string
		role?: $Enums.Role
		articles?: ArticleUncheckedCreateNestedManyWithoutAuthorInput
		comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
	}

	export type UserUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		password?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
		articles?: ArticleUpdateManyWithoutAuthorNestedInput
		comments?: CommentUpdateManyWithoutAuthorNestedInput
	}

	export type UserUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		password?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
		articles?: ArticleUncheckedUpdateManyWithoutAuthorNestedInput
		comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
	}

	export type UserCreateManyInput = {
		id?: string
		name: string
		email: string
		password: string
		createdAt?: Date | string
		role?: $Enums.Role
	}

	export type UserUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		password?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
	}

	export type UserUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		password?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
	}

	export type CommentCreateInput = {
		id?: string
		createdAt?: Date | string
		content: string
		article: ArticleCreateNestedOneWithoutCommentsInput
		author: UserCreateNestedOneWithoutCommentsInput
	}

	export type CommentUncheckedCreateInput = {
		id?: string
		createdAt?: Date | string
		content: string
		articleId: string
		authorId: string
	}

	export type CommentUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
		article?: ArticleUpdateOneRequiredWithoutCommentsNestedInput
		author?: UserUpdateOneRequiredWithoutCommentsNestedInput
	}

	export type CommentUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
		articleId?: StringFieldUpdateOperationsInput | string
		authorId?: StringFieldUpdateOperationsInput | string
	}

	export type CommentCreateManyInput = {
		id?: string
		createdAt?: Date | string
		content: string
		articleId: string
		authorId: string
	}

	export type CommentUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
	}

	export type CommentUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
		articleId?: StringFieldUpdateOperationsInput | string
		authorId?: StringFieldUpdateOperationsInput | string
	}

	export type StringFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>
		in?: string[] | ListStringFieldRefInput<$PrismaModel>
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		mode?: QueryMode
		not?: NestedStringFilter<$PrismaModel> | string
	}

	export type DateTimeFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeFilter<$PrismaModel> | Date | string
	}

	export type CommentListRelationFilter = {
		every?: CommentWhereInput
		some?: CommentWhereInput
		none?: CommentWhereInput
	}

	export type UserScalarRelationFilter = {
		is?: UserWhereInput
		isNot?: UserWhereInput
	}

	export type CommentOrderByRelationAggregateInput = {
		_count?: SortOrder
	}

	export type ArticleCountOrderByAggregateInput = {
		id?: SortOrder
		title?: SortOrder
		subtitle?: SortOrder
		description?: SortOrder
		content?: SortOrder
		createdAt?: SortOrder
		authorId?: SortOrder
		image?: SortOrder
	}

	export type ArticleMaxOrderByAggregateInput = {
		id?: SortOrder
		title?: SortOrder
		subtitle?: SortOrder
		description?: SortOrder
		content?: SortOrder
		createdAt?: SortOrder
		authorId?: SortOrder
		image?: SortOrder
	}

	export type ArticleMinOrderByAggregateInput = {
		id?: SortOrder
		title?: SortOrder
		subtitle?: SortOrder
		description?: SortOrder
		content?: SortOrder
		createdAt?: SortOrder
		authorId?: SortOrder
		image?: SortOrder
	}

	export type StringWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>
		in?: string[] | ListStringFieldRefInput<$PrismaModel>
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		mode?: QueryMode
		not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedStringFilter<$PrismaModel>
		_max?: NestedStringFilter<$PrismaModel>
	}

	export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedDateTimeFilter<$PrismaModel>
		_max?: NestedDateTimeFilter<$PrismaModel>
	}

	export type EnumRoleFilter<$PrismaModel = never> = {
		equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
		in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
		notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
		not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
	}

	export type ArticleListRelationFilter = {
		every?: ArticleWhereInput
		some?: ArticleWhereInput
		none?: ArticleWhereInput
	}

	export type ArticleOrderByRelationAggregateInput = {
		_count?: SortOrder
	}

	export type UserCountOrderByAggregateInput = {
		id?: SortOrder
		name?: SortOrder
		email?: SortOrder
		password?: SortOrder
		createdAt?: SortOrder
		role?: SortOrder
	}

	export type UserMaxOrderByAggregateInput = {
		id?: SortOrder
		name?: SortOrder
		email?: SortOrder
		password?: SortOrder
		createdAt?: SortOrder
		role?: SortOrder
	}

	export type UserMinOrderByAggregateInput = {
		id?: SortOrder
		name?: SortOrder
		email?: SortOrder
		password?: SortOrder
		createdAt?: SortOrder
		role?: SortOrder
	}

	export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
		equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
		in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
		notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
		not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedEnumRoleFilter<$PrismaModel>
		_max?: NestedEnumRoleFilter<$PrismaModel>
	}

	export type ArticleScalarRelationFilter = {
		is?: ArticleWhereInput
		isNot?: ArticleWhereInput
	}

	export type CommentCountOrderByAggregateInput = {
		id?: SortOrder
		createdAt?: SortOrder
		content?: SortOrder
		articleId?: SortOrder
		authorId?: SortOrder
	}

	export type CommentMaxOrderByAggregateInput = {
		id?: SortOrder
		createdAt?: SortOrder
		content?: SortOrder
		articleId?: SortOrder
		authorId?: SortOrder
	}

	export type CommentMinOrderByAggregateInput = {
		id?: SortOrder
		createdAt?: SortOrder
		content?: SortOrder
		articleId?: SortOrder
		authorId?: SortOrder
	}

	export type CommentCreateNestedManyWithoutArticleInput = {
		create?:
			| XOR<
					CommentCreateWithoutArticleInput,
					CommentUncheckedCreateWithoutArticleInput
			  >
			| CommentCreateWithoutArticleInput[]
			| CommentUncheckedCreateWithoutArticleInput[]
		connectOrCreate?:
			| CommentCreateOrConnectWithoutArticleInput
			| CommentCreateOrConnectWithoutArticleInput[]
		createMany?: CommentCreateManyArticleInputEnvelope
		connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
	}

	export type UserCreateNestedOneWithoutArticlesInput = {
		create?: XOR<
			UserCreateWithoutArticlesInput,
			UserUncheckedCreateWithoutArticlesInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutArticlesInput
		connect?: UserWhereUniqueInput
	}

	export type CommentUncheckedCreateNestedManyWithoutArticleInput = {
		create?:
			| XOR<
					CommentCreateWithoutArticleInput,
					CommentUncheckedCreateWithoutArticleInput
			  >
			| CommentCreateWithoutArticleInput[]
			| CommentUncheckedCreateWithoutArticleInput[]
		connectOrCreate?:
			| CommentCreateOrConnectWithoutArticleInput
			| CommentCreateOrConnectWithoutArticleInput[]
		createMany?: CommentCreateManyArticleInputEnvelope
		connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
	}

	export type StringFieldUpdateOperationsInput = {
		set?: string
	}

	export type DateTimeFieldUpdateOperationsInput = {
		set?: Date | string
	}

	export type CommentUpdateManyWithoutArticleNestedInput = {
		create?:
			| XOR<
					CommentCreateWithoutArticleInput,
					CommentUncheckedCreateWithoutArticleInput
			  >
			| CommentCreateWithoutArticleInput[]
			| CommentUncheckedCreateWithoutArticleInput[]
		connectOrCreate?:
			| CommentCreateOrConnectWithoutArticleInput
			| CommentCreateOrConnectWithoutArticleInput[]
		upsert?:
			| CommentUpsertWithWhereUniqueWithoutArticleInput
			| CommentUpsertWithWhereUniqueWithoutArticleInput[]
		createMany?: CommentCreateManyArticleInputEnvelope
		set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		update?:
			| CommentUpdateWithWhereUniqueWithoutArticleInput
			| CommentUpdateWithWhereUniqueWithoutArticleInput[]
		updateMany?:
			| CommentUpdateManyWithWhereWithoutArticleInput
			| CommentUpdateManyWithWhereWithoutArticleInput[]
		deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
	}

	export type UserUpdateOneRequiredWithoutArticlesNestedInput = {
		create?: XOR<
			UserCreateWithoutArticlesInput,
			UserUncheckedCreateWithoutArticlesInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutArticlesInput
		upsert?: UserUpsertWithoutArticlesInput
		connect?: UserWhereUniqueInput
		update?: XOR<
			XOR<
				UserUpdateToOneWithWhereWithoutArticlesInput,
				UserUpdateWithoutArticlesInput
			>,
			UserUncheckedUpdateWithoutArticlesInput
		>
	}

	export type CommentUncheckedUpdateManyWithoutArticleNestedInput = {
		create?:
			| XOR<
					CommentCreateWithoutArticleInput,
					CommentUncheckedCreateWithoutArticleInput
			  >
			| CommentCreateWithoutArticleInput[]
			| CommentUncheckedCreateWithoutArticleInput[]
		connectOrCreate?:
			| CommentCreateOrConnectWithoutArticleInput
			| CommentCreateOrConnectWithoutArticleInput[]
		upsert?:
			| CommentUpsertWithWhereUniqueWithoutArticleInput
			| CommentUpsertWithWhereUniqueWithoutArticleInput[]
		createMany?: CommentCreateManyArticleInputEnvelope
		set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		update?:
			| CommentUpdateWithWhereUniqueWithoutArticleInput
			| CommentUpdateWithWhereUniqueWithoutArticleInput[]
		updateMany?:
			| CommentUpdateManyWithWhereWithoutArticleInput
			| CommentUpdateManyWithWhereWithoutArticleInput[]
		deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
	}

	export type ArticleCreateNestedManyWithoutAuthorInput = {
		create?:
			| XOR<
					ArticleCreateWithoutAuthorInput,
					ArticleUncheckedCreateWithoutAuthorInput
			  >
			| ArticleCreateWithoutAuthorInput[]
			| ArticleUncheckedCreateWithoutAuthorInput[]
		connectOrCreate?:
			| ArticleCreateOrConnectWithoutAuthorInput
			| ArticleCreateOrConnectWithoutAuthorInput[]
		createMany?: ArticleCreateManyAuthorInputEnvelope
		connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
	}

	export type CommentCreateNestedManyWithoutAuthorInput = {
		create?:
			| XOR<
					CommentCreateWithoutAuthorInput,
					CommentUncheckedCreateWithoutAuthorInput
			  >
			| CommentCreateWithoutAuthorInput[]
			| CommentUncheckedCreateWithoutAuthorInput[]
		connectOrCreate?:
			| CommentCreateOrConnectWithoutAuthorInput
			| CommentCreateOrConnectWithoutAuthorInput[]
		createMany?: CommentCreateManyAuthorInputEnvelope
		connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
	}

	export type ArticleUncheckedCreateNestedManyWithoutAuthorInput = {
		create?:
			| XOR<
					ArticleCreateWithoutAuthorInput,
					ArticleUncheckedCreateWithoutAuthorInput
			  >
			| ArticleCreateWithoutAuthorInput[]
			| ArticleUncheckedCreateWithoutAuthorInput[]
		connectOrCreate?:
			| ArticleCreateOrConnectWithoutAuthorInput
			| ArticleCreateOrConnectWithoutAuthorInput[]
		createMany?: ArticleCreateManyAuthorInputEnvelope
		connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
	}

	export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
		create?:
			| XOR<
					CommentCreateWithoutAuthorInput,
					CommentUncheckedCreateWithoutAuthorInput
			  >
			| CommentCreateWithoutAuthorInput[]
			| CommentUncheckedCreateWithoutAuthorInput[]
		connectOrCreate?:
			| CommentCreateOrConnectWithoutAuthorInput
			| CommentCreateOrConnectWithoutAuthorInput[]
		createMany?: CommentCreateManyAuthorInputEnvelope
		connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
	}

	export type EnumRoleFieldUpdateOperationsInput = {
		set?: $Enums.Role
	}

	export type ArticleUpdateManyWithoutAuthorNestedInput = {
		create?:
			| XOR<
					ArticleCreateWithoutAuthorInput,
					ArticleUncheckedCreateWithoutAuthorInput
			  >
			| ArticleCreateWithoutAuthorInput[]
			| ArticleUncheckedCreateWithoutAuthorInput[]
		connectOrCreate?:
			| ArticleCreateOrConnectWithoutAuthorInput
			| ArticleCreateOrConnectWithoutAuthorInput[]
		upsert?:
			| ArticleUpsertWithWhereUniqueWithoutAuthorInput
			| ArticleUpsertWithWhereUniqueWithoutAuthorInput[]
		createMany?: ArticleCreateManyAuthorInputEnvelope
		set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
		disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
		delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
		connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
		update?:
			| ArticleUpdateWithWhereUniqueWithoutAuthorInput
			| ArticleUpdateWithWhereUniqueWithoutAuthorInput[]
		updateMany?:
			| ArticleUpdateManyWithWhereWithoutAuthorInput
			| ArticleUpdateManyWithWhereWithoutAuthorInput[]
		deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
	}

	export type CommentUpdateManyWithoutAuthorNestedInput = {
		create?:
			| XOR<
					CommentCreateWithoutAuthorInput,
					CommentUncheckedCreateWithoutAuthorInput
			  >
			| CommentCreateWithoutAuthorInput[]
			| CommentUncheckedCreateWithoutAuthorInput[]
		connectOrCreate?:
			| CommentCreateOrConnectWithoutAuthorInput
			| CommentCreateOrConnectWithoutAuthorInput[]
		upsert?:
			| CommentUpsertWithWhereUniqueWithoutAuthorInput
			| CommentUpsertWithWhereUniqueWithoutAuthorInput[]
		createMany?: CommentCreateManyAuthorInputEnvelope
		set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		update?:
			| CommentUpdateWithWhereUniqueWithoutAuthorInput
			| CommentUpdateWithWhereUniqueWithoutAuthorInput[]
		updateMany?:
			| CommentUpdateManyWithWhereWithoutAuthorInput
			| CommentUpdateManyWithWhereWithoutAuthorInput[]
		deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
	}

	export type ArticleUncheckedUpdateManyWithoutAuthorNestedInput = {
		create?:
			| XOR<
					ArticleCreateWithoutAuthorInput,
					ArticleUncheckedCreateWithoutAuthorInput
			  >
			| ArticleCreateWithoutAuthorInput[]
			| ArticleUncheckedCreateWithoutAuthorInput[]
		connectOrCreate?:
			| ArticleCreateOrConnectWithoutAuthorInput
			| ArticleCreateOrConnectWithoutAuthorInput[]
		upsert?:
			| ArticleUpsertWithWhereUniqueWithoutAuthorInput
			| ArticleUpsertWithWhereUniqueWithoutAuthorInput[]
		createMany?: ArticleCreateManyAuthorInputEnvelope
		set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
		disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
		delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
		connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
		update?:
			| ArticleUpdateWithWhereUniqueWithoutAuthorInput
			| ArticleUpdateWithWhereUniqueWithoutAuthorInput[]
		updateMany?:
			| ArticleUpdateManyWithWhereWithoutAuthorInput
			| ArticleUpdateManyWithWhereWithoutAuthorInput[]
		deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
	}

	export type CommentUncheckedUpdateManyWithoutAuthorNestedInput = {
		create?:
			| XOR<
					CommentCreateWithoutAuthorInput,
					CommentUncheckedCreateWithoutAuthorInput
			  >
			| CommentCreateWithoutAuthorInput[]
			| CommentUncheckedCreateWithoutAuthorInput[]
		connectOrCreate?:
			| CommentCreateOrConnectWithoutAuthorInput
			| CommentCreateOrConnectWithoutAuthorInput[]
		upsert?:
			| CommentUpsertWithWhereUniqueWithoutAuthorInput
			| CommentUpsertWithWhereUniqueWithoutAuthorInput[]
		createMany?: CommentCreateManyAuthorInputEnvelope
		set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
		update?:
			| CommentUpdateWithWhereUniqueWithoutAuthorInput
			| CommentUpdateWithWhereUniqueWithoutAuthorInput[]
		updateMany?:
			| CommentUpdateManyWithWhereWithoutAuthorInput
			| CommentUpdateManyWithWhereWithoutAuthorInput[]
		deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
	}

	export type ArticleCreateNestedOneWithoutCommentsInput = {
		create?: XOR<
			ArticleCreateWithoutCommentsInput,
			ArticleUncheckedCreateWithoutCommentsInput
		>
		connectOrCreate?: ArticleCreateOrConnectWithoutCommentsInput
		connect?: ArticleWhereUniqueInput
	}

	export type UserCreateNestedOneWithoutCommentsInput = {
		create?: XOR<
			UserCreateWithoutCommentsInput,
			UserUncheckedCreateWithoutCommentsInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
		connect?: UserWhereUniqueInput
	}

	export type ArticleUpdateOneRequiredWithoutCommentsNestedInput = {
		create?: XOR<
			ArticleCreateWithoutCommentsInput,
			ArticleUncheckedCreateWithoutCommentsInput
		>
		connectOrCreate?: ArticleCreateOrConnectWithoutCommentsInput
		upsert?: ArticleUpsertWithoutCommentsInput
		connect?: ArticleWhereUniqueInput
		update?: XOR<
			XOR<
				ArticleUpdateToOneWithWhereWithoutCommentsInput,
				ArticleUpdateWithoutCommentsInput
			>,
			ArticleUncheckedUpdateWithoutCommentsInput
		>
	}

	export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
		create?: XOR<
			UserCreateWithoutCommentsInput,
			UserUncheckedCreateWithoutCommentsInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
		upsert?: UserUpsertWithoutCommentsInput
		connect?: UserWhereUniqueInput
		update?: XOR<
			XOR<
				UserUpdateToOneWithWhereWithoutCommentsInput,
				UserUpdateWithoutCommentsInput
			>,
			UserUncheckedUpdateWithoutCommentsInput
		>
	}

	export type NestedStringFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>
		in?: string[] | ListStringFieldRefInput<$PrismaModel>
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		not?: NestedStringFilter<$PrismaModel> | string
	}

	export type NestedDateTimeFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeFilter<$PrismaModel> | Date | string
	}

	export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>
		in?: string[] | ListStringFieldRefInput<$PrismaModel>
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedStringFilter<$PrismaModel>
		_max?: NestedStringFilter<$PrismaModel>
	}

	export type NestedIntFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>
		in?: number[] | ListIntFieldRefInput<$PrismaModel>
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
		lt?: number | IntFieldRefInput<$PrismaModel>
		lte?: number | IntFieldRefInput<$PrismaModel>
		gt?: number | IntFieldRefInput<$PrismaModel>
		gte?: number | IntFieldRefInput<$PrismaModel>
		not?: NestedIntFilter<$PrismaModel> | number
	}

	export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedDateTimeFilter<$PrismaModel>
		_max?: NestedDateTimeFilter<$PrismaModel>
	}

	export type NestedEnumRoleFilter<$PrismaModel = never> = {
		equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
		in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
		notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
		not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
	}

	export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
		equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
		in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
		notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
		not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedEnumRoleFilter<$PrismaModel>
		_max?: NestedEnumRoleFilter<$PrismaModel>
	}

	export type CommentCreateWithoutArticleInput = {
		id?: string
		createdAt?: Date | string
		content: string
		author: UserCreateNestedOneWithoutCommentsInput
	}

	export type CommentUncheckedCreateWithoutArticleInput = {
		id?: string
		createdAt?: Date | string
		content: string
		authorId: string
	}

	export type CommentCreateOrConnectWithoutArticleInput = {
		where: CommentWhereUniqueInput
		create: XOR<
			CommentCreateWithoutArticleInput,
			CommentUncheckedCreateWithoutArticleInput
		>
	}

	export type CommentCreateManyArticleInputEnvelope = {
		data: CommentCreateManyArticleInput | CommentCreateManyArticleInput[]
		skipDuplicates?: boolean
	}

	export type UserCreateWithoutArticlesInput = {
		id?: string
		name: string
		email: string
		password: string
		createdAt?: Date | string
		role?: $Enums.Role
		comments?: CommentCreateNestedManyWithoutAuthorInput
	}

	export type UserUncheckedCreateWithoutArticlesInput = {
		id?: string
		name: string
		email: string
		password: string
		createdAt?: Date | string
		role?: $Enums.Role
		comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
	}

	export type UserCreateOrConnectWithoutArticlesInput = {
		where: UserWhereUniqueInput
		create: XOR<
			UserCreateWithoutArticlesInput,
			UserUncheckedCreateWithoutArticlesInput
		>
	}

	export type CommentUpsertWithWhereUniqueWithoutArticleInput = {
		where: CommentWhereUniqueInput
		update: XOR<
			CommentUpdateWithoutArticleInput,
			CommentUncheckedUpdateWithoutArticleInput
		>
		create: XOR<
			CommentCreateWithoutArticleInput,
			CommentUncheckedCreateWithoutArticleInput
		>
	}

	export type CommentUpdateWithWhereUniqueWithoutArticleInput = {
		where: CommentWhereUniqueInput
		data: XOR<
			CommentUpdateWithoutArticleInput,
			CommentUncheckedUpdateWithoutArticleInput
		>
	}

	export type CommentUpdateManyWithWhereWithoutArticleInput = {
		where: CommentScalarWhereInput
		data: XOR<
			CommentUpdateManyMutationInput,
			CommentUncheckedUpdateManyWithoutArticleInput
		>
	}

	export type CommentScalarWhereInput = {
		AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
		OR?: CommentScalarWhereInput[]
		NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
		id?: StringFilter<'Comment'> | string
		createdAt?: DateTimeFilter<'Comment'> | Date | string
		content?: StringFilter<'Comment'> | string
		articleId?: StringFilter<'Comment'> | string
		authorId?: StringFilter<'Comment'> | string
	}

	export type UserUpsertWithoutArticlesInput = {
		update: XOR<
			UserUpdateWithoutArticlesInput,
			UserUncheckedUpdateWithoutArticlesInput
		>
		create: XOR<
			UserCreateWithoutArticlesInput,
			UserUncheckedCreateWithoutArticlesInput
		>
		where?: UserWhereInput
	}

	export type UserUpdateToOneWithWhereWithoutArticlesInput = {
		where?: UserWhereInput
		data: XOR<
			UserUpdateWithoutArticlesInput,
			UserUncheckedUpdateWithoutArticlesInput
		>
	}

	export type UserUpdateWithoutArticlesInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		password?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
		comments?: CommentUpdateManyWithoutAuthorNestedInput
	}

	export type UserUncheckedUpdateWithoutArticlesInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		password?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
		comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
	}

	export type ArticleCreateWithoutAuthorInput = {
		id?: string
		title: string
		subtitle: string
		description: string
		content: string
		createdAt?: Date | string
		image: string
		comments?: CommentCreateNestedManyWithoutArticleInput
	}

	export type ArticleUncheckedCreateWithoutAuthorInput = {
		id?: string
		title: string
		subtitle: string
		description: string
		content: string
		createdAt?: Date | string
		image: string
		comments?: CommentUncheckedCreateNestedManyWithoutArticleInput
	}

	export type ArticleCreateOrConnectWithoutAuthorInput = {
		where: ArticleWhereUniqueInput
		create: XOR<
			ArticleCreateWithoutAuthorInput,
			ArticleUncheckedCreateWithoutAuthorInput
		>
	}

	export type ArticleCreateManyAuthorInputEnvelope = {
		data: ArticleCreateManyAuthorInput | ArticleCreateManyAuthorInput[]
		skipDuplicates?: boolean
	}

	export type CommentCreateWithoutAuthorInput = {
		id?: string
		createdAt?: Date | string
		content: string
		article: ArticleCreateNestedOneWithoutCommentsInput
	}

	export type CommentUncheckedCreateWithoutAuthorInput = {
		id?: string
		createdAt?: Date | string
		content: string
		articleId: string
	}

	export type CommentCreateOrConnectWithoutAuthorInput = {
		where: CommentWhereUniqueInput
		create: XOR<
			CommentCreateWithoutAuthorInput,
			CommentUncheckedCreateWithoutAuthorInput
		>
	}

	export type CommentCreateManyAuthorInputEnvelope = {
		data: CommentCreateManyAuthorInput | CommentCreateManyAuthorInput[]
		skipDuplicates?: boolean
	}

	export type ArticleUpsertWithWhereUniqueWithoutAuthorInput = {
		where: ArticleWhereUniqueInput
		update: XOR<
			ArticleUpdateWithoutAuthorInput,
			ArticleUncheckedUpdateWithoutAuthorInput
		>
		create: XOR<
			ArticleCreateWithoutAuthorInput,
			ArticleUncheckedCreateWithoutAuthorInput
		>
	}

	export type ArticleUpdateWithWhereUniqueWithoutAuthorInput = {
		where: ArticleWhereUniqueInput
		data: XOR<
			ArticleUpdateWithoutAuthorInput,
			ArticleUncheckedUpdateWithoutAuthorInput
		>
	}

	export type ArticleUpdateManyWithWhereWithoutAuthorInput = {
		where: ArticleScalarWhereInput
		data: XOR<
			ArticleUpdateManyMutationInput,
			ArticleUncheckedUpdateManyWithoutAuthorInput
		>
	}

	export type ArticleScalarWhereInput = {
		AND?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
		OR?: ArticleScalarWhereInput[]
		NOT?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
		id?: StringFilter<'Article'> | string
		title?: StringFilter<'Article'> | string
		subtitle?: StringFilter<'Article'> | string
		description?: StringFilter<'Article'> | string
		content?: StringFilter<'Article'> | string
		createdAt?: DateTimeFilter<'Article'> | Date | string
		authorId?: StringFilter<'Article'> | string
		image?: StringFilter<'Article'> | string
	}

	export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
		where: CommentWhereUniqueInput
		update: XOR<
			CommentUpdateWithoutAuthorInput,
			CommentUncheckedUpdateWithoutAuthorInput
		>
		create: XOR<
			CommentCreateWithoutAuthorInput,
			CommentUncheckedCreateWithoutAuthorInput
		>
	}

	export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
		where: CommentWhereUniqueInput
		data: XOR<
			CommentUpdateWithoutAuthorInput,
			CommentUncheckedUpdateWithoutAuthorInput
		>
	}

	export type CommentUpdateManyWithWhereWithoutAuthorInput = {
		where: CommentScalarWhereInput
		data: XOR<
			CommentUpdateManyMutationInput,
			CommentUncheckedUpdateManyWithoutAuthorInput
		>
	}

	export type ArticleCreateWithoutCommentsInput = {
		id?: string
		title: string
		subtitle: string
		description: string
		content: string
		createdAt?: Date | string
		image: string
		author: UserCreateNestedOneWithoutArticlesInput
	}

	export type ArticleUncheckedCreateWithoutCommentsInput = {
		id?: string
		title: string
		subtitle: string
		description: string
		content: string
		createdAt?: Date | string
		authorId: string
		image: string
	}

	export type ArticleCreateOrConnectWithoutCommentsInput = {
		where: ArticleWhereUniqueInput
		create: XOR<
			ArticleCreateWithoutCommentsInput,
			ArticleUncheckedCreateWithoutCommentsInput
		>
	}

	export type UserCreateWithoutCommentsInput = {
		id?: string
		name: string
		email: string
		password: string
		createdAt?: Date | string
		role?: $Enums.Role
		articles?: ArticleCreateNestedManyWithoutAuthorInput
	}

	export type UserUncheckedCreateWithoutCommentsInput = {
		id?: string
		name: string
		email: string
		password: string
		createdAt?: Date | string
		role?: $Enums.Role
		articles?: ArticleUncheckedCreateNestedManyWithoutAuthorInput
	}

	export type UserCreateOrConnectWithoutCommentsInput = {
		where: UserWhereUniqueInput
		create: XOR<
			UserCreateWithoutCommentsInput,
			UserUncheckedCreateWithoutCommentsInput
		>
	}

	export type ArticleUpsertWithoutCommentsInput = {
		update: XOR<
			ArticleUpdateWithoutCommentsInput,
			ArticleUncheckedUpdateWithoutCommentsInput
		>
		create: XOR<
			ArticleCreateWithoutCommentsInput,
			ArticleUncheckedCreateWithoutCommentsInput
		>
		where?: ArticleWhereInput
	}

	export type ArticleUpdateToOneWithWhereWithoutCommentsInput = {
		where?: ArticleWhereInput
		data: XOR<
			ArticleUpdateWithoutCommentsInput,
			ArticleUncheckedUpdateWithoutCommentsInput
		>
	}

	export type ArticleUpdateWithoutCommentsInput = {
		id?: StringFieldUpdateOperationsInput | string
		title?: StringFieldUpdateOperationsInput | string
		subtitle?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		content?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		image?: StringFieldUpdateOperationsInput | string
		author?: UserUpdateOneRequiredWithoutArticlesNestedInput
	}

	export type ArticleUncheckedUpdateWithoutCommentsInput = {
		id?: StringFieldUpdateOperationsInput | string
		title?: StringFieldUpdateOperationsInput | string
		subtitle?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		content?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		authorId?: StringFieldUpdateOperationsInput | string
		image?: StringFieldUpdateOperationsInput | string
	}

	export type UserUpsertWithoutCommentsInput = {
		update: XOR<
			UserUpdateWithoutCommentsInput,
			UserUncheckedUpdateWithoutCommentsInput
		>
		create: XOR<
			UserCreateWithoutCommentsInput,
			UserUncheckedCreateWithoutCommentsInput
		>
		where?: UserWhereInput
	}

	export type UserUpdateToOneWithWhereWithoutCommentsInput = {
		where?: UserWhereInput
		data: XOR<
			UserUpdateWithoutCommentsInput,
			UserUncheckedUpdateWithoutCommentsInput
		>
	}

	export type UserUpdateWithoutCommentsInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		password?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
		articles?: ArticleUpdateManyWithoutAuthorNestedInput
	}

	export type UserUncheckedUpdateWithoutCommentsInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		password?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
		articles?: ArticleUncheckedUpdateManyWithoutAuthorNestedInput
	}

	export type CommentCreateManyArticleInput = {
		id?: string
		createdAt?: Date | string
		content: string
		authorId: string
	}

	export type CommentUpdateWithoutArticleInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
		author?: UserUpdateOneRequiredWithoutCommentsNestedInput
	}

	export type CommentUncheckedUpdateWithoutArticleInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
		authorId?: StringFieldUpdateOperationsInput | string
	}

	export type CommentUncheckedUpdateManyWithoutArticleInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
		authorId?: StringFieldUpdateOperationsInput | string
	}

	export type ArticleCreateManyAuthorInput = {
		id?: string
		title: string
		subtitle: string
		description: string
		content: string
		createdAt?: Date | string
		image: string
	}

	export type CommentCreateManyAuthorInput = {
		id?: string
		createdAt?: Date | string
		content: string
		articleId: string
	}

	export type ArticleUpdateWithoutAuthorInput = {
		id?: StringFieldUpdateOperationsInput | string
		title?: StringFieldUpdateOperationsInput | string
		subtitle?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		content?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		image?: StringFieldUpdateOperationsInput | string
		comments?: CommentUpdateManyWithoutArticleNestedInput
	}

	export type ArticleUncheckedUpdateWithoutAuthorInput = {
		id?: StringFieldUpdateOperationsInput | string
		title?: StringFieldUpdateOperationsInput | string
		subtitle?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		content?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		image?: StringFieldUpdateOperationsInput | string
		comments?: CommentUncheckedUpdateManyWithoutArticleNestedInput
	}

	export type ArticleUncheckedUpdateManyWithoutAuthorInput = {
		id?: StringFieldUpdateOperationsInput | string
		title?: StringFieldUpdateOperationsInput | string
		subtitle?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		content?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		image?: StringFieldUpdateOperationsInput | string
	}

	export type CommentUpdateWithoutAuthorInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
		article?: ArticleUpdateOneRequiredWithoutCommentsNestedInput
	}

	export type CommentUncheckedUpdateWithoutAuthorInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
		articleId?: StringFieldUpdateOperationsInput | string
	}

	export type CommentUncheckedUpdateManyWithoutAuthorInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		content?: StringFieldUpdateOperationsInput | string
		articleId?: StringFieldUpdateOperationsInput | string
	}

	/**
	 * Batch Payload for updateMany & deleteMany & createMany
	 */

	export type BatchPayload = {
		count: number
	}

	/**
	 * DMMF
	 */
	export const dmmf: runtime.BaseDMMF
}
