const {parse, join} = require("path");
const {createWriteStream, unlink} = require("fs");


module.exports.readFile = async (file) => {
    const {createReadStream, filename} = await file;
    const stream = createReadStream();
    var {ext, name} = parse(filename);
    name = `image${Math.floor((Math.random() * 10000) + 1)}`;
    let url = join(__dirname, `../public/${name}-${Date.now()}${ext}`);
    const imageStream = await createWriteStream(url)
    await stream.pipe(imageStream);
    url = `/public${url.split('public')[1]}`;
    return url;
}

module.exports.readFileExcel = async (file) => {
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    const { ext, name } = parse(filename);
    const randomNum = Math.floor((Math.random() * 10000) + 1);
    const newName = `file${randomNum}-${Date.now()}${ext}`;
    const filePath = join(__dirname, `../excel/${newName}`);
  
    return new Promise((resolve, reject) => {
      const fileStream = createWriteStream(filePath);
  
      fileStream.on('error', (err) => {
        reject(err);
      });
  
      fileStream.on('finish', () => {
        const url = `excel${filePath.split('excel')[1]}`;
        resolve(url);
      });
  
      stream.pipe(fileStream);
    });
  };