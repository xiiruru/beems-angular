import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Item,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  List,
  ListItem,
  Font
} from 'native-base'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json

//-------------
//Authorization login screen
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

//Sign in screen (login screen)
class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }
  
  _onLogin = async () => {
    //Do login here
    //Get the name and password
    const { username, password } = this.state;
    Alert.alert('Credentials', `${username} with password ${password}`);

    //Give to REST API to check

    //CLEAR!
        //LET IT IN
        await AsyncStorage.setItem('userToken',  `${username} with password ${password}`);
        this.props.navigation.navigate('App');
    //NO CLEAR!
        //CANCEL
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this._onLogin.bind(this)}
        />
      </View>
    );
  }
}

//REF: https://github.com/gregartemides/contacts-mobile-app
//https://github.com/gregartemides/contacts-mobile-app/tree/master/js/components/contacts


//Home Screen
//https://github.com/gregartemides/contacts-mobile-app/blob/master/js/components/contacts/ContactList.js
class AssetScreen extends React.Component {
  //TODO.
  //ADD LIST OF ITEMS HERE.
  //-R--

  constructor(props) {
    super(props);

    this.config = {
      apiUrl: "http://127.0.0.1:3000/api/assets/"
    }
    this.state = {
      assets: [],
      testAsset: {
        id: 1,
        name: 'Raikire',
        description: 'A dank meme',
        type: 'Human',
        remark: 'A dumdum'
      },
      rowHasChanged: false,
      fontLoaded: false
    };
  }
  //static navigationOptions = {
  //  title: 'Welcome to the app!',
  //};

  fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }
  toFormData(asset) {
    let array = [];
    for (let prop in asset) {
      array.push(`${prop}=${this.fixedEncodeURIComponent(asset[prop])}`);
    }
    return array.join('&');
  }

  //Communicate with the REST API 
  async _fetchAssets() {
    console.log(this.config.apiUrl);
    try {
      let response = await fetch(this.config.apiUrl);
      let responseJson = [];
      try {
        responseJson = await response.json();
      } catch (error) {
        Alert.alert('Can talk with REST but what is this...?');
        console.log(error);
        responseJson = [];
      }
      this.setState({ assets: responseJson });
    } catch (error) {
      Alert.alert('Unable to call REST Server. Check REST Server.');
      console.log(error);
    }
  }
  async _putAsset(asset) {
    let formData = this.toFormData(asset);
    try {
      await fetch(this.config.apiUrl, {
        method: 'PUT',
        headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: formData
      });
      this._fetchAssets();
    } catch (error) {
      console.log(error);
    }
  }
  async _postAsset(asset) {
    try {
      await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: this.toFormData(asset)
      });
      this._fetchAssets();
    } catch (error) {
      console.log(error);
    }
  }
  async _deleteAsset(asset) {
    try {
      await fetch(this.config.apiUrl, {
        method: 'DELETE',
        headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: this.toFormData(asset)
      });
      this._fetchAssets();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this._fetchAssets();
  }

  handleUpdateAsset = (asset) => {
    // new or update
    if (!asset.id) {
      this._postAsset(asset);
    } else {
      this._putAsset(asset);
    }
  }
  handleDeleteAsset = (asset) => {
    this._deleteAsset(asset);
  }

  createNewAssetDetail = () => { 
    this.props.navigation.navigate('AssetDetail', { 
      asset: {
        id : '',
	      name : '',
	      description : '',
        type : '',
        remark: ''
      },
      updateAsset: this.handleUpdateAsset
    })
  }
  updateAssetDetail = (asset) => {
    this.props.navigation.navigate('AssetDetail', {
      asset: asset,
      updateAsset: this.handleUpdateAsset,
      deleteAsset: this.handleDeleteAsset
    })
  }
  _signOutAsync = async() => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Assets</Title>
          </Body>
          <Right>
            <Button 
              title={"Reload"} 
              transparent 
              onPress={this._fetchAssets}
            />
            <Button
              title={"New"}
              transparent
              onPress={this.createNewAssetDetail}
            />
            <Button 
              title={"Sign Out"}
              transparent
              onPress={this._signOutAsync}
            />
          </Right>
        </Header>

        <Content>
          <Text>WHAZZUP YO</Text>
          <Button 
            title={this.state.testAsset.name} 
            transparent 
            onPress={this.updateAssetDetail(this.state.testAsset)}
          />

          <Button 
            title={"Reload"} 
            transparent 
            onPress={this._fetchAssets}
          />
          <Button
            title={"New"}
            transparent
            onPress={this.createNewAssetDetail}
          />
          <Button 
            title={"Sign Out"}
            transparent
            onPress={this._signOutAsync}
          />
          <List
            dataArray={this.state.assets}
            rowHasChanged={() => true}
            renderRow={asset =>
              <ListItem button onPress={this.updateAssetDetail(asset)}>
                <Text>{asset.name}</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}

//Details Screen
//https://github.com/gregartemides/contacts-mobile-app/blob/master/js/components/contacts/ContactDetail.js
class AssetDetailScreen extends React.Component {
  //TODO.
  //ADD LIST OF ITEMS HERE.
  //CRUD
  //OPTIONALLY, FIGURE OUT HOW TO QR CODE

  //static navigationOptions = {
  //  title: 'Lots of features here',
  //};

  constructor(props) {
    super(props);
    this.asset = props.navigation.state.params.asset;
  }

  handleButtonPress(e) {
    e.preventDefault();
    this.props.navigation.state.params.updateAsset(this.asset);
    this.props.navigation.goBack();
  }

  handleCancelButtonPress(e)
  {
    e.preventDefault();
    this.props.navigation.goBack();
  }

  deleteAsset(e) {
    e.preventDefault();
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this asset?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, delete!',
          onPress: () => {
            this.props.navigation.state.params.deleteAsset(this.asset);
            this.props.navigation.goBack();
          }
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Body>
            <Title>Asset Details</Title>
          </Body>
          <Right>
            {this.asset.id &&
              <Button 
                title={'Delete'}
                transparent 
                onPress={(e) => this.deleteAsset(e)}
              />
            }
          </Right>
        </Header>

        <Content keyboardShouldPersistTaps="always">
          <View>
            <TouchableOpacity>
              <Text>Name</Text>
              <TextInput
                onChangeText={(text) => this.asset.name = text}
              >{this.asset.name}</TextInput>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Type</Text>
              <TextInput
                onChangeText={(text) => this.asset.type = text}
              >{this.asset.type}</TextInput>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Remark</Text>
              <TextInput
                onChangeText={(text) => this.asset.remark = text}
              >{this.asset.remark}</TextInput>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Description</Text>
              <TextInput
                onChangeText={(text) => this.asset.description = text}
              >{this.asset.description}</TextInput>
            </TouchableOpacity>
          </View>

          <Button block
            style={{ margin: 15, marginTop: 50 }}
            onPress={(e) => this.handleButtonPress(e)}
            title={this.asset.id ? 'Update' : 'Save'}
          />
          <Button block
            style={{ margin: 15, marginTop: 50 }}
            onPress={(e) => this.handleCancelButtonPress(e)}
            title={'Cancel'}
          />
        </Content>
      </View>
    );
  }
}

//-------------
//Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

//-------------
//Each Navigator has these screens
const AppStack = createStackNavigator({
  AssetScreen: AssetScreen,
  AssetDetail: AssetDetailScreen
});
const AuthStack = createStackNavigator({
  SignIn: SignInScreen
});

//List of screens
export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

//-------------