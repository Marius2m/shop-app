import fs from 'fs'
import path from 'path'
import parse from 'csv-parse'

import ProductsRepository from '~/repositories/ProductsRepository'
import Product from '~/data/Product'

async function syncData() {
    const filePath = path.join(__dirname, './../src/assets/data.csv')
    const stream = fs.createReadStream(filePath)
    const parser = stream.pipe(parse({ columns: true }))
    // Intialise count
    let count = 0

    // Iterate through each records
    for await (const record of parser) {
        ++count

        if (count % 100 === 0) {
            console.log(`Products stored: ${count}`)
        }

        const modifiedRecord = {
            ...record,
            externalId: record.id,
            imageLink: record.image_link,
            price: record.price?.split(' ')[0],
            currency: record.price?.split( ' ')[1] ?? 'EUR'
        }

        const product = new Product(modifiedRecord)

        await ProductsRepository.create(product)

        if (count === 250) break
    }
    console.log(`Products stored: ${count}`)
}