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
        if (document.querySelectorAll("div[class^=img-container]").length > 0) {
          inject();
        } else {
          setTimeout(() => {
            init();
          }, 100);
        }
      }

      function inject() {
        let oldDivDom = document.querySelectorAll("div[class^=img-container]").item(8);
        let divStyle = oldDivDom.style.cssText;
        oldDivDom.remove();
        document.querySelectorAll("p[class^=right-text]").item(2).remove();
        var divDom = document.createElement("div");
        divDom.style.cssText = divStyle;
        divDom.style.setProperty("width", "1.06667rem");
        divDom.style.setProperty("height", "1.06667rem");
        divDom.style.setProperty("background-position", "center center");
        divDom.style.setProperty("background-repeat", "no-repeat");
        let pDom = document.createElement("p");
        pDom.innerText = "下载视频";
        pDom.style.cssText = "font-weight: 500;font-size: 0.34667rem;line-height: 0.48rem;text-shadow: 0 1px 1px rgba(22,24,35,0.2);margin-bottom: 0.42667rem;";
        var parent = document.querySelectorAll("div[class^=right]").item(0)
        parent.append(divDom);
        parent.append(pDom);
        divDom.addEventListener("click", () => {
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
