const { Dimensions, StatusBar } = require("react-native");

const { height, width } = Dimensions.get('window')
const marginTop = StatusBar.currentHeight
export {
    height as SCREEN_HEIGHT,
    width as SCREEN_WIDTH,
    marginTop as MARGIN_TOP
}