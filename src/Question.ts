import readline from "node:readline";

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const question = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    reader.question(question, resolve);
  });
};