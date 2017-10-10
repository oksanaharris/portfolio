
// AOS.init({
//   duration: 1200,
// });

// const body = document.getElementsByTagName('body')[0];

// body.addEventListener("scroll", scrolling);


window.onscroll = function(){

  photogSection = document.getElementById('photogSection').getBoundingClientRect().top;

  // console.log('Y POSITION', photogSection);

  let thresholdPassed = false;

  if (thresholdPassed === false && document.getElementById('photogSection').getBoundingClientRect().top <= document.getElementById('timelineCont').offsetHeight) {
    document.getElementById('professionalSection').style.paddingBottom = (400 - document.getElementById('timelineCont').offsetHeight) + 'px';
    document.getElementById('timelineCont').classList.remove('stickyTimeline');
    thresholdPassed = true;
  } else if (document.getElementById('photogSection').offsetTop > document.getElementById('timelineCont').offsetHeight) {
    document.getElementById('timelineCont').classList.add('stickyTimeline');
    document.getElementById('professionalSection').style.paddingBottom = '400px';
    thresholdPassed = false;
  }

  let revealId;
  let backgroundId;

  if (window.scrollY < 150){
    revealId = 'revealDivEd';
    backgroundId = 'backgroundEd';

    let allbuttons = document.querySelectorAll('.timelineBtn');

    allbuttons.forEach(element => {
      element.classList.remove('activeBtn');
      element.childNodes[3].classList.remove('active');
      element.childNodes[5].classList.remove('move');
    });

    document.getElementById('edBtn').classList.add('activeBtn');
    document.getElementById(revealId).classList.add('active');
    document.getElementById(backgroundId).classList.add('move');

  } else if (window.scrollY > 149 && window.scrollY < 1050) {
    revealId = 'revealDivProf';
    backgroundId = 'backgroundProf';

    let allbuttons = document.querySelectorAll('.timelineBtn');

    allbuttons.forEach(element => {
      element.classList.remove('activeBtn');
      element.childNodes[3].classList.remove('active');
      element.childNodes[5].classList.remove('move');
    });

    document.getElementById('profBtn').classList.add('activeBtn');
    document.getElementById(revealId).classList.add('active');
    document.getElementById(backgroundId).classList.add('move');

  } else if (window.scrollY > 1049) {
    revealId = 'revealDivPhot';
    backgroundId = 'backgroundPhot';

    let allbuttons = document.querySelectorAll('.timelineBtn');

    allbuttons.forEach(element => {
      element.classList.remove('activeBtn');
      element.childNodes[3].classList.remove('active');
      element.childNodes[5].classList.remove('move');
    });

    document.getElementById('photBtn').classList.add('activeBtn');
    document.getElementById(revealId).classList.add('active');
    document.getElementById(backgroundId).classList.add('move');
  }


};


let portItemArr = document.querySelectorAll('.portItem');

portItemArr.forEach(portItem => {
  portItem.addEventListener('mouseenter', animatePortItem);
  portItem.addEventListener('mouseleave', resetPortItem);
});

function resetPortItem(event){
  let targetDiv = event.target.childNodes[1];
  targetDiv.classList.add('centerDesc');
  // targetDiv.className = 'portItemDesc';

}


function animatePortItem(event) {
  let targetDiv = event.target.childNodes[1];

  targetDiv.className = 'portItemDesc';

  let elementTop = event.target.offsetTop;
  let elementBottom = event.target.offsetTop + event.target.offsetHeight;
  let elementLeft = event.target.offsetLeft;
  let elementRight = event.target.offsetLeft + event.target.offsetWidth;

  let y = event.pageY;
  let x = event.pageX;

  let top = Math.abs(elementTop - y);
  let bottom = Math.abs(elementBottom - y);
  let left = Math.abs(elementLeft - x);
  let right = Math.abs(elementRight - x);

  let min = Math.min(top, bottom, left, right);

  let side;

  switch (min) {
    case top:
      targetDiv.classList.add('topAnimate');
      // setTimeout(function(){targetDiv.classList.add('centerDesc'); }, 100);
      break;
    case bottom:
      targetDiv.classList.add('bottomAnimate');
      // setTimeout(function(){targetDiv.classList.add('centerDesc'); }, 100);
      break;
    case left:
      targetDiv.classList.add('leftAnimate');
      // setTimeout(function(){targetDiv.classList.add('centerDesc'); }, 100);
      break;
    case right:
      targetDiv.classList.add('rightAnimate');
      // setTimeout(function(){targetDiv.classList.add('centerDesc'); }, 100);
      break;
  }
}


