// Lib contains the functionality of our project

// API link
const endpoint = 'https://api.exchangeratesapi.io/latest';
// Cash object
const rateByBase = {};

// Fetching the currency api
export async function fetchRates(base = 'USD') {
    const res = await fetch(`${endpoint}?base=${base}`);
    const rates = await res.json();
    return rates;
  }
  
  // Convert function 
export async function convert(amount, from, to) {
    // Converting [from] to [to]
    if (!rateByBase[from]) {
      console.log(`Oh no, thre is on ${from} to convert ${to}, so let's get it!`);
      const rates = await fetchRates(from);
      rateByBase[from] = rates;
    }
  
    // Converting amount;
    const rate = rateByBase[from].rates[to];
    console.log(rateByBase[from].rates[to]);
    const convertedAmount = rate * amount;
    return convertedAmount;
  }
  