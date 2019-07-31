var GIPHY_PUB_KEY = 'qcFcx9J31EE845BaHVoPRv8IYowcVNGm';
var GIPHY_API_URL = 'https://api.giphy.com';

App = React.createClass({

  getInitialState() {
    return {
        loading: false,
        searchingText: '',
        gif: {}
    };
  },

  handleSearch: function(searchingText) {// pobieranie wpisywanego tekstu
    this.setState({
      loading: true  // sygnalizacja procesu ładowania (ikonka)
    });
    this.getGif(searchingText, function(gif) {  // rozpoczęcie ładowania gifa
      this.setState({  // po zakończeniu pobieania:
        loading: false,  // koniec sygnalizacji ładowania
        gif: gif,  // wstawianie pobranego gifa jako wynik pobierania
        searchingText: searchingText  // nowy stan dla wyszykiwane go tekstu
      });
    }.bind(this));//metoda bind pozwalająca na zachowanie kontekstu
  },

  getGif: function(searchingText, callback) {  // parametry - wpisywany tekst oraz funkcję wykonywaną po pobraniu gifa
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // adres url dla API Giphy
    var xhr = new XMLHttpRequest();  // sekwencja tworzenia zapytania do serwera i jego wysłania
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText).data; // rozpakowujemy odebrany obiekt z danymi do zmiennej data
        var gif = {  // "układamy" obiekt gif na podstawie odpowiedzi serwera
          url: data.fixed_width_downsampled_url,
          sourceUrl: data.url
        };
        callback(gif);  //przekazujemy obiekt do zmiennej funkcji callback
      }
    };
    xhr.send();
  },

  render: function() {

    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      //dodanie wyżej przypisanych do obiektu var styles stylów inline
      <div style={styles}>
          <h1>Wyszukiwarka GIFow!</h1>
          <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
          <Search onSearch={this.handleSearch}/>
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
        </div>
    );
  }
});

