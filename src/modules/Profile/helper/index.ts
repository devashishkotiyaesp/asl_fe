export function parseAddress(fullAddress: string) {
  const parts = fullAddress.split(',');

  const streetAddress = parts[0]?.trim() || '';
  const city = parts[1]?.trim() || '';
  const pinPart = parts[2]?.split('-').map((item) => item.trim());

  const stateCountry = pinPart?.[0] || '';
  const pin = pinPart?.[1] || '';

  return {
    address: streetAddress,
    city,
    country: stateCountry,
    pin,
  };
}

export function combineAddress(
  address: string,
  city: string,
  country: string,
  pin: string
) {
  return `${address}, ${city}, ${country} -${pin}`;
}
