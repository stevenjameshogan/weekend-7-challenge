import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        this.props.dispatch({
            type: 'ADD_REFLECTION',
            payload: this.state.reflectionInputs
        })
    }

    render() {
        return(
            <div id="formDiv">
                <form onSubmit={this.addReflection}>
                    <textarea value={this.state.topic} type="text" placeholder="Topic" 
                        onChange={this.handleInput("topic")} cols="100" rows="2"></textarea>
                    <p>Description</p>
                    <textarea value={this.state.description} onChange={this.handleInput("description")} cols="100" rows="10"></textarea>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        )
        
    }
}
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps) (ReflectionForm);