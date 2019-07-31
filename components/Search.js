Search = React.createClass({
  getInitialState() {//ustawiamy wartość początkową stanu
    return {
      searchingText: ''
    };
  },

  handleChange: function(event) {//funkcja zmieniająca wartośc stanu przy zmianie wpisywanego tekstu
    var searchingText = event.target.value;
    this.setState({
      searchingText: searchingText
    });
    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },

  handleKeyUp: function(event) {//nasłuchiwanie na wciśnięcie enter
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  },

  render: function() {
    var styles = {
      fontSize: '1.5em',
      width: '90%',
      maxWidth: '350px'
    };

  return <input
           type="text"
           onChange={this.handleChange}
           placeholder="Tutaj wpisz wyszukiwaną frazę"
           style={styles}
           value={this.state.searchTerm}
          />
  }
});