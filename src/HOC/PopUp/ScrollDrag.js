
import React from 'react';
import PropTypes from 'prop-types';

export class ScrollDrag extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isScrolling: false,
      clientX: 0,
      scrollX: 0,
    };
  }

  onMouseDown = (e) => {
    this.setState({
      ...this.state,
      isScrolling: true,
      clientX: e.clientX
    });
  };

  onMouseUp = () => {
    this.setState({
      ...this.state,
      isScrolling: false
    });
  };

  onMouseMove = e => {
    const { clientX, scrollX } = this.state;
    if (this.state.isScrolling === true) {
      //this.ref.current.scrollLeft = scrollX + e.clientX - clientX;
      this.state.scrollX = scrollX + e.clientX - clientX;
      this.state.clientX = e.clientX;
    }
  };

  render() {
    const { ref, rootClass } = this.props;
    return (
      <div
        ref={ref}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        className={rootClass}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ScrollDrag;