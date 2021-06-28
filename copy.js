/*
 * @name: 复制授权
 * @Author: Sky
 * @version: 1.3
 * @description: 管理网页复制行为
 * @include: *
 * @createTime: 2020-8-8 11:55
 * @updateTime: 2020-5-9 3:10
 */
(function(){const
  /* 等号后的数可供修改
   1为是 0为否 */
  needc = 1, /* 拦截复制时是否弹窗确认 */
  shows = 1, /* 是否显示小红点开关 */
  /*－－－－以下勿改－－－－*/
  key = encodeURIComponent('复制授权:执行判断');
  if(window[key]){return;}
  try {
    window[key] = true;
    let red = true;
    function pc(e){if(red && !(needc && confirm('网页正在尝试复制，是否允许？'))){e.preventDefault();e.stopPropagation();}}
    document.addEventListener('copy',(e)=>pc(e),{'passive':false, 'capture':true});
    Array.from(document.getElementsByTagName('iframe')).forEach((i)=>i.contentDocument.addEventListener('copy',(e)=>pc(e),{'passive':false, 'capture':true}));
    if(shows){
      const sw = document.createElement("div");
      sw.style = 'position:fixed!important;bottom:45%;right:10px;z-index:999999;width:14px;height:14px;opacity:0.4;border-radius:7px;background:red';
      document.body.appendChild(sw);
      sw.addEventListener('touchmove', function(e){
        sw.style.right = sw.style.bottom = '';
        sw.style.left = (e.touches[0].clientX - 7) + 'px';
        sw.style.top = (e.touches[0].clientY - 7) + 'px';
      }, {'passive':true});
      sw.addEventListener('click', function(e){
        sw.style.background = red ? 'green' : 'red'
        red = !red;
      }, {'passive':true});
    }
  } catch(err){console.log('复制授权：', err);}
})();
