import { FunctionComponent, ReactNode, useEffect, useState } from 'react';

// components
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { getObjFromLocalStorage, setLocalStorageObj } from '../utils/localStorage';
interface GalleryProps {
   route: RouteProp<ParamListBase>;
}

const Gallery: FunctionComponent<GalleryProps> = (props): JSX.Element => {
   const [state, setState] = useState({
      images: []
   })
   useEffect(() => {
      getImg()
   }, [])
   const getImg = async () => {
      let myImages = await getObjFromLocalStorage('images')()
      console.log('heeeey', myImages)
      setState({
         ...state,
         images: myImages
      })
   }
   const renderImages = (item: { index: number; item: { url: string } }, key: number): ReactNode => {
      return (
         <TouchableOpacity onLongPress={renderSelectedImage(item)}>
            <Image
               key={key}
               source={{ uri: item.item.url }}
               style={{ width: 100, height: 100, margin: 10 }}
            />
         </TouchableOpacity>

      )
   }
   const renderSelectedImage = (item: { index: number }) => () => {
      const index = item.index;
      let obj = Object.assign({}, state)
      obj.images.splice(index, 1)
      setLocalStorageObj('images', obj.images)()
      setState(obj)
   }
   return (
      <>
         <FlatList
            columnWrapperStyle={{ flexWrap: 'wrap' }}
            numColumns={3}
            data={state?.images}
            style={{ padding: 10 }}
            renderItem={renderImages}>
         </FlatList>
      </>
   )
}

export default Gallery;