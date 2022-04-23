const { VideoCapture } = require("camera-capture");
const fs = require("fs");
const c = new VideoCapture();

const recordVideo = async () => {
  await c.initialize();
  await c.startRecording();
  setInterval(() => console.log("hello"), 10000);
  const data = await c.stopRecording();
  fs.writeFileSync(`${Date.now()}.webm`, data);
};

module.exports = {
  recordVideo,
};
