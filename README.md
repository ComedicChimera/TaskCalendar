# TaskCalendar
A simple app to help you organize your spare time.

## Setup

When you download the repo, you will need to create a data file to hold all your info.  This will must be called `data.json` and exist in the main directory of your project.  It should look like this:

```json
{
  "title": "name-of-calendar",
  "calendar": []
}
```
  
Please note the name of the calendar can be changed in app.

You will need to install node (and npm) if you don't have them already before you can do anything.  You will also need to install all the npm packages necessary to run it.  You can do this by simply typing `npm install` in the console when you get into the main directory.

## Usage

### Running the App

Assumming you have everything installed properly, you need only type `npm start` in the console in the appropriate directory, and the app will launch.

### Navigating the Interface

The app has a really simple user interface.  Each button does it was it says it does and all data will be saved into `data.json`.  You can edit a week name or the calendar name by clicking on it.  When the save button turns red, that means you need to save (this app doesn't auto-save).  Clearing the calendar will **NOT** clear the name as well.

## Building to a Binary

If you need to build to a binary, make sure you have `electron-packager` installed.  Assumming that you do, if you are on Windows, you can just type in `npm run-script build` into the command line and it will produce a binary for you.  If you are not on Windows, go into the `package.json` file and edit the build script to whatever you need for your platform.  You can check out the electron-packager docs here.

In either case, you will also need to copy the data.json, as well as the icon file into your binary directory.  *Note: The app does not build with an icon so if you want to add one, just convert the icon.png to the appropriate format (this icon is intended for in app use) and attach it to a short cut)*



