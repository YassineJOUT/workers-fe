import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { resetPassword } from '../../../store/ResetPassword/actions';
import { ApplicationState } from '../../../store';
import { connect } from 'react-redux';
import _ from 'lodash';
interface IResetPasswordProps {
    resetPassword: Function
}
interface IResetPasswordStateProps {
    isLoading: boolean,
    error: string,
    successMessage: string,
    email:string,
    confirmationCode: string
}

type IProps = IResetPasswordProps & IResetPasswordStateProps

class ResetPassword extends Component<IProps> {

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passordFlied = document.querySelector('.password') as HTMLInputElement;
        let password: string = (passordFlied) ? passordFlied.value : '';

        if (!_.isEmpty(password)){
            this.props.resetPassword(this.props.email,this.props.confirmationCode,password);
    }
    }

    render = () => {
        return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Group className='mt-4' controlId="formBasicPassword">
                <span className='pl-3 pt-1 position-absolute' >
                    <FontAwesomeIcon icon={faLock} />
                </span>
                <Form.Control size="sm" className="pl-5 password" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className='mt-4' controlId="formBasicPassword">
                <span className='pl-3 pt-1 position-absolute' >
                    <FontAwesomeIcon icon={faLock} />
                </span>
                <Form.Control size="sm" className="pl-5" type="password" placeholder="Password" />
            </Form.Group>
            <Button size="sm" className='mb-3 btn btn-primary btn-lg btn-block' variant="primary" type="submit">
                Reset Password
                        </Button>
        </Form>

    );
}
};

const mapStateToProps = ({passwordForgotten,resetPassword}: ApplicationState) => ({
    isLoading: resetPassword.isLoading ,
    error: resetPassword.error,
    successMessage: resetPassword.successMessage,
    email: passwordForgotten.email,
    confirmationCode: passwordForgotten.confirmationCode
})

const mapActionsToProps =  {
    resetPassword
}

export default connect(mapStateToProps,mapActionsToProps)(ResetPassword);