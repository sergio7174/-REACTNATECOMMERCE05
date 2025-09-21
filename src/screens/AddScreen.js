import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import Color from '../theme/Color';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ScrollView, TextInput,  } from 'react-native-gesture-handler';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import HeaderTabNavigationCustom from '../components/headerTabNavigationCustom';
import app from '../firebase/firebaseConfig';


const AddScreen = ({ navigation }) => {
    
    const db = getFirestore(app);
    const storage = getStorage();
    const [imageSquare, setImageSquare] = useState(null);
    const [imagePortrait, setImagePortrait] = useState(null);
    const [isloading, setIsLoading] = useState(false);

    handleSubmitAdd = async (values) => {

            const Datat = { }
            setIsLoading(true);
            
        // add values to firebase
        const docRef = await addDoc(collection(db, "Product"), values);
        setIsLoading(false);
        resetForm(); // Resets the form after submission

    }
    return (
      <View style={styles.container}>
         <HeaderTabNavigationCustom screenName="Add" onPress={() => navigation.openDrawer()} />
            <Formik
                initialValues=
                {{
                    name: '',
                    description: '',
                    roasted: '',
                    imageLink_square: '',
                    imageLink_portrait: '',
                    ingredients: '',
                    special_ingredients: '',
                    price: [
                        { size: '', price: '' },
                        { size: '', price: '' },
                        { size: '', price: '' },
                    ],
                    average_rating: '0',
                    ratings_count: '0',
                    review: [],
                    type: '',
                }}
                onSubmit={(values) => {

          alert("line 123 - AddScreen - onSubmit ..! ");

          if(!values.name ){
           alert("Need to Enter Product Name  .... !!!!");
           return;
          }
          if(!values.description ){
           alert("Need to Enter Product description  .... !!!!");
           return;
          }
          if(!values.roasted ){
           alert("Need to Enter Product roasted  .... !!!!");
           return;}
         if(!values.ingredients ){
           alert("Need to Enter Product ingredients  .... !!!!");
           return;}
         if(!values.special_ingredients ){
           alert("Need to Enter Product special_ingredients  .... !!!!");
           return;} 
         if(!values.price ){
           alert("Need to Enter Product price  .... !!!!");
           return;}
        if(!values.type ){
           alert("Need to Enter Product type  .... !!!!");
           return;}
        if(!values.imageLink_square ){
           alert("Need to Enter Product imageLink_square  .... !!!!");
           return;} 
        if(!values.imageLink_portrait ){
           alert("Need to Enter Product imageLink_portrait  .... !!!!");
           return;}   

        alert("values - line 157 - AddScreen- onSubmit - Ready to handleSubmitAdd(values) ");   
        handleSubmitAdd(values);
        }}>
    {({ handleChange, handleBlur, handleSubmit, resetForm,  values }) => (
    <ScrollView >
      <View style={styles.container}>
        <Text style={[styles.titleText, { textAlign: 'center', fontSize: 24, color: Color.orangeTextHex }]}>AddScreen</Text>
      </View>       
       <TextInput
        value={values.name}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        placeholder='Name'
        style={styles.input}
        placeholderTextColor={Color.greySubText}/>
      <TextInput
        value={values.description}
        onChangeText={handleChange('description')}
        onBlur={handleBlur('description')}
        placeholder='Description'
        style={styles.input}
        placeholderTextColor={Color.greySubText}/>
      <TextInput
        value={values.roasted}
        onChangeText={handleChange('roasted')}
        onBlur={handleBlur('roasted')}
        placeholder='Roasted'
        style={styles.input}
        placeholderTextColor={Color.greySubText}/>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TextInput
        value={values.price[0].size}
        onChangeText={handleChange('price[0].size')}
        onBlur={handleBlur('price[0].size')}
        placeholder='Size'
        style={[styles.input, { width: '48%' }]}
        placeholderTextColor={Color.greySubText}/>
      <TextInput
        value={values.price[0].price}
        onChangeText={handleChange('price[0].price')}
        onBlur={handleBlur('price[0].price')}
        placeholder='Price'
        style={[styles.input, { width: '48%' }]}
        placeholderTextColor={Color.greySubText}/>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
     <TextInput
        value={values.price[1].size}
        onChangeText={handleChange('price[1].size')}
        onBlur={handleBlur('price[1].size')}
        placeholder='Size'
        style={[styles.input, { width: '48%' }]}
        placeholderTextColor={Color.greySubText}/>
     <TextInput
        value={values.price[1].price}
        onChangeText={handleChange('price[1].price')}
        onBlur={handleBlur('price[1].price')}
        placeholder='Price'
        style={[styles.input, { width: '48%' }]}
        placeholderTextColor={Color.greySubText}/>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
     <TextInput
        value={values.price[2].size}
        onChangeText={handleChange('price[2].size')}
        onBlur={handleBlur('price[2].size')}
        placeholder='Size'
        style={[styles.input, { width: '48%' }]}
        placeholderTextColor={Color.greySubText}/>
     <TextInput
        value={values.price[2].price}
        onChangeText={handleChange('price[2].price')}
        onBlur={handleBlur('price[2].price')}
        placeholder='Price'
        style={[styles.input, { width: '48%' }]}
        placeholderTextColor={Color.greySubText}/>
    </View>
    <TextInput
        value={values.ingredients}
        onChangeText={handleChange('ingredients')}
        onBlur={handleBlur('ingredients')}
        placeholder='Ingredients'
        style={styles.input}
        placeholderTextColor={Color.greySubText}/>
    <TextInput
        value={values.special_ingredients}
        onChangeText={handleChange('special_ingredients')}
        onBlur={handleBlur('special_ingredients')}
        placeholder='Special Ingredients'
        style={styles.input}
        placeholderTextColor={Color.greySubText}/>
    <TextInput
        value={values.type}
        onChangeText={handleChange('type')}
        onBlur={handleBlur('type')}
        placeholder='Type'
        style={styles.input}
        placeholderTextColor={Color.greySubText}/>
    <TextInput
        value={values.imageLink_square}
        onChangeText={handleChange('imageLink_square')}
        onBlur={handleBlur('imageLink_square')}
        placeholder='imageLink square Web URL'
        style={[styles.input, { width: '100%' }]}
        placeholderTextColor={Color.greySubText}/>
    <TextInput
        value={values.imageLink_portrait}
        onChangeText={handleChange('imageLink_portrait')}
        onBlur={handleBlur('imageLink_portrait')}
        placeholder='imageLink portrait Web URL'
        style={[styles.input, { width: '100%' }]}
        placeholderTextColor={Color.greySubText}/>
        { isloading ?
          <View style={styles.button}>
            <ActivityIndicator size="large" color={Color.whiteHex} />
          </View> :
          <>
           <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.titleText}>Submit</Text>
           </TouchableOpacity>

            <TouchableOpacity onPress={resetForm} style={styles.button}>
            <Text style={styles.titleText}>Reset Form</Text>
           </TouchableOpacity>
          </>


           }
       
        </ScrollView>
                )}
    </Formik>
</View>
    )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.background,
        flex: 1,
        padding: 15,
        gap: 15,
        minHeight: 90
    },
    titleText: {
        color: Color.whiteHex,
        fontSize: 20
    },
    imageContaienr: {
        borderColor: Color.whiteHex,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        gap: 15,
        flexDirection: 'row',
    },
    imageItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Color.whiteHex,
        padding: 15,
        color: Color.whiteHex,
        fontSize: 20,
        marginBottom: 10
    },
    button: {
        backgroundColor: Color.orangeTextHex,
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})