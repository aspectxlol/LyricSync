import moment from "moment";
import { Component } from "react";

class LiveClock extends Component {

  timerID: NodeJS.Timeout | null
  state: Readonly<{
    date: Date
  }>;
  constructor(props: any) {
    super(props);

    this.state = { date: new Date() };
    this.timerID = null
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID!);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="rounded-full p-1 px-5 bg-gray-700">
        <span className="text-white text-2xl">{moment(this.state.date).format('hh:mm:ss a')}</span>
      </div>
    );
  }
}

export default LiveClock