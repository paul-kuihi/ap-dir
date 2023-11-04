/**
 * @vitest-environment jsdom
 */
import { createRemixStub } from '@remix-run/testing'
import { render, screen } from '@testing-library/react'
import { test } from 'vitest'
import { prisma } from '#app/utils/db.server.ts'
import {
	createBusiness,
	createBusinessType,
	createContacts,
} from '#tests/db-utils.ts'
import { default as BusinessesIndexRoute, loader } from './index.tsx'

test('The user profile when not logged in as self', async () => {
	// TODO: FIX THIS. For some reason it thinks the table doesn't exist.
	const business = await prisma.business.create({
		select: { id: true, name: true, type: true, contacts: true },
		data: {
			...createBusiness(),
			type: { connect: createBusinessType() },
			contacts: { create: createContacts() },
		},
	})

	const App = createRemixStub([
		{
			path: '/businesses',
			Component: BusinessesIndexRoute,
			loader,
		},
	])

	const routeUrl = `/businesses`
	render(<App initialEntries={[routeUrl]} />)

	await screen.findByRole('heading', { level: 2, name: business.type.name! })
	business.contacts?.map(async contact => {
		await screen.findByRole('link', { name: `${contact.value}` })
	})
})
