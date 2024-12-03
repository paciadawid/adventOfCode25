import {promises as fs} from 'fs';

async function readFile(): Promise<number[][]> {
    try {
        const data = await fs.readFile('input.txt', 'utf-8');
        return data
            .trim()
            .split('\n')
            .map((line) => line
                .trim()
                .split(' ')
                .map((id) => parseInt(id, 10)));
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
}

const checkPairValidity = (a: number, b: number, ascending: boolean): boolean => {
    return (0 < b - a && b - a <= 3 && ascending) || (0 > b - a && b - a >= -3 && !ascending);
};

const checkSequenceValidity = (levels: number[]): [boolean, number] => {
    let ascending;
    if (checkPairValidity(levels[0], levels[1], true)) {
        ascending = true;
    } else if (checkPairValidity(levels[0], levels[1], false)) {
        ascending = false;
    } else {
        return [false, 1];
    }
    for (let i = 2; i < levels.length; i++) {
        if (!checkPairValidity(levels[i - 1], levels[i], ascending)) {
            return [false, i];
        }
    }
    return [true, -1];
};

const content: number[][] = await readFile();

let validReportsNoTolerance = 0;
let validReportsWithTolerance = 0;

content.forEach((levels) => {
    let isValidWithTolerance = true;
    const [isValid] = checkSequenceValidity(levels);

    if (!isValid) {
        isValidWithTolerance = false;
        for (let j = 0; j < levels.length; j++) {
            if (checkSequenceValidity(levels.filter((_, index) => index !== j))[0]) {
                isValidWithTolerance = true;
                break;
            }
        }

    }

    validReportsNoTolerance += Number(isValid);
    validReportsWithTolerance += Number(isValidWithTolerance);
    // console.log(...levels, isValid, isValidWithTolerance);
});

console.log(`Part 1: ${validReportsNoTolerance}`);
console.log(`Part 2: ${validReportsWithTolerance}`);
