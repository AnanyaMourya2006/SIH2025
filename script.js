// Global data objects
let codeSystems = {};
let conceptMaps = {};
let valueSets = {};

// Load JSON files
async function loadData() {
  codeSystems = await fetch('codesystems.json').then(r=>r.json());
  conceptMaps = await fetch('conceptmaps.json').then(r=>r.json());
  valueSets = await fetch('valuesets.json').then(r=>r.json());
}

// Initialize data
loadData();

// -------------------- CodeSystem --------------------
function getCodeSystem(name) {
  return codeSystems[name] || {};
}

function showCodeSystem() {
  const csName = document.getElementById("csInput").value;
  const cs = getCodeSystem(csName);
  document.getElementById("csResult").innerText = JSON.stringify(cs, null, 2);
}

// -------------------- ValueSet Lookup --------------------
function lookupValueSet(query) {
  const results = [];
  for (const vs in valueSets) {
    valueSets[vs].forEach(code => {
      if (code.toLowerCase().includes(query.toLowerCase())) results.push(code);
    });
  }
  return results;
}

function showValueSet() {
  const q = document.getElementById("vsInput").value;
  const res = lookupValueSet(q);
  document.getElementById("vsResult").innerText = JSON.stringify(res, null, 2);
}

// -------------------- Translate NAMASTE <-> TM2 --------------------
function translateCode(code) {
  const mapping = conceptMaps["NAMASTE_TM2"] || {};
  return mapping[code] || "Unknown";
}

function showTranslation() {
  const code = document.getElementById("translateInput").value;
  document.getElementById("translateResult").innerText = translateCode(code);
}

// -------------------- FHIR Bundle Upload --------------------
function uploadBundle(bundleJSON) {
  try {
    const bundle = JSON.parse(bundleJSON);
    if(bundle.resourceType==="Bundle" && Array.isArray(bundle.entry)){
      return {status:"success", message:"Valid Bundle uploaded"};
    } else return {status:"error", message:"Invalid Bundle structure"};
  } catch(e) {
    return {status:"error", message:"Invalid JSON"};
  }
}

function uploadFHIRBundle() {
  const json = document.getElementById("bundleInput").value;
  const result = uploadBundle(json);
  document.getElementById("bundleResult").innerText = JSON.stringify(result, null, 2);
}

// -------------------- Voice Search --------------------
function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript;
    document.getElementById("voiceResult").innerText = "Heard: " + voiceText;
    document.getElementById("vsInput").value = voiceText;
    showValueSet();
  };
}
