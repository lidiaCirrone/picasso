import { Dimensions } from 'react-native';
let heightDevice = Dimensions.get('window').height
export default {
   container: `.m-signature-pad {
      flex:1;
      font-size: 10px;
      height: ${heightDevice};
      border: 1px solid #e8e8e8;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
    }`
}