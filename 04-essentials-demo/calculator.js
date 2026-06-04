"use strict";
// data:
// initial amount
// annual contribution
// expected return
// duration
Object.defineProperty(exports, "__esModule", { value: true });
// function calculateInvestment(data: InvestmentData): InvestmentResult[] | string {
function calculateInvestment(data) {
    const { initialAmount, annualContribution, expectedReturn, duration } = data;
    if (initialAmount < 0) {
        return "Initial amount must be greater or equal to zero";
    }
    if (duration <= 0) {
        return "Duration can not be lesser or equal to zero";
    }
    if (expectedReturn < 0) {
        return "Expected return can not be lesser than zero";
    }
    let total = initialAmount;
    let totalContributions = 0;
    let totalInterestEarned = 0;
    const annualResults = [];
    for (let i = 0; i < duration; i++) {
        total = total * (1 + expectedReturn); // expReturn === 0.05 for instance for 5%
        totalInterestEarned = total - totalContributions - initialAmount;
        totalContributions = totalContributions + annualContribution;
        total = total + annualContribution;
        annualResults.push({
            yearId: `Year ${i + 1}`,
            totalAmount: total,
            totalContributions,
            totalInterestEarned,
        });
    }
    return annualResults;
} // => result[]
function printResults(results) {
    if (typeof results === "string") {
        console.log(results);
        return;
    }
    for (const yearResult of results) {
        console.log(yearResult.yearId);
        console.log(`Total: ${yearResult.totalAmount.toFixed(0)}`);
        console.log(`Total Contributions: ${yearResult.totalContributions.toFixed(0)}`);
        console.log(`Total Interest Earned: ${yearResult.totalInterestEarned.toFixed(0)}`);
        console.log("--------------------------------------");
    }
}
const data = {
    initialAmount: 10000,
    annualContribution: 1000,
    expectedReturn: 0.07,
    duration: 5,
};
const results = calculateInvestment(data);
printResults(results);
//# sourceMappingURL=calculator.js.map