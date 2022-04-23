const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

let browser = null;
let recorder = null;

const config = {
  followNewTab: true,
  fps: 25,
  videoFrame: {
    width: 1024,
    height: 768,
  },
  aspectRatio: '16:9',
};


const launchBrowser = async (headless = false) => {
  try {
    const instanceBrowser = await puppeteer.launch({
      headless,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--use-fake-ui-for-media-stream",
      ],
    });
    browser = instanceBrowser;

    console.log("browser launched");
    return instanceBrowser;
  } catch (error) {
    console.log(error);
  }
};

const openNewPage = async (browser) => {
  try {
    const page = await browser.newPage();

    console.log("page opened");
    return page;
  } catch (error) {
    console.log(error);
  }
};

const goTo = async (page, url) => {
  try {
    await page.goto(url, { waitUntil: "networkidle0" });
    console.log(`url moved to ${url}`);
    return;
  } catch (error) {
    console.log(error);
  }
};

const closeBrowser = async () => {
  try {
    if (browser) {
      await recorder.stop();
      await browser.close();
      console.log("recorder stopped; browser close");
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

// const captureStream = async (page) => {
//   try {
//     const file = fs.createWriteStream(`${Date.now()}.webm`);

//     stream = await getStream(page, { audio: true, video: true });
//     console.log("recording");
//     stream.pipe(file);
//     return file;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const stopCaptureStream = async () => {
//   try {
//     if (stream) {
//       await stream.destroy();
//       file.close();
//       console.log("finished");
//     }
//     return;
//   } catch (error) {
//     console.log(error);
//   }
// };

const initCaptureVideo = async () => {
  try {
    const browser = await launchBrowser();
    const page = await openNewPage(browser);

    recorder = new PuppeteerScreenRecorder(page, config);
    console.log("recorder setted");
    await recorder.start(`${Date.now()}.mp4`); // supports extension - mp4, avi, webm and mov
    console.log('record started');

    await goTo(page, "http://localhost:3000");

    await page.evaluate(async () => {
      return ((await navigator.permissions.query({ name: "camera" })).state =
        "granted");
    });
    console.log("camera allowed");

    return "OK";
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  initCaptureVideo,
  closeBrowser,
  // stopCaptureStream,
};
