# Bhookh App - React Native Assignment

## Overview
The **Bhookh App** is a basic restaurant app, similar to Swiggy, focused on showcasing clean code, best practices, and app architecture. It implements a login screen and a home screen that fetches recipes from an API and displays them.

---

## Setup Instructions

### Prerequisites
Ensure the following tools are installed on your system:

- **Node.js**: Download and install from [Node.js](https://nodejs.org/).
- **React Native CLI**: Install globally:
  ```bash
  npm install -g react-native-cli
  ```
- **Android Studio** (for Android) or **Xcode** (for iOS):
  - Android: Set up an emulator in Android Studio.
  - iOS: Install Xcode and command-line tools (macOS only).
- **Watchman** (macOS): Install via Homebrew:
  ```bash
  brew install watchman
  ```

---

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bhookh-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment:
   - **Android**: Ensure `ANDROID_HOME` is set in your environment variables.
   - **iOS**: Install CocoaPods dependencies (macOS only):
     ```bash
     cd ios
     pod install
     cd ..
     ```

4. Start the Metro bundler:
   ```bash
   npx react-native start
   ```

5. Run the app:
   - **Android**:
     ```bash
     npx react-native run-android
     ```
   - **iOS** (macOS only):
     ```bash
     npx react-native run-ios
     ```

---

## Approach and Design Decisions

### Architecture
- Followed **Model-View-Controller (MVC)** architecture for better organization:
  - **Models**: Handled API interactions and mock user data.
  - **Views**: Included `LoginScreen` and `HomeScreen` components.
  - **Controllers**: Managed business logic, state, and navigation.

### State Management
- Used React Native's built-in `useState` and `useEffect` hooks to manage local component states.

### API Integration
- Integrated with the dummy API: [https://dummyjson.com/recipes](https://dummyjson.com/recipes).
- Added error handling and a loading indicator for API calls.

### Styling
- Utilized `StyleSheet.create` for consistent styling and performance optimization.
- Ensured responsiveness across different screen sizes.

### Reusability
- Created reusable components for:
  - Recipe cards.
  - Error messages.

### Navigation
- Used React Navigation for navigating between the `LoginScreen` and `HomeScreen`.

---

## Challenges Faced

1. **API Data Handling**:
   - Challenge: Some recipes lacked images in the API response.
   - Solution: Mocked images for recipes without provided images.

2. **Form Validation**:
   - Challenge: Ensuring robust validation for the login form.
   - Solution: Implemented basic validation with clear error messages for missing or incorrect inputs.

3. **Error Handling**:
   - Challenge: Gracefully handling API errors.
   - Solution: Displayed appropriate error messages and included a retry mechanism.

4. **Time Constraints**:
   - Challenge: Completing the project within the allotted time.
   - Solution: Focused on core functionality and adhered to coding best practices.

---

## Bonus Features (Optional)
- Implemented pagination for the recipe list.
- Used a state management library (e.g., Redux or Zustand) for scalable state management.
- Added TypeScript for type safety.

---

## Future Improvements
- Implement user authentication using a backend service.
- Enhance UI design to closely match the Figma mockup.
- Add more robust unit and integration tests.

---
