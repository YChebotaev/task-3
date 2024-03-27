const webkitGetUserMedia = Reflect.get(navigator, "webkitGetUserMedia");

webkitGetUserMedia.call(
  navigator,
  { audio: true, video: false },
  console.log,
  console.error,
);
