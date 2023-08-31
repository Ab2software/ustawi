import React, { useEffect } from "react";
import { Appearance, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// import { createNativeStackNavigator } from "@react-navigation/stack";

// ::::::::::::::::::::::::::::::::: importing screen
import { useTheme } from "../constants/ThemeProvider";

import Splash from "../screen/Splash/splash";
import IntroSlider from "../screen/IntroSlider/IntroSlider";
import Login from "../screen/Login/login";
import LoginBiomatric from '../screen/Login/loginbiomatric';
import Loginfaceid from '../screen/Login/loginfaceid';
import LoginSecurity from '../screen/Login/loginsecurity';
import Singup from './../screen/Signup/signup'
import Createpin from '../screen/Signup/createsecuritypin';
import Confirmpin from '../screen/Signup/confirmsecuritypin';
import Enablebiomatric from '../screen/Signup/enablebiomatric';
import Forgot from "../screen/Forgot/forgot";
import OtpVerification from "../screen/Otp/otpverification";
import Faceid from '../screen/Signup/faceid';
import Succes from "../screen/Success/succes";
import BottomTab from "./BottomTab";

import Profile from "../screen/Profile/Profile";
import FinanceGoal from "../screen/Categories/FinanceGoal";
import FinanceGoalTerm from "./../screen/Categories/FInanceGoalTerm";
import CreateYourGoal from "../screen/Categories/CreateYourGoal";
import UserEKyc from "../screen/Kyc/UserEKyc";
import Buying from "../screen/Categories/Buying";
import Onboarding from "../screen/IntroSlider/Onboarding";
import Save from "../screen/Payment/Save";
import ConfirmPayment from "../screen/Payment/ConfirmPayment";
import PaymentMethod from "../screen/Payment/PaymentMethod";
import PaymentDetails from "../screen/Payment/PaymentDetails";
import Capture from "../screen/Kyc/Capture";
import TakeASelefie from "../screen/Kyc/TakeASelefie";
import RetakeSelefie from "../screen/Kyc/RetakeSelefie";
import Continue from "../screen/Kyc/Continue";
import Categories from "../screen/Categories/Categories";
import GoalDetails from "../screen/Categories/GoalDetails";
import FinancialBudget from "../screen/Categories/FinancialBudget";
import FinncailBudgetTabs from "../screen/Categories/FinncailBudgetTabs";
import EditCategory from "../screen/Categories/EditCategory";
import Others from "../screen/Categories/Others";
import FoodandGroceries from "../screen/Categories/FoodandGroceries";
import CategorySuccess from "../screen/Categories/CategorySuccess";


const Stack = createStackNavigator();
PromoStack = (props) => {
  let initialRoute = "SplashScreen";
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      presentation="card"
      initialRouteName={initialRoute}
      {...props}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />

      <Stack.Screen name="IntroSlider" component={IntroSlider} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Loginfaceid" component={Loginfaceid} />
      <Stack.Screen name="LoginBiomatric" component={LoginBiomatric} />
      <Stack.Screen name="LoginSecurity" component={LoginSecurity} />
      <Stack.Screen name="Singup" component={Singup} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="Createpin" component={Createpin} />
      <Stack.Screen name="Confirmpin" component={Confirmpin} />
      <Stack.Screen name="Faceid" component={Faceid} />
      <Stack.Screen name="Enablebiomatric" component={Enablebiomatric} />
      <Stack.Screen name="Succes" component={Succes} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Profile" component={Profile} />

      <Stack.Screen name="FinanceGoal" component={FinanceGoal} />
      <Stack.Screen name="FinanceGoalTerm" component={FinanceGoalTerm} />
      <Stack.Screen name="CreateYourGoal" component={CreateYourGoal} />
      <Stack.Screen name="Buying" component={Buying} />

      <Stack.Screen name="Capture" component={Capture} />
      <Stack.Screen name="TakeASelefie" component={TakeASelefie} />
      <Stack.Screen name="RetakeSelefie" component={RetakeSelefie} />
      <Stack.Screen name="Continue" component={Continue} />



      <Stack.Screen name="Save" component={Save} />
      <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />


      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="GoalDetails" component={GoalDetails} />
      <Stack.Screen name="FinancialBudget" component={FinancialBudget} />
      <Stack.Screen name="FinncailBudgetTabs" component={FinncailBudgetTabs} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
      <Stack.Screen name="CategorySuccess" component={CategorySuccess} />

      <Stack.Screen name="Others" component={Others} />
      <Stack.Screen name="FoodandGroceries" component={FoodandGroceries} />






    </Stack.Navigator>
  );
};

export default function Router() {

  const { theme, updateTheme } = useTheme()
  useEffect(() => {
    let systemTheme = Appearance.getColorScheme()
    updateTheme(systemTheme, 'root')
  }, [])

  let ref = React.useRef(null),
    linking = {
      prefixes: ["google.com", "google.com"],
      config: {
        screens: {
          Home: "feed/:sort",
        },
      },
    };
  let initialScreen = "Promo";
  return (
    <NavigationContainer
      ref={ref}
      linking={linking}
      fallback={<Text>Loading...</Text>}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={initialScreen}
      >
        <Stack.Screen
          name="Promo"
          component={PromoStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
