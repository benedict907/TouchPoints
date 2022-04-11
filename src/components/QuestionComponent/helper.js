export const getQuestionType = ({selectedQuestionArray, selectedQuestion}) =>
  selectedQuestionArray[selectedQuestion];

export const getKeyValue = ({customerType, id}) => {
  switch (customerType) {
    case 'mdu_question':
      return `mdu_question8_${id}`;
    case 'odu_question':
    case 'non_odu_question':
      return `non_mdu_question14_${id}`;
  }
};
