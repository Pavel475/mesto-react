import React from 'react';
import pen from '../images/Vector.svg';
import plus from '../images/plus.svg';
import { api } from '../utils/api';
import Card from './Card';

function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    function mapCards(cards) {
        return cards.map((card) => {
            return {
                id: card._id,
                likes: card.likes,
                link: card.link,
                name: card.name,
            };
        })
    }
    
    React.useEffect(() => {
        api.userInfo()
        .then((response) => {
            setUserName(response.name);
            setUserDescription(response.about);
            setUserAvatar(response.avatar);
        })
        .catch((err) => {console.log(err)});
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
        .then((cardsList) => {
            setCards(mapCards(cardsList));
        })
        .catch((err) => {console.log(err)});
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__image">
                    <img src={userAvatar} alt="Тут должна быть ваша аватарка" className="profile__avatar" />
                    <img onClick={props.onEditAvatar} src={pen} className="profile__pen" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button onClick={props.onEditProfile} className="profile__edit-button" type="button">
                        <img className="profile__edit-image" alt="кнопка с карандашем" src={pen} />
                    </button>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button">
                    <img className="profile__add-image" alt="добавить" src={plus} />
                </button>
            </section>
            <section className="elements">
                <ul className="elements-list">
                    {
                        cards.map((card) => (
                            <Card key={card.id} likes={card.likes} link={card.link} name={card.name} card={card} onCardClick={props.onCardClick} />
                        ))
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;