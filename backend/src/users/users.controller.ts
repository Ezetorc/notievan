import type { Request, Response } from 'express'
import { UsersService } from './users.service.js'
import { UserOut } from '../../../shared/src/dtos/out/user-out.dto.js'
import { CUIDParamDto } from '../../../shared/src/dtos/in/cuid-param.dto.js'
import { PaginationParamsDto } from '../../../shared/src/dtos/in/pagination-params.dto.js'
import { RoleParamDto } from '../../../shared/src/dtos/in/role-param.dto.js'
import { UpdateUserDto } from '../../../shared/src/dtos/in/update-user.dto.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'

export class UsersController {
	static async getById(
		request: Request,
		response: Response
	): Promise<Response> {
		const { id } = CUIDParamDto.parse(request.params)

		if (request.user.id !== id) {
			throw new UnauthorizedError(ErrorCode.FORBIDDEN)
		}

		const user = await UsersService.getById(id)
		const userOut = new UserOut(user)

		return response.json(userOut)
	}

	static async updateRole(
		request: Request,
		response: Response
	): Promise<Response> {
		const { id } = CUIDParamDto.parse(request.params)
		const { role } = RoleParamDto.parse(request.body)
		const user = await UsersService.updateRole(id, role)
		const userOut = new UserOut(user)

		return response.json(userOut)
	}

	static async getAll(request: Request, response: Response): Promise<Response> {
		const { limit, cursor } = PaginationParamsDto.parse(request.query)
		const result = await UsersService.getAll({
			limit,
			cursor
		})

		return response.json({
			data: result.data.map((user) => new UserOut(user)),
			nextCursor: result.nextCursor
		})
	}

	static async update(request: Request, response: Response): Promise<Response> {
		const { id } = CUIDParamDto.parse(request.params)

		if (request.user.id !== id) {
			throw new UnauthorizedError(ErrorCode.FORBIDDEN)
		}

		const data = UpdateUserDto.parse(request.body)
		const user = await UsersService.update(id, data)
		const userOut = new UserOut(user)

		return response.json(userOut)
	}
}
