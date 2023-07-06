import { useState } from "react";


const useMutation = (url:string):[(data:any)=>void, {loading: boolean; data:undefined | any; error:undefined | any}] => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<undefined | any>(undefined);
	const [error, setError] = useState<undefined | any>(undefined);
	const mutate = (data?:any) => {

	}

	return [mutate, {loading, data, error}];
};

export default useMutation;