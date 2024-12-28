export const getRange = (maxNumber: number): string[] => {
    if (maxNumber <= 0) {
        throw new Error("Number must be greater than 0");
    }

    // Determine the minimum unit based on the magnitude of maxNumber
    let step: number;
    if (maxNumber >= 1000) {
        step = 1000;
    } else if (maxNumber >= 100) {
        step = 100;
    } else if (maxNumber >= 10) {
        step = 10;
    } else {
        step = 1;
    }

    // Calculate the multiples of step within the range
    const result: string[] = [];
    for (let i = step; i <= maxNumber; i += step) {
        result.push(String(i)); // Convert to string
        if (result.length === 5) break; // Limit to 5 elements
    }

    // Ensure the result has exactly 5 elements by adjusting if necessary
    if (result.length < 5) {
        let lastValue = Number(result[result.length - 1]) || step;
        while (result.length < 5) {
            lastValue += step;
            result.push(String(lastValue));
        }
    }

    return result;
};
