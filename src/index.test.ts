import axios from 'axios';
import {generateCardHash} from '.';

const {ENCRYPTION_KEY, API_KEY} = process.env;

if (!ENCRYPTION_KEY) {
	throw new Error('Please provide an ENCRYPTION_KEY for testing.');
}

if (!API_KEY) {
	throw new Error('Please provide an API_KEY for testing.');
}

test('It creates a card', async () => {
	const cardHash = await generateCardHash({
		number: '5315084062046316',
		holderName: 'John Doe',
		expirationDate: '0921',
		cvv: '560'
	}, ENCRYPTION_KEY);

	expect(cardHash).not.toBeNull();

	const {data} = await axios.post('https://api.pagar.me/1/cards', {
		api_key: API_KEY,
		card_hash: cardHash
	});

	expect(data).toHaveProperty('id');
});
