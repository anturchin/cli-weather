import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (err) => {
	console.log(`${chalk.bgRed('error')}: ${err}`);
}

export const printSuccess = (msg) => {
	console.log(`${chalk.bgGreen('success')}: ${msg}`);
}

export const printHelp = () => {
	console.log(dedent(
		`${chalk.bgCyan(' help ')}
			Без параметров - вывод погоды
			-s [CITY] для установки погоды
			-h для вывода помощи
			-t [API_KEY] для сохранения токена
		`
	)
	);
}
