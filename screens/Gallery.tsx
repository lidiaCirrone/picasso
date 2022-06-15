import { FunctionComponent, useEffect, useState } from 'react';

// components
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { getObjFromLocalStorage, setLocalStorageObj } from '../utils/localStorage';


// Style 
import styleGallery from '../styles/styleGallery';

const Gallery: FunctionComponent = (): JSX.Element => {
   const [state, setState] = useState({
      images: []
   })
   useEffect(() => {
      getImg()
   }, [])
   const getImg = async () => {
      let myImages = await getObjFromLocalStorage('images')()
      setState({
         ...state,
         images: myImages
      })
   }

   const renderImages = (item: { index: number; item: { url: string } }) => {
      return (
         <TouchableOpacity onLongPress={renderSelectedImage(item)}>
            <Image
               resizeMode="contain"
               source={{ uri: item.item.url }}
               style={styleGallery.imageGallery}
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
      <View style={styleGallery.container}>
         <FlatList
            horizontal={false}
            numColumns={3}
            data={state?.images}
            style={styleGallery.flatlist}
            renderItem={renderImages}>
         </FlatList>
      </View>
   )
}

export default Gallery;