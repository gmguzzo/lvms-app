// @ts-ignore
export function getIndexBy(array: Array<{}>, { name, value }): number {
  for (let i = 0; i < array.length; i++) {
    // @ts-ignore
    if (array[i][name] === value) {
      return i;
    }
  }
  return -1;
}

function currentYPosition() {
  if (!window) {
    return;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) {
    return window.pageYOffset;
  }
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop) {
    return document.documentElement.scrollTop;
  }
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) {
    return document.body.scrollTop;
  }
  return 0;
}

function elmYPosition(elm: { offsetTop: any; offsetParent: any }) {
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(selector: any) {
  const elm = document.querySelector(selector);
  if (!selector || !elm) {
    return;
  }
  const startY = currentYPosition() || 0;
  const stopY = elmYPosition(elm);
  const distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    window.scrollTo(0, stopY);
    return;
  }
  let speed = Math.round(distance / 50);
  if (speed >= 20) {
    speed = 20;
  }
  const step = Math.round(distance / 25);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
    for (let i = startY; i < stopY; i += step) {
      setTimeout(
        // tslint:disable-next-line:no-shadowed-variable only-arrow-functions
        (function(leapY) {
          return () => {
            window.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) {
        leapY = stopY;
      }
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
      (function(leapY) {
        return () => {
          window.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) {
      leapY = stopY;
    }
    timer++;
  }
  return false;
}
