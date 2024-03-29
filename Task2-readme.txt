
Travel Snap App functionality:

IMPORTANT: 
    - When installing node-modules you may need to use command npm install --force to get all the dependecies/installations.
    - The application runs on both iOS and Anroid, but on web the styling does not show. Bacause nativewind does not support web. 

1. Authentification / Login Page:
    - Users are required to log in before accessing the App.
    - If the users are not logged in they will be redirected to the Login Page.
    - If they log in they will be navigated to the Home Page.


2. Tab view:
    - Travel App features three tabs:
        > Home
        > Camera
        > Settings
    
    - Each tab corresponds to a specific functionality as described below.


3. Home Page:
    - This page displays a list of all the images taken that are stored in Firebase firestore.
    - Each image has an associated description.
    - Each image is clickable and navigates to a detail page.


4. Image Detail Page:
    - When clicking on a image in the Home Page the user is navigated here.
    - This page shows details like:
        > Selected image
        > Description
        > A MapView with a Marker that points to where the image was taken

    - Image Detail Page allows users to navigate back to the home page.


5. Camera Page:
    - Utilizes Expo Camera that allows users to capture images.
    - The camera has functionalities like:
        > Switching between front and back camera
        > Toggeling the flash on and off
        > Capturing, saving or retaking images


6. Image Description Page: 
    - After saving the image in the Camera Page the user is navigated here.
    - Provides an option to upload images from the gallery on the users phone instead of the image taken.
    - The image description page enables users to add details to their image like:
        > A description for the image
        > Setting the current location where the image was taken
    
    - Allows users to submit the image and the corresponding details to Firebase
    - Navigates back to Camera Page where the image was taken


7. Settings Page:
    - The settings page provides the users with the following:
        > A user profile that displays the users email (username) 
        > Profile picture
    
    - The profile picture can be set or changed by selecting an image from the devices library, 
    that get stored in the database, so when a user is logging in and out the profile picutre is always there. 
    
    - There is option for DarkMode, that also get stored so the settings is not botherd when user is logging in or out.
    - There is a logg out button in the settings.



## Platforms Tested
The app has been tested on the following platforms:
- Android Emulator
- iOS Simulator

Note: Ensure that the necessary permissions are granted for camera and location access during testing.