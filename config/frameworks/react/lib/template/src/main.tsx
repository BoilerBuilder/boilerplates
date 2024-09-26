import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button } from './components/button'
import { Input } from './components/input'
import { Label } from './components/label'

// This file serves as an example of how to use the library components
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>
      <h1>React Library Components</h1>
      <Label htmlFor="example-input">Example Input:</Label>
      <Input id="example-input" placeholder="Type here..." />
      <Button onClick={() => alert('Button clicked!')}>Click me</Button>
    </div>
  </React.StrictMode>,
)

// Export components for library use
export { Button, Input, Label }