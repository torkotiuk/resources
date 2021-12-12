// use Bracket pair colorizer for VSCode
// devdocs.io - guide from different techniques
// confirm (true, false); prompt (takes some data from input); alert

// ** use Number constructor
// use <<<< Number >>>> to change some value to number, Not ++ or smth. like that

// ** take the WHOLE NUMBER or only INTEGER NUMBER PART
// Number.parsInt(), Number.parsFloat(), Number.toFixed()
// let elemWidth = '50.25px';
// console.log(Number.parseInt(elemWidth));
// console.log(Number.parseFloat(elemWidth));

// ** cut necessary NUMBER SYMBOLS AFTER COMA
// let salary = 3750.253651;
// salary = Number(salary.toFixed(3));
// console.log(salary);

// ** make POWER for number
// Ex. 1
// console.log(Math.pow(2, 5));
// Ex. 2
// console.log(2 ** 5); - exponent operator
// const base = Number(prompt('Enter number: '));
// const power = Number(prompt('Enter power: '));
// console.log(`Number ${base} in power ${power}: `, base ** power);

// ** get RANDOM NUMBER from min to max
// ** Ex. 1
// const min = 30;
// const max = 50;
// let randomNumber = Math.random() * (max - min) + min;
// console.log(
//   `Random number from ${min} to ${max} and round it after ',': `,
//   Math.round(randomNumber),
//   `Full number is: `,
//   randomNumber,
// );
// ** Ex. 2
// const colors = ['pink', 'purple', 'tomato', 'orange', 'green'];
// const min = 0;
// const max = colors.length - 1;
// let randomIndex = Math.round(Math.random() * (max - min) + min);
// let randomColor = colors[randomIndex];
// const headerRef = document.querySelector('.header');
// headerRef.style.backgroundColor = randomColor;

// ** STRING ELEMENTS
// const brand = 'SaMSung';
// console.log(brand[2]);

// ** 6 falsy values in boolean transformation
// 0, NaN, null, undefined, '', false

console.log(Boolean({}));
