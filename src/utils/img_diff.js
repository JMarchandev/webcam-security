const { imgDiff } = require("img-diff-js");

const compareImages = async (targets) => {
  try {
    return await imgDiff({
      actualFilename: targets[0],
      expectedFilename: targets[1],
    });
  } catch (error) {
    console.error(error);
  }
};

const areDifferent = (compareImageObject) => {
  if (!compareImageObject.imagesAreSame) {
    if (compareImageObject.diffCount < 5000) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};

module.exports = {
  compareImages,
  areDifferent,
};
