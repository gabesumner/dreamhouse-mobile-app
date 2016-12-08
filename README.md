# DreamHouse Mobile App

This repository hosts the source code and installation instructions for the DreamHouse mobile app. DreamHouse is an end-to-end sample application that demonstrates how to build apps on the Salesforce platform. Visit the [DreamHouse Microsite](http://dreamhouse-site.herokuapp.com/) for more information.


## Install the Salesforce Back-end

Follow [these instructions](http://dreamhouse-site.herokuapp.com/installation/) to install the Salesforce back-end.

## Install the Application

1. Install the latest version of Cordova and Ionic 2 beta:
    ```
    npm install -g cordova ionic
    ```

    or (Mac):
    ```
    sudo npm install -g cordova ionic
    ```

1. Clone this repository:
    ```
    git clone https://github.com/dreamhouseapp/dreamhouse-mobile-app
    ```

1. Navigate to the `dreamhouse-mobile-app` directory:
    ```
    cd dreamhouse-mobile-app
    ```

1. Install the dependencies:
    ```
    npm install
    ```

## Run in your Browser    

1. To run the app in the browser:
    ```
    ionic serve
    ```

    - If you don't see the OAuth window, enable popups and try again.
    - Make sure you log in the org you installed the DreamHouse package in.


## Build and Run on Device

1. Restore the state of the application using the `cordovaPlugins` and `cordovaPlatforms` entries in package.json:
    ```
    ionic state restore
    ```

1. Build the app for iOS:
    ```
    ionic build ios
    ```

1. Open ```DreamHouse.xcodeproj``` in the ```dreamhouse-mobile-app/platforms/ios``` directory  

1. Click DreamHouse in the left sidebar

1. In the Signing section, select a team corresponding to a valid certificate

1. Click the Run button in the toolbar to run the application on your device.
