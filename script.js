function calculateRisk() {

    let age = parseInt(document.getElementById("age").value);
    let cancer = document.getElementById("cancer").value;
    let treatment = document.getElementById("treatment").value;
    let periods = document.getElementById("periods").value;

    let score = 0;

    // Age factor
    if (age > 35) score += 2;
    if (age > 40) score += 3;

    // Cancer severity
    if (cancer === "medium") score += 2;
    if (cancer === "high") score += 3;

    // Treatment
    if (treatment === "chemo") score += 3;
    if (treatment === "radiation") score += 2;

    // Period irregularity
    if (periods === "no") score += 2;

    let result = "";
    let advice = "";

    if (score <= 3) {
        result = "Low Fertility Risk";
        advice = "Consult your doctor, but fertility preservation may not be urgent.";
    }
    else if (score <= 6) {
        result = "Moderate Fertility Risk";
        advice = "Consider consulting a fertility specialist soon.";
    }
    else {
        result = "High Fertility Risk";
        advice = "Immediate consultation for egg freezing is strongly recommended before treatment.";
    }

    document.getElementById("result").innerText = result;
    document.getElementById("advice").innerText = advice;
}