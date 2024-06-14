export interface BankInfo {
  [key: string]: string;
}
export interface InformacionIban {
  banco: string;
  sucursal: string;
  digitos_control: string;
  numero_cuenta: string;
}
