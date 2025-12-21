import { View, Text } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { FC } from "react";

interface BalanceSummary {
  balance: number;
  expenses: number;
  income: number;
}

interface IBalanceCardProp {
  summary: BalanceSummary;
}

export const BalanceCard: FC<IBalanceCardProp> = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>${summary?.balance}</Text>

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${summary.income}
          </Text>
        </View>

        <View style={[styles.balanceStatItem, styles.statDivider]} />

        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -${Math.abs(summary.expenses).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
