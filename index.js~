module.exports = {
ass Monad {
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


