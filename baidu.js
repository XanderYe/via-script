/*
 * @name: 百度优化+百家号自动展开
 * @Author: Sky
 * @version: 3.7
 * @description: 优化=去广告+去重定向
 * @include: *
 * @createTime: 2020-4-10 17:30
 * @updateTime: 2021-3-18 1:10
 */
(function () {
  const whiteList = ['m.baidu.com', 'www.baidu.com', 'baijiahao.baidu.com', 'mbd.baidu.com'],
    key = encodeURIComponent('百家号自动展开:执行判断'), flag = whiteList.indexOf(location.hostname) < 0;
  if (flag || window[key]) {
    return;
  }
  try {
    window[key] = true;

    function setTurnPage(cssStr) {
      for (let n of document.querySelectorAll(cssStr)) {
        n.addEventListener('click', (e) => {
          e.stopPropagation();
        }, {'passive': true, 'capture': true})
      }
    }

    document.addEventListener('readystatechange', () => {
      const css = document.createElement('style');
      css.innerText = '#content_wrapper .mainContent{height:auto!important;}#content_wrapper .oPadding,.contentMedia .openImg, #content_wrapper .bottomMargin, .wrap#page_wrapper>div>:not(#content_wrapper):not(:nth-last-child(4)), #content_wrapper .headDeflectorContainer{display:none;}';
      if (location.hostname == 'm.baidu.com' || location.hostname == 'www.baidu.com') {
        css.innerText += '.na-ec-item,.ec_ad_results{height:0;padding:0;overflow:hidden;}#header>:last-child,.blank-frame{display:none;}';
        for (let n of document.querySelectorAll('#page #page-bd #results .result')) {
          try {
            const realUrl = JSON.parse(n.dataset.log.replace(/'/gm, '"')).mu, article = n.querySelector('article');
            if (realUrl && article.getAttribute('rl-link-href')) {
              article.setAttribute('rl-link-href', realUrl);
              n.querySelectorAll('a').forEach((a) => {
                a.href = realUrl;
              });
            }
          } catch (e) {
          }
        }
        setTurnPage('.new-nextpage-only,.new-pagenav-left,.new-pagenav-right');
        for (let a of document.querySelectorAll('.search-link')) {
          a.classList.remove('search-link');
        }
        setTimeout(() => {
          for (let a of document.querySelectorAll('.hint-rcmd-item-container>[data-url]')) {
            a.removeAttribute('data-url');
          }
        }, 2500);
      } else if (location.hostname == 'baijiahao.baidu.com') {
        let checkCount = 0;
        var checkTimer = setInterval(function () {
          if (++checkCount > 10) {
            clearInterval(checkTimer);
          }
          var BJHbtn = document.querySelector("div.layer-itemBtn.normal");
          if (BJHbtn) {
            BJHbtn.dispatchEvent(new Event('click', {'bubbles': true, 'cancelable': true}));
            clearInterval(checkTimer);
          }
        }, 666);
      }
      document.head.appendChild(css);
    }, {'passive': true, 'once': true});
  } catch (err) {
    console.log('百家号自动展开：', err);
  }
})();
