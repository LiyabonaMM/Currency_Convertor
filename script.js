
  // Fetch the currency exchange rates from an API
function fetchExchangeRates(baseCurrency) {
  const apiWeb = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

  return fetch(apiWeb)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data.rates;
    })
    .catch(function(error) {
      console.error('Failed to fetch exchange rates:', error);
      throw error;
    });
}

// Performing  the currency conversion
function convertCurrency(amount, rates, sourceCurrency, targetCurrency) {
  var sourceRate = rates[sourceCurrency];
  var targetRate = rates[targetCurrency];

  if (sourceRate && targetRate) {
    var convertedAmount = amount * (targetRate / sourceRate);
    return convertedAmount.toFixed(2);
  }

  return 'Invalid currency';
}

// Populating the currency options in the form
function populateCurrencyOptions(rates) {
  var sourceCurrencySelect = document.getElementById('sourceCurrency');
  var targetCurrencySelect = document.getElementById('targetCurrency');

  for (var currency in rates) {
    var option = document.createElement('option');
    option.value = currency;
    option.text = currency;

    sourceCurrencySelect.appendChild(option.cloneNode(true));
    targetCurrencySelect.appendChild(option);
  }
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  var amount = parseFloat(document.getElementById('amount').value);
  var sourceCurrency = document.getElementById('sourceCurrency').value;
  var targetCurrency = document.getElementById('targetCurrency').value;
  var resultElement = document.getElementById('result');

  fetchExchangeRates(sourceCurrency)
    .then(function(rates) {
      var convertedAmount = convertCurrency(amount, rates, sourceCurrency, targetCurrency);
      resultElement.textContent = amount + ' ' + sourceCurrency + ' = ' + convertedAmount + ' ' + targetCurrency;
    })
    .catch(function(error) {
      resultElement.textContent = 'Conversion failed';
    });
}

// Initialize the currency converter
function initializeConverter() {
  var currencyConverterForm = document.getElementById('currencyConverterForm');
  currencyConverterForm.addEventListener('submit', handleFormSubmit);

  // Fetch the exchange rates using a default base currency
  fetchExchangeRates('USD')
    .then(function(rates) {
      populateCurrencyOptions(rates);
    })
    .catch(function(error) {
      console.error('Failed to initialize currency converter:', error);
    });
}

// Start the currency converter after the page has loaded
window.addEventListener('load', initializeConverter);
