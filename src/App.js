import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: [
        { name: "asdf5", value: 200 },
      ],
      expense: [
        { name: "asdf1", value: 10 },
        { name: "asdf2", value: 15 },
        { name: "asdf3", value: 35 },
        { name: "asdf4", value: 40 },
        { name: "asdf5", value: 50 },
      ],
    }
  }

  calcBalance() {
    const expense = this.state.expense.slice();
    const income = this.state.income.slice();
    let total = 0;
    expense.forEach(item => {
      total = total - Number(item.value)
    });
    income.forEach(item => {
      total = total + Number(item.value)
    });
    return Number(total);
  }

  addItem(name, value, listName) {
    const list = this.state[listName].slice();
    list.push({ name, value });
    this.setState({ [listName]: list });
  }

  removeItem(i, listName) {
    const list = this.state[listName].slice();
    list.splice(i, 1);
    this.setState({ [listName]: list });
  }

  
  
  render() {
    return (
      <div className="App">
        <div className='App-header'><Balance value={this.calcBalance()} /></div>
        <div className='App-body'>
          <div className='List'>
            <h3>Expense</h3>
            <List list={this.state.expense} onClick={(i) => this.removeItem(i, 'expense')} />
            <Add listName='expense' onClick={(name, value, listName) => { this.addItem(name, value, listName) }} />
          </div>
          <div className='List'>
            <h3>Income</h3>
            <List list={this.state.income} onClick={(i) => this.removeItem(i, 'income')} />
            <Add listName='income' onClick={(name, value, listName) => { this.addItem(name, value, listName) }} />
          </div>
        </div>
      </div>
    );
  }
}

function Add(props) {
  let nameInput;
  let valueInput;

  return (
    <div>
      <input type="text" name='name' onChange={e => { nameInput = e.target.value }}></input>
      <input type="number" name='value' onChange={e => { valueInput = e.target.value }}></input>
      <button onClick={() => { props.onClick(nameInput, valueInput, props.listName) }}>ADD</button>
    </div>
  );
}

function Balance(props) {
  return (
    <h1 style={{color: props.value > 0 ? 'green': 'red'}}>{props.value}</h1>
  );
}

function List(props) {
  return (
    <ul>
      {props.list.map((element, i) => {
        return <li key={i} onClick={() => props.onClick(i)}>
          {element.name} - {element.value}
        </li>
      })}
    </ul>
  );
}

export default App;
