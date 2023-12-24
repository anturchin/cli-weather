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

	getWeather('Saint Petersburg');

}

initCli();