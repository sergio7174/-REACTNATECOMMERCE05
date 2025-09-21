import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, Button,  KeyboardAvoidingView, StyleSheet, Platform,Image} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpSchema = z.object({
  email: z.string({ message: 'Email is required' }).email('Invalid email'),
  password: z
    .string({ message: 'Password is required' })
    .min(8, 'Password should be at least 8 characters long'),
});

type SignUpFields = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {

const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFields>({
    resolver: zodResolver(signUpSchema),
  });

  
  const navigation = useNavigation();

  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
  
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <Image
   style={{ flex: 1,maxHeight:'16%', maxWidth:'25%', alignSelf:'center'}}
    source={require('../assets/images/ICONOS/VERIFY03BLUE.png')} height={10} width={5} />
   <Text style={styles.title}>Verify your email</Text>    
    <View>
      <View>
         <View style={styles.form}></View>        

      
         <TextInput
                    style={styles.input}
                    placeholder='Enter your verification code'
                    placeholderTextColor="#666363ff"
                    onChangeText={(code) => setCode(code)}
                    value={code}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={onVerifyPress}>
            <Text style={styles.buttonTitle}>Verify Email</Text>
        </TouchableOpacity>
        
        
        </View>
      </KeyboardAvoidingView>
      </>
    )
  }

  return (
<KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            
  <Image
   style={{ flex: 1,maxHeight:'16%', maxWidth:'25%', alignSelf:'center'}}
    source={require('../assets/images/ICONOS/SIGNUP03.png')} height={10} width={5} />
   <Text style={styles.title}>Create an account</Text>    
    <View>
      <>
         <View style={styles.form}>
       
        <TextInput
                    style={styles.input}
                    placeholder='Enter Email'
                    placeholderTextColor="#666363ff"
                    onChangeText={(email) => setEmailAddress(email)}
                    value={emailAddress}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

        <TextInput
                    style={styles.input}
                    placeholder='Enter password'
                    placeholderTextColor="#666363ff"
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />      
            </View>


        <TouchableOpacity
            style={styles.button}
            onPress={onSignUpPress}>
            <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>


        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            {/* Footer link to navigate to the login screen */}
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={() => navigation.navigate('SignIn')} style={styles.footerLink}>Sign In</Text></Text>
                </View>      
        </View>
      </>
    </View>
  </KeyboardAvoidingView>  
  )
}

const styles = StyleSheet.create({
  logo: {
        flex: 1,
        height: 50,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  form: {
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: "center",
  },
  link: {
    color: '#4353FD',
    fontWeight: '600',
  },
  input: {
        height: 48,
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,

        borderColor: '#ccc',
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
});
