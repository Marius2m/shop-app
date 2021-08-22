export default class SearchQuery {
    filters: string[]
    searchTerm: string | undefined
    skip: number
    limit: number

	constructor(data: SearchQuery) {
		this.filters = data.filters
		this.searchTerm = data.searchTerm === '' ? undefined : data.searchTerm
        this.skip = data.skip
        this.limit = data.limit
	}
}
