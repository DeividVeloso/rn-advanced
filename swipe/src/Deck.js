import React, { Component } from "react";
import { View, Animated, PanResponder, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
//Se ele precisonar para direita 25% da tela, quer dizer que ele curtiu.
const SWIPE_TRESHOLD = 0.25 * SCREEN_WIDTH;

class Deck extends Component {
  constructor(props) {
    super(props);
    //Não vamos setar o valor inicial de 0, vamos pegar do PanResponder
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        //Passando a posição do Elemento x y e atualizando conforme se move.
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_TRESHOLD) {
          console.log("Curtiu a foto para direita");
        } else if (gesture.dx < -SWIPE_TRESHOLD) {
          console.log("NÃO Curtiu a foto foi para esquerda");
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position };
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = { ...this.state };

    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}
export default Deck;
