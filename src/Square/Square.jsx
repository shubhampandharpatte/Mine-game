import './Square.css';
import hoverEffect from '../assets/Sound/hover.wav';
import DiamondEffect from '../assets/Sound/gold.wav';
import goldIcon from '../assets/gold.png';
import bombIcon from '../assets/bomb.png';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Square({ mine, setGameOver, gameOver, setScore }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (gameOver) {
            setImage(mine ? bombIcon : goldIcon);
        } else {
            setImage(null);
        }
    }, [gameOver, mine]);

    function mouseEnterHandle() {
        if (!image) {
            const sound = new Audio(hoverEffect);
            sound.play();
        }
    }

    function clickHandler() {
        if (gameOver) return;

        if (!mine) {
            setScore(prevValue => prevValue * 2);
            setImage(goldIcon);
            const sound = new Audio(DiamondEffect);
            sound.play();
        } else {
            alert("You Lose The Game");
            setGameOver(true);
        }
    }

    return (
        <div
            className='square-item'
            onMouseEnter={mouseEnterHandle}
            onClick={clickHandler}
        >
            {image && <img height={90} width={90} src={image} alt="icon" />}
        </div>
    );
}

Square.propTypes = {
    mine: PropTypes.bool.isRequired,
    setGameOver: PropTypes.func.isRequired,
    gameOver: PropTypes.bool.isRequired,
    setScore: PropTypes.func.isRequired
};

export default Square;
