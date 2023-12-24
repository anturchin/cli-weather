#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';


const saveToken = async (token) => {

	if (!token.length) {
		printError('не передан токен');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('токен сохранен');
	} catch (error) {
		printError(error.message);
	}

}

const getForCast = async () => {
	try {
		const weather = await getWeather(process.env.CITY ?? 'Saint Petersburg');
		console.log(weather);
	} catch (error) {
		if (error?.response?.status == 404) {
			printError('неверно указан город');
		} else if (error?.response?.status == 401) {
			printError('неверно указан токен');
		} else {
			printError(error.message);
		}
	}
}

const initCli = () => {

	const args = getArgs(process.argv)

	if (args.h) {
		printHelp();
	}

	if (args.s) {

	}

	if (args.t) {
		return saveToken(args.t);
	}

	getForCast();

}

initCli();