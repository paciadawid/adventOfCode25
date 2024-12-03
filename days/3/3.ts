import {promises as fs} from 'fs';

async function readFile(): Promise<string> {
    try {
        const data = await fs.readFile('input.txt', 'utf-8');
        return data
            .trim();
    } catch (err) {
        console.error('Error reading the file:', err);
        return '';
    }
}

const memory = await readFile();

console.log(memory);
const validMultipliers: string[] | null = memory.match(/mul\(\d+,\d+\)/ig);

let product = 0;
if (validMultipliers) {
    for (const validMultiplier of validMultipliers) {
        const numbers: string[] | null = validMultiplier.match(/\d+/ig);
        if (numbers && numbers.length === 2) {
            product += Number(numbers[0]) * Number(numbers[1]);
        }
    }
}

const instructions: string[] | null = memory.match(/do(n't)?|mul\(\d+,\d+\)/ig);

let executeNextInstruction = true;

let product2 = 0;
if (instructions) {
    for (const instruction of instructions) {
        if (instruction === 'do') {
            executeNextInstruction = true;
        } else if (instruction === 'don\'t') {
            executeNextInstruction = false;
        } else if (executeNextInstruction) {
            const numbers: string[] | null = instruction.match(/\d+/ig);
            if (numbers && numbers.length === 2) {
                product2 += Number(numbers[0]) * Number(numbers[1]);
            }
        }
    }
}
console.log(`Part 1: ${product}`);
console.log(`Part 2: ${product2}`);
