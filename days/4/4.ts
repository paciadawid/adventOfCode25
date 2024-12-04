import {promises as fs} from 'fs';

async function readFile(): Promise<string[]> {
    try {
        const data = await fs.readFile('input.txt', 'utf-8');
        return data
            .trim().split('\n');
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
}

const findXmas = (text: string): string[] => {
    return [...text.matchAll(/(?=(XMAS|SAMX))/g)].map((match) => match[1]);
};

const transformMatrix = (matrix: string[]) => {
    const newMatrix = Array(matrix[0].length).fill('');
    matrix.forEach((row) => {
        Array.from(row).forEach((letter, x) => {
            newMatrix[x] += letter;
        });
    });
    return newMatrix;
};

const createDiagonal = (matrix: string[]): string[] => {
    const maxY = matrix.length;
    const maxX = matrix[0].length;
    const newMatrix = Array(maxX + maxY).fill('');
    for (let y = -matrix.length; y < matrix.length; y++) {
        for (let x = -matrix[0].length; x < matrix[0].length; x++) {
            if (x < maxX && y <= maxY && y >= 0 && x >= 0) {
                newMatrix[x + y] += matrix[y][x];
            }
        }
    }
    const newMatrix2 = Array(maxX + maxY).fill('');
    for (let y = -matrix.length; y < matrix.length; y++) {
        for (let x = matrix[0].length; x > -matrix[0].length; x--) {
            if (x < maxX && y <= maxY && y >= 0 && x >= 0) {
                newMatrix2[maxX - x + y] += matrix[y][x];
            }
        }
    }
    return [...newMatrix, ...newMatrix2];
};

const memory = await readFile();

let countXmas = 0;
for (const line of [...memory, ...transformMatrix(memory), ...createDiagonal(memory)]) {
    countXmas += findXmas(line).length;
}
console.log(`Part1: ${countXmas}`);

let countMas = 0;

for (let y = 0; y < memory.length - 2; y++) {
    for (let x = 0; x < memory[0].length - 2; x++) {
        const diagonal1 = memory[y][x] + memory[y + 1][x + 1] + memory[y + 2][x + 2];
        const diagonal2 = memory[y + 2][x] + memory[y + 1][x + 1] + memory[y][x + 2];
        if (['MAS', 'SAM'].includes(diagonal1) && ['MAS', 'SAM'].includes(diagonal2)) {
            countMas++;
        }
    }
}

console.log(`Part2: ${countMas}`);
