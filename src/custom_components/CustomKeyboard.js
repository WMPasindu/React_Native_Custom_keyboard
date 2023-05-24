import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {KeyboardAccessoryView} from 'react-native-ui-lib/keyboard';
import MathJax from 'react-native-mathjax-svg';

const CustomKeyboard = ({
  onKeyPress,
  setIsCustomKeyboard,
  isCustomKeyboard,
  textInputRef,
}) => {
  const mathKeys = [
    {symbol: '\\frac{}{}', label: 'Fraction', function: '\\frac{}{}'},
    {symbol: '\\sqrt{}', label: 'Square Root', function: '\\sqrt{}'},
    {symbol: '\\pi', label: 'Pi', function: '\\pi{}'},
    {symbol: '\\theta', label: 'Theta', function: '\\theta{}'},
    {symbol: '\\alpha', label: 'Alpha', function: '\\alpha{}'},
    {symbol: '\\beta', label: 'Beta', function: '\\beta{}'},
    {symbol: '\\gamma', label: 'Gamma', function: '\\gamma{}'},
    {symbol: '\\delta', label: 'Delta', function: '\\delta{}'},
    {symbol: '\\int', label: 'Integral', function: '\\int{}'},
    {symbol: '\\sum', label: 'Summation', function: '\\sum{}'},
    {symbol: '\\sin', label: 'sin', function: '\\sin{}'},
    {symbol: '\\cos', label: 'COS', function: '\\cos{}'},
    {symbol: '\\tan', label: 'tan', function: '\\tan{}'},
    {symbol: '\\ X^{y}', label: 'x^', function: '\\ X^{}'},
    {symbol: '\\ X_{z}', label: 'x_', function: '\\ X_{}'},
    {symbol: '\\ log_2', label: 'log_2', function: '\\ log_2{}'},
    {symbol: '\\ log', label: 'log', function: '\\ log{}'},
    {symbol: '\\cap', label: 'cap', function: '\\cap{}'},
    {symbol: '\\cup', label: 'cup', function: '\\cup{}'},
    {symbol: '\\setminus', label: 'setminus', function: '\\setminus{}'},
    {symbol: '\\subset', label: 'subset', function: '\\subset{}'},
    {symbol: '\\subseteq', label: 'subseteq', function: '\\subseteq{}'},
    {symbol: '\\subsetneq', label: 'subsetneq', function: '\\subsetneq{}'},
    {symbol: '\\supset', label: 'supset', function: '\\supset{}'},
    {symbol: '\\in', label: 'in', function: '\\in{}'},
    {symbol: '\\notin', label: 'notin', function: '\\notin{}'},
    {symbol: '\\emptyset', label: 'emptyset', function: '\\emptyset{}'},
    {symbol: '\\varnothing', label: 'varnothing', function: '\\varnothing{}'},
    {symbol: '\\mu', label: 'mu', function: '\\mu{}'},
  ];

  const handleKeyPress = key => {
    onKeyPress(key);
  };

  const toggleKeyboard = () => {
    setIsCustomKeyboard(!isCustomKeyboard);
  };

  const renderKeyboardAccessoryViewContent = () => {
    if (isCustomKeyboard) {
      return (
        <View style={styles.container}>
          {mathKeys.map((s, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleKeyPress(s.function)}
              style={styles.button}>
              <MathJax fontSize={18} color={'black'}>
                {s.symbol}
              </MathJax>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={toggleKeyboard}
            style={styles.toggleButton}>
            <MathJax fontSize={16} color={'black'}>
              ⇄
            </MathJax>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <KeyboardAccessoryView
      renderContent={renderKeyboardAccessoryViewContent}
      scrollBehavior={KeyboardAccessoryView.scrollBehaviors.FIXED_OFFSET}
      kbInputRef={textInputRef}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#EDEDED',
    paddingVertical: 5,
    marginBottom: '30%',
    justifyContent: 'center',
  },
  button: {
    width: '10%',
    height: 50,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    width: '10%',
    height: 50,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default CustomKeyboard;
