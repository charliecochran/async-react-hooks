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
      <button disabled={loading} onClick={callback}>Do Something</button>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          Error: {error} <button onClick={refetch}>Try again.</button>
        </div>
      )}
      {data && <div>{data} <button onClick={refetch}>Refresh</button></div>}
    </div>
  );
};

export default Demo;
```

### Example with dependencies

```js
import React, { useState } from 'react';
import { useAsyncCallback } from 'async-react-hooks';

const sayHello = (name) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.5 ? resolve(`Hello ${name}`) : reject(`Failed to greet ${name}!`)), 1000);
  });

const GreetName = ({ name }) => {
  const [callback, { data, error, loading, refetch }] = useAsyncCallback(() => sayHello(name), [name]);

  return (
    <div>
      <button disabled={loading} onClick={callback}>
        Say Hello to {name}
      </button>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          Error: {error} <button onClick={refetch}>Try again.</button>
        </div>
      )}
      {data && <div>{data} <button onClick={refetch}>Refresh</button></div>}
    </div>
  )
};

const names = ['Jane', 'John', 'Mickey', 'Donald'];
const getNextName = (name) => names[(names.indexOf(name) + 1) % 4];

const Demo = () => {
  const [name, setName] = useState('Jane');

  return (
    <div>
      <div>
        Current Name: {name}
        <button onClick={() => setName(getNextName(name))}>Change name</button>
      </div>
      <GreetName name={name} />
    </div>
  );
}

export default Demo;
```

## useAsyncEffect

### Basic example

```js
import React from 'react';
import { useAsyncEffect } from 'async-react-hooks';

const doSomethingAsync = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.5 ? resolve('Resolved!') : reject('Rejected!')), 1000);
  });

const Demo = () => {
  const { data, error, loading, refetch } = useAsyncEffect(doSomethingAsync);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error} <button onClick={refetch}>Retry</button></div>;

  return <div>Success: {data} <button onClick={refetch}>Refresh</button></div>
};

export default Demo;
```

### Example with dependencies

```js
import React, { useState } from 'react';
import { useAsyncEffect } from 'async-react-hooks';

const sayHello = (name) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.5 ? resolve(`Hello ${name}`) : reject(`Failed to greet ${name}!`)), 1000);
  });

const GreetName = ({ name }) => {
  const { data, error, loading, refetch } = useAsyncEffect(() => sayHello(name), [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error} <button onClick={refetch}>Retry</button></div>;

  return <div>{data} <button onClick={refetch}>Refresh</button></div>
};

const names = ['Jane', 'John', 'Mickey', 'Donald'];
const getNextName = (name) => names[(names.indexOf(name) + 1) % 4];

const Demo = () => {
  const [name, setName] = useState('Jane');

  return (
    <div>
      <div>
        Current Name: {name}
        <button onClick={() => setName(getNextName(name))}>Change name</button>
      </div>
      <GreetName name={name} />
    </div>
  );
}

export default Demo;
```

## Todo

-   add error reporting example
