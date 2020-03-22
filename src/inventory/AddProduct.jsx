import React, { Component } from 'react';
import Product from './Pojo.jsx'

// https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
export default class AddProduct extends Component {
    /**
     * 
     * @param {default init} props 
     */
    constructor(props) {
        super(props);
        this.state = { newProd: new Product("", "", "Jeans", "") };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * 
     * @param {handle chnages} event 
     * @param {*} name 
     */
    handleChange(event, name) {
        if (name == "name") {
            this.setState({ newProd: new Product(event.target.value, this.state.newProd.price, this.state.newProd.category, this.state.newProd.image) });
        } else if (name == "cat") {
            this.setState({ newProd: new Product(this.state.newProd.name, this.state.newProd.price, event.target.value, this.state.newProd.image) });
        } else if (name == "price") {
            this.setState({ newProd: new Product(this.state.newProd.name, event.target.value.replace("$ ", ""), this.state.newProd.category, this.state.newProd.image) });
        } else if (name == "image") {
            this.setState({
                newProd: new Product(this.state.newProd.name, this.state.newProd.price,
                    this.state.newProd.category, event.target.value)
            });
        }

    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.saveProd(this.state.newProd);
        // this.setState({ newProd: new Product("", "", "Jeans", "") });
    }
    render() {
        return (
            <div className="flex-container">
                <form className="reg-form" id="regform" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="flex-container">
                        <div className="flex-row-3">
                            <label >Category<span className="error"></span></label>
                        </div>
                        <div className="flex-row-3">
                            <label>Price Per Unit<span className="error"></span></label>
                        </div>
                    </div>
                    <div className="flex-container">
                        {/* <input type="text" list="eventslist"   required /> */}
                        <select id="eventslist" defaultValue={this.state.newProd.category} onChange={(e) => this.handleChange(e, "cat")}>
                            <option value="Shirts">Shirts</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Sweaters">Sweaters</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        <input id="12years" type="text" value={"$ " + this.state.newProd.price} onChange={(e) => this.handleChange(e, "price")} />
                    </div>
                    <div className="flex-container">
                        <div className="flex-row-5">
                            <label >Product Name<span className="error"></span></label>
                        </div>
                        <div className="flex-row-3">
                        </div>
                        <div className="flex-row-5">
                            <label>Image URL<span className="error"></span></label>
                        </div>
                    </div>
                    <div className="flex-container">
                        <input typeof="text" value={this.state.newProd.name} onChange={(e) => this.handleChange(e, "name")} />
                        <input typeof="text" value={this.state.newProd.image} onChange={(e) => this.handleChange(e, "image")} />
                    </div>
                    <div className="align-center">
                        <button type="submit" form="regform" value="Submit">Add Product</button>
                    </div>
                </form>
            </div>
        );
    }
}

