import { Hero } from '../../../components/Hero'
import { Loading } from '../../../components/Loading'
import { useInfiniteScroll } from '../../../hooks/use-infinite-scroll.hook'
import { usePaginatedUsers } from '../hooks/use-paginated-users.hook'
import { UserDisplay } from './UserDisplay'

export default function DashboardPage() {
	const { users, hasMore, loadMore, loading } = usePaginatedUsers()
	const { sentinelRef } = useInfiniteScroll({
		hasMore,
		loading,
		onLoadMore: loadMore
	})

	if (users.length === 0) {
		return <Loading />
	}

	return (
		<>
			<Hero title='Dashboard' description='Administrá usuarios' />

			<section className='my-9'>
				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='p-3 text-left border'>Nombre</th>
								<th className='p-3 text-left border'>Email</th>
								<th className='p-3 text-left border'>ID</th>
								<th className='p-3 text-left border'>Rol</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<UserDisplay user={user} key={user.id} />
							))}
						</tbody>
					</table>
				</div>

				<div ref={sentinelRef} className='h-10' />

				{loading && users.length > 0 && (
					<div className='mt-4 text-center'>Cargando...</div>
				)}
			</section>
		</>
	)
}
