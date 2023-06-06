/* Fetch the currency exchange rates from an API
function fetchExchangeRates(baseCurrency) {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data.rates)
      .catch(error => {
        console.error('Failed to fetch exchange rates:', error);
        throw error;
      });
  }
  
  // Perform the currency conversion
  function convertCurrency(amount, rates, sourceCurrency, targetCurrency) {
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];
  
    if (sourceRate && targetRate) {
      const convertedAmount = amount * (targetRate / sourceRate);
      return convertedAmount.toFixed(2);
    }
  
    return 'Invalid currency';
  }
  
  // Populate the currency options in the form
  function populateCurrencyOptions(rates) {
    const sourceCurrencySelect = document.getElementById('sourceCurrency');
    const targetCurrencySelect = document.getElementById('targetCurrency');
  
    for (const currency in rates) {
      const option = document.createElement('option');
      option.value = currency;
      option.text = currency;
  
      sourceCurrencySelect.appendChild(option.cloneNode(true));
      targetCurrencySelect.appendChild(option);
    }
  }
  
  // Handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const amount = parseFloat(document.getElementById('amount').value);
    const sourceCurrency = document.getElementById('sourceCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;
    const resultElement = document.getElementById('result');
  
    fetchExchangeRates(sourceCurrency)
      .then(rates => {
        const convertedAmount = convertCurrency(amount, rates, sourceCurrency, targetCurrency);
        resultElement.textContent = `${amount} ${sourceCurrency} = ${convertedAmount} ${targetCurrency}`;
      })
      .catch(error => {
        resultElement.textContent = 'Conversion failed';
      });
  }
  
  // Initialize the currency converter
  function initializeConverter() {
    const currencyConverterForm = document.getElementById('currencyConverterForm');
    currencyConverterForm.addEventListener('submit', handleFormSubmit);
  
    // Fetch the exchange rates using a default base currency
    fetchExchangeRates('USD')
      .then(rates => populateCurrencyOptions(rates))
      .catch(error => {
        console.error('Failed to initialize currency converter:', error);
      });
  }
  
  // Start the currency converter after the page has loaded
  window.addEventListener('load', initializeConverter);
  