export const formatHash=(text:string)=> {
    // Check if the input is a string and has more than 8 characters
    if (typeof text !== 'string' || text.length <= 8) {
        return text; // Return the original string if conditions are not met
    }

    const firstFour = text.slice(0, 4);
    const lastFour = text.slice(-4);

    return `${firstFour}...${lastFour}`;
}
