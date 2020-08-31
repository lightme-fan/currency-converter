// Handling inputs
import { convert } from './lib.js';
import { formatCurrency } from './utils.js';
import { fromInput, fromSelect, toSelect, toEL } from './elements.js';

export async function handleInput(e) {
  console.log(e.target);
  console.log(e.currentTarget);
  const rawAmount = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
      );
    toEL.textContent = formatCurrency(rawAmount, toSelect.value);
}
  