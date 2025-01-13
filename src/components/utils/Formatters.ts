import { formatUnits } from "viem";
import { Token } from "./Types";

export const getFormattedBalance=(activeToken:Token|null) => {
  console.log(activeToken)
    if (!activeToken?.balance) return "0";
    return parseFloat(formatUnits(activeToken.balance, activeToken.decimals)).toFixed(4);
  }


  export const formatPhoneNumber = (countryCode:string, phoneNumber:string) => {
		const prefix = countryCode?.slice(1);
		const formattedNumber = phoneNumber.startsWith("0")
			? phoneNumber.slice(1)
			: phoneNumber;

		// Prepend 234 country code
		return `${prefix}${formattedNumber}`;
	};

	export const  removeFirstWord=(str:string)=> {
		// Split the string into words
		let words = str.split(' ');
		
		// Remove the first word and join the rest back into a string
		words.shift();  // Removes the first word
		return words.join(' ');  // Joins the remaining words back into a string
	}
	