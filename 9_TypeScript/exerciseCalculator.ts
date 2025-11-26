/*interface ExerciseValues {
  hours: number[];
  target: number;
}*/

/*const parseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    let hours: number[];
    try {
        hours = JSON.parse(args[2]) as number[];
        if (!Array.isArray(hours)) {
            throw new Error();
        }
        if (hours.some(h => isNaN(h))) {
            throw new Error();
        }
    } catch {
        throw new Error('Hours must be a JSON array of numbers');
    }

    const target = Number(args[3]);
    if (isNaN(target)) {
        throw new Error('Target must be a number');
    }

    return { hours, target };
};*/

export const calculateExercises = (hours: number[], target: number) => {

    const periodLenght = hours.length;

    let sumHours = 0;
    let trainingDays = 0; 
    let rating = 1;
    let success = false;
    let ratingDescription = '';

    for (let i = 0; i < periodLenght; i++) {
        if (hours[i] > 0) {
            trainingDays++;
            sumHours += hours[i];
        }
    }

    const average = sumHours/periodLenght;
    if ( average < (target/2) ){
        ratingDescription = 'You will do better next week';
    } else if ( average === (target/2) ) {
        rating = 2;
        ratingDescription = 'Good effort';
    } else {
        rating = 3;
        success = true;
        ratingDescription = 'You are amazing! Keep working hard and you will get there!!!';
    }

    return {
        'periodLength': periodLenght,
        'trainingDays': trainingDays,
        'success': success,
        'rating': rating,
        'ratingDescription': ratingDescription,
        'target': target,
        'average': average
    };
};

/*try {
    const { hours, target } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}*/