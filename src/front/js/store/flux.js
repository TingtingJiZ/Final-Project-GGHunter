

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			topSellers: [],
			currentTopSellers: [],
		},
		actions: {
			getMessage: async () => {
				const options = { headers: { 'Content-Type': 'application/json' } }
				const response = await fetch(process.env.BACKEND_URL + "/api/hello", options)
				if (!response.ok) {
					console.log("Error loading message from backend", response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({ message: data.message })
				return data;
			},
			getTopSellers: async () => {
				const uri = `${process.env.URIBACK}/api/games`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options)
				if(!response.ok) {
					console.log("Error: ", response.status, response.statusText)
					return;
				}
				const data = await response.json()
				console.log(data.status)
				setStore({topSellers: data.results});
			},
			setCurrentTopSellers: (topSellers) => {setStore({setCurrentTopSellers: topSellers})},
		}
	};
};


export default getState;
