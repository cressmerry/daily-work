const { text } = require("stream/consumers");

const fs = require("fs").promises;
function readFileWithPromise() {
    const promise = fs.readFile("data1.txt", "utf-8");
    // promise.then(function(text){ console.log(text)});
    promise.then((text)=>{ console.log(text)});
    promise.catch(error=> console.log('error happened'));
}

async function readFile() {
  try {
    const data = await fs.readFile("data.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

function writeFile() {
  try {
    fs.writeFile("data1.txt", "I am good at nodejs");
  } catch (error) {
    console.log(error);
    
  }
  // try {
  //   await fs.writeFile("data.txt", "Async Await Example");
  //   console.log("File written");
  // } catch (err) {
  //   console.error(err);
  // }
}

async function appendFile() {
  await fs.appendFile("data.txt", "\nAppending...");
}

async function deleteFile() {
  await fs.unlink("data.txt");
}
writeFile();
// readFileWithPromise();
