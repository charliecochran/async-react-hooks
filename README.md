# async-react-hooks

## useAsyncCallback

### Basic example

```js
import React from 'react';
import { useAsyncCallback } from 'async-react-hooks';

const doSomethingAsync = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.5 ? resolve('Success!') : reject('Failed!')), 1000);
  });

const Demo = () => {
  const [callback, { data, error, loading, refetch }] = useAsyncCallback(doSomethingAsync);

  return (
    <div>
      <a disabled={loading} onClick={callback}>
        Do Something
      </a>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          Error: {error.message}. <a onClick={refetch}>Try again.</a>
        </div>
      )}
      {data && <div>{data}</div>}
    </div>
  );
};

export default Demo;
```

## useAsyncEffect

### Basic example

```js
import React from 'react';
import { useAsyncEffect } from 'async-react-hooks';

const doSomethingAsync = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.5 ? resolve('Success!') : reject('Failed!')), 1000);
  });

const Demo = () => {
  const { data, error, loading, refetch } = useAsyncEffect(doSomethingAsync);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}. <a onClick={refetch}>Retry</a></div>;

  return <div>{data}</div>
};

export default Demo;
```

### Example with dependencies

```js
import React from 'react';
import { useAsyncEffect } from 'async-react-hooks';

const sayHello = (name) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.5 ? resolve(`Hello ${name}`) : reject(`Failed to greet ${name}!`)), 1000);
  });

const GreetName = ({ name }) => {
  const { data, error, loading, refetch } = useAsyncEffect(() => sayHello(name), [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}. <a onClick={refetch}>Retry</a></div>;

  return <div>{data}</div>
};

const names = ['Jane', 'John', 'Mickey', 'Donald'];

const Demo = () => {
  const [name, setName] = useState('Jane');

  return (
    <div>
      <div>Current Name: {name}</div>
      <a onClick={() => setName(names[Math.floor(Math.random() * 3)])}>Change name</a>
      <div>Greeting: <GreetName name={name} /></div>
    </div>
  );
}

export default Demo;
```

## Todo

-   Write readme
-   add error reporting example
