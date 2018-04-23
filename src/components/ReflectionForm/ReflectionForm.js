import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../ReflectionForm/ReflectionForm.css';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
// import { Delete, ModeEdit, Save, Bookmark, BookmarkBorder } from 'material-ui-icons';

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
    // save/capture user inputs so if a reflection is added we have the new inputs
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
        // add new reflection by sending a dispatch to sagas with user inputs (held in local state)
        this.props.dispatch({
            type: 'ADD_REFLECTION',
            payload: this.state.reflectionInputs
        })
        // clear input fields
        this.setState({
            reflectionInputs: {
                topic: '',
                description: ''
            }
        })
    }

    render() {
        return(
            <div id="formDiv">
                <form onSubmit={this.addReflection}>
                    <h3>Topic</h3>
                    <TextField value={this.state.reflectionInputs.topic} type="text"
                        onChange={this.handleInput("topic")} multiline fullWidth ></TextField>
                    <br/><br/><br/>
                    <h3>Description</h3>
                    <TextField className="input" value={this.state.reflectionInputs.description} onChange={this.handleInput("description")} 
                        multiline rows="7" fullWidth></TextField>
                    <br/><br/><br/><br/>
                    <Button variant="raised" color="primary" type="submit" className="button" >Submit</Button>
                </form>
            </div>
        )
        
    }
}
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps) (ReflectionForm);