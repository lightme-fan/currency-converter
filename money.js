const currencies = {
	USD: 'United States Dollar',
	AUD: 'Australian Dollar',
	BGN: 'Bulgarian Lev',
	BRL: 'Brazilian Real',
	CAD: 'Canadian Dollar',
	CHF: 'Swiss Franc',
	CNY: 'Chinese Yuan',
	CZK: 'Czech Republic Koruna',
	DKK: 'Danish Krone',
	GBP: 'British Pound Sterling',
	HKD: 'Hong Kong Dollar',
	HRK: 'Croatian Kuna',
	HUF: 'Hungarian Forint',
	IDR: 'Indonesian Rupiah',
	ILS: 'Israeli New Sheqel',
	INR: 'Indian Rupee',
	JPY: 'Japanese Yen',
	KRW: 'South Korean Won',
	MXN: 'Mexican Peso',
	MYR: 'Malaysian Ringgit',
	NOK: 'Norwegian Krone',
	NZD: 'New Zealand Dollar',
	PHP: 'Philippine Peso',
	PLN: 'Polish Zloty',
	RON: 'Romanian Leu',
	RUB: 'Russian Ruble',
	SEK: 'Swedish Krona',
	SGD: 'Singapore Dollar',
	THB: 'Thai Baht',
	TRY: 'Turkish Lira',
	ZAR: 'South African Rand',
	EUR: 'Euro',
};

// Grabbing select tags
const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');

// API link
const endpoint = 'https://api.exchangeratesapi.io/latest';

// Cash object
const rateByBase = {};

const form = document.querySelector('.app form');
const fromInput = document.querySelector('[name="from_amount"]');
const toEL = document.querySelector('.to_amount');

// Generating currencies
function generateOptions(options) {
  // Converting the object into arrays and maping it.
  return Object
    .entries(options)
    .map(([ currencyCode, currencyName ]) => {
      return `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
    }).join(''); 
}

// Fetching the currency api
async function fetchRates(base = 'USD') {
  const res = await fetch(`${endpoint}?base=${base}`);
  const rates = await res.json();
  return rates;
}

// Convert function 
async function convert(amount, from, to) {
  // Converting [from] to [to]
  if (!rateByBase[from]) {
    console.log(`Oh no, thre is on ${from} to convert ${to}, so let's get it!`);
    const rates = await fetchRates(from);
    rateByBase[from] = rates;
  }

  // Converting amount;
  const rate = rateByBase[from].rates[to];
  console.log(rateByBase[form].rates[to]);
  const convertedAmount = rate * amount;
  // console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}


// Formatting currency
function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Handling inputs
async function handleInput(e) {
  console.log(e.target);
  console.log(e.currentTarget);
  const rawAmount = await convert(
    fromInput.nodeValue,
    fromSelect.nodeValue,
    toSelect.value
  );
  toEL.textContent = formatCurrency(rawAmount, toSelect.value);
}

// Calling the function
const optionsHtml = generateOptions(currencies);
// Append this function to the fromSelect and toSelect
fromSelect.innerHTML = optionsHtml;
toSelect.innerHTML = optionsHtml;

form.addEventListener('input', handleInput);