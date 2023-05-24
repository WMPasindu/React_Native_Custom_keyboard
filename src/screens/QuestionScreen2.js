/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import MathJax from 'react-native-mathjax-svg';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CustomModal from '../custom_components/CustomModal';

const QuestionScreen2 = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [questionType, setQuestionType] = useState('shortAnswers');
  const [isCustomKeyboard, setIsCustomKeyboard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [singleText, setSingleText] = useState('');
  const [valueText, setValueText] = useState('');
  const [unitText, setUnitText] = useState('');
  const [focusRef, setFocusRef] = useState('');
  const refInput = useRef('abc_1111');
  const refInput2 = useRef('abc_2222');
  const refInput3 = useRef('abc_3333');
  const data = [
    {
      questionNumber: 1,
      question: 'From where does the Nile river originate?',
      questionType: 'shortAnswers',
    },
    {
      questionNumber: 2,
      question: 'Who is the inventor of dynamite?',
      questionType: 'shortAnswers',
    },
    {
      questionNumber: 3,
      question:
        'A scooter travelling at 10 m/s speed up to 20 m/s in 4 sec. Find the acceleration of scooter?',
      questionType: 'unitAnswers',
    },
    {
      questionNumber: 4,
      question: 'What do you mean by acceleration due to gravity?',
      questionType: 'shortAnswers',
    },
    {
      questionNumber: 5,
      question: 'How many grams are in 1 kg?',
      questionType: 'unitAnswers',
    },
  ];

  const handleQuestionPress = (questionNumber, type) => {
    setSelectedQuestion(questionNumber);
    setQuestionType(type);
  };

  const handleKeyboardOptions = () => {
    console.log('isCustomKeyboard 123 :::: ');
    setIsCustomKeyboard(!isCustomKeyboard);
    Keyboard.isVisible(false);
    Keyboard.dismiss();
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
        <TouchableOpacity>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1}}>
      {showModal && (
        <CustomModal
          setShowModal={setShowModal}
          questionType={questionType}
          refInput={refInput}
          refInput2={refInput2}
          refInput3={refInput3}
          handleKeyboardOptions={handleKeyboardOptions}
          setIsCustomKeyboard={setIsCustomKeyboard}
          isCustomKeyboard={isCustomKeyboard}
          singleText={singleText}
          valueText={valueText}
          unitText={unitText}
          setSingleText={setSingleText}
          setValueText={setValueText}
          setUnitText={setUnitText}
          focusRef={focusRef}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.questionNumbersContainer}>
            {renderQuestionNumbers()}
          </View>
          <View style={styles.questionContainer}>{renderQuestion()}</View>
          <BottomSheet wrapperStyle={{backgroundColor: '#E9EAF8'}}>
            <View
              style={{
                paddingBottom: 2,
              }}>
              <View style={styles.bottomSheetContentTop}>
                <TouchableOpacity
                  style={styles.yourAnswerButton}
                  underlayColor="#fff">
                  <Text style={styles.buttonTextSkip}>Your Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.explanationButton}
                  underlayColor="#fff">
                  {/* <Text style={styles.buttonTextSkip}>Explanation</Text> */}
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={styles.tinyLogo2}
                    source={require('../assets/alert.png')}
                  />
                </TouchableOpacity>
              </View>
              {questionType === 'shortAnswers' ? (
                <View style={styles.bottomSheetContent}>
                  <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => [setShowModal(true), setFocusRef(refInput)]}>
                    <Text style={styles.textInput}>
                      {singleText ? (
                        <MathJax fontSize={16} color={'black'}>
                          {singleText}
                        </MathJax>
                      ) : (
                        'Click here to add answer'
                      )}
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => handleKeyboardOptions()}>
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
                  </TouchableOpacity> */}
                </View>
              ) : (
                <View style={styles.bottomSheetContent}>
                  <TouchableOpacity
                    style={{flex: 2}}
                    onPress={() => [
                      setShowModal(true),
                      setFocusRef(refInput2),
                    ]}>
                    <Text style={styles.textInputAnswer}>
                      {valueText ? (
                        <MathJax fontSize={16} color={'black'}>
                          {valueText}
                        </MathJax>
                      ) : (
                        'Click here to add answer'
                      )}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => [
                      setShowModal(true),
                      setFocusRef(refInput3),
                    ]}>
                    <Text style={styles.textInputUnit}>
                      {unitText ? (
                        <MathJax fontSize={16} color={'black'}>
                          {unitText}
                        </MathJax>
                      ) : (
                        'Add unit'
                      )}
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => handleKeyboardOptions()}>
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
                  </TouchableOpacity> */}
                </View>
              )}
              <View style={styles.bottomSheetContent}>
                <TouchableOpacity
                  style={styles.skipButton}
                  underlayColor="#fff">
                  <Text style={styles.buttonTextSkip}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nextButton}
                  underlayColor="#fff">
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        </View>
      </KeyboardAvoidingView>
    </View>
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
    borderRadius: 35,
    backgroundColor: '#ddd',
  },
  selectedQuestionNumberButton: {
    backgroundColor: '#123766',
    color: '#fff',
  },
  questionNumberText: {
    color: '#fff',
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
  bottomSheetContentTop: {
    flexDirection: 'row',
    paddingRight: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 24,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContentCol: {
    flexDirection: 'column',
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
  textInputUnit: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
    marginLeft: 10,
    borderWidth: 1,
  },
  yourAnswerButton: {
    flex: 2,
    padding: 12,
    backgroundColor: '#D8D8EE',
    marginLeft: 10,
    borderRadius: 20,
  },
  explanationButton: {
    flex: 2,
    padding: 12,
    backgroundColor: '#E9EAF8',
    marginLeft: 10,
    borderRadius: 20,
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

export default QuestionScreen2;
