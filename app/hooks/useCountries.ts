import countries from 'world-countries';

// Function to convert country code to flag emoji
const getFlagEmoji = (code: string): string => {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

// Define the type for formatted country data
export type CountryData = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

// Create an array of formatted countries
const formattedCountries: CountryData[] = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: getFlagEmoji(country.cca2), // Generate flag from code
  latlng: country.latlng,
  region: country.region,
}));

// Define the useCountries hook
const useCountries = () => {
    console.log(formattedCountries);
    
  const getAll = (): CountryData[] => formattedCountries;

  const getByValue = (value: string): CountryData | undefined => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
