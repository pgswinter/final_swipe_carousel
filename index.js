const _C = document.querySelector('.container'), 
      N = _C.children.length, NF = 30, 
			TFN = {
				/* can remove these if not used
				'linear': function(k) { return k }, 
				'ease-in': function(k, e = 1.675) {
					return Math.pow(k, e)
				}, 
				'ease-out': function(k, e = 1.675) {
					return 1 - Math.pow(1 - k, e)
				}, 
				'ease-in-out': function(k) {
					return .5*(Math.sin((k - .5)*Math.PI) + 1)
				}, */
				'bounce-out': function(k, a = 2.75, b = 1.5) {
					return 1 - Math.pow(1 - k, a)*Math.abs(Math.cos(Math.pow(k, b)*(n + .5)*Math.PI))
				}
			};

let i = 0, x0 = null, locked = false, w, ini, fin, rID = null, anf, n;

function stopAni() {
  cancelAnimationFrame(rID);
  rID = null
};

function ani(cf = 0) {
  _C.style.setProperty('--i', ini + (fin - ini)*TFN['bounce-out'](cf/anf));
	
  if(cf === anf) {
    stopAni();
    return
  }
	
  rID = requestAnimationFrame(ani.bind(this, ++cf))
};

function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

function lock(e) {
  x0 = unify(e).clientX;
	locked = true
};

function drag(e) {
  e.preventDefault();
	
  if(locked) {
    let dx = unify(e).clientX - x0, f = +(dx/w).toFixed(2);
		
    _C.style.setProperty('--i', i - f)
  }
};

function move(e) {
  if(locked) {
    let dx = unify(e).clientX - x0, 
        s = Math.sign(dx), 
        f = +(s*dx/w).toFixed(2);
		
    ini = i - s*f;

    if((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
      i -= s;
      f = 1 - f
    }

    fin = i;
		anf = Math.round(f*NF);
		n = 2 + Math.round(f)
    ani();
    x0 = null;
    locked = false;
  }
};

function size() { w = window.innerWidth };

size();
_C.style.setProperty('--n', N);

addEventListener('resize', size, false);

_C.addEventListener('mousedown', lock, false);
_C.addEventListener('touchstart', lock, false);

_C.addEventListener('mousemove', drag, false);
_C.addEventListener('touchmove', drag, false);

_C.addEventListener('mouseup', move, false);
_C.addEventListener('touchend', move, false);


// const _C = document.querySelector('.container'), 
//       N = _C.children.length;

// let i = 0, x0 = null, locked = false, w;

// function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

// function lock(e) {
//   x0 = unify(e).clientX;
// 	_C.classList.toggle('smooth', !(locked = true))
// };

// function drag(e) {
// 	e.preventDefault();
	
// 	if(locked) 		
// 		_C.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
// };

// function move(e) {
//   if(locked) {
//     let dx = unify(e).clientX - x0, s = Math.sign(dx), 
// 				f = +(s*dx/w).toFixed(2);

//     if((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
// 			_C.style.setProperty('--i', i -= s);
// 			f = 1 - f
// 		}
		
//     _C.style.setProperty('--tx', '0px');
// 		_C.style.setProperty('--f', f);
//     _C.classList.toggle('smooth', !(locked = false));
//     x0 = null
//   }
// };

// function size() { w = window.innerWidth };

// size();
// _C.style.setProperty('--n', N);

// addEventListener('resize', size, false);

// _C.addEventListener('mousedown', lock, false);
// _C.addEventListener('touchstart', lock, false);

// _C.addEventListener('mousemove', drag, false);
// _C.addEventListener('touchmove', drag, false);

// _C.addEventListener('mouseup', move, false);
// _C.addEventListener('touchend', move, false);