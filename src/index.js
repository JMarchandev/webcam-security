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
