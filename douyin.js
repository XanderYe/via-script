/*
 * @name: 抖音视频下载
 * @Author: XanderYe
 * @version: 0.1
 * @description: 添加抖音下载视频按钮，支持去水印
 * @include: www.douyin.com
 * @createTime: 2021-06-28 18:00
 * @updateTime: 2021-06-28 18:00
 */
(function () {
  const key = encodeURIComponent('抖音视频下载:执行判断');
  if (window[key]) {
    return;
  }
  try {
    window[key] = true;
    document.addEventListener("readystatechange", () => {
      var downloadBtn = document.getElementsByClassName("right-text--GeDvB").item(2);
      downloadBtn.innerHTML = "下载视频";
      downloadBtn.addEventListener("click", () => {
        console.log("下载视频");
      })
    }, {'passive': true, 'once': true});
  } catch (err) {
    console.log('抖音视频下载：', err);
  }
})();