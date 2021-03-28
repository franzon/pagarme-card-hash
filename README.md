# pagarme-card-hash

💳 JavaScript library for generating Pagar.me card hashes.

This library replaces [react-native-pagarme-card-hash](https://github.com/franzon/react-native-pagarme-card-hash), which only supports react-native.

## Support

- Node.js >= `6`
- React Native >= `0.64.0`* 
- React Native (Expo) >= `40.0.0`*
- Browser (Chrome) >= `89`

\* Not tested on iOS.

## Installation

```sh
yarn add pagarme-card-hash
```

## Usage

```js
import { generateCardHash } from 'pagarme-card-hash';

const hash = await generateCardHash(
    {
        number: '5315084062046316',
        holderName: 'John Doe',
        expirationDate: '0921',
        cvv: '560',
    },
    '<your encryption key>'
);
```

> ⚠️ **If you're coming from `react-native-pagarme-card-hash`:** The function `generateCardHash` is no longer a default export. You should use curly braces in your import/require statement.

## Testing

```sh
ENCRYPTION_KEY=<your TEST encryption key> API_KEY=<your TEST API key> yarn test
```

> ⚠️ Make sure you are using the **test** api keys. **The testing script will create a credit card in your account**.

## Contributing

For now, you can contribute by testing the library on more platforms (iOS, previous react-native versions, another browsers). After testing, you can open a pull-request updating the Support section in this file.

## License

MIT