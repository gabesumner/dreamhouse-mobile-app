# DreamHouse Mobile App

This repository hosts the source code and installation instructions for the DreamHouse mobile app. DreamHouse is an end-to-end sample application that demonstrates how to build apps on the Salesforce platform. Visit the [DreamHouse Microsite](http://dreamhouse-site.herokuapp.com/) for more information.


## Install the Salesforce Back-end

Follow [these instructions](http://dreamhouse-site.herokuapp.com/installation/) to install the Salesforce back-end.

## Install the Application

1. Install the latest version of Cordova and Ionic 2:
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
    
## Build and Run in your Browser    

1. Install gulp if you don't already have it on your system:
    ```
    npm install -g gulp
    ```

    or (Mac):
    ```
    sudo npm install -g gulp
    ```

1. Install force-server:
    ```
    npm install -g force-server
    ```

    or (Mac):
    ```
    sudo npm install -g force-server
    ```

1. Build the JavaScript app using the Ionic build script:
    ```
    gulp build
    ```

1. Run the app in the browser:
    ```
    force-server --root www
    ```
    
    - If you don't see the OAuth window, enable popups and try again.
    - Make sure you log in the org you installed the DreamHouse package in.
        
        
## Build and Run on Device

1. Restore the state of the application using the `cordovaPlugins` and `cordovaPlatforms` entries in package.json:
    ```
    ionic state restore
    ```

1. Install the Mobile SDK plugin:
    ```
    cordova plugin add https://github.com/forcedotcom/SalesforceMobileSDK-CordovaPlugin
    ```

1. Build the app for iOS:
    ```
    ionic build ios
    ```

1. Open ```DreamHouse.xcodeproj``` in the ```dreamhouse-mobile-app/platforms/ios``` directory  

1. In Xcode, run the application, or select **Product** > **Archive** in the menu for App Store or Enterprise deployment. If the build fails in Xcode, select the **DreamHouse** target, click the **Build Settings** tab, search for **bitcode**, select **No** for **Enable Bitcode**, and try again.