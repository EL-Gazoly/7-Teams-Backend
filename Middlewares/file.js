const {parse, join} = require("path");
const {createWriteStream} = require("fs");

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
