/* Binary rain — draws falling 0/1 columns inside .rain-col canvases only. */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var root = getComputedStyle(document.documentElement);
  var green = (root.getPropertyValue("--green") || "#45e845").trim();
  var greenBright = (root.getPropertyValue("--green-bright") || "#5dff5d").trim();
  var greenDim = (root.getPropertyValue("--green-dim") || "#2f7a34").trim();
  var bg = (root.getPropertyValue("--bg") || "#0a0d09").trim();
  var FONT_SIZE = 14;
  var FRAME_MS = 60;

  var MESSAGE = "Get a life buddy, this is just vibe coded";
  var BITS = Array.prototype.map
    .call(MESSAGE, function (ch) { return ch.charCodeAt(0).toString(2).padStart(8, "0"); })
    .join("");

  function initRain(canvas) {
    var ctx = canvas.getContext("2d");
    var dpr, cols, drops, bitPos;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      var w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(0, Math.floor(w / FONT_SIZE));
      drops = [];
      bitPos = [];
      for (var i = 0; i < cols; i++) {
        drops.push(Math.random() * -40);
        bitPos.push(Math.floor(Math.random() * BITS.length));
      }
    }
    resize();
    window.addEventListener("resize", resize);
    if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);

    var last = 0;
    function frame(t) {
      requestAnimationFrame(frame);
      if (t - last < FRAME_MS) return;
      last = t;
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h || !cols) return;

      ctx.fillStyle = bg + "26"; // fading trail
      ctx.fillRect(0, 0, w, h);
      ctx.font = FONT_SIZE + "px 'Share Tech Mono', monospace";
      ctx.textBaseline = "top";

      for (var i = 0; i < cols; i++) {
        var char = BITS[bitPos[i] % BITS.length];
        bitPos[i]++;
        var x = i * FONT_SIZE;
        var y = drops[i] * FONT_SIZE;
        var roll = Math.random();
        ctx.fillStyle = roll > 0.93 ? greenBright : roll > 0.5 ? green : greenDim;
        ctx.fillText(char, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    requestAnimationFrame(frame);
  }

  function start() {
    document.querySelectorAll(".rain-col canvas").forEach(initRain);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
