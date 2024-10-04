import { parse } from "csv";
import * as fs from "fs";
import _ from "lodash";
import * as path from "path";
import { fileURLToPath } from "url";

// https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Sheet URL: https://docs.google.com/spreadsheets/d/{ID}/edit
 * CSV columns:
 * Section, Key, English, Arabic
 */
const locales = ["en", "ar"] as const;
const inMemoryTranslationFiles = {};

const LANGUAGES_COLUMN_STARTING_INDEX = 2;

const getTranslationFilePath = (locale: string) => {
    return path.resolve(__dirname, "../public/locales", locale, "translation.json");
};

const readTranslationFilesIntoMemory = () => {
    for (const key of locales) {
        const filepath = getTranslationFilePath(key);
        const file = fs.readFileSync(filepath, "utf-8");

        inMemoryTranslationFiles[key] = JSON.parse(file);
    }
};

const writeNewTranslationsToDisk = () => {
    Object.entries(inMemoryTranslationFiles).map(([key, value]) => {
        const filepath = getTranslationFilePath(key);
        fs.writeFile(filepath, JSON.stringify(value), (error) => {
            if (error) console.log(error);
            else console.log(`✅ Successfully written to ${filepath}`);
        });
    });
};

const main = () => {
    readTranslationFilesIntoMemory();
    const stream = fs.createReadStream(path.resolve(__dirname, "translation_from_excel.csv"));

    stream
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (row: string[]) => {
            const translationKey = row[1];
            if (!translationKey) return;

            for (let i = LANGUAGES_COLUMN_STARTING_INDEX; i < row.length; i++) {
                const langKey = locales[i - 2];
                const translationString = row[i];

                const translationFile = inMemoryTranslationFiles[langKey];
                _.set(translationFile, translationKey, translationString);
            }
        })
        .on("end", writeNewTranslationsToDisk)
        .on("error", (error) => console.log(error.message));
};

main();
