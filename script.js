const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const componentsDir = path.join(__dirname, 'src', 'components');
const imagesDir = path.join(__dirname, 'src', 'assets', 'images');

function findImagesInDir(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            results = results.concat(findImagesInDir(fullPath));
        } else if (fullPath.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const regex = /import\s+.*?from\s+['"]@\/assets\/images\/(.*?\.(png|jpe?g))['"]/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const imgName = match[1];
                const imgPath = path.join(imagesDir, imgName);
                if (fs.existsSync(imgPath)) {
                    const dimensions = sizeOf(imgPath);
                    results.push({
                        component: path.relative(componentsDir, fullPath),
                        image: imgName,
                        width: dimensions.width,
                        height: dimensions.height
                    });
                }
            }
            
            // Also check for <img src="/..." /> or next/image src="/..."
            const regex2 = /src=['"]\/(.*?\.(png|jpe?g))['"]/g;
            while ((match = regex2.exec(content)) !== null) {
                const imgName = match[1];
                const imgPath = path.join(__dirname, 'public', imgName);
                if (fs.existsSync(imgPath)) {
                    const dimensions = sizeOf(imgPath);
                    results.push({
                        component: path.relative(componentsDir, fullPath),
                        image: imgName,
                        width: dimensions.width,
                        height: dimensions.height
                    });
                }
            }
        }
    }
    return results;
}

const images = findImagesInDir(componentsDir);
console.log(JSON.stringify(images, null, 2));
