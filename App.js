import React from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { AppLoading } from "expo";

import store from "./src/redux/store";

import Navigation from "./src/screens/navigations/navigation.component";

class App extends React.Component {
    state = {
        assetsLoaded: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            "Texgyreadventor-bold": require("./assets/fonts/texgyreadventor-bold.otf"),
            "Texgyreadventor-regular": require("./assets/fonts/texgyreadventor-regular.otf")
        });
        this.setState({ assetsLoaded: true });
    }

    render() {
        return this.state.assetsLoaded ? (
            <Provider store={store}>
                <Navigation />
            </Provider>
        ) : (
            <AppLoading />
        );
    }
}

export default App;
