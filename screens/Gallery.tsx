import { FunctionComponent } from 'react';

// components
import { Image, View } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
interface GalleryProps {
   route: RouteProp<ParamListBase>;
}
const Gallery: FunctionComponent<GalleryProps> = (props): JSX.Element => {
   return (
      <>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
         <Image
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
            source={{ uri: props?.route?.params?.url }}
            />
            </View>
      </>
   )
}

export default Gallery;