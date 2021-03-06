// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    var Alg, App;
    App = (function() {

      function App(el) {
        this._startApp = __bind(this._startApp, this);
        this.el = el;
        this._events();
      }

      App.prototype._events = function(value) {
        return this.el.find('#initApp').on('click', this._startApp);
      };

      App.prototype._startApp = function() {
        var val, _app;
        if (this.el.find('#valueOfApp').val() !== '') {
          this.tables = $("#tables").empty().off().fadeIn(100);
          val = parseInt($('#valueOfApp').val());
          if (_app) {
            return _app.destroy();
          } else {
            return _app = new Alg(val, this.tables).createTable();
          }
        }
      };

      return App;

    })();
    Alg = (function() {

      function Alg(value, container) {
        this.value = value;
        this.el = container;
        this.n = value % 4 === 1 ? value * 2 : value;
        this.el.html("<ul class='table-block table'></ul><ul class='table-block table-2'></ul>");
      }

      Alg.prototype._template = function(i, P, Q, q) {
        return "<li>				<div class='c1'>" + i + "</div>				<div class='c2'>" + P + "</div>				<div class='c3'>" + Q + "</div>				<div class='c4'>" + q + "</div>			</li>";
      };

      Alg.prototype._calcP = function(i) {
        if (i === 0) {
          return 0;
        } else {
          return this.q[i - 1] * this.Q[i - 1] - this.P[i - 1];
        }
      };

      Alg.prototype._calcQ = function(i) {
        if (i === 0) {
          return 1;
        } else if (i === 1) {
          return this.n - Math.pow(this.q[0], 2) / this.Q[i - 1];
        } else {
          return this.Q[i - 2] + this.q[i - 1] * (this.P[i - 1] - this.P[i]);
        }
      };

      Alg.prototype._calcQNew = function(i) {
        if (i === 1) {
          return (this.n - Math.pow(this.P[i], 2)) / this.Q[0];
        } else {
          return this.Q[i - 2] + this.q[i - 1] * (this.P[i - 1] - this.P[i]);
        }
      };

      Alg.prototype._qFunc = function(i) {
        if (i === 0) {
          return Math.floor(Math.sqrt(this.n));
        } else {
          return Math.floor((this.q[0] + this.P[i]) / this.Q[i]);
        }
      };

      Alg.prototype._qFuncNew = function(i) {
        return Math.floor((Math.sqrt(this.n) + this.P[i]) / this.Q[i]);
      };

      Alg.prototype._exit = function(i) {
        var result;
        result = false;
        if (i !== 0) {
          this.fullSqr = Math.sqrt(this.Q[i]);
          if (this.fullSqr % 1 === 0) {
            result = true;
          }
        }
        return result;
      };

      Alg.prototype._makeOdd = function(value) {
        while (value % 2 === 0) {
          value = value / 2;
        }
        return value;
      };

      Alg.prototype.createTable = function() {
        var $table, $table2;
        $table = this.el.find('.table').empty().off();
        $table2 = this.el.find('.table-2').empty().off();
        this.P = [];
        this.Q = [];
        this.q = [];
        this.i = 0;
        this._firstLoop(this.i, $table);
        this._secondLoop(this.i, $table2);
        this._writeResult();
        return this;
      };

      Alg.prototype._firstLoop = function(i, $table) {
        $table.append(this._template('i', 'P', 'Q', 'q'));
        while (true) {
          this.P[i] = this._calcP(i);
          this.Q[i] = this._calcQ(i);
          this.q[i] = this._qFunc(i);
          $table.append(this._template(i, this.P[i], this.Q[i], this.q[i]));
          if (this._exit(i)) {
            break;
          }
          i++;
        }
        return this.i = i;
      };

      Alg.prototype._secondLoop = function(i, $table2) {
        $table2.append(this._template("i", "P'", "Q'", "q'"));
        this.P[0] = -this.P[i];
        this.Q[0] = this.fullSqr;
        this.q[0] = this._qFuncNew(0);
        $table2.append(this._template(0, this.P[0], this.Q[0], this.q[0]));
        i = 1;
        while (true) {
          this.P[i] = this._calcP(i);
          this.Q[i] = this._calcQNew(i);
          this.q[i] = this._qFuncNew(i);
          $table2.append(this._template(i, this.P[i], this.Q[i], this.q[i]));
          if (this.P[i] === this.P[i - 1]) {
            break;
          }
          i++;
        }
        this.divider = this._makeOdd(this.Q[i - 1]);
        return $table2.find('li').eq(i).addClass('divider');
      };

      Alg.prototype._writeResult = function() {
        this.newDivider = this.value / this.divider;
        return $("#result").html("" + this.value + " = " + this.divider + " * " + this.newDivider);
      };

      return Alg;

    })();
    return window.App = new App($('body'));
  });

}).call(this);
