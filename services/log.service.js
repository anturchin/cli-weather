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

export const printWeather = (res, icon) => {
	console.log(dedent(
		`${chalk.bgMagenta(' success ')}: Погода в городе ${res.name}
			${icon}  ${res.weather[0].description}
			Температура ${res.main.temp} (ощущается как ${res.main.feels_like})
			Влажность: ${res.main.humidity} %
			Скорость ветра: ${res.wind.speed}
		`
	)
	);
}