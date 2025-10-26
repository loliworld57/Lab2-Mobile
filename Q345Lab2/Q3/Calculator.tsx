import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Style";

export default function Calculator() {
    const [value, setValue] = useState<string | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [result, setResult] = useState<string>('0');
    const [justCalculated, setJustCalculated] = useState<boolean>(false);

    const handleInput = (num: string) => {
        if (justCalculated) {
            setResult(num);
            setJustCalculated(false);
            return;
        }
        if (result === '0') setResult(num);
        else setResult(result + num);
    };

    const handleOperatorInput = (op: string) => {
        if (value !== null && operator && !justCalculated) {
            calculateResult();
        } else {
            setValue(result);
        }
        setOperator(op);
        setJustCalculated(false);
        setResult('');
    };

    const calculateResult = () => {
        const num1 = parseFloat(value || '0');
        const num2 = parseFloat(result || '0');
        let calcResult: string;

        if (operator === '+') calcResult = (num1 + num2).toString();
        else if (operator === '-') calcResult = (num1 - num2).toString();
        else if (operator === '*') calcResult = (num1 * num2).toString();
        else if (operator === '/') calcResult = num2 !== 0 ? (num1 / num2).toString() : 'Error';
        else calcResult = result;

        setResult(calcResult);
        setValue(null);
        setOperator(null);
        setJustCalculated(true);
    };

    const clearResult = () => {
        setResult('0');
        setValue(null);
        setOperator(null);
        setJustCalculated(false);
    };

    const buttons = [
        ['7', '8', '9','/'],
        ['4', '5', '6','*'],
        ['1', '2', '3','+'],
        ['0', '=','C', '-'],
    ];

    return (
        <View style={styles.container}>
            {/* Display */}
            <View style={styles.display}>
                <Text style={styles.displayText}>{result}</Text>
            </View>

            {/* Keyboard */}
            <View style={styles.keyboard}>
                {buttons.map((row, i) => (
                    <View key={i} style={styles.row}>
                        {row.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.button,
                                    ['/', '*', '-', '+', '='].includes(item) && styles.opButton,
                                    item === 'C' && styles.clearButton,
                                ]}
                                onPress={() => {
                                    if (item === 'C') clearResult();
                                    else if (item === '=') calculateResult();
                                    else if (['+', '-', '*', '/'].includes(item)) handleOperatorInput(item);
                                    else if (item === '←') setResult(result.slice(0, -1) || '0');
                                    else handleInput(item);
                                }}
                            >
                                <Text style={styles.buttonText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}
