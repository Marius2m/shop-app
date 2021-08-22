export class PaginatedQuery<T> {
	items: T[]
	skip: number
	limit: number
	itemsCount: number

	constructor(items: T[], skip = 0, limit = 0, itemsCount = 0) {
		this.items = items
		this.skip = skip
		this.limit = limit
		this.itemsCount = itemsCount
	}
}
