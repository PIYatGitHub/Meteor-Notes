import React from "react";
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import {withTracker} from "meteor/react-meteor-data";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";

 export class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.state =  {
           error:""
        };
    }
     onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if(password.length<9) {
            return this.setState({
                error: "Password has to be more than 8 characters long."
            });
        }
        this.props.createUser({email, password}, (err) => {
            if(err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.setState({
                    error: ""
                });
            }
        });

     }
    render () {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1> Join </h1>
                    {this.state.error?<p>{this.state.error}</p> : undefined}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" ref="email" name = "email" placeholder = "Email" />
                        <input type="password" ref="password" name = "password" placeholder = "Password" />
                        <button className="button"> Create account</button>
                    </form>
                    <Link to="/"> Already have an account?</Link>
                </div>

            </div>
        )
    }
}

Signup.propTypes = {
    createUser:PropTypes.func.isRequired
};

export default withTracker( () => {
    return {
        createUser: Accounts.createUser
    };
}) (Signup);
