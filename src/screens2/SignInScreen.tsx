import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Button, StyleSheet, KeyboardAvoidingView, Platform, Image} from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {

const navigation = useNavigation();

  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Image
           style={{ flex: 1,maxHeight:'16%', maxWidth:'25%', alignSelf:'center'}}
            source={require('../assets/images/ICONOS/LOGIN01.png')} height={10} width={5} />
           <Text style={styles.title}>Sign in</Text>    
            <View>
           
       
        <>
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

      {/*<TouchableOpacity onPress={onSignInPress}>
        <Text>Continue</Text>
      </TouchableOpacity>*/}

      <TouchableOpacity
                  style={styles.button}
                  onPress={onSignInPress}>
                  <Text style={styles.buttonTitle}>Sign In</Text>
      </TouchableOpacity>

      <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                  {/* Footer link to navigate to the login screen */}
                      <View style={styles.footerView}>
                          <Text style={styles.footerText}>Don't have an account?
                            <Text onPress={() => navigation.navigate('SignUp')} style={styles.footerLink}> Sign up</Text></Text>
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
