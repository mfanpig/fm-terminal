// Generated by CoffeeScript 1.6.3
(function() {
  var RemoteTerminal, TerminalProxyTarget, greet, prompt;

  window.Pipe = new window.PipeClientClass(pipe_name);

  greet = function(callback) {
    var str;
    str = "[[gb;#ffffff;#000]CatX.FM 猫杀电台\r\n]";
    str += "[[;#e67e22;]music provided by douban.fm]\r\n";
    str += "Type [[ub;#2ecc71;#000]channel] to discovery music, or ";
    str += "[[ub;#2ecc71;#000]help] for full command list\r\n";
    str += "[[gb;#929292;#000]......]";
    return str;
  };

  prompt = "(Remote)♫>";

  TerminalProxyTarget = (function() {
    function TerminalProxyTarget() {
      this.t = window.T;
      this.ui = new window.PlayerUI(this.t);
      window.T.UI = this.ui;
      window.Pipe.registerRPC("echo", this.t.echo.bind(this.t));
      window.Pipe.registerRPC("set_prompt", this.t.set_prompt.bind(this.t));
      window.Pipe.registerRPC("pause", this.t.pause.bind(this.t));
      window.Pipe.registerRPC("resume", this.t.resume.bind(this.t));
      window.Pipe.registerRPC("clear", this.t.clear.bind(this.t));
      window.Pipe.registerRPC("init_ui", this.t.UI.init.bind(this.t.UI));
      window.Pipe.registerRPC("update_ui", this.t.UI.update.bind(this.t.UI));
    }

    return TerminalProxyTarget;

  })();

  RemoteTerminal = (function() {
    RemoteTerminal.prototype.setUser = function(user) {
      var name, name_str, _ref, _ref1;
      name = (_ref = user != null ? user.user_name : void 0) != null ? _ref : "";
      name_str = name !== "" ? "[" + name + "]" : "";
      return (_ref1 = window.T) != null ? _ref1.set_prompt(name_str + prompt) : void 0;
    };

    function RemoteTerminal() {
      if (window.commands == null) {
        window.commands = {};
      }
    }

    RemoteTerminal.prototype.start = function(options) {
      window.T = $('body').terminal(this.interpret, options);
      this.proxyTarget = new TerminalProxyTarget();
    };

    RemoteTerminal.prototype.interpret = function(name, term) {
      term.echo("[[gb;#929292;#000]...]");
      window.Pipe.fireRPC("command", name);
      term.echo("[[gb;#929292;#000]...]");
    };

    RemoteTerminal.prototype.registerCommand = function(name, command) {
      window.commands[name] = command;
    };

    return RemoteTerminal;

  })();

  if (window.TERM == null) {
    window.TERM = new RemoteTerminal();
  }

  jQuery(document).ready(function() {
    return window.TERM.start({
      prompt: prompt,
      name: 'catx.fm',
      greetings: greet,
      history: true,
      tabcompletion: true
    });
  });

}).call(this);

/*
//@ sourceMappingURL=Guest.map
*/