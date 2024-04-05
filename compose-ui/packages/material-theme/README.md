# Mapp-UI Material Theme

## Description
This repository contains a mapp styled theme for the Angular Material Design components library for Angular apps  
(https://material.angular.io/). Styles for common components such as inputs, buttons, headers, menus and more can be  
found in this library.

This library contains an overall theme which is located in the theming folder. Each component in turn has it's own  
theme file and a style sheet for basic styles. The theme files contain styles that set colors, the base style sheets  
contain styles for width, heights, padding etc.

## Implementation within an application

* Include Angular Material in your application
    * follow these steps: https://material.angular.io/guide/getting-started
    * You don't need to included any of the prebuilt themes, use our custom theme, as below 
* cmd> npm i @mapp-ui/material-themeg
* In your src/styles.css file:
    * include the theme css

    ```
    @import '~@mapp-ui/material-theme/material-theme.css';
    ```
