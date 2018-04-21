import React, { Component } from 'react';
import axios from 'axios';

class ReflectionForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            reflectionInputs: {
            topic: '',
            description: ''
            }
        }
    }

    handleInput = (propertyName) => {
        return (event) => {
            this.setState({
                reflectionInputs: {
                    ...this.state.reflectionInputs,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    addReflection = (event) => {
        event.preventDefault();
        axios.post('/reflection', this.state.reflectionInputs).then((response) => {
        }).catch((error) => {
            console.log('error postin', error);
        })
    }

    render() {
        return(
            <div id="formDiv">
                <form onSubmit={this.addReflection}>
                    <input value={this.state.topic} type="text" placeholder="Topic" onChange={this.handleInput("topic")}></input>
                    <p>Description</p>
                    <textarea value={this.state.description} onChange={this.handleInput("description")} cols="50" rows="10"></textarea>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        )
        
    }
}

export default ReflectionForm;