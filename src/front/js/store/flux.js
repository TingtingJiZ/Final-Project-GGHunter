const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			topSellers: [],
			currentTopSellers: [],
			currentUser: null,
			isLoged: false,
			pcGames: [],
			currentPcGames: [],
			comments: [],
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
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText)
					return;
				}
				const data = await response.json()
				console.log(data)
				setStore({ pcGames: data })
			},
			getGamesPc: async () => {
				const uri = `https://www.cheapshark.com/api/1.0/games?ids=1,2,3,6`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText)
					return;
				}
				const data = await response.json()
				console.log(data.status)
				setStore({ gamesPc: data });
			},
			createComments: async (comments) => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/comments`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(comments)
				};
				
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}
			
				const newComment = await response.json();
				const store = getStore();
				
				// Agregar el nuevo comentario a la lista
				setStore({ comments: [...store.comments, newComment] });
			},
			getComments: async () => {
				const token = localStorage.getItem('token');
				const uri = `${process.env.BACKEND_URL}/api/comments`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};
			
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}
			
				const data = await response.json();
				setStore({ comments: data.results });
			},
			deleteComment: async (commentId) => {
				const token = localStorage.getItem('token');
				if (!token) {
					console.log('No token found');
					return;
				}
			
				const uri = `${process.env.BACKEND_URL}/api/comments/${delete_comment}`;
				const options = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};
			
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}
			
				const store = getStore();
				const updatedComments = store.comments.filter(comment => comment.id !== commentId);
				setStore({ comments: updatedComments });
			},
			
            setCurrentpcGames: (pcGames) => { setStore({ currentpcGames: pcGames }) },
            setCurrentTopSellers: (topSellers) => { setStore({ currentTopSellers: topSellers }) },
            setCurrentUser: (user) => { setStore({ currentUser: user }) },
            setIsLoged: (isLogin) => { setStore({ isLoged: isLogin }) },
            setcurrentGamesPc: (gamesPc) => { setStore({ currentGamesPc: gamesPc }) }
        }
    };
};

export default getState;

