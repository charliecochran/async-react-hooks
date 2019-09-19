import { useCallback, useEffect, useState } from 'react';

const useAsyncCallback = (asyncCallback, dependencies) => {
	const [result, setResult] = useState({ loading: false });
	const callback = useCallback(async function callback(...args) {
		setResult({ loading: true });
		try {
			setResult({
				data: await asyncCallback(...args),
				loading: false,
			});
		} catch (error) {
			setResult({
				error,
				loading: false,
				retry: () => callback(...args),
			});
		}
	}, dependencies);

	return [callback, result];
};

const runAsyncEffect = async (asyncEffect, setState, refetch) => {
	let cancelled = false;

	try {
		const data = await asyncEffect();

		if (!cancelled) {
			setState({
				data,
				loading: false,
				refetch,
			});
		}
	} catch (error) {
		if (!cancelled) {
			setState({
				error,
				loading: false,
				refetch,
			});
		}
	}

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
