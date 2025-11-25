export type Result = 'underweight' | 'normal weight' | 'overweight' | 'obesidy';

export const calculateBmi = (height: number, weight: number): Result => {
    const bmi = weight / (height/100 * height/100);

    if (bmi < 18.5) {
        return 'underweight';
    } else if (bmi < 25) {
        return 'normal weight';
    } else if (bmi < 30) {
        return 'overweight';
    } else {
        return 'obesidy';
    }
}

/*try {
    const height: number = Number(process.argv[2])
    const weight: number = Number(process.argv[3])
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}*/