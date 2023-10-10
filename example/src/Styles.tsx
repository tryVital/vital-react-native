import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
      backgroundColor: 'white',
    },
    itemTitle: {
      fontSize: 18,
      color: 'black',
      flexShrink: 1,
    },
    itemSubtitle: {
      padding: 4,
      fontSize: 13,
      color: 'black',
      flexShrink: 1,
    },
    iconButton: {
      fontSize: 24,
      padding: 10,
      color: 'blue',
      backgroundColor: 'transparent',
      borderRadius: 0,
    },
    iconButtonDestructive: {
      fontSize: 24,
      padding: 10,
      color: 'red',
      backgroundColor: 'transparent',
      borderRadius: 0,
    },
  });

  export default styles;