;(function (win){
  var doc = win.document,
    main,
    getPage,
    replacePage,
    pushUrl,
    clickOnLink;

  getPage = function (url, callback) {
    req = new XMLHttpRequest();

    req.addEventListener('readystatechange', function () {
      if (req.readyState === 4) {
        if (req.status === 200 || req.status === 304){
          callback(req.responseText);
        }
      }
    }, false);

    req.open('GET', url, false);
    req.send();
  };

  replacePage = function (content) {
    var mainEle = doc.getElementById('main'),
      htmlDoc = document.implementation.createHTMLDocument(doc.title);
    htmlDoc.body.innerHTML = content;
    mainEle.innerHTML = htmlDoc.getElementById('main').innerHTML;
  };

  pushUrl = function (url) {
    win.history.pushState({}, doc.title, url);
  };

  clickOnLink = function (e, targ) {
    var loc = win.location,
      currSite = loc.protocol + "//" + loc.host;

    if (loc.pathname === targ.pathname) {
      // we're on this page currently
      if (targ.hash) {
        // just doing a hash nav on the same page
        return true;
      }
      e.preventDefault();
      return;
    }
    if (targ.href.indexOf(currSite) !== 0 ) {
      // we're not linking to this site, so don't use pushState
      return true;
    }
    e.preventDefault();
    // do ajax
    getPage(targ.pathname, function (data) {
      // insert new content
      replacePage(data);
      // update the URL
      pushUrl(targ.pathname);
      // nasty hack to follow #links across pushState
      if (targ.hash){
        window.location.replace(targ.pathname + targ.hash);
      }
    });
  };


  win.addEventListener('popstate', function (e) {
    getPage(win.location.pathname, function (data) {
      replacePage(data);
    });
  }, false);

  win.addEventListener('load', function() {
    var delegate;
    new FastClick(doc.body);
    delegate = new Delegate(doc.body);
    delegate.on('click', 'a', clickOnLink);
  }, false);

})(this);
