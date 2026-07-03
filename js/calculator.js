// mortgage calculator
let payment = document.querySelector("#mpayment");
let pv, extra, rate, term;
const schedule = document.querySelector(".schedule-content");
const scheduleButton = document.querySelector("#schedule");
const reset = document.querySelector("#reset");
const calculate = document.querySelector("#calculate");

schedule.style.display = "none";

function numberOfPeriods(pv, monthly, rate) {
  rate = rate / 12 / 100;
  return -(Math.log(1 - (rate * pv) / monthly) / Math.log(1 + rate));
}

function getMonthlyPayment(pv, num, rate) {
  rate = rate / 12 / 100;

  return (
    (pv * (rate * Math.pow(1 + rate, num))) / (Math.pow(1 + rate, num) - 1)
  );
}

reset.addEventListener("click", (e) => {
  document.querySelector("#mpayment").innerHTML = "";
  schedule.innerHTML = "";
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  pv = document.querySelector("#loanAmount");
  extra = document.querySelector("#extra");
  rate = document.querySelector("#interest");
  term = document.querySelector("#term");

  pv = parseFloat(pv.value);
  extra = parseFloat(extra.value);
  rate = parseFloat(rate.value);
  term = parseFloat(term.value);

  term = term * 12;
  let newMonthlyPayments = 0;

  if (pv && term && rate) {
    let monthlyPayment = getMonthlyPayment(pv, term, rate);
    let totalInterest = monthlyPayment * term - pv;

    payment.innerHTML = `
                                    <p>
                                        <strong>
                                            Your monthly payments will be ${monthlyPayment.toLocaleString(
                                              "en-US",
                                              {
                                                style: "currency",
                                                currency: "USD",
                                              }
                                            )} for a ${term} month mortgage
                                        </strong>
                                    </p>
                                    <p>
                                        <strong>
                                            Total Cost = ${(
                                              term * monthlyPayment
                                            ).toLocaleString("en-US", {
                                              style: "currency",
                                              currency: "USD",
                                            })}
                                        </strong>
                                    </p>
                                    <p>Total Interest = ${totalInterest.toLocaleString(
                                      "en-US",
                                      { style: "currency", currency: "USD" }
                                    )}</p>
                                `;

    if (extra > 0) {
      newMonthlyPayments = monthlyPayment + extra;
      newNumberOfMonths = numberOfPeriods(pv, newMonthlyPayments, rate);
      let newTotalInterest = newNumberOfMonths * newMonthlyPayments - pv;
      let interestSaving = totalInterest - newTotalInterest;

      if (newMonthlyPayments > 0) {
        payment.innerHTML += `
                                        <hr style="background: #ff6f61">
                                        <p>
                                            <strong>Since you have chosen to pay an additional ${extra.toLocaleString(
                                              "en-US",
                                              {
                                                style: "currency",
                                                currency: "USD",
                                              }
                                            )}, 
                                                your new monthly payments will be ${newMonthlyPayments.toLocaleString(
                                                  "en-US",
                                                  {
                                                    style: "currency",
                                                    currency: "USD",
                                                  }
                                                )} 
                                                .
                                            </strong>
                                        </p>
                                       
                                        <p>
                                            <strong>Also, at this pace you will pay off your morgage in ${newNumberOfMonths.toFixed(
                                              2
                                            )} months
                                            </strong>
                                        </p>

                                        <strong>
                                            Total Cost = ${(
                                              newNumberOfMonths *
                                              newMonthlyPayments
                                            ).toLocaleString("en-US", {
                                              style: "currency",
                                              currency: "USD",
                                            })}
                                        </strong>
                                        <p>
                                            Total Interest = ${newTotalInterest.toLocaleString(
                                              "en-US",
                                              {
                                                style: "currency",
                                                currency: "USD",
                                              }
                                            )}
                                        </p>
                                        <p>
                                            <strong>You will also save  ${interestSaving.toLocaleString(
                                              "en-US",
                                              {
                                                style: "currency",
                                                currency: "USD",
                                              }
                                            )} in interest! :)
                                            </strong>
                                        </p>
                                    `;
      }
    }

    payment.style.display = "block";
    payment.style.opacity = 1;
  }
});

scheduleButton.addEventListener("click", (e) => {
  let payment = getMonthlyPayment(pv, term, rate);
  // console.log(payment)

  let table = `
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Month</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Interest</th>
                            <th scope="col">Principal</th>
                            
                        </tr>
                    </thead>
                <tbody>
    `;

  let schedBalance = pv;
  let schedInterest = rate / 12 / 100;
  let schedTerm = term;
  let schedExtra = extra;
  let schedInterestPayment = schedBalance * schedInterest;
  let schedPrincipalPayment = payment - schedInterestPayment;
  if (schedExtra > 0) {
    payment = payment + schedExtra;
    schedTerm = numberOfPeriods(schedBalance, payment, schedInterest * 1200);
    schedInterestPayment = schedBalance * schedInterest;
    schedPrincipalPayment = payment - schedInterestPayment;
  }

  for (let i = 1; i <= schedTerm; i++) {
    table += `
            <tr>
                <th scope="row">${i}</th>
                <td>${schedBalance.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}</td>
                <td>${schedInterestPayment.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}</td>
                <td>${schedPrincipalPayment.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}</td>
            </tr>
        `;

    schedBalance = schedBalance - schedPrincipalPayment;
    schedInterestPayment = schedBalance * schedInterest;
    schedPrincipalPayment = payment - schedInterestPayment;
  }

  table += `
    </tbody></table>

    `;

  document.querySelector(".schedule-content").innerHTML = table;
  schedule.style.display = "block";
});
