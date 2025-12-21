import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils";
import React, { FC, memo } from "react";
import { TransactionItemProps } from "@/types/transactions";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const CATEGORY_ICONS: Record<string, IoniconName> = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};

export const TransactionItem: FC<TransactionItemProps> = memo(
  ({ item, onDelete }) => {
    const amountNum = Number(item.amount);
    const isIncome = amountNum > 0;

    const iconName: IoniconName =
      CATEGORY_ICONS[item.category] || "pricetag-outline";

    console.log("item-item", item);
    return (
      <View style={styles.transactionCard} key={item.id}>
        <TouchableOpacity style={styles.transactionContent}>
          <View style={styles.categoryIconContainer}>
            <Ionicons
              name={iconName}
              size={22}
              color={isIncome ? COLORS.income : COLORS.expense}
            />
          </View>

          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionCategory}>{item.category}</Text>
          </View>

          <View style={styles.transactionRight}>
            <Text
              style={[
                styles.transactionAmount,
                { color: isIncome ? COLORS.income : COLORS.expense },
              ]}
            >
              {isIncome ? "+" : "-"}${Math.abs(amountNum).toFixed(2)}
            </Text>

            <Text style={styles.transactionDate}>
              {formatDate(item.created_at)}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
        </TouchableOpacity>
      </View>
    );
  }
);

TransactionItem.displayName = "TransactionItem";
