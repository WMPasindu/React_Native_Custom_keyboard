/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import CustomKeyboard from './CustomKeyboard';
import MathJax from 'react-native-mathjax-svg';

const CustomModal = React.memo(
  ({
    setShowModal,
    questionType,
    refInput,
    refInput2,
    refInput3,
    handleKeyboardOptions,
    setIsCustomKeyboard,
    isCustomKeyboard,
    singleText,
    valueText,
    unitText,
    setSingleText,
    setValueText,
    setUnitText,
    focusRef,
  }) => {
    const [currectFocusId, setCurrentFocusId] = useState(null);

    useEffect(() => {
      focusRef.current.focus();
      setCurrentFocusId(focusRef);
    }, [focusRef]);

    const onFocusKeyboardDismiss = refId => {
      console.log(
        'LOG',
        'customModal rendering 123 --------- ' + JSON.stringify(refId),
      );
      setCurrentFocusId(refId);

      if (isCustomKeyboard) {
        Keyboard.isVisible(false);
      }
    };

    const setOnValueChange = value => {
      switch (currectFocusId) {
        case 'abc_1111':
          setSingleText(value);
          break;
        case 'abc_2222':
          setValueText(value);
          break;
        case 'abc_3333':
          setUnitText(value);
          break;
        default:
          console.log(
            'LOG',
            'Error: No focus Id matched with the existing ids.',
          );
      }
    };

    const handleKeyPress = key => {
      setOnValueChange(key);
      console.log(key);

      switch (currectFocusId) {
        case 'abc_1111':
          setOnValueChange(singleText + ' ' + key + ' ');
          break;
        case 'abc_2222':
          setOnValueChange(valueText + ' ' + key + ' ');
          break;
        case 'abc_3333':
          setOnValueChange(unitText + ' ' + key + ' ');
          break;
        default:
          console.log(
            'LOG',
            'Error: No focus Id matched with the existing ids.',
          );
      }
    };

    return (
      <RNModal>
        <View style={styles.modalTopView}>
          <Text style={styles.modalTopText}>Enter Your Value</Text>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.closeButton}>
            <Image
              style={styles.closeIcon}
              source={require('../assets/close.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{top: '10%'}}>
          {questionType === 'shortAnswers' ? (
            <View style={styles.bottomSheetContentModal}>
              <TextInput
                ref={refInput}
                style={styles.textInputAnswerModal}
                value={singleText}
                placeholder="Type your answer here"
                placeholderTextColor="#808080"
                paddingHorizontal={10}
                autoFocus={true}
                onFocus={() => onFocusKeyboardDismiss('abc_1111')}
                onChangeText={val => setOnValueChange(val)}
                showSoftInputOnFocus={!isCustomKeyboard}
              />
              <View style={styles.button}>
                <MathJax fontSize={16} color={'black'}>
                  {singleText}
                </MathJax>
              </View>
              <TouchableOpacity
                style={styles.buttonAnswerModal}
                onPress={() => handleKeyboardOptions()}>
                <Text style={{color: '#FFF'}}>
                  {!isCustomKeyboard
                    ? 'default Keyboard'
                    : 'Numerical Keyboard'}
                </Text>
                {!isCustomKeyboard ? (
                  <Image
                    style={styles.tinyLogo}
                    source={require('../assets/keyboard.png')}
                  />
                ) : (
                  <Image
                    style={styles.tinyLogo}
                    source={require('../assets/plusMinus.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.bottomSheetContentModal}>
              <TextInput
                ref={refInput2}
                style={styles.textInputAnswerModal}
                value={valueText}
                placeholder="Type your answer here"
                placeholderTextColor="#808080"
                paddingHorizontal={10}
                onFocus={() => onFocusKeyboardDismiss('abc_2222')}
                onChangeText={val => setOnValueChange(val)}
                showSoftInputOnFocus={!isCustomKeyboard}
              />
              <View style={styles.button}>
                <MathJax fontSize={16} color={'black'}>
                  {valueText}
                </MathJax>
              </View>
              <TextInput
                ref={refInput3}
                style={styles.textInputAnswerModal}
                placeholder="Add Unit"
                value={unitText}
                placeholderTextColor="#808080"
                paddingHorizontal={10}
                onFocus={() => onFocusKeyboardDismiss('abc_3333')}
                onChangeText={val => setOnValueChange(val)}
                showSoftInputOnFocus={!isCustomKeyboard}
              />
              <View style={styles.button}>
                <MathJax fontSize={16} color={'black'}>
                  {unitText}
                </MathJax>
              </View>
              <TouchableOpacity
                style={styles.buttonAnswerModal}
                onPress={() => handleKeyboardOptions()}>
                <Text style={{color: '#FFF'}}>Switch Keyboard</Text>
                {!isCustomKeyboard ? (
                  <Image
                    style={styles.tinyLogo}
                    source={require('../assets/keyboard.png')}
                  />
                ) : (
                  <Image
                    style={styles.tinyLogo}
                    source={require('../assets/plusMinus.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <CustomKeyboard
            setIsCustomKeyboard={setIsCustomKeyboard}
            isCustomKeyboard={isCustomKeyboard}
            onKeyPress={handleKeyPress}
            // textInputRef={refInput}
          />
        </View>
      </RNModal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 16,
    backgroundColor: '#fff',
  },
  bottomSheetContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 24,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContentModal: {
    flexDirection: 'column',
    height: '100%',
    paddingHorizontal: 10,
    marginVertical: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
  },
  textInputAnswer: {
    flex: 2,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
  },
  textInputAnswerModal: {
    height: '6%',
    width: '100%',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  buttonAnswerModal: {
    flexDirection: 'row',
    height: '6%',
    width: '50%',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#585FDD',
    borderWidth: 1,
    borderColor: '#585FDD',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modalTopView: {
    flexDirection: 'row',
    top: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  modalTopText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 25,
    height: 20,
    marginLeft: 10,
    borderRadius: 5,
    padding: 2,
  },
  tinyLogo2: {
    width: 25,
    height: 20,
    marginLeft: 10,
    borderRadius: 5,
    padding: 12,
    Opacity: 0.1,
    opacity: 0.7,
  },
});

export default CustomModal;
