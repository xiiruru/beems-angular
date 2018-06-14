import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  BarCodeScanner,
  Constants,
  Location,
  Permissions
} from 'expo';
import {
  SHA1
} from 'crypto-js';

//Main
//QR code taken from: https://snack.expo.io/BJlFFcp2g
//GPS and Map taken from: https://snack.expo.io/@schazers/expo-map-and-location-example
//Crypto notes from: https://stackoverflow.com/a/42827463
//Note: Need standard subdomain server. ngrok only allow one randomly-named tunnel for free users so...
//Note2: Requires manual config every time for testing until we have standard servers.
export default class App extends Component {
  config = {
    apiUrl: "http://26b9ca69.ngrok.io/api/assets/",
    blockchainUrl: "http://875369d5.ngrok.io/api/UpdateBEEMSAsset"
  }

  state = {
    hasCameraPermission: null,
    hasLocationPermissions: false,

    lastScannedQRInfo: null,
    locationResult: null,

    asset: null,

    assetID: null,
    assetName: null,
    assetContentHash: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
    this._requestLocationPermission();
  }

  _requestCameraPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };
  _requestLocationPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }
  }

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedQRInfo) {
      LayoutAnimation.spring();
      this.setState({ lastScannedQRInfo: result.data });
      this._getLocationAsync();
    }
  };
  _getLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
  };

  render() {
    return (
      <View style={styles.container}>

        {
          this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />
        }

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Update?',
      "Asset " + this.state.lastScannedQRInfo +
      " with " + this.state.locationResult + "?",
      [
        {
          text: 'Yes',
          onPress: this._sendToServer,
        },
        { 
          text: 'No',
          onPress: () => {}
        },
      ],
      { cancellable: false }
    );
  };

  _getAsset = async () => {
    console.log("Getting asset information from: " + this.config.apiUrl + this.state.lastScannedQRInfo);
    try {
      let response = await fetch(this.config.apiUrl + this.state.lastScannedQRInfo);
      let responseJson = null;
      try {
        responseJson = await response.json();
      } catch (error) {
        Alert.alert('Unexpected error in fetching information from REST Server.');
        console.log(error);
        responseJson = null;
      }
      this.setState({ asset: responseJson });
    } catch (error) {
      Alert.alert('Unable to call REST Server. Check REST Server.');
      console.log(error);
    }
    console.log("Asset description test: " + this.state.asset.description);
  }

  _sendToBlockchain = async () => {
    try {
      await fetch(this.config.blockchainUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          "$class": "org.bit.beems.UpdateBEEMSAsset",
          "beemsAsset": "resource:org.bit.beems.BEEMSAsset#" + this.state.assetID,
          "assetID": this.state.assetID,
          "assetName": this.state.assetName,
          "assetContentHash": this.state.assetContentHash,
          "currentGPSLocation": this.state.locationResult
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  _sendToServer = async () => {
    //Collect location data.
    this._getLocationAsync();

    //Collect asset information
    //this._getAsset();

    //Does the asset exist?
    if (this.state.asset === null)
    {
      //Alert ERROR FAIL when can't find the asset from the database.
      Alert.alert(
        'ERROR FAIL',
        'Error contacting the server. Please try again later with Internet connection.',
        [
          {
            text: 'OK',
            onPress: () => {}
          }
        ]
      )
    }
    else
    {
      //Set the state.
      this.setState({ assetID: this.state.lastScannedQRInfo });
      this.setState({ assetName: this.state.asset.assetName });
      this.setState({ assetContentHash: SHA1((this.state.asset).toString()).toString() });
      //this.setState({ assetName: "supreme" });
      //this.setState({ assetContentHash: "dis a lazy ngrok test boi" });
      console.log("SHA1: " + this.state.assetContentHash);

      //Send to blockchain
      this._sendToBlockchain();

      //Alert OK when send is successfully done.
      Alert.alert(
        'OK',
        'Server received the asset location update.',
        [
          {
            text: 'OK',
            onPress: () => {}
          }
        ]
      )
    }
  }

  _handlePressCancel = () => {
    this.setState({ lastScannedQRInfo: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedQRInfo) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedQRInfo}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

//=====
//Style

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
