import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import styles from "./Style";

export default function IncomeCalculator() {
    const [income, setIncome] = useState('');
    const [tax, setTax] = useState<string | null>(null);

    const Calculate = () => {
        const incomeNum = parseFloat(income);
        if (isNaN(incomeNum) || incomeNum < 0) {
            setTax("Invalid income amount");
            return;
        }

        let tax = 0;
        if (incomeNum <= 1000) {
            tax = incomeNum * 0.10;
        } else if (incomeNum <= 2000) {
            tax = 100 + (incomeNum - 1000) * 0.15;
        } else if (incomeNum <= 5000) {
            tax = 250 + (incomeNum - 2000) * 0.20;
        } else if (incomeNum <= 10000) {
            tax = 850 + (incomeNum - 5000) * 0.25;
        } else {
            tax = 2100 + (incomeNum - 10000) * 0.30;
        }

        setTax(tax.toFixed(2));
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Calculate Tax</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your income"
                    keyboardType="numeric"
                    value={income}
                    onChangeText={setIncome}
                />
                <TouchableOpacity style={styles.button} onPress={Calculate}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>
                <Text style={styles.resultText}>{tax}</Text>
            </View>
        </ScrollView>
    );
}
