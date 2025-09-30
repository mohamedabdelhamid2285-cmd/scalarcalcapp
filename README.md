# Calculator App

This is a multi-function calculator app built with React Native and Expo.

## Features

*   Standard arithmetic operations (+, -, \*, /)
*   Scientific functions (sin, cos, tan, log, sqrt, etc.)
*   Memory functions (MS, MR, MC)
*   Store function (STO)
*   Angle unit conversions (DEG/RAD)
*   Theme switching (light/dark)
*   Google AdMob integration with Pro user support
*   Variable storage and recall (A, B, C, D, E, F)

## Getting Started

1.  Install dependencies: `npm install`
2.  Run the app: `npx expo start`

## Variable Storage and Usage

The calculator supports storing numbers in variables (A-F) and using them in expressions, including implicit multiplication.

### Storing a Number in a Variable (e.g., Variable A)

1.  <b>Enter the value:</b> Type the number or calculate the expression you want to store. For example, type `10`.
2.  <b>Initiate Store Mode:</b> Press the `STO` button. You will see the "STO" indicator light up in the display.
3.  <b>Select Variable:</b> Press the variable button where you want to store the value. For example, press the button that currently shows `STO->A` (which is the "Ans" button in normal mode).
4.  The value (e.g., `10`) will be stored in variable `A`, and the "STO" indicator will turn off. The display will show the stored value as the result.

### Using a Variable in an Expression (e.g., 2A + 15)

The calculator now supports implicit multiplication, so "2A" will be automatically interpreted as "2 * A".

1.  <b>Enter the first number:</b> Type `2`.
2.  <b>Insert the variable:</b>
    *   Press the `ALPHA` button (the "ALPHA" indicator will light up).
    *   Then, press the variable button (e.g., `A`, which is the "Ans" button in normal mode).
    The display will now show `2*A`. The "ALPHA" indicator will turn off automatically.
3.  <b>Continue the expression:</b> Type `+ 15`. The display should show `2*A+15`.
4.  <b>Calculate:</b> Press the `=` button to get the result. If `A` was `10`, the result will be `35`.

### Alternatively, to insert a variable:

1.  <b>Initiate Recall Mode:</b> Press the `RCL` button (the "RCL" indicator will light up).
2.  <b>Select Variable:</b> Press the variable button (e.g., `A`).
3.  The variable name (e.g., `A`) will be inserted into your expression, and the "RCL" indicator will turn off.

You can also see the current values of your variables in the "Variable Status Bar" section of the display, which appears when any variable has a non-zero value.

## AdMob Integration

The app is prepared for Google AdMob monetization strategy:

### Ad Types
- **Banner Ads**: Placeholder ads displayed at the bottom of Matrix, Vector, and Statistics screens (ready for AdMob integration)
- **Interstitial Ads**: Logic ready for showing after every 10 calculations on the main calculator, and after successful calculations on advanced screens

### Pro User Support
- Toggle Pro user status in Settings to remove all ads
- Pro users see no banner or interstitial ads anywhere in the app

### AdMob Setup Required
- Install `react-native-google-mobile-ads` package
- Configure with your Google AdMob Test IDs
- Replace with your actual Ad Unit IDs before publishing

### Current Status
- Fallback banner ads showing on web preview
- All ad logic implemented and ready for AdMob integration
- Pro user functionality working

## Contributing

Contributions are welcome! Please submit a pull request.

## License

MIT License
