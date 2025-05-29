export const renderAmountWithCurrency = (amount, currency) => {
     let amt, currencyObj;
     if (!amount || amount === 0) {
          amt = 0;
     } else {
          amt = amount?.toString().split(",").join("");
     }

     const minimumFractionDigits = getMinimumFractionDigits(currency);

     let res;

     if (currency !== "undefined") {
          if (isCryptocurrency(currency)) {
               // For cryptocurrencies, simply append the currency code
               res = `${Number(amt).toFixed(minimumFractionDigits)} ${currency}`;
          } else {
               // For standard currencies, use the toLocaleString method
               const useCurrency = currency || "USD";
               const locale = countryLocales?.[useCurrency] ? countryLocales?.[useCurrency] : countryLocales?.USD;

               res = Number(amt).toLocaleString(locale, {
                    style: "currency",
                    currency: useCurrency || "USD",
                    minimumFractionDigits: minimumFractionDigits,
               });
          }
     }

     const getMinimumFractionDigits = (currency) => {
          // Add the list of cryptocurrencies you support here
          const cryptocurrencies = getSupportedCryptocurrencies();
          if (cryptocurrencies.includes(currency)) {
               return 8;
          }
          return 2;
     };

     return res;
};
