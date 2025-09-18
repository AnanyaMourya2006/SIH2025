// -------------------- AUTH --------------------
function signup() {
  auth.createUserWithEmailAndPassword(
    document.getElementById("email").value,
    document.getElementById("password").value
  ).then(() => alert("Signed up!")).catch(alert);
}

function login() {
  auth.signInWithEmailAndPassword(
    document.getElementById("email").value,
    document.getElementById("password").value
  ).then(user => {
    document.getElementById("userStatus").innerText = "Logged in as " + user.user.email;
    loadRecords();
  }).catch(alert);
}

function logout() {
  auth.signOut();
  document.getElementById("userStatus").innerText = "Not logged in";
}

// -------------------- FIRESTORE --------------------
function addRecord() {
  const name = document.getElementById("patientName").value;
  const diagnosis = document.getElementById("diagnosis").value;
  db.collection("patients").add({ name, diagnosis })
    .then(() => alert("Record added!"))
    .catch(alert);
}

function loadRecords() {
  db.collection("patients").get().then(snapshot => {
    let html = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      html += `<li>${data.name} - ${data.diagnosis}</li>`;
    });
    document.getElementById("records").innerHTML = html;
  });
}

// -------------------- MOCK SEARCH --------------------
const terms = ["Namaste001", "Namaste002", "ICD11-C01", "TM2-AYU01"];
function searchCodes() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const results = terms.filter(t => t.toLowerCase().includes(query));
  document.getElementById("results").innerHTML = results.map(r => `<li>${r}</li>`).join("");
}

// -------------------- MOCK TRANSLATE --------------------
function translateCode() {
  const code = document.getElementById("translateInput").value;
  const translations = {
    "Namaste001": "TM2-AYU01",
    "TM2-AYU01": "Namaste001",
    "ICD11-C01": "Lip Cancer"
  };
  document.getElementById("translateResult").innerText = "Result: " + (translations[code] || "Unknown");
}

// -------------------- VOICE SEARCH --------------------
function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript;
    document.getElementById("voiceResult").innerText = "Heard: " + voiceText;
    document.getElementById("searchBox").value = voiceText;
    searchCodes();
  };
}