(function() {

  function init() {
    //Links
    let anchor1Link  = document.getElementById('aEducation');
    let anchor2Link  = document.getElementById('aMovies');
    let anchor3Link  = document.getElementById('aProfessional');

    //Anchors
    let anchor1      = document.getElementById('educationSection');
    let anchor2      = document.getElementById('professionalSection');
    let anchor3      = document.getElementById('photogSection');

    anchor1Link.addEventListener('click', (e) => { scrollTo(anchor1, e) }, false);
    anchor2Link.addEventListener('click', (e) => { scrollTo(anchor2, e) }, false);
    anchor3Link.addEventListener('click', (e) => { scrollTo(anchor3, e) }, false);
  }

  function scrollTopValue(domElement) { //DEBUG
    return 'scrollTopValue:', domElement.scrollTop;
  }

  function offsetTopValue(domElement) { //DEBUG
    return 'offsetTopValue:', domElement.offsetTop;
  }

  //cf. https://gist.github.com/james2doyle/5694700
  // requestAnimationFrame for Smart Animating https://goo.gl/sx5sts
  var requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  function scrollTo(to, callback, phrase, duration = 1500) { //FIXME this always starts from '0', instead of the clicked element offsetTop -> This is because the position is calculated for the main <html> element, not the <iframe>'s <html> tag
    /*console.log('from:', from); //DEBUG
    // console.log('from.clientY:', from.clientY); //DEBUG
    // console.log('from.target.offsetTop:', from.target.offsetTop); //DEBUG

    // console.log('position():', document.documentElement.offsetTop || document.body.parentNode.offsetTop || document.body.offsetTop); //DEBUG
    // console.log('document.documentElement:', document.documentElement); //DEBUG
    // console.log('document.body:', document.body); //DEBUG
    let start;

    if (isMouseEvent(from)) { //FIXME : the scroll starts at the link, not where the screen really is : fix that
      // start = from.target.offsetTop;
      start = from.pageY; //FIXME
    }
    else {
      start = from;
    }*/

    if (isDomElement(to)) {
      if (to === document.getElementById('photogSection')) {
        to = to.offsetTop - document.getElementById('timelineCont').offsetHeight;
      } else {
        to = to.offsetTop;
      }
    }

    function move(amount) {
      // document.scrollingElement.scrollTop = amount; //FIXME Test that
      document.documentElement.scrollTop = amount;
      document.body.parentNode.scrollTop = amount;
      document.body.scrollTop = amount;
    }

    function position() {
      // return document.documentElement.offsetTop || document.body.parentNode.offsetTop || document.body.offsetTop;
      return window.pageYOffset;
    }

    var start = position();
    var change = to - start;
    var currentTime = 0;
    var increment = 20;
    console.log('start:', start); //DEBUG
    console.log('to:', to); //DEBUG
    console.log('change:', change); //DEBUG

    var animateScroll = function() {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      // move the document.body
      move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      }
      else {
        if (callback && (typeof(callback) === 'function')) {
          // the animation is done so lets callback
          callback();
        }
      }
    };

    animateScroll();
  }

  init();
})();

// easing functions https://goo.gl/5HLl8
//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d) {
  var tc = (t /= d) * t * t;
  return b + c * (tc);
};

Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t /= d) * t,
    tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

function isDomElement(obj) {
    return obj instanceof Element;
}

function isMouseEvent(obj) {
    return obj instanceof MouseEvent;
}

function findScrollingElement(element) { //FIXME Test this too
  do {
    if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
      return element;
    }
  } while (element = element.parentNode);
}
