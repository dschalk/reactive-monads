"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (exports.i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports.Monad = function Monad(z) {
  exports._this = this;

  _classCallCheck(this, Monad);

  this.x = z;

  this.bnd = function (func) {
    for (exports._len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return func.apply(undefined, [_this.x, _this].concat(args));
  };

  this.ret = function (a) {
    _this.x = a;
    return _this;
  };

  this.fmap = function (f) {
    for (exports._len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    exports.mon = arguments.length <= 1 || arguments[1] === undefined ? _this : arguments[1];

    mon.ret(f.apply(undefined, [mon.x].concat(args)));
    return mon;
  };
};

exports.MonadIter = function MonadIter(z, g) {
  exports._this = this;

  _classCallCheck(this, MonadIter);

  this.x = z;
  this.id = g;
  this.p = [];

  this.block = function () {
    _this.x = true;
    return _this;
  };

  this.release = function () {
    _this.x = false;
    exports.self = _this;
    exports.p = _this.p;

    if (p[1] === 'bnd') {
      p[2].apply(p, [self.x, self].concat(_toConsumableArray(p[3])));

      return self;
    }

    if (p[1] === 'ret') {
      self.x = p[2];
      return self;
    }

    if (p[1] === 'fmap') {
      p[3].ret(p[2].apply(p, [p[3].x].concat(_toConsumableArray(p[4]))));
      return p[3];
    }
  };

  this.bnd = function (func) {
    for (exports._len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    exports.self = _this;
    if (self.x === false) {
      func.apply(undefined, [self.x, self].concat(args));
      return self;
    }
    if (self.x === true) {
      self.p = [self.id, 'bnd', func, args];
      return self;
    }
  };

  this.fmap = function (f) {
    for (exports._len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    exports.mon = arguments.length <= 1 || arguments[1] === undefined ? _this : arguments[1];

    exports.self = _this;
    if (self.x === false) {
      mon.ret(f.apply(undefined, [mon.x].concat(args)));
      return mon;
    }
    if (self.x === true) {
      self.p = [self.id, 'fmap', f, mon, args];
      return self;
    }
  };

  this.ret = function (a) {
    exports.self = _this;
    if (self.x === false) {
      self.x = a;
    }
    if (self.x === true) {
      self.p = [self.id, 'ret', a];
      return self;
    }
    _this.x = false;
    return _this;
  };
};

;

exports.pure = function pure(x,mon) {
  if (typeof mon.x.x == 'undefined') {
    return mon;
  }
  mon.ret(mon.x.x);
  return mon;
};

exports.bnd = function bnd(f, mon) {
  for (exports._len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
    args[_key5 - 2] = arguments[_key5];
  }

  return f.apply(undefined, [mon.x, mon].concat(args));
};

exports.fmap = function fmap(f, mon) {
  for (exports._len6 = arguments.length, args = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
    args[_key6 - 2] = arguments[_key6];
  }

  exports.v = mon.x;
  mon.ret(f.apply(undefined, [v].concat(args)));
  return mon;
};

exports.Val = 0;

exports.M = function M(a) {
  return new Monad(a);
};



exports.mM1 = M([]);
exports.mM2 = M(0);
exports.mM3 = M(0);
exports.mM4 = M({});
exports.mM5 = M(0);
exports.mM6 = M(0);
exports.mM7 = M(0);
exports.mM8 = M(0);
exports.mM9 = M(0);
exports.mM10 = M(0);
exports.mM11 = M([]);
exports.mM12 = M(0);
exports.mM13 = M(0);
exports.mM14 = M(0);
exports.mM15 = M(0);
exports.mM16 = M(0);
exports.mM17 = M(0);
exports.mM18 = M(0);
exports.mM19 = M(0);
exports.mMscbd = M([]);
exports.mMmessages = M([]);
exports.mMscoreboard = M([]);
exports.mMmsg = M([]);
exports.mMgoals = M([]);
exports.mMnbrs = M([]);
exports.mMnumbers = M([]);

exports.MI = function MI(a, b) {
  return new MonadIter(a, b);
};

exports.mMZ1 = MI(false, 'mMZ1');
exports.mMZ2 = MI(false, 'mMZ2');
exports.mMZ3 = MI(false, 'mMZ3');
exports.mMZ4 = MI(false, 'mMZ4');
exports.mMZ5 = MI(false, 'mMZ5');
exports.mMZ6 = MI(false, 'mMZ6');
exports.mMZ7 = MI(false, 'mMZ7');
exports.mMZ8 = MI(false, 'mMZ8');
exports.mMZ9 = MI(false, 'mMZ9');

exports.toNums = function toNums(x,mon) {
  mon.x = mon.x.map(x => parseFloat(x));
  return mon; 
};

exports.calc = function calc(a,op,b) { 
  exports.result;
  switch (op) {
      case "add": result = (a + b);
      break;
      case "subtract": result = (a - b);
      break;
      case "mult": result = (a * b);
      break;
      case "div": result = (a / b);
      break;
      case "concat": result = (a+""+b)*1.0;
      break;
      default : 'Major Malfunction in calc.';
  }
  return result;
};

exports.pause = function(x,mon,t,mon2) {
  mon2.block();
  let time = t*1000;
  setTimeout( function() {
    mon2.release();
  },time );
  return mon;
};

exports.push = function push(a,mon,v) {
    mon.x.push(v);
    return mon;
};

exports.addSet = function addSet(a,mon,v) {
  mon.x.add(v);
  return mon;
}

exports.addObj = function addObj(a,mon,key,val) {
  mon.x[key] = val;
  return mon;
}

exports.hyp = function hyp(x,y) {
  return Math.sqrt(x*x + y*y);
};

exports.rand = function rand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
 
exports.ran = function ran(x, mon) {
  mon.ret(Math.floor(Math.random() * -4 + 5));
  return mon;
};

exports.test = function test() {
  let k = 0;
  mM4.ret({});
  for (k=0; k<10000000; k+=1) {
    mM1.ret(rand(1,100));
    mM2.ret(rand(1,10000));
    mMZ7.block().bnd(() => mM4
    .bnd(addObj,mM1.x, [mM1.x, mM2.x]))
    mM3.bnd(next, ((hyp(mM1.x,mM2.x) - Math.floor(hyp(mM1.x, mM2.x))) === 0),mMZ7)
  }
  return mM4.x;
};

exports.hyp = function hyp(x,y) {
  return Math.sqrt(x*x + y*y);
};

exports.test2 = function test2() {
  let k = 0;
  let j = 0;
  mM4.ret({});
  for (j=0; j<101; j+=1) {
    for (k=0; k<50000; k+=1) {
      mMZ7.block().bnd(() => mM4
      .bnd(addObj, j, [j,k]))
      mM3.bnd(next, ((hyp(j,k) - Math.floor(hyp(j,k))) === 0), mMZ7)
    }
  }
  return mM4.x;
}

exports.keys = function keys(a,mon,mon2) {
    mon2.ret(Object.keys(mon.x));
    return mon;
};

exports.displayOff = function displayOff(x,mon,a) {
    document.getElementById(a).style.display = 'none';
    return mon;
};

exports.displayInline = function displayInline(x,mon,a) {
    document.getElementById(a).style.display = 'inline';
    return mon;
};

exports.displayBlock = function displayBlock(x,mon,a) {
    document.getElementById(a).style.display = 'block';
    return mon;
};

exports.popPush = function popPush(x,mon,a) {
  mon.x.pop;
  mon.x.push(a);
  return mon;
};

exports.blank = function blank(v,mon,i) {
  mon.x[i] = "";
  return mon;
};

exports.clean = function clean(x,mon) {
  mon.x = mon.x.filter(x => (x !== "" && x !== undefined));
  return mon;
};
  
exports.toFloat = function toFloat(x,mon) {
  exports.newx = mon.x.map(function (a) {
    return parseFloat(a);
  });
  mon.ret(newx);
  return mon;
};

exports.splice = function splice(x,mon,i) {
  mon.x.splice(i,1);
  return mon;
}

exports.next = function next(x,mon,condition,mon2) {
  if (condition) {
    mon2.release();
  }
  return mon
}

exports.doub = function doub(x, mon) {
  mon.ret(x + x);
  return mon;
};

exports.square = function square(x, mon) {
  mon.ret(x * x);
  return mon;
};

exports.tripple = function tripple(x, mon) {
  mon.ret(x + x + x);
  return mon;
};

exports.cube =  function cube(x, mon) {
  mon.ret(x * x * x);
  return mon;
};

exports.add = function add(x, mon, y) {
  mon.ret(x + y);
  return mon;
};

exports.mult = function mult(x, mon, y) {
  mon.ret(x * y);
  return mon;
};

exports.lg = '';

exports.log = function log(x, mon, y) {
  console.log(y);
  return mon;
};

exports.fnc = function fnc(a, b) {
  return a.b;
};

exports.branch = function branch(x, mon, a) {
  return mon;
};

exports.branchT = function branchT(x, mon, a) {
  setTimeout(function () {
    return mon;
  }, 500);
};

exports.chance = function chance(x, mon) {
  exports.a = rand(1, 5);
  exports.b = rand(1, 5);
  exports.c = rand(1, 5);
  mM1.ret(a);
  mM2.ret(b);
  mM3.ret(c);
  if (a === b && a === c) {
    mM4.ret('Winner! Three of a kind');
    return mon;
  }
  if (a === b || a === c || b === c) {
    mM4.ret('Pair. Try for three');
    return mon;
  }
  mM4.ret('Zilch. Don\'t give up now.');
  return mon;
};

exports.ch = function ch(x, mon, a, b, c) {
  if (a === b && a === c) {
    mon.ret('Winner! Three of a kind');
    return mon;
  }
  if (a === b || a === c || b === c) {
    mon.ret('Pair. Try for three');
    return mon;
  }
  mon.ret('Zilch. Don\'t give up now.');
  return mon;
};

exports.jackpot = function jackpot(x, mon) {
  exports.k = 1;
  for (k; k < 5; k += 1) {
    if (x === [k, k, k, k, k, k]) {
      mM10.ret("Jackpot!");
      return mon;
    }
  }
  mM10.ret("No jackpot time");
  return mon;
};

exports.bench = function bench(x, mon) {
  exports.self = undefined;
  exports.k = 0;
  exports.j = 0;
  exports.d1 = new Date();
  for (k; k < 1000000; k++) {
    mM1 = new Monad(k);
  }
  mon.ret(new Date() - d1);
  return mon;
};

exports.bench2 = function bench2() {
  exports.self = undefined;
  exports.k = 0;
  exports.j = 0;
  exports.d1 = new Date();
  for (k; k < 1000000; k++) {
    mM2.ret(k);
  }
  resBench2 = new Date() - d1;
  setTimeout(function () {
    self.forceUpdate();
  }, 12);
};

exports.cu = function cu(x) {
  return x * x * x;
};
exports.sq = function sq(x) {
  return x * x;
};
exports.du = function du(x) {
  return x * x;
};
exports.ad = function ad(a, b) {
  return a + b;
};
exports.id = function id(x) {
  return x;
};
exports.lo = function lo(x) {
  return console.log(x);
};

exports.test5 = function test5(m) {
  exports.x = m.x;
  m.ret(x + 3).bnd(add, 1).bnd(mMS2.ret).bnd(add, 1).bnd(doub);
};

exports.test6 = function test6() {
  mMS1.ret(3).fmap(ad, mMS2, mMS1.x).fmap(du).fmap(ad, mM1, mMS1.x).fmap(cu).fmap(id, mMS3).bnd(add, mMS2.x + 1000);
};

exports.delay = function delay(x, mon) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, 2000);
  });
};

exports.increment = function increment() {
  VAL = VAL + 1;
};

