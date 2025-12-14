import type { Request, Response } from "express";
import { sql } from "../config/db.js";

export async function getTransactionByUserId(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const id = Number(userId);
    if (!Number.isFinite(id)) {
      res.status(400).json({ message: "Invalid userId" });
      return;
    }

    const transactions = await sql`
      SELECT *
      FROM transactions
      WHERE user_id = ${id}
      ORDER BY created_at DESC
    `;

    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error getting the transactions", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createTransaction(req: Request, res: Response) {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !category || !user_id || amount === undefined) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const transaction = await sql`
      INSERT INTO transactions(user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
      `;

    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTransaction(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      res.status(400).json({ message: "Invalid transaction ID" });
      return;
    }

    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      res.status(404).json({ message: "Transaction  not found" });
      return;
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting the transaction");
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSummeryByUSerId(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const balanceResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}`;

    const incomeResult =
      await sql`SELECT COALESCE(SUM(amount)) as income FROM transactions WHERE user_id = ${userId} AND  amount > 0 `;

    const expenses =
      await sql`SELECT COALESCE(SUM(amount)) as expenses FROM transactions WHERE user_id = ${userId} AND  amount < 0 `;

    console.log(balanceResult);

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expenses[0].expenses,
    });
  } catch (error) {
    console.log("Error getting summery");
    res.status(500).json("Internal server error");
  }
}
