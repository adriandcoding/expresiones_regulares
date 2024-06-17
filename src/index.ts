import { validateIBAN, extractBankInfo } from "./validacion";

const searchBtn = document.getElementById(
  "validateButton"
) as HTMLButtonElement | null;
const ibanInput = document.getElementById("iban") as HTMLInputElement | null;
const resultDiv = document.getElementById("resultado") as HTMLDivElement | null;

if (searchBtn && ibanInput && resultDiv) {
  searchBtn.addEventListener("click", () => {
    const iban = ibanInput.value.trim();

    if (!iban) {
      resultDiv.innerHTML = "<p>Por favor, introduce un IBAN.</p>";
      return;
    }

    if (!validateIBAN(iban)) {
      resultDiv.innerHTML = "<p>El IBAN introducido no es válido.</p>";
      return;
    }

    const bankInfo = extractBankInfo(iban);

    if (bankInfo) {
      resultDiv.innerHTML = `
        <p><strong>Banco:</strong> ${bankInfo.bankName}</p>
        <p><strong>Oficina:</strong> ${bankInfo.office}</p>
        <p><strong>Dígito de control:</strong> ${bankInfo.controlDigit}</p>
        <p><strong>Número de cuenta:</strong> ${bankInfo.accountNumber}</p>
      `;
    } else {
      resultDiv.innerHTML = "<p>No se pudo obtener información del banco.</p>";
    }
  });
}
