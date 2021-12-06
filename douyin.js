/*
 * @name: 抖音视频下载
 * @Author: XanderYe
 * @version: 0.1
 * @description: 添加抖音下载视频按钮，支持去水印下载，点击下载视频后跳转到源视频地址，via可以右下角保存视频。
 * @include: www.iesdouyin.com
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
      init();

      function init() {
        if (document.querySelectorAll("div[class^=avatar-container]").length > 0) {
          inject();
        } else {
          setTimeout(() => {
            init();
          }, 100);
        }
      }

      function inject() {
        let oldImgDom = document.getElementsByClassName("d-icon").item(1);
        let imgSrc = oldImgDom.src;
        oldImgDom.remove();
        document.querySelectorAll("p[class^=right-text]").item(2).remove();
        var imageDom = document.createElement("img");
        imageDom.src = imgSrc;
        imageDom.className = "d-icon";
        let pDom = document.createElement("p");
        pDom.innerText = "下载视频";
        pDom.style.cssText = "font-weight: 500;font-size: 0.26rem;line-height: 0.36rem;text-shadow: 0 1px 1px rgba(22,24,35,.2);margin-bottom: 0.32rem;";
        var parent = document.querySelectorAll("div[class^=right]").item(0)
        parent.append(imageDom);
        parent.append(pDom);
        imageDom.addEventListener("click", () => {
          console.log("下载视频");
          download();
        })
        pDom.addEventListener("click", () => {
          console.log("下载视频");
          download();
        })
      }

      function download() {
        let filename = document.querySelector("p[class^=desc]").innerHTML + ".mp4";
        let downUrl = confirm("是否下载去水印视频？") ? getVideoUrlWithoutWatermark() : getVideoUrl();
        let a = document.createElement("a");
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.href = downUrl;
        a.click();
        a.remove();
      }

      function getVideoUrlWithoutWatermark() {
        return getVideoUrl().replace("playwm", "play");
      }

      function getVideoUrl() {
        let videoPlayer = document.querySelector("video[class^=video-player]");
        return videoPlayer.src;
      }
    }, {'passive': true, 'once': true});
  } catch (err) {
    console.log('抖音视频下载：', err);
  }
})();
