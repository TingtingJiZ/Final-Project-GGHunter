const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			topSellers: [],
			currentTopSellers: [],
			
			currentUser:null,
			isLoged: false
			pcGames: [],
			currentPcGames: [],
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
			getPcGames: async () => {
				const uri = `${process.env.URIPC}/api/1.0/deals?storeID=1&upperPrice=15`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options)
				if(!response.ok){
					console.log("Error: ", response.status, response.statusText)
					return;
				}
				const data = await response.json()
				console.log(data)
				setStore({pcGames: data})
			},
			setCurrentpcGames: (pcGames) => {setStore({setCurrentpcGames: pcGames})},
			setCurrentTopSellers: (topSellers) => {setStore({setCurrentTopSellers: topSellers})},
			setCurrentUser: (user) =>{setStore({currentUser:user})},
			setIsLoged: (isLogin) => {setStore({ isLoged: isLogin })},
		}
	};
};
            // Aquí movemos getGamesPc dentro de las acciones
            getGamesPc: async () => {
                const uri = `https://www.cheapshark.com/api/1.0/games?ids=1,2,3,6`
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
                setStore({ gamesPc: data });
            },
            setcurrentGamesPc: (gamesPc) => { setStore({ currentGamesPc: gamesPc }) }
        }
    };
};

export default getState;

