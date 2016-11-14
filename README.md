## Create config

To configure Facebook, Stripe and OpenExchange create a ```server/config.json``` with the following format:
```{
  "facebookClientId": "",
  "facebookClientSecret": "",
  "stripeKey": "",
  "openExchangeRatesKey": ""
}```

## Install dependencies & setup

Run ```npm install``` on both project's root and server directories.
Also run ```gulp browserify``` on project's root directory.

## Run

Change to ```server``` directory and execute ```node index.js```.