import axios from 'axios';
import {hextob64, KEYUTIL, KJUR, RSAKey} from 'jsrsasign';
import qs from 'qs';

interface CardHashKey {
	id: number;
	publicKey: string;
}
interface Card {
	number: string;
	holderName: string;
	expirationDate: string;
	cvv: string;
}

async function requestCardHashKey(encryptionKey: string): Promise<CardHashKey> {
	const {
		data: {id, public_key: publicKey}
	} = await axios.get('https://api.pagar.me/1/transactions/card_hash_key', {
		params: {encryption_key: encryptionKey}
	});

	return {
		id,
		publicKey
	};
}

function generateQueryString(card: Card) {
	return qs.stringify({
		card_number: card.number.replace(/\D/g, ''),
		card_holder_name: card.holderName,
		card_expiration_date: card.expirationDate.replace(/\D/g, ''),
		card_cvv: card.cvv.replace(/\D/g, '')
	});
}

function encryptAndEncodeInBase64(queryString: string, publicKey: string): string {
	const key = KEYUTIL.getKey(publicKey) as RSAKey;

	const encrypted = KJUR.crypto.Cipher.encrypt(queryString, key, 'RSA');

	return hextob64(encrypted);
}

export async function generateCardHash(
	card: Card,
	encryptionKey: string
): Promise<string> {
	const cardHashKey = await requestCardHashKey(encryptionKey);
	const queryString = generateQueryString(card);
	const encrypted = encryptAndEncodeInBase64(queryString, cardHashKey.publicKey);

	return `${cardHashKey.id}_${encrypted}`;
}
