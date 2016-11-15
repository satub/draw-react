import React from 'react'
import DefaultShape from './defaultShape'
///import other canvas elements as components or stateless functions

export default class CanvasComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      shapes: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(ev){
    ev.preventDefault();
    this.setState({
      shapes: [...this.state.shapes, [ev.pageX, ev.pageY-55]]
    })
    // console.log(this.state.shapes);
  }

  render(){
    let rendered = this.state.shapes.map((shape, i) => <DefaultShape xCo={shape[0]} yCo={shape[1]} key={i}/>)
    return (
      <div id="painting">
        <canvas onMouseMove={this.handleClick} id="ourCanvas" width="700" height="400" style={{backgroundColor: '#008811', borderRadius: 10, borderWidth: 0.5, borderColor: '#d6d7da', opacity: '0.75'}}>
          {rendered}
        </canvas>
      </div>
    )
  }
}
