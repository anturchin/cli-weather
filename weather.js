#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';


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

const saveCity = async (city) => {

	if (!city.length) {
		printError('не передан город');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('город сохранен');
	} catch (error) {
		printError(error.message);
	}

}

const getForCast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon))
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
		return printHelp();
	}

	if (args.s) {
		return saveCity(args.s);
	}

	if (args.t) {
		return saveToken(args.t);
	}

	return getForCast();

}

initCli();