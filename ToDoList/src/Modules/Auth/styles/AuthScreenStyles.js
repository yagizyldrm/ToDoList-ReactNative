import { StyleSheet } from 'react-native';
import { Metrics,Fonts } from '../../../StylingConstants';
import { colorNames } from '../../Theming'

const styles = (Colors) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors[colorNames.auth.background],
    },
    keyboardAvoiding: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: Metrics.width * 0.03,
        paddingHorizontal: Metrics.marginHorizontal,
    },
    appLogoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Metrics.width / 14,
    },
    inputsContainer: {
        minHeight: Metrics.width * 0.4,
        justifyContent: 'center',
    },
    image: {
        width: undefined,
        height: '80%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    logoAndNameContainer: {
        flex:1,
    },
    buttonsContainer: {
        justifyContent: 'center',
    },
    signupTouchable: {
        alignItems: 'center',
        marginTop: Metrics.width * 0.01,
        backgroundColor: Colors[colorNames.auth.paleButtonBackground],
    },
    signupText: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size(16),
        color: Colors[colorNames.auth.paleButtonText],
        paddingVertical: Metrics.width / 72
    },
    authLogoContainer: {
        width: Metrics.width * 0.8,
        height: undefined,
        aspectRatio: 1,
        flex:1,
    },
    appNameContainer: {
        alignItems: 'center',
    },
    appNameText: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size(40),
        color: Colors[colorNames.auth.appNameText],
        letterSpacing: Metrics.width * 0.04,
    },
    icon: {
        color: Colors[colorNames.auth.appIcon],
    },
    inputContainer: {
        marginVertical: Metrics.width * 0.005,
    },
});

export default styles;
