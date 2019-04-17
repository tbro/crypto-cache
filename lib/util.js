const ERC20Currencies = ['ETH', 'PAX', 'USDC', 'GUSD'];
const chainEQCurrencies = ['BTC', 'BCH'];

function chainFromCurrency(currency) {
  if (ERC20Currencies.includes(currency)) {
    return 'ETH';
  }
  if (chainEQCurrencies.includes(currency)) {
    return currency;
  }
  throw new Error('Unknown Currency');
}

module.exports = chainFromCurrency;