#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('npx create-bch-modyo my-app');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/chescobar2brains/bch_modyo_base";

try {
    fs.mkdirSync(projectPath);
} catch (err) {
    if (err.code === 'EXIST') {
        console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
        console.log(error);
    }
    process.exit(1);
}

const changeNameWidget = () => {
    const envFile = fs.readFileSync('.env', 'utf-8')
    const newEnv = envFile.replace('ID-TO-RENDER-CONTENT', projectName).replace('NAME-OF-WIDGET', projectName)
    fs.writeFileSync('.env', newEnv, 'utf-8')
    console.log('Updated environment variables');

}

async function main() {
    try {
        console.log('Downloading files...');
        execSync(`git clone ${git_repo} ${projectPath}`);

        process.chdir(projectPath);
        changeNameWidget();

        console.log('Installing dependencies...');
        execSync('npm install');

        console.log('Removing useless files...');
        execSync('npx rimraf ./.git');

        console.log('The installation is done, this is ready to use !');
        console.log('Thanks for use it!')

    } catch (error) {
        console.log(error);
    }
}
main();