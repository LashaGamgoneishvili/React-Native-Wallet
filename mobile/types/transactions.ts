export type TransactionCategory =
  | "Food & Drinks"
  | "Shopping"
  | "Transportation"
  | "Entertainment"
  | "Bills"
  | "Income"
  | "Other"
  | string;

export interface TransactionItemModel {
  id: number;
  title: string;
  category: TransactionCategory;
  amount: string;
  created_at: string;
  user_id?: string;
}

export interface TransactionItemProps {
  item: TransactionItemModel;
  onDelete: (id: number) => void;
}
