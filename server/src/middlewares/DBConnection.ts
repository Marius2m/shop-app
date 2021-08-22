import * as neo4j from 'neo4j-driver'

import { logger } from '~/config/logger'

export interface IDBConnectionParams {
	user: string
	pass: string
	url: string
}

let driver
let session

export const ConnectToDB = (params: IDBConnectionParams) => async (req, res, next) => {
	try {
		driver = neo4j.driver(params.url, neo4j.auth.basic(params.user, params.pass))
		session = driver.session()
		logger.info('Initiated neo4j session')

		next()
	} catch (err) {
		next(err)
	}
}

export const CloseDBConnection = async (req, res, next) => {
	try {
		await session.close()
		await driver.close()
		logger.info('Closed neo4j session')

		next()
	} catch (err) {
		next(err)
	}
}

export const getDBSession = () => session
