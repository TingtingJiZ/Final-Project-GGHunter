// src/pages/HomePage.js
import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Carousel } from "./Carousel.jsx";
import { TopSellers } from "./TopSellers.jsx";
import { Row, Col } from 'react-bootstrap';
import { GameCard } from '../component/GameCard.jsx';


export const HomePage = () => {
    const { store, actions } = useContext(Context);

    const mostPlayed = [
        { image: 'https://www.universalpictures.es/tl_files/content/movies/super_mario_bros/super-mario-bros_header-mobile.jpg', 
         rank: 'Nº1' },
        { image: 'link_to_image2', title: 'Juego 2', rank: 2 },
        { image: 'link_to_image3', title: 'Juego 3', rank: 3 },
        { image: 'link_to_image4', title: 'Juego 4', rank: 4 },
        { image: 'link_to_image5', title: 'Juego 5', rank: 5 },
    ];

    const moreDiscount = [
        { image: 'link_to_image1', title: 'Juego 1', rank: 1 },
        { image: 'link_to_image2', title: 'Juego 2', rank: 2 },
        { image: 'link_to_image3', title: 'Juego 3', rank: 3 },
        { image: 'link_to_image4', title: 'Juego 4', rank: 4 },
        { image: 'link_to_image5', title: 'Juego 5', rank: 5 },
    ];

    return (
        <div className="container py-3 bg-dar">
            
      <Row>
           <Carousel/>
      </Row>
      <Row> 
          <TopSellers/>
      </Row>
            <h3 className="text-primary">PlayStation</h3>
            <Row>
            <button type="button" class="btn btn-primary">+</button>
            {/* <button
  class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122B0] to-[#DC98FD] active:scale-95"
>
  <span
    class="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#A62CE2] to-[#C045FC]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path
        d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z"
      ></path></svg
    >Play Game</span
  >
</button> */}
                {mostPlayed.map(game => (
                    <Col key={game.rank}>
                        <GameCard image={game.image} title={game.title} rank={game.rank} />
                    </Col>
                ))}
            </Row>
            <h3 className="text-primary">PC</h3>
            <Row>
                {moreDiscount.map(game => (
                    <Col key={game.rank}>
                        <GameCard image={game.image} title={game.title} rank={game.rank} />
                    </Col>
                ))}
                <button type="button" class="btn btn-primary">+</button>
            </Row>
            <h3 className="text-primary">Nintendo</h3>
            <Row>
                {moreDiscount.map(game => (
                    <Col key={game.rank}>
                        <GameCard image={game.image} title={game.title} rank={game.rank} />
                    </Col>
                ))}
                <button type="button" class="btn btn-primary">+</button>
            </Row>
            <h3 className="text-primary">Xbox</h3>
            <Row>
                {moreDiscount.map(game => (
                    <Col key={game.rank}>
                        <GameCard image={game.image} title={game.title} rank={game.rank} />
                    </Col>
                ))}
                <button type="button" class="btn btn-primary">+</button>
            </Row>
        </div>
    );
};
