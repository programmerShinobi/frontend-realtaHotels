export function maskCardNumber(cardNumber: any): string {
	// Mengambil 4 digit terakhir
	const lastFourDigits = cardNumber?.toString().slice(-4);
	// Mengganti semua digit, kecuali 4 digit terakhir, dengan karakter "*"
	const maskedDigits = cardNumber?.toString().slice(8, -4).replace(/\d/g, "*");
	// Menggabungkan digit yang telah diubah dengan 4 digit terakhir
	return `${maskedDigits} ${lastFourDigits}`;
}

export function money(balance: any): string {
    const formattedMoney = typeof balance == 'string' ? `IDR ${Number(balance)?.toLocaleString()}` : `IDR ${balance?.toLocaleString()}`
    return formattedMoney
}

export function cardNumber(number: any): string {
    return number?.toString().replace(/(.{4})/g, "$1 ")
}