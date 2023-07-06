import { useState } from "react";

interface IUseMutationState{
	loading: boolean;
	data?:object | undefined;
	error?:object | undefined;
}

type UseMutationResult = [(data:any)=>void, IUseMutationState];

const useMutation = (url:string):UseMutationResult => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<undefined | any>(undefined);
	const [error, setError] = useState<undefined | any>(undefined);

	const mutate = (data:any) => {
		setLoading(true);
		fetch(url,{
			method:"POST",
			headers:{
				"Content-Type" : "application/json"
			},
			body: JSON.stringify(data)
		})
		.then((response) => response.json().catch(() => {}))
		.then(json => setData(json))
		.catch(error => setError(error))
		.finally(()=>setLoading(false));
	}

	return [mutate, {loading, data, error}];
};

export default useMutation;