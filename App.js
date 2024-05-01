import { View, StatusBar } from "react-native";
import { LogBox } from "react-native";
import Navigation from "./src/navigation/Navigation";
import SplashScreen from "react-native-splash-screen";
import { useEffect } from "react";
export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
 
  const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 0 : 0;

useEffect(() => {
SplashScreen.hide()
}, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor:"#fff" }}>
        <StatusBar translucent backgroundColor="#fff" barStyle="light-content" />
      </View>
      <Navigation />
    </View>
  );
}