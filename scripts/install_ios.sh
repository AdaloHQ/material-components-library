#!/bin/bash
set -e
set -x

yarn add react-native-linear-gradient

yarn add @react-native-community/blur

sed -i.bak '/marketplace/ a\
pod "RNVectorIcons", :path => "../node_modules/react-native-vector-icons"' ./ios/Podfile
