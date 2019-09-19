import { useEffect, useState } from 'react';

const run = async (asyncEffect, setState, refetch) => {
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

export default function useAsyncEffect(asyncEffect, dependencies = []) {
	const [timestamp, setTimestamp] = useState();
	const [state, setState] = useState({ loading: true });

	useEffect(() => {
		setState({ loading: true });
		run(asyncEffect, setState, () => setTimestamp(Date.now()));
	}, [timestamp, ...dependencies]);

	return state;
}
