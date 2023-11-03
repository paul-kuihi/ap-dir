import { faker } from '@faker-js/faker'
import { Link } from '@remix-run/react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { cn } from '#app/utils/misc.tsx'

export default function DesignRoute() {
	faker.seed(1234)
	return (
		<div className="container mb-48 mt-36 flex flex-col items-center justify-center gap-6">
			<h1 className="text-h1">Businesses</h1>
			<main className=" flex max-w-lg flex-col sm:items-center sm:justify-center">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i}>
						<h2 className="mb-4 mt-8 text-h2">{faker.person.jobType()}s</h2>
						<div className={cn('flex max-w-lg flex-wrap gap-4')}>
							{Array.from({ length: 3 }).map((_, i) => (
								<Card className=" min-w-full" key={i}>
									<CardHeader>
										<CardTitle>{faker.person.fullName()}</CardTitle>
										<CardDescription>
											{faker.company.catchPhrase()}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex flex-col gap-1">
											<Icon name="phone" size="lg">
												<Link
													className="underline"
													to={`tel:${faker.phone.number()}`}
												>
													{faker.phone.number()}
												</Link>
											</Icon>
											<Icon name="link-2" size="lg">
												<Link className="underline" to={faker.internet.url()}>
													{faker.internet.url()}
												</Link>
											</Icon>

											<Icon name="envelope-closed" size="lg">
												<Link className="underline" to={faker.internet.url()}>
													{faker.internet.url()}
												</Link>
											</Icon>
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
