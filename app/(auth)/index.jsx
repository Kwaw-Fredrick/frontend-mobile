import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "../../styles/login.styles";
import { useState } from "react";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { Link } from "expo-router";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {isLoading, login} = useAuthStore();

  const handleLogin = async () =>{
    const result = await login(email, password);
    console.log(result);
    
    if(!result.success) Alert.alert("Error", result.error)
      
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/*top Illustration*/}

        <View style={styles.topIllustration}>
          <Image
            source={require("../../assets/images/login-pana.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.formContainer}>
              {/*email*/}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons 
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
                />

                <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                />
              </View>
            </View>

            {/*password*/}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
                />

                <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry= {!showPassword}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={()=>setShowPassword(!showPassword)}> 
                  <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/*button*/}
            <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={isLoading}>
              {isLoading ? (<ActivityIndicator color="#fff" />) 
              : (
                <Text style={styles.buttonText}>Login</Text>
              )

              }
            </TouchableOpacity>

            {/*footer*/}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
