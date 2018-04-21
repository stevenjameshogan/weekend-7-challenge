import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class ReflectionList extends Component {
    // constructor(props){
    //     super(props)
    // }

    getReflections = () => {
        axios.get('/reflection').then((response) => {
            console.log('success', response.data);
            this.props.dispatch({
                type: 'GET_REFLECTIONS',
                payload: response.data
            })
        }).catch((error) => {
            console.log('error getting', error);
        })
    };

    componentDidMount(){
        this.getReflections();
    }

    render() {
        return(<h1>ReflectionList</h1>)
    }
}
const mapReduxStateToProps = (reduxState) => ({
    reduxState
  });

export default connect(mapReduxStateToProps) (ReflectionList);