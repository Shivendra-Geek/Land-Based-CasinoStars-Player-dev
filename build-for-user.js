module.exports = { buildForUser };

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const AES = require('crypto-js/aes');
const Utf8 = require('crypto-js/enc-utf8');

function buildForUser(username) {
    const baseDir = process.cwd(); 
    const configPath = path.join(baseDir, 'src-tauri', 'tauri.conf.json');
    const config = JSON.parse(fs.readFileSync(configPath));
    console.log(configPath, 'configPath');
    // console.log(path, 'configPath');


    // config.productName = `App-${username}`;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    execSync('npm run tauri-export', { stdio: 'inherit' });
    execSync('npx tauri build', { stdio: 'inherit' });

    const msiDir = path.join(baseDir, 'src-tauri', 'target', 'release', 'bundle', 'msi');
    const files = fs.readdirSync(msiDir);
    const msiFile = files.find((file) => file.endsWith('.msi'));

    if (!msiFile) {
        throw new Error('No .msi file found in MSI output folder');
    }

    const sourcePath = path.join(msiDir, msiFile);
    const targetPath = path.join(baseDir, 'public', 'builds', `${username}.msi`);

    if (!fs.existsSync(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    }

    fs.renameSync(sourcePath, targetPath);

    return `/builds/${username}.msi`;
}

module.exports = { buildForUser };

// const fs = require('fs');
// const path = require('path');
// const { execSync } = require('child_process');
// const AES = require('crypto-js/aes');
// const Utf8 = require('crypto-js/enc-utf8');

// function buildForUser(username) {
//     const baseDir = process.cwd(); // Replaces __dirname
//     const configPath = path.join(baseDir, 'src-tauri', 'tauri.conf.json');
//     console.log(configPath, 'configPath');

//     // Uncomment and modify as needed
//     const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
//     // config.productName = `App-${username}`;
//     fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
//     // execSync('next export', { stdio: 'inherit' });
//     // execSync('npx next build && npx next export -o out', { stdio: 'inherit' });
//     execSync('npm run tauri-export', { stdio: 'inherit' });
//     // Then: Build the Tauri app
//     execSync('npx tauri build', { stdio: 'inherit' });

//     const msiDir = path.join(baseDir, 'src-tauri', 'target', 'release', 'bundle', 'msi');
//     const files = fs.readdirSync(msiDir);
//     const msiFile = files.find((file) => file.endsWith('.msi'));

//     if (!msiFile) {
//         throw new Error('No .msi file found in MSI output folder');
//     }

//     const sourcePath = path.join(msiDir, msiFile);
//     const targetPath = path.join(baseDir, 'public', 'builds', `${username}.msi`);

//     if (!fs.existsSync(path.dirname(targetPath))) {
//         fs.mkdirSync(path.dirname(targetPath), { recursive: true });
//     }

//     fs.renameSync(sourcePath, targetPath);

//     return `/builds/${username}.msi`;
// }

// module.exports = { buildForUser };
