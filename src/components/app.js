import React from 'react'
import CanvasComponent from './canvasComponent'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Change me!</h1>
        What a hot reload!
        <CanvasComponent />
      </div>
    )
  }
}
