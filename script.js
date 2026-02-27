function calculateRisk() {
    // legacy support: same scoring logic but improved UX
    const ageEl = document.getElementById("age");
    const age = parseInt(ageEl.value, 10);
    // new fields: cancerType (informational) and cancerStage (severity)
    const cancerType = (document.getElementById("cancerType") || {}).value || '';
    const cancerStage = (document.getElementById("cancerStage") || {}).value || 'low';
    const treatment = document.getElementById("treatment").value;
    const periods = document.getElementById("periods").value;
    const amhVal = parseFloat((document.getElementById("amh") || {}).value);

    const resultEl = document.getElementById("result");
    const adviceEl = document.getElementById("advice");

    // Simple validation
    if (!age || age < 12 || age > 120) {
        resultEl.innerText = "Please enter a valid age.";
        adviceEl.innerText = "";
        resultEl.style.color = "#b54040";
        return;
    }

    let score = 0;
    if (age > 35) score += 2;
    if (age > 40) score += 3;
    // Stage/severity contribution
    if (cancerStage === "medium") score += 2;
    if (cancerStage === "high") score += 3;
    if (treatment === "chemo") score += 3;
    if (treatment === "radiation") score += 2;
    if (periods === "no") score += 2;

    // AMH (anti-mullerian hormone) — lower values indicate lower ovarian reserve
    // This is a simplistic heuristic for educational purposes only.
    if (!isNaN(amhVal)){
        if (amhVal < 1.0) score += 3;       // low AMH
        else if (amhVal < 2.0) score += 1;  // borderline
        // normal/high AMH adds nothing
    }

    let result = "";
    let advice = "";
    let color = "var(--accent-2)";

    if (score <= 3) {
        result = "Low Fertility Risk";
        advice = "Consult your doctor, but fertility preservation may not be urgent.";
        color = "#2a9d8f";
    } else if (score <= 6) {
        result = "Moderate Fertility Risk";
        advice = "Consider consulting a fertility specialist soon.";
        color = "#f4a261";
    } else {
        result = "High Fertility Risk";
        advice = "Immediate consultation for egg freezing is strongly recommended before treatment.";
        color = "#d62839";
    }

    resultEl.innerText = result;
    adviceEl.innerText = advice;
    resultEl.style.color = color;

    // gentle scroll to results on smaller screens
    const resultsSection = document.getElementById('results');
    if (resultsSection) resultsSection.scrollIntoView({behavior: 'smooth'});
}

// wire button
document.addEventListener('DOMContentLoaded', function(){
    const btn = document.getElementById('checkBtn');
    if (btn) btn.addEventListener('click', calculateRisk);
});