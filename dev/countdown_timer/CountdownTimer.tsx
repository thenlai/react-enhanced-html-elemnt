import * as React from "react";

const DEFAULT_TIME_DELAY : number = 60;
const ONE_SECOND = 1000;
const DEFAULT_NAMESPACE = "ue";// ue stands for "user element"

//const DEFAULT_UNIT : string = "s";

//export namespace UserElement {

interface CountdownProps {
    delay?: number;
    unit?: string;
    namespace?: string;
    template?: { (time: number) : string };
    onEnd?: Function;
}

interface CountdownState {
    message?: string;
    timeCountdown: number;
}

// 倒计时组件
export default class CountdownTimer extends React.Component<CountdownProps, CountdownState> {

    // 定时器
    private timer: number = null;
    // 命名空间
    private ns: string;
    // 定时长
    private defaultDelay: number;

    constructor(props: CountdownProps) {
        super(props);

        this.defaultDelay = this.props.delay ? this.props.delay: DEFAULT_TIME_DELAY;
        this.ns = this.props.namespace ? this.props.namespace : DEFAULT_NAMESPACE;

        this.state = {
            timeCountdown: this.defaultDelay,
        };
    }

    componentDidMount() {
        //
    }

    componentWillUnmount() {
        this.clear();
    }

    public start() {
        let time: number = this.defaultDelay;
        let count = () : void => {
            time--;
            this.setState({
                timeCountdown : time
            });
            if (time < 0) {
                clearInterval(this.timer);
                // todo: whenRoundEnd
                let call = this.props.onEnd;
                if(call) {
                    if(typeof call === typeof function(){}) {
                        call();
                    } else {
                        console.warn("`onEnd` props of CountDownTimer Component must be a function.");
                    }
                } else {
                    console.warn("CountDownTimer Component must have `onEnd` props with function type.");
                }
            }
        };

        this.timer = window.setInterval(count, ONE_SECOND);
    }

    public stop() {
        this.clear();
    }

    public reset() {
        this.clear();
        this.setState({
            timeCountdown: this.defaultDelay
        });
        this.timer = null;
    }

    public clear() {
        if(this.timer != null) {
            window.clearInterval(this.timer);
            this.timer = null;
        }
    }

    render() {
        return (
            <span className={`${this.ns}--countdown-timer`}>
                {this.state.timeCountdown} {this.props.unit ? this.props.unit: null}
            </span>);
    }
}

//}