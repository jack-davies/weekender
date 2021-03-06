import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Slider, Picker } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      currencies: {USD: '$', JPY: '¥', AUD: '$'},
      selectedCurrency: 'AUD',
      budgets: [100, 200, 500, 1000, 2000, 5000, null],
      selectedBudget: null,
      minBudget: 10,
      maxBudget: 5000
    };
  }

  budgetString(value) {
    return(value == null ? 'no budget' : this.state.currencies[this.state.selectedCurrency][0] + value)
  }

  render() {
    let currencyOptions = []
    for (var key in this.state.currencies) {
      currencyOptions.push(<Picker.Item key={key} label={this.state.currencies[key] + ' ' + key} value={key} />)
    }

    let budgetsButtons = this.state.budgets.map(
      (option, i) => <View key={i} style={styles.button}><Button key={i} onPress={() => this.setState({selectedBudget: option})} title={this.budgetString(option)} /></View>
    )

    return (
      <View style={styles.container}>
        <Text style={styles.title}>weekender</Text>
        <View style={styles.elementH}>
          <Text>Currency: </Text>
          <Picker style={styles.picker} selectedValue={this.state.selectedCurrency} onValueChange={(itemValue) => this.setState({selectedCurrency: itemValue})}>
            {currencyOptions}
        </Picker>
        </View>
        <View style={styles.elementV}>
          <View style={[styles.elementH, styles.wrap]}>
            {budgetsButtons}
          </View>
          <View style={styles.elementH}>
            <Text>{this.state.currencies[this.state.selectedCurrency][0] + this.state.minBudget + ' ' + this.state.selectedCurrency}</Text>
            <Slider
              style={styles.slider}
              step={1}
              value={this.state.selectedBudget} 
              minimumValue={this.state.minBudget}
              maximumValue={this.state.maxBudget}
              onSlidingComplete={(value) => this.setState({selectedBudget: value})}
            />
            <Text>{this.state.currencies[this.state.selectedCurrency][0] + this.state.maxBudget + ' ' + this.state.selectedCurrency}</Text>
          </View>
        </View>
        
        <View style={styles.elementV}>
          <Text>Please enter a destination</Text>
          <TextInput 
            style={styles.input} 
            placeholder="destination" 
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <View style={styles.elementV}>
          <Text>Destination: {this.state.text}</Text>
          <Text>Budget: {this.budgetString(this.state.selectedBudget)}</Text>
          <Button onPress={() => {Alert.alert(this.state.text)}} title="search" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingTop: 24
  },
  elementV: {
    borderColor: 'lightgreen',
    borderRadius: 2,
    borderWidth: 1
  },
  elementH: {
    flexDirection: 'row',
    alignItems: 'center',  // vertical centering text
    borderColor: 'lightblue',
    borderRadius: 2,
    borderWidth: 1
  },
  wrap: {
    flexWrap: 'wrap'
  },
  slider: {
    flex: 1
  },
  picker: {
    width: 120
  },
  title: {
    fontSize: 20
  },
  input: {
    height: 40
  }, 
  button: {
    flexGrow: 1
  }
});
