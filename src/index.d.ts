interface Result<TData = any, TError = Error | string> {
	data?: TData;
	error?: TError;
	loading: boolean;
	refetch?(): void;
}

type AnyFunction = (...args: any[]) => any;
type Callback<TParams extends any[] = any[]> = (...args: TParams) => void;

export function useAsyncCallback(asyncCallback: AnyFunction, deps?: ReadonlyArray<any>): [Callback, Result];
export function useAsyncCallback<TData>(
	asyncCallback: AnyFunction,
	deps?: ReadonlyArray<any>,
): [Callback, Result<TData>];
export function useAsyncCallback<TData, TError>(
	asyncCallback: AnyFunction,
	deps?: ReadonlyArray<any>,
): [Callback, Result<TData, TError>];
export function useAsyncCallback<TData, TError, TCallback extends AnyFunction>(
	asyncCallback: TCallback,
	deps?: ReadonlyArray<any>,
): [Callback<Parameters<TCallback>>, Result<TData, TError>];

export function useAsyncEffect(asyncEffect: AnyFunction, deps?: ReadonlyArray<any>): Result;
export function useAsyncEffect<TData>(asyncEffect: AnyFunction, deps?: ReadonlyArray<any>): Result<TData>;
export function useAsyncEffect<TData, TError>(
	asyncEffect: AnyFunction,
	deps?: ReadonlyArray<any>,
): Result<TData, TError>;
