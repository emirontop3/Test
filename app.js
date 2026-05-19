let ggbApp;
let aiPlan = [];

function initGeoGebra() {
  const params = {
    appName: "graphing",
    width: Math.max(720, window.innerWidth - 500),
    height: Math.max(500, window.innerHeight - 220),
    showToolBar: true,
    showAlgebraInput: true,
    showMenuBar: true,
    enableShiftDragZoom: true
  };

  ggbApp = new GGBApplet(params, true);
  window.addEventListener("load", () => ggbApp.inject("ggb-element"));
}

function runCommand(cmd) {
  if (!window.ggbApplet || !cmd.trim()) return;
  cmd.split(",").map(c => c.trim()).filter(Boolean).forEach(c => window.ggbApplet.evalCommand(c));
}

function localAIAssistant(prompt) {
  const p = prompt.toLowerCase();
  const out = [];

  if (p.includes("parabola")) {
    out.push("a = 1");
    out.push("f(x) = a x^2");
    out.push("Slider(a, -5, 5, 0.1, 1, 200, false, true, false, false)");
  }
  if (p.includes("sin") || p.includes("sine")) {
    out.push("a = 2");
    out.push("f(x)=sin(a x)");
    out.push("Slider(a, 0.1, 10, 0.1, 1, 200, false, true, false, false)");
  }
  if (p.includes("derivative") || p.includes("türev")) {
    out.push("f(x)=x^3-3x");
    out.push("g(x)=Derivative(f)");
  }
  if (p.includes("integral") || p.includes("alan")) {
    out.push("f(x)=x^2");
    out.push("Integral(f, -2, 2)");
  }
  if (p.includes("random") || p.includes("fit") || p.includes("regression")) {
    out.push("L = Sequence((RandomBetween(-5,5), RandomBetween(-5,5)), k, 1, 20)");
    out.push("FitLine(L)");
  }

  if (!out.length) {
    out.push("f(x)=sin(x)");
    out.push("A=(1,f(1))");
    out.push("Tangent(A,f)");
  }
  return out;
}

function bindUi() {
  const commandInput = document.getElementById("commandInput");
  const aiPrompt = document.getElementById("aiPrompt");
  const aiResponse = document.getElementById("aiResponse");

  document.getElementById("runCommand").onclick = () => runCommand(commandInput.value);
  document.getElementById("resetBoard").onclick = () => window.ggbApplet && window.ggbApplet.reset();
  document.getElementById("loadDemo").onclick = () => {
    ["a=1", "f(x)=sin(a x)", "Slider(a,0.5,8,0.1,1,200,false,true,false,false)", "g(x)=Derivative(f)"]
      .forEach(runCommand);
  };

  document.getElementById("askAi").onclick = () => {
    aiPlan = localAIAssistant(aiPrompt.value);
    aiResponse.textContent = aiPlan.map((c, i) => `${i + 1}. ${c}`).join("\n");
  };

  document.getElementById("applyAi").onclick = () => aiPlan.forEach(runCommand);
}

initGeoGebra();
bindUi();
