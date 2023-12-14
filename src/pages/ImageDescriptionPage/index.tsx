
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../model/data';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';

import { ImageUpload } from '../../components/CameraComponents/ImageUpload';
import { ActivityIndicator } from 'react-native';
import *  as ImagePicker from "expo-image-picker";


type Props = NativeStackScreenProps<RootStackParamList, 'ImageDescriptionPage'>;


          context?.setCurrentImage({
            imageUri: imageUpload,
            uniqueId: imageId,
          });


          </View>
        </View>
      </View>
    )}
  </ImageBackground>
  );
};

export default ImageDescriptionPage;