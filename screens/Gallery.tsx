import { FunctionComponent } from 'react';

// components
import { Image } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
interface GalleryProps {
   route: RouteProp<ParamListBase>;
}
const Gallery: FunctionComponent<GalleryProps> = (props): JSX.Element => {
   return (
      <>
         <Image
            // resizeMode="contain"
            style={{ width: 200, height: 300 }}
            source={{ uri: props?.route?.params?.url }}

         />
      </>
   )
}

export default Gallery;