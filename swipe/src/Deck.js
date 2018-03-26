import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

class Deck extends Component {
  constructor(props) {
    super(props);
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        debugger
        console.log('Gesture', gesture);
      },
      onPanResponderRelease: () => {}
    });

    this.state = { panResponder };
  }
  renderCards() {
    return this.props.data.map(item => {
      return this.props.renderCard(item);
    });
  }

  render() {
    // Esse panHandlers tem muitas funções de callbacks 
    // que vai ajudar interceptar os pressionamentos do usuário na tela
    return (
      <View {...this.state.panResponder.panHandlers}>{this.renderCards()}</View>
    );
  }
}
export default Deck;
