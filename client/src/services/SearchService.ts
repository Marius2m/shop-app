import axios, { AxiosResponse } from 'axios'

import ProductModel from '../models/ProductModel';
import PaginatedEntity from '../models/PaginatedEntity';
import SearchQuery from '../models/SearchQuery';

axios.defaults.baseURL = process.env.BACKEND_API || 'http://localhost:4000'

const SearchService = {
    search: async (params: SearchQuery): Promise<AxiosResponse<PaginatedEntity<ProductModel>>> => {
        const queryParams = new URLSearchParams()

        !!params.searchTerm && queryParams.append('term', params.searchTerm)
        queryParams.append('limit', String(params.limit))
        queryParams.append('skip', String(params.skip))
        params.filters.forEach(filter => queryParams.append('filters[]', filter))

        return axios.get(`/search?${queryParams.toString()}`)
    }
}

export default SearchService