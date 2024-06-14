import { banks } from "./bancos-data";
import { IBAN } from "ibantools";
import { InformacionIban } from "./model";

function normalizeIBAN(iban: string): string {
  // Elimina espacios y guiones del IBAN.
  return iban.replace(/[\s-]/g, "");
}

function isValidIBANFormat(iban: string): boolean {
  // Verifica que el IBAN esté bien formado.
  const regex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
  return regex.test(iban);
}

function validateIBAN(iban: string): boolean {
  const normalizedIBAN = normalizeIBAN(iban);

  if (!isValidIBANFormat(normalizedIBAN)) {
    return false;
  }

  // Usa la librería ibantools para verificar la validez del IBAN.
  return IBAN.isValid(normalizedIBAN);
}
function extractBankInfo(iban: string): InformacionIban {
  const normalizedIBAN = normalizeIBAN(iban);
  const bankCode = normalizedIBAN.slice(4, 8);
  const sucursal = normalizedIBAN.slice(8, 12);
  const digitos_control = normalizedIBAN.slice(12, 14);
  const numero_cuenta = normalizedIBAN.slice(14, 24);
  const banco = banks[bankCode] || "Desconocido";

  return {
    sucursal,
    digitos_control,
    numero_cuenta,
    banco,
  };
}
function updateResult(iban: string): void {
  const resultDiv = document.getElementById("result")!;
  const bankInfo = extractBankInfo(iban);

  if (bankInfo) {
    resultDiv.innerHTML = `
          <p><strong>Banco:</strong> ${bankInfo.banco}</p>
          <p><strong>Código de Sucursal:</strong> ${bankInfo.sucursal}</p>
          <p><strong>Dígito de Control:</strong> ${bankInfo.digitos_control}</p>
          <p><strong>Número de Cuenta:</strong> ${bankInfo.numero_cuenta}</p>
      `;
  } else {
    resultDiv.innerHTML = `<p>IBAN: ${iban} - No válido o no se puede extraer información</p>`;
  }
}
