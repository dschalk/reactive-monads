module.exports = {
  class Monad {
    constructor(z) {

      this.x = z;

      this.bnd = (func, ...args) => {
        return func(this.x, this, ...args);
      };

      this.ret = a => {
        this.x = a;
        return this;
      };

      this.fmap = (f, mon = this, ...args) => {      
        mon.ret( f(mon.x, ...args ));
        return mon;

      };
    }
  };
   
  class MonadSeq {
    constructor(z,g) {

      this.x = z;
      this.id = g;

      this.flag = false;

      this.bnd = (func, ...args) => {
        let self = this;
        let fun = func;
        (function retry(func, ...args) {
          if (self.flag === false) {
            console.log('Hello from bnd ', self.id, self.x, self.flag);
            return fun(self.x, self, ...args);
          }
          if (self.flag === true) {
            setTimeout( function() {
              console.log('bnd retry', self.id, self.x, self.flag);
              retry(fun, ...args); 
            },200  ); 
          }
        })();
        console.log('Now leaving bnd ', self.id, self.x, self.flag);
        return this;
      }

      this.fmap = (f, mon = this, ...args) => {      
        let self = this;
        (function retry() {
          if (MFLAG === false) {
            console.log('Hello from fmap');
            console.log(mon);
            MFLAG = true;
            mon.ret(f(mon.x,  ...args));
          } else {
            setTimeout( function() {
              console.log('fmap retry');
              retry(); 
            },100  ); 
          }
        })();
        return mon;
      }


      this.ret = a => {
        let self = this;
        (function retry() {
          if (self.flag === false) {
            console.log('Hello from ret ', self.id, self.x, self.flag);
            self.x = a;
          } else {
            setTimeout( function() {
              console.log('ret retry',self.id, self.x, self.flag);
              retry(); 
            },100  ); 
          }
        })();
        console.log('Now leaving ret ', self.id, self.x, self.flag);
        return this;
      }
    }
  };


  class MonadIter {
    constructor(z,g) {

      this.x = z;
      this.id = g;
      this.flag = false;
      this.p = [];

      this.block = () => {
        this.flag = true;
        return this;
        }

      this.release = () => {
        let self = this;
        let p = this.p;

        if (p[1] === 'bnd') {
          p[2](self.x, self, ...p[3]);
          self.flag = false;
          return self;
        }

        if (p[1] === 'ret') {
          self.x = p[2];
          self.flag = false;
          return self;
        }

        if (p[1] === 'fmap') { 
          p[3].ret(p[2](p[3].x, ...p[4]));
          self.flag = false;
          return p[3];
        }
     }

      this.bnd = (func, ...args) => {
        let self = this;
        if (self.flag === false) {
          func(self.x, self, ...args);
          return self;
        }
        if (self.flag === true) {
          self.p = [self.id, 'bnd', func, args];
          return self;
        }
      }

      this.fmap = (f, mon = this, ...args) => {   
        let self = this;
          if (self.flag === false) {
            mon.ret(f(mon.x,  ...args));
            return mon;
          }
          if (self.flag === true) {
            self.p = [self.id, 'fmap', f, mon, args];
            return self;
          }
      }

      this.ret = a => { 
        let self = this;
          if (self.flag === false) {
            self.x = a;
          }
          if (self.flag === true) {
          self.p = [self.id, 'ret', a];
          return self;
          }
        this.flag = false;
        return this;
      }
    }}

  class MonadFork {
    constructor(z) {

      this.x = z;

      this.bnd = (func, skip, ...args) => {
        if (skip) {return this};
        return func(this.x, this, ...args);
      };

      this.ret = (a,skip) => {
        if (skip) {return this};
        this.x = a;
        return this;
      };

      this.fmap = (f, mon = this, skip, ...args) => {      
        if (skip) {return this};
        mon.ret( f(mon.x, ...args ));
        return mon;

      };
    }
  };
   
