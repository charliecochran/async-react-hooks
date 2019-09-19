import { useCallback, useState } from 'react';

export default function useAsyncCallback(asyncCallback, dependencies) {
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
}
