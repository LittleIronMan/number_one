import {Component} from 'react';

class SearchPlugin extends Component {
    constructor(props) {
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
    }

    onTextChanged(e) {
        const text = e.target.value.trim(); // удаляем пробелы
        this.props.filter(text); // передаем введенный текст в родительский компонент
    }

    render() {
        return <input placeholder='Поиск' onChange={this.onTextChanged} />;
    }
}

export default SearchPlugin;
