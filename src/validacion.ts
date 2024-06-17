import * as IBAN from "ibantools";

function validateIBAN(iban: string): boolean {
  // Remover espacios y guiones del IBAN
  const cleanIBAN = iban.replace(/[\s\-]/g, "");

  // Validar IBAN usando ibantools
  return IBAN.isValidIBAN(cleanIBAN);
}

function extractBankInfo(iban: string): BankInfo | null {
  const cleanIBAN = iban.replace(/[\s\-]/g, "");

  const bankCode = cleanIBAN.slice(4, 8);
  const banks: { [key: string]: string } = {
    "2080": "Abanca Corporación Bancaria",
    "0061": "Banca March",
    "0188": "Banco Alcalá",
    "0182": "Banco Bilbao Vizcaya Argentaria",
    "0130": "Banco Caixa Geral",
    "0234": "Banco Caminos",
    "2105": "Banco Castilla-La Mancha",
    "0240": "Banco de Crédito Social Cooperativo",
    "0081": "Banco de Sabadell",
    "0487": "Banco Mare Nostrum",
    "0186": "Banco Mediolanum",
    "0238": "Banco Pastor",
    "0075": "Banco Popular Español",
    "0049": "Banco Santander",
    "3873": "Banco Santander Totta",
    "2038": "Bankia",
    "0128": "Bankinter",
    "0138": "Bankoa",
    "0152": "Barclays Bank PLC",
    "3842": "BNP Paribas Paris",
    "3025": "Caixa de Credit del Enginyers",
    "2100": "Caixabank",
    "2045": "Caja de Ahorros y Monte de Piedad de Ontinyent",
    "3035": "Caja Laboral Popular CC",
    "3081": "Caja Rural Castilla-La Mancha",
    "3058": "Cajamar Caja Rural",
    "2000": "Cecabank",
    "1474": "Citibank Europe PLC",
    "3821": "Commerzbank AG",
    "3877": "Danske Bank A/S",
    "0019": "Deutsche Bank SAE",
    "0239": "EVO Banco",
    "2085": "Ibercaja Banco",
    "1465": "ING Bank NV",
    "2095": "Kutxabank",
    "2048": "Liberbank",
    "0131": "Novo Banco",
    "0073": "Open Bank",
    "0108": "Société Générale",
    "2103": "Unicaja Banco",
  };

  const bankName = banks[bankCode];

  if (!bankName) {
    return null;
  }

  const office = cleanIBAN.slice(8, 12);
  const controlDigit = cleanIBAN.slice(12, 14);
  const accountNumber = cleanIBAN.slice(14);

  return {
    bankName,
    office,
    controlDigit,
    accountNumber,
  };
}

export { validateIBAN, extractBankInfo };
