interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps) {
  return <div>Hello, {name}!</div>;
}

export default Greeting;
