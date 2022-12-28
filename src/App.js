import axios from 'axios'
import { Component } from 'react';
import { Loading } from './Loading';

class App extends Component {
  constructor(props) {
    super(props)
    //state
    this.state = {
      users: [],
      loading: false
    }
    //bind
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getUsers() {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      axios('https://randomuser.me/api/?results=5')
        .then(response => this.setState({
          users: [...this.state.users, ...response.data.results]
        }))
      this.setState({
        loading: false
      })
    }, 0)


  }

  componentWillMount() {
    this.getUsers()
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log("Mais usuarios")
    this.getUsers()


  }

  render() {
    const {loading, users} = this.state
    return (//isso é jsx (mistura de html com js)
      <div className="App">
          <form onSubmit={this.handleSubmit}>
            <input type="submit" value="Carregar Mais"></input>
          </form>
        {
          users.map(user => (
            <div key={user.id.value}>
              <h3 style={{color:"red"}}>{user.name.first}</h3>
              <p>{user.email}</p>
              <hr></hr>
            </div>))
        }
        {loading && <Loading message="Socorro!!!!!!!!" />}
      </div>
    );
  }
}

export default App;
