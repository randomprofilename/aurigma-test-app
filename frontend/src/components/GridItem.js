import React, { Component } from "react";

class GridItem extends Component {
  state = { hovered: false };

  render() {
    const { children } = this.props;
    const { hovered } = this.state;

    return <div     
      style= {{ background: hovered ? "linear-gradient(0deg, rgba(45,172,253,0.3) 0%, rgba(45,57,253,0.3) 100%)" : undefined }} 
      onMouseEnter={() => this.setState({ hovered: true }) } 
      onMouseLeave={() => this.setState({ hovered: false })}
    >
      {children}
    </div>
  }
}

export default GridItem;