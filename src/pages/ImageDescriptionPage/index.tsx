// ImageDescriptionPage.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../model/data';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase/FirebaseConfig';


// Use NativeStackScreenProps to simplify prop typing
type Props = NativeStackScreenProps<RootStackParamList, 'ImageDescriptionPage'>;
type ImageDescriptionPageProps = NativeStackScreenProps<RootStackParamList, 'ImageDescriptionPage'>;


const ImageDescriptionPage: React.FC<Props> = () => {

    const context = UseImageContext();

    const { params } = useRoute<Props['route']>();
    const navigation = useNavigation();
    const { imageUrl, imageId } = params;


    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleSubmit = async () => {
        try {
          // Assuming 'imageId' is the document ID for your Firestore collection
          const imageDocRef = doc(FIREBASE_DB, 'images', imageId);
      
          // Set the document with the new data
          await setDoc(imageDocRef, {
            description: context?.description,
            tags: context?.tags,
            // Any additional fields you want to include...
          }, { merge: true }); // Using merge: true to update the document or create it if it doesn't exist
      
          // If the upload is successful, you can navigate back or show a success message
          console.log('Details saved successfully!');
          // navigation.goBack(); // Uncomment if you want to navigate back after saving

          //navigation.navigate("HomePage");
          navigation.goBack();

        } catch (error) {
          console.error('Error writing document to Firestore:', error);
        }
      };

    return (
        <View style={styles.container}>

            <Image source={{uri: context?.currentImage?.imageUri}} style={{width: 300, height: 350, borderRadius: 5}}/>

            <TextInput
                style={styles.input}
                placeholder="Write a description..."
                value={context?.description}
                onChangeText={context?.setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Add tags..."
                value={context?.tags.join(', ')}
                onChangeText={(text) => context?.setTags(text.split(',').map(tag => tag.trim()))}
            />
            <Button title="Save Details" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default ImageDescriptionPage;