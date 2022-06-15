import { FunctionComponent, ReactNode, useEffect, useState } from 'react';

// components
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { getObjFromLocalStorage, setLocalStorageObj } from '../utils/localStorage';



const Gallery: FunctionComponent = (): JSX.Element => {
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

   const renderImages = (item: { index: number; item: { url: string } }) => {
      return (
         <TouchableOpacity onLongPress={renderSelectedImage(item)}>
            <Image
               resizeMode="contain"
               // key={key}
               source={{ uri: item.item.url }}
               style={{ width: 100, height: 200, margin: 10 }}
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
            // contentContainerStyle={{ justifyContent: 'space-between' }}
            horizontal={false}
            numColumns={3}
            data={state?.images}
            style={{ padding: 10 }}
            renderItem={renderImages}>
         </FlatList>
      </>
   )
}

export default Gallery;