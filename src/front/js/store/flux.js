const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			topSellers: [],
			currentTopSellers: [],
			currentUser: null,
			isLoged: false,
			pc: [],
			currentPC: [],
			comments: [],
			commentsPerGame: [],
			nintendo: [],
			currentNintendo: [],
			playstation: [],
			currentPlaystation: [],
			xbox: [],
			currentXbox: [],
			gamesPc: [],
			currentGamesPc: [],
			freeGames: []
		},
		actions: {
			getPC: async () => {
				const uri = `${process.env.URIBACK}/api/games`;
				const options = { method: "GET" };
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data.results);
				setStore({ pc: data.results });
			},
			getGamesPc: async () => {
				//let datos = [];
				const actions = getActions();
				let valores = [];
		        const uri = `https://www.cheapshark.com/api/1.0/games?ids=251420,194160,234902,144209,195104,165363,236626,258010,177485,229961,188278,212038`
		        const options = {
		            method: "GET",
		            }
		        const response = await fetch(uri, options)
		        if(!response.ok) {
		            console.log("Error: ", response.status, response.statusText)
		            return;
		            }
		        const data = await response.json()
		        console.log(data)
				let entriesPC = Object.entries(data);
				for (let i = 0; i < entriesPC.length; i++) {
					let gameID = entriesPC[i][0];
					let gameData = entriesPC[i][1];
					let retailPrice = 0.0;
					let storeID = 0;

					let preciosPC = gameData.deals;
					let infoPC = gameData.info;
					let title = infoPC.title;
					let steamAppID = infoPC.steamAppID;
					let thumb = infoPC.thumb;
			
					//console.log(`El título es ${title}, el id de steam es ${steamAppID}, la imagen es ${thumb}, y el ID del juego es ${gameID}`);
					
					for (let j = 0; j < preciosPC.length; j++) {
						if (preciosPC[j].storeID == 1) {
							retailPrice = preciosPC[j].retailPrice;
							storeID = preciosPC[j].storeID;
							break;
						}
					}

					valores.push({
						"id": gameID,
						"steamAppID": steamAppID,
						"title": title,
						"thumb": thumb,
						"precio": retailPrice,
						"storeID": storeID
					});
				}
			
				await actions.insertPricePc(valores);
				console.log(valores);
				
				// Guardar los datos en el store
				setStore({ gamesPc: data });
            },
			insertPricePc: async (datos) => {
				const uri = `${process.env.URIBACK}/api/load-api-store`;
				const options = {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(datos)
				};
				console.log(datos);
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
			},
			getPcGameDetailsId: async (id) => {
				const uri = `${process.env.URIBACK}/api/games/${id}`;
				const options = {
					method: "GET",
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data.results[0]);
				setStore({ currentPC: data.results });
			},
			getPcGameDetailsId: async (id) => {
				const uri = `${process.env.URIBACK}/api/games/${id}`;
				const options = {
					method: "GET",
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data.results[0]);
				setStore({ currentPC: data.results });
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
			console.log(comments);
			
			if (!response.ok) {
				console.log('Error', response.status, response.statusText);
				return;
			}
			const newComment = await response.json();
			const store = getStore();
			// Agregar el nuevo comentario a la lista
			setStore({ commentsPerGame: [...store.commentsPerGame, newComment] });
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
			deleteComment: async (delete_comment) => {
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
				const updatedComments = store.comments.filter(comment => comment.id !== delete_comment);
				setStore({ comments: updatedComments });
			},
			getCommentsGames: async (game_id) => {
				const uri = `${process.env.BACKEND_URL}/api/games/${game_id}/comments`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				};
			
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}
			
				const data = await response.json();
				console.log(data.results);
				setStore({ commentsPerGame: data.results });
			},
			getNintendo: async () => {
				const uri = `${process.env.URIBACK}/api/games`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options);
				if(!response.ok) {
					console.log("Error: ", response.status, response.statusText)
					return
				}
				const data = await response.json()
				console.log(data.results)
				setStore({nintendo: data.results})
			},
			getNintendoDetailsId: async (id) => {
				const uri = `${process.env.URIBACK}/api/games/${id}`;
				const options = {
					method: "GET",
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data.results[0]);
				setStore({ currentNintendo: data.results });
			},
			getPlaystation: async () => {
				const uri = `${process.env.URIBACK}/api/games`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options);
				if(!response.ok) {
					console.log("Error: ", response.status, response.statusText)
					return
				}
				const data = await response.json()
				console.log(data.results)
				setStore({playstation: data.results})
			},
			getPlaystationDetailsId: async (id) => {
				const uri = `${process.env.URIBACK}/api/games/${id}`;
				const options = {
					method: "GET",
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data.results[0]);
				setStore({ currentPlaystation: data.results });
			},
			getXbox: async () => {
				const uri = `${process.env.URIBACK}/api/games`
				const options = {
					method: "GET",
				}
				const response = await fetch(uri, options);
				if(!response.ok) {
					console.log("Error: ", response.status, response.statusText)
					return
				}
				const data = await response.json()
				console.log(data.results)
				setStore({xbox: data.results})
			},
			getXboxDetailsId: async (id) => {
				const uri = `${process.env.URIBACK}/api/games/${id}`;
				const options = {
					method: "GET",
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data.results[0]);
				setStore({ currentXbox: data.results });
			},
			getFreeGames: async () => {
				const uri = `https://cors-anywhere.herokuapp.com/https://www.mmobomb.com/api1/games`; // Usar un proxy público
				const options = {
					method: "GET",
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				console.log(data);
				setStore({ freeGames: data });
			},
			
			setCurrentUser: (user) =>{setStore({currentUser:user})},
			setIsLoged: (isLogin) => {setStore({ isLoged: isLogin })},
			setcurrentGamesPc: (gamesPc) => { setStore({ currentGamesPc: gamesPc }) },
		}
	};
};

export default getState;

