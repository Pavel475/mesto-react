import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function mapCards(cards) {
    return cards.map((card) => {
        return {
            _id: card._id,
            likes: card.likes,
            link: card.link,
            name: card.name,
            owner: card.owner
        };
    })
  }

  React.useEffect(() => {
    api.getInitialCards()
    .then((cardsList) => {
      setCards(mapCards(cardsList));
    })
    .catch((err) => {console.log(err)});
  }, []);

  React.useEffect(() => {
    api.userInfo()
    .then((response) => {
      setCurrentUser(response);
    })
    .catch((err) => {console.log(err)});
  }, [])

  function handleCardLike(card) {
    console.log(card);
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      console.log(newCard);
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {console.log(err)});
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((response) => {
      console.log(response);
      setCards((cards) => cards.filter((c) => c._id === card._id ? '' : c));
    })
    .catch((err) => {console.log(err)});
  }

  function handleUpdateUser({name, about}) {
    api.editProfileInfo(name, about)
    .then((response) => {
      console.log(response);
      setCurrentUser(response);
      setEditProfilePopupOpen(false);
    })
    .catch((err) => {console.log(err)});
  }

  function handleUpdateAvatar({avatar}) {
    api.updateAvatar(avatar)
    .then((response) => {
      setCurrentUser(response);
      setEditAvatarPopupOpen(false);
    })
    .catch((err) => {console.log(err)});
  }

  function handleAddPlaceSubmit({name, link}) {
    api.createCard(name, link)
    .then((newCard) => {
      console.log(newCard);
      setCards([newCard, ...cards]);
      setAddPlacePopupOpen(false);
    })
    .catch((err) => {console.log(err)});
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    console.log(card.link);
    setSelectedCard({
      cardLink: card.link,
      cardName: card.name,
    });
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
      cards={cards}
      onCardDelete={handleCardDelete}
      onCardLike={handleCardLike}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      />
      <Footer />
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
