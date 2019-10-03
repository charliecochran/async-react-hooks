import { useCallback, useEffect, useState } from 'react';

const useAsyncCallback = (asyncCallback, dependencies) => {
	const [result, setResult] = useState({ loading: false });
	const callback = useCallback(function callback(...args) {
		setResult({ loading: true });

		Promise.resolve(asyncCallback(...args))
			.then((data) => {
				setResult({
					data,
					loading: false,
					refetch: () => callback(...args),
				});
			})
			.catch((error) => {
				setResult({
					error,
					loading: false,
					refetch: () => callback(...args),
				});
			});
	}, dependencies);

	return [callback, result];
};

const runAsyncEffect = (asyncEffect, setState, refetch) => {
	let cancelled = false;

	Promise.resolve(asyncEffect())
		.then((data) => {
			if (!cancelled) {
				setState({
					data,
					loading: false,
					refetch,
				});
			}
		})
		.catch((error) => {
			if (!cancelled) {
				setState({
					error,
					loading: false,
					refetch,
				});
			}
		});

	return () => {
		cancelled = true;
	};
};

const useAsyncEffect = (asyncEffect, dependencies = []) => {
	const [timestamp, setTimestamp] = useState();
	const [state, setState] = useState({ loading: true });

	useEffect(() => {
		setState({ loading: true });
		runAsyncEffect(asyncEffect, setState, () => setTimestamp(Date.now()));
	}, [timestamp, ...dependencies]);

	return state;
};

export { useAsyncCallback, useAsyncEffect };

export default {
	useAsyncCallback,
	useAsyncEffect,
};
