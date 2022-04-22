#!/bin/bash
set -e
set -x

yarn add react-native-linear-gradient

yarn add @react-native-community/blur

sed -i.bak '/applyNativeModulesAppBuildGradle/ a\
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"' ./android/app/build.gradle