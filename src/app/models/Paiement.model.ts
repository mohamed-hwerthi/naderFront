export interface Paiement {
  factureId: number;
  token: string;
  status: string;
  amount: number;
  paymentType: string;
}
