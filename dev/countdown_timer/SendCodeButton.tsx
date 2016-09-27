// <reference path="./CountdownTimer" />

import * as React from "react";
import ReactInstance = __React.ReactInstance;

import CountdownTimer from "./CountdownTimer";

//export namespace UserElement {

    interface SendCodeButtonProps {
        onClick: Function;
    }

    interface SendCodeButtonState {
        hasRequest: boolean;
    }

    export default class SendCodeButton extends React.Component<SendCodeButtonProps, SendCodeButtonState> {

        refs: {
            [key: string]: (ReactInstance);
            timer: (CountdownTimer);
        };

        constructor(props: SendCodeButtonProps) {
            super(props);
            this.state = {
                hasRequest: false
            };
        }

        onClick() {
            if(this.state.hasRequest) return;

            this.setState({
                hasRequest: true
            }, ()=> {
                this.props.onClick();
                this.refs.timer.start();
            });
        }

        onCountdownEnd() {
            //alert("yes!");
            this.setState({
                hasRequest: false
            });
        }

        render() {
            return (
                <button className="v--send-code-button"
                onClick={this.onClick.bind(this)}>
                    {
                        this.state.hasRequest ?
                            <CountdownTimer
                                ref="timer"
                                delay={60}
                                unit="秒"
                                onEnd={this.onCountdownEnd.bind(this)} /> :
                            "发送验证码"
                    }
                </button>);
        }
    }

//}