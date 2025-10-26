import { DefaultTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#70e0e0ff",
        background: "#94bacaff",
        card: "#52e59eff",
        strong: "#dc2c2cff",
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 38,
        marginTop: 70,
        fontWeight: "bold",
        color: AppTheme.colors.primary,
        alignSelf: "center",
    },
    input: {
        width: "80%",
        height: 40,
        borderColor: AppTheme.colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: AppTheme.colors.card,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    resultText: {
        fontSize: 18,
        marginTop: 20,
        color: AppTheme.colors.strong,
    },
    opButton: {
        backgroundColor: '#f39c12',
    },
    clearButton: {
        backgroundColor: '#e74c3c',
    },
    keyboard: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    display: {
        padding: 20,
        alignItems: 'flex-end',
    },
    displayText: {
        color: '#348a62ff',
        fontSize: 48,
        fontWeight: 'bold',
    },
});

export default styles;