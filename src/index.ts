import { validateIBAN, extractBankInfo } from "./validacion";

const searchBtn = document.getElementById("validate");
const ibanInput = document.getElementById("iban") as HTMLInputElement;
const resultDiv = document.getElementById("resultado");

if (searchBtn && ibanInput && resultDiv) {
  searchBtn.addEventListener("click", () => {
    console.log("hola");
    resultDiv.innerHTML = "hola";
  });
}
