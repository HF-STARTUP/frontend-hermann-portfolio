import { TransactionEvolutionItem } from "@/types/transactions.type";
import Model from "../Model";

export class TransactionsEvolutionModel extends Model {
  private _instance: TransactionEvolutionItem[];

  constructor(data: TransactionEvolutionItem[]) {
    super();
    this._instance = data || [];
  }

  get labels(): string[] {
    return this._instance.map((item) => item.period);
  }

  get incomingValues(): number[] {
    return this._instance.map((item) => item.incomingAmount ?? 0);
  }

  get outgoingValues(): number[] {
    return this._instance.map((item) => item.outgoingAmount ?? 0);
  }

  get commissionValues(): number[] {
    return this._instance.map((item) => item.commission ?? 0);
  }

  get count(): number {
    return this._instance.length;
  }

  get hasData(): boolean {
    return this._instance.length > 0;
  }
}