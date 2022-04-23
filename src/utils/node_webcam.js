const NodeWebcam = require("node-webcam");

const opts = {
  width: 1280,
  height: 720,
  quality: 100,
  frames: 60,
  delay: 0,
  saveShots: true,
  output: "jpeg",
  // device: "HD Pro Webcam C920",
  device: "FaceTime HD Camera",
  callbackReturn: "location",
  verbose: false,
};

//Creates webcam instance
const Webcam = NodeWebcam.create(opts);

const getWebcamList = () => {
  return Webcam.list(function (list) {
    return NodeWebcam.create({ device: list[1] });
  });
};

const captureImage = (target) => {
  Webcam.capture(target, function (err, data) {});
};

module.exports = {
  captureImage,
  getWebcamList,
  Webcam,
};
