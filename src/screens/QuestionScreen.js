/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  InputAccessoryView,
  Image,
} from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CustomKeyboard from '../custom_components/CustomKeyboard';
import MathJax from 'react-native-mathjax-svg';

const QuestionScreen = () => {
  const inputAccessoryViewID = '12345';
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [questionType, setQuestionType] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const [isCustomKeyboard, setIsCustomKeyboard] = useState(false);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [numberInput, setNumberInput] = useState('');
  const [unitInput, setUnitInput] = useState('');

  const refLastWorkingInput = useRef(null);
  const refTextInputOne = useRef(null);
  const [lastWorkingInput, setLastWorkingInput] = useState(null);

  const data = [
    {
      questionNumber: 1,
      question: 'What is the name?',
      questionType: 'shortAnswers',
    },
    {
      questionNumber: 2,
      question: 'How old are you?',
      questionType: 'shortAnswers',
    },
    {
      questionNumber: 3,
      question: 'How tall are you?',
      questionType: 'unitAnswers',
    },
  ];

  const handleQuestionPress = (questionNumber, type) => {
    setSelectedQuestion(questionNumber);
    setQuestionType(type);
  };

  const handleBottomSheetOpen = () => {
    setBottomSheetVisible(true);
  };

  const handleTextInputChange = (text, ref) => {
    setTextInputValue(text);
    setLastWorkingInput(ref);
  };

  const handleKeyboardOptions = () => {
    setIsCustomKeyboard(!isCustomKeyboard);
    Keyboard.dismiss();
  };

  const handleKeyPress = key => {
    setTextInputValue(textInputValue + key);
  };

  const onChangedKeyboard = () => {
    console.log('isCustomKeyboard :::: ', isCustomKeyboard);
    if (!isCustomKeyboard) {
      Keyboard.dismiss();
      setIsCustomKeyboard(!isCustomKeyboard);
    } else {
      setIsCustomKeyboard(isCustomKeyboard);
    }
  };

  const renderQuestionNumbers = () => {
    return data.map(item => (
      <TouchableOpacity
        key={item.questionNumber}
        style={[
          styles.questionNumberButton,
          selectedQuestion === item.questionNumber &&
            styles.selectedQuestionNumberButton,
        ]}
        onPress={() =>
          handleQuestionPress(item.questionNumber, item.questionType)
        }>
        <Text style={styles.questionNumberText}>{item.questionNumber}</Text>
      </TouchableOpacity>
    ));
  };

  const renderQuestion = () => {
    const currentQuestion = data.find(
      item => item.questionNumber === selectedQuestion,
    );
    if (currentQuestion) {
      return (
        <TouchableOpacity onPress={handleBottomSheetOpen}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const KeyboardInputBar = () => {
    return (
      <View style={styles.inputAccessoryView}>
        <TouchableOpacity
          onPress={handleKeyboardOptions}
          style={styles.inputAccessoryButton}>
          <MathJax fontSize={16} color={'white'}>
            ⇄
          </MathJax>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.questionNumbersContainer}>
              {renderQuestionNumbers()}
            </View>
            <View style={styles.questionContainer}>{renderQuestion()}</View>
            <BottomSheet>
              <View
                style={{
                  paddingBottom: 40,
                }}>
                {questionType === 'shortAnswers' ? (
                  <View style={styles.bottomSheetContent}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Type your answer here"
                      placeholderTextColor="#808080"
                      autoFocus={true}
                      onFocus={() => handleKeyboardOptions}
                      inputAccessoryViewID={inputAccessoryViewID}
                    />
                    <TouchableOpacity>
                      {/* <Image
                        style={styles.tinyLogo}
                        source={require('../assets/keyboard.png')}
                      /> */}
                      <Image
                        style={styles.tinyLogo}
                        source={require('../assets/plusMinus.png')}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.bottomSheetContent}>
                    <TextInput
                      ref={refTextInputOne}
                      style={styles.textInputAnswer}
                      placeholder="Type your answer here"
                      placeholderTextColor="#808080"
                      onChangeText={setNumberInput}
                      autoFocus={true}
                      // onFocus={() => handleKeyboardOptions}
                      // inputAccessoryViewID={inputAccessoryViewID}
                    />
                    <TextInput
                      style={styles.textInputUnit}
                      placeholder="Unit"
                      placeholderTextColor="#808080"
                      onChangeText={setUnitInput}
                      inputAccessoryViewID={inputAccessoryViewID}
                    />
                    <TouchableOpacity onPress={() => onChangedKeyboard()}>
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
                <View style={styles.bottomSheetContent}>
                  <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => handleTextInputChange}
                    underlayColor="#fff">
                    <Text style={styles.buttonTextSkip}>Skip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => handleTextInputChange}
                    underlayColor="#fff">
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
          </View>
        </KeyboardAvoidingView>
        <View style={{justifyContent: 'flex-end'}}>
          {isCustomKeyboard ? (
            <CustomKeyboard
              setIsCustomKeyboard={setIsCustomKeyboard}
              isCustomKeyboard={isCustomKeyboard}
              onKeyPress={handleKeyPress}
            />
          ) : null}
        </View>
      </View>
      {/* <InputAccessoryView
        nativeID={inputAccessoryViewID}
        style={styles.inputAccessoryView}>
        <KeyboardInputBar />
      </InputAccessoryView> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 16,
    backgroundColor: '#fff',
  },
  questionNumbersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  questionNumberButton: {
    marginRight: 16,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  selectedQuestionNumberButton: {
    backgroundColor: 'blue',
  },
  questionNumberText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomSheetContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 24,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    borderWidth: 1,
  },
  textInputAnswer: {
    flex: 2,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#ADE6C9',
  },
  textInputUnit: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#ADE6C9',
  },
  inputAccessoryView: {
    backgroundColor: '#2A2A2A',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.8,
    borderColor: '#c4c4c4',
  },
  inputAccessoryButton: {
    backgroundColor: 'gray',
    height: 35,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  tinyLogo: {
    width: 30,
    height: 25,
    marginLeft: 10,
  },
  nextButton: {
    flex: 2,
    padding: 15,
    backgroundColor: '#123766',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c4c4c4',
  },
  skipButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: '#E9EAF8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c4c4c4',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonTextSkip: {
    color: '#000',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default QuestionScreen;
