import styles from "./Style";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function LoginScreen() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput></TextInput>
                <TextInput style={styles.input} placeholder="Phone" />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}