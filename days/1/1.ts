import {promises as fs} from 'fs';

async function readFile(): Promise<number[][]> {
    try {
        const data = await fs.readFile('input.txt', 'utf-8');
        return data
            .split('\n')
            .map((line) => line
                .trim()
                .split('   ')
                .map((id) => parseInt(id, 10)));
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
}

const content: number[][] = await readFile();
const list1 = content.map((list) => list[0]);
list1.sort((a, b) => a - b);
const list2 = content.map((list) => list[1]);
list2.sort((a, b) => a - b);

let sum = 0;

for (let i = 0; i < list1.length; i++) {
    sum += Math.abs(list1[i] - list2[i]);
    console.log(sum);
}

console.log(`Part 1: ${sum}`);

sum = 0;
for (const id of list1) {
    sum += list2.filter((id2) => id2 === id).length *  id;
}
console.log(`Part 2: ${sum}`);
