// ImageDescriptionPage.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  ImageDescriptionPage: {
    imageUrl: string;
    imageId: string;
  };
  // ... other screens in the stack
};
// Use NativeStackScreenProps to simplify prop typing
type Props = NativeStackScreenProps<RootStackParamList, 'ImageDescriptionPage'>;
type ImageDescriptionPageProps = NativeStackScreenProps<RootStackParamList, 'ImageDescriptionPage'>;

const ImageDescriptionPage: React.FC<Props> = () => {
  const { params } = useRoute<Props['route']>();
  const navigation = useNavigation();
  const { imageUrl, imageId } = params;
  

  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async () => {
    // Your submit logic
    // For example, upload the description and tags to Firestore
    // associated with the imageUrl and imageId
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
        placeholder="Add tags (comma separated)..."
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