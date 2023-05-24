/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-ui-lib';
import CustomKeyboard from '../custom_components/CustomKeyboard';

const MainScreen = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleTextInputChange = text => {
    setTextInputValue(text);
  };

  const handleKeyPress = key => {
    setTextInputValue(textInputValue + key);
  };

  return (
    // KeyboardAwareScrollView replaced by view
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{height: 800, flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
          <TextInput
            style={{borderWidth: 1, padding: 10, backgroundColor: '#fff'}}
            value={textInputValue}
            onChangeText={handleTextInputChange}
            onFocus={() => setIsKeyboardVisible(true)}
          />
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        {isKeyboardVisible && <CustomKeyboard onKeyPress={handleKeyPress} />}
      </View>
    </View>
  );
};

export default MainScreen;
