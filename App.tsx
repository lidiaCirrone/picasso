import { StatusBar } from 'expo-status-bar';

// components
import { SafeAreaView } from 'react-native';
import EntryApp from './components/hookComponents/EntryApp';

// styles
import styleApp from './styles/styleApp';

export default function App() {
  return (
    <SafeAreaView style={styleApp.container}>
      <StatusBar style="auto" />
      <EntryApp />
    </SafeAreaView>
  );
}
