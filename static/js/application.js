;(function (win){
  var doc = win.document,
    main,
    getPage,
    replacePage,
    pushUrl;

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
      htmlDoc = doc.implementation.createHTMLDocument(doc.title);
    htmlDoc.body.innerHTML = content;
    mainEle.innerHTML = htmlDoc.getElementById('main').innerHTML;
  };

  pushUrl = function (url) {
    win.history.pushState({}, doc.title, url);
  };

  delegate = new Delegate(doc.body);
  delegate.on('click', 'a', function (e, targ) {
    var loc = win.location,
      curr = loc.protocol + "//" + loc.host;

    if (loc.href === targ.href) {
      e.preventDefault();
      return;
    }
    if (targ.href.indexOf(curr) !== 0 ) {
      return true;
    }
    e.preventDefault();
    getPage(targ.pathname, function (data) {
      replacePage(data);
      pushUrl(targ.pathname);
    });
  });

  win.addEventListener('load', function() {
    new FastClick(doc.body);
  }, false);

})(this);
