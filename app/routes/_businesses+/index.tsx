import { type DataFunctionArgs, json, type MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card.tsx'
import { Icon, type IconName } from '#app/components/ui/icon.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { cn } from '#app/utils/misc.tsx'

export const meta: MetaFunction = () => [{ title: 'AP Recommended Businesses' }]

export async function loader({ request }: DataFunctionArgs) {
	const types = await prisma.businessType.findMany({
		orderBy: { name: 'asc' },
		include: { businesses: { include: { contacts: true } } },
	})

	return json(types)
}

export default function Index() {
	const types = useLoaderData<typeof loader>()

	return (
		<div className="container mb-48 mt-36 flex flex-col items-center justify-center gap-6">
			<h1 className="text-h1">Recommended Businesses</h1>
			<main className="flex flex-col items-center justify-center">
				{types.map((type, i) => (
					<div className="min-w-full" key={i}>
						<h2 className="mb-4 mt-8 text-h2">{type.name + 's'}</h2>
						<div className={cn('flex max-w-lg flex-wrap gap-4')}>
							{type.businesses.map(({ name, description, contacts }, i) => (
								<Card className="min-w-full" key={i}>
									<CardHeader>
										<CardTitle>{name}</CardTitle>
										<CardDescription>{description}</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex flex-col gap-1">
											{contacts?.map(({ type, url, value }, i) => (
												<Icon key={i} name={type as IconName} size="lg">
													<Link className="underline" to={url}>
														{value}
													</Link>
												</Icon>
											))}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				))}
			</main>
		</div>
	)
}
