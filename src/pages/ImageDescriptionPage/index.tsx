// ImageDescriptionPage.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the types for the navigation parameters
type ImageDescriptionPageParams = {
  ImageDescriptionPage: {
    imageUrl: string;
    imageId: string;
  };
};

// Define the route prop type for this screen
type ImageDescriptionPageRouteProp = RouteProp<ImageDescriptionPageParams, 'ImageDescriptionPage'>;

// Define the navigation prop type for this screen
type ImageDescriptionPageNavigationProp = NativeStackNavigationProp<ImageDescriptionPageParams, 'ImageDescriptionPage'>;

// Define the props type for the component
interface ImageDescriptionPageProps {
  route: ImageDescriptionPageRouteProp;
  navigation: ImageDescriptionPageNavigationProp;
}

const ImageDescriptionPage: React.FC<ImageDescriptionPageProps> = (props) => {
  // Use the props parameter to get the route and navigation props
  const { imageUrl, imageId } = props.route.params;
  const navigation = useNavigation<ImageDescriptionPageNavigationProp>();

  const [description, setDescription] = useState('');
  // Make sure to set the state type explicitly to avoid type issues
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async () => {
    // Logic to upload the description and tags to Firestore
    // associated with the imageUrl and imageId
    // ...
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a description..."
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Add tags..."
        value={tags.join(', ')}
        onChangeText={(text) => setTags(text.split(',').map(tag => tag.trim()))}
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