import axios, { AxiosResponse } from 'axios'

import ProductModel from '../models/ProductModel';
import PaginatedEntity from '../models/PaginatedEntity';

axios.defaults.baseURL = process.env.BACKEND_API || 'http://localhost:4000'

const ProductService = {
    getProduct: async (id: string): Promise<AxiosResponse<ProductModel>> => axios.get(`/products/${id}`),
    getAllProducts: async ({limit, skip}): Promise<AxiosResponse<PaginatedEntity<ProductModel>>> => {

        const queryParams = new URLSearchParams()

        queryParams.append('limit', String(limit))
        queryParams.append('skip', String(skip))

        return axios.get(`/products?${queryParams.toString()}`)
    }
}

export default ProductService