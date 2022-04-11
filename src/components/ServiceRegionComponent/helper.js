export const onRadioButtonSelected = ({
  radioButtonValues,
  index,
  setRadioButtonValues,
}) => {
  setRadioButtonValues(
    radioButtonValues.map((item, innerIndex) => {
      if (innerIndex === index) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    }),
  );
};
