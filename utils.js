// Generating currencies
export function generateOptions(options) {
    // Converting the object into arrays and maping it.
    return Object
      .entries(options)
      .map(([ currencyCode, currencyName ]) => {
        return `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
      }).join(''); 
  }
  
  
// Formatting currency
export function formatCurrency(amount, currency) {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }
  