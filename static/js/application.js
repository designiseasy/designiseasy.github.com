;(function (win){
  var doc = win.document,
    main,
    getPage,
    replacePage,
    pushUrl,
    clickOnLink,
    hasHash;

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
      frag = doc.createDocumentFragment(),
      dummy = doc.createElement('div'),
      newTitle;
    frag.appendChild(dummy);
    dummy.innerHTML = content;
    newTitle = dummy.getElementsByClassName('title')[0];
    mainEle.parentNode.replaceChild(dummy.getElementsByClassName('main')[0], mainEle);
    dummy = null;
    doc.title = newTitle.innerHTML;
    return doc.title;
  };

  pushUrl = function (url, title) {
    win.history.pushState({}, title, url);
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
      var newTitle = replacePage(data);
      // update the URL
      pushUrl(targ.pathname, newTitle);
      if (targ.hash){
        // nasty hack to follow #links across pushState
        // but don't trigger popstate when calling replace
        hasHash = true;
        window.location.replace(targ.pathname + targ.hash);
      }
    });
  };



  win.addEventListener('load', function() {
    var delegate;
    new FastClick(doc.body);
    delegate = new Delegate(doc.body);
    delegate.on('click', 'a', clickOnLink);
    // do some touch-specific styling
    if ('ontouchstart' in window) {
      doc.body.className = 'has-touch';
    }
    win.addEventListener('popstate', function (e) {
      if (hasHash) {
        hasHash = null;
        return;
      }
      getPage(win.location.pathname, function (data) {
        replacePage(data);
      });
    }, false);

  }, false);

})(this);
