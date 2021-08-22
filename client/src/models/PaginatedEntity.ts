export default class PaginatedEntity<T> {
	items: T[]
	skip: number
	limit: number
	itemsCount: number

	constructor(data: PaginatedEntity<T>) {
		this.items = data.items
		this.skip = data.skip || 0
		this.limit = data.limit || 10
		this.itemsCount = data.itemsCount || 0
	}
}
