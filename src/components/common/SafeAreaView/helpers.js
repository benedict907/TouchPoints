import styles from './styles';

const getContainerStyle = ({
  insets,
  all,
  vertical,
  horizontal,
  left,
  right,
  top,
  bottom,
  fill,
}) => {
  return [
    fill ? styles.containerFilled : styles.containerNotFilled,
    (all || vertical || top) && {paddingTop: insets.top},
    (all || vertical || bottom) && {paddingBottom: insets.bottom},
    (all || horizontal || left) && {paddingLeft: insets.left},
    (all || horizontal || right) && {paddingRight: insets.right},
  ];
};
export {getContainerStyle};
