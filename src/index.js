const { compareImages, areDifferent } = require("./utils/img_diff");
const { captureImage } = require("./utils/node_webcam");
const { initCaptureVideo, closeBrowser } = require("./utils/puppeteer");

let count = 0;
let currentlyRecording = false;

setInterval(async () => {
  try {
    if (count < 2) {
      count += 1;
      captureImage(`records/img_check/image${count}`);
    } else {
      count = 0;

      const imageDiffs = await compareImages([
        "records/img_check/image1.jpg",
        "records/img_check/image2.jpg",
      ]);
      console.log(imageDiffs);
      const trueDiffs = areDifferent(imageDiffs);

      if (trueDiffs) {
        if (!currentlyRecording) {
          const captureVideo = await initCaptureVideo();
          if (captureVideo === "OK") {
            currentlyRecording = true;
          }
        }
        return;
      } else {
        if (currentlyRecording) {
          await closeBrowser();
          currentlyRecording = false;
        }
      }
    }
    console.log(currentlyRecording);
  } catch (error) {
    console.log(error);
    currentlyRecording = false;
  }
}, 5000);

// const { launch, getStream } = require("puppeteer-stream");
// const fs = require("fs");

// const file = fs.createWriteStream(__dirname + "/test.webm");

// async function test() {
//   const browser = await launch({
//     defaultViewport: {
//       width: 1920,
//       height: 1080,
//     },
//   });

//   const page = await browser.newPage();
//   await page.goto("http://localhost:3000");
//   const stream = await getStream(page, { audio: true, video: true });
//   console.log("recording");

//   stream.pipe(file);
//   setTimeout(async () => {
//     await stream.destroy();
//     file.close();
//     console.log("finished");
//   }, 1000 * 10);
// }

// test();
