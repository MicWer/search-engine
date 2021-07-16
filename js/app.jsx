import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {

    //Entry Data (table)

    class EntryBody extends React.Component {
        render() {
            return <tbody>
            <tr>
                <td className="brand">{this.props.brand}</td>
                <td className="category">{this.props.category}</td>
                <td>{Math.floor(Math.random() * (2017 - 2001 + 1) + 2001)}-{Math.floor((Math.random() * 12) + 1)}-{Math.floor((Math.random() * 31) + 1)}</td>
            </tr>
            </tbody>
        }
    }

    //Entry Header(name)

    class EntryHeader extends React.Component {

        render() {
            return <thead>
            <tr>
                <th colSpan="3" style={{fontSize: '2em'}}>{this.props.name}</th>
            </tr>
            <tr>
                <th>Brand</th>
                <th>Category</th>
                <th>Implementation date</th>
            </tr>
            </thead>
        }
    }

    //Render ListOFEntries

    class ListOfEntries extends React.Component {
        constructor(props) {
            super(props);
        }

        //Control flow filtering

        canBeDisplayed = (entry) => {
            if (this.props.name && entry.name.indexOf(this.props.name) < 0) {
                // input name is set, but this entry doesn't contain it
                return false;
            }
            if (this.props.category !== '0' && entry.category !== this.props.category) {
                // category is selected, but this entry category doesn't match the selected one
                return false;
            }
            if (this.props.brand !== '0' && entry.brand !== this.props.brand) {
                // brand is selected, but this entry brand doesn't match the selected one
                return false;
            }
            return true;
        };

        render() {
            const selectCategory = document.getElementById('selectCategory');
            const selectBrand = document.getElementById('selectBrand');

            return <div>
                {inputData.filter(this.canBeDisplayed).map(entry => (
                    <table className="entry" key={entry.key}>
                        <EntryHeader name={entry.name}/>
                        <EntryBody brand={entry.brand} category={entry.category}/>
                    </table>
                ))}
            </div>
        }
    }

    //Render FilterPanel

    class FilterPanel extends React.Component {
        constructor(props) {
            super(props);
        }

        handleNameChange = (e) => {
            this.props.onNameInput(e.target.value);
        };

        handleCategoryChange = (e) => {
            this.props.onCategoryChange(e.target.value);
        };

        handleBrandChange = (e) => {
            this.props.onBrandChange(e.target.value);
        };

        render() {
            return <form className="filterBox">
                <div className="filterTitle">Filter Panel</div>
                <input id="filterInput"
                       type="text"
                       placeholder="Search by name"
                       onChange={this.handleNameChange}/>
                <select id="selectCategory" onChange={this.handleCategoryChange}>
                    <option value="0">All Categories</option>
                    <option value="Category A">Category A</option>
                    <option value="Category B">Category B</option>
                    <option value="Category C">Category C</option>
                </select>
                <select id="selectBrand" onChange={this.handleBrandChange}>
                    <option value="0">All Brands</option>
                    <option value="Brand A">Brand A</option>
                    <option value="Brand B">Brand B</option>
                    <option value="Brand C">Brand C</option>
                </select>
            </form>
        }
    }

// Render All
    class App extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                filterText: '',
                category: '0',
                brand: '0'
            }
        }

        handleNameChange = (name) => {
            this.setState({
                filterText: name
            });
        };

        handleCategoryChange = (category) => {
            this.setState({
                category: category
            });
        };

        handleBrandChange = (brand) => {
            this.setState({
                brand: brand
            });
        };

        render() {
            return <div>
                <FilterPanel onNameInput={this.handleNameChange} onCategoryChange={this.handleCategoryChange}
                             onBrandChange={this.handleBrandChange}/>
                <ListOfEntries name={this.state.filterText} category={this.state.category} brand={this.state.brand}/>
            </div>
        }
    }

    const inputData = [
        {
            key: '1',
            name: 'Name A',
            category: 'Category A',
            brand: 'Brand A'
        },
        {
            key: '2',
            name: 'Name B',
            category: 'Category B',
            brand: 'Brand B'
        },
        {
            key: '3',
            name: 'Name C',
            category: 'Category C',
            brand: 'Brand C'
        },
        {
            key: '4',
            name: 'Name B',
            category: 'Category A',
            brand: 'Brand C'
        },
        {
            key: '5',
            name: 'Name C',
            category: 'Category B',
            brand: 'Brand C'
        },
        {
            key: '6',
            name: 'Name A',
            category: 'Category C',
            brand: 'Brand A'
        },

    ];


    ReactDOM.render(
        <App inputData={inputData}/>,
        document.getElementById('container')
    )
});