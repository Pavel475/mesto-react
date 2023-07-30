import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

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
      <Header />
      <Main
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
      title='Обновить аватар'
      name='avatar-form'
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      children
      >
        <input
        className="popup__input"
        id="url-input-avatar"
        autoComplete="off"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        required
        defaultValue=""
        />
        <span className="popup__error url-input-avatar-error"></span>
      </PopupWithForm>
      <PopupWithForm
      title='Редактировать профиль'
      name='edit-form'
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      children
      >
        <input
        className="popup__input"
        id="text-input-name"
        autoComplete="off"
        name="nickName"
        type="text"
        placeholder="Имя"
        required
        defaultValue=""
        minLength="2"
        maxLength="40"
        />
        <span className="popup__error text-input-name-error"></span>
        <input
        className="popup__input"
        id="text-input-information"
        autoComplete="off"
        name="info"
        type="text"
        placeholder="О себе"
        required
        defaultValue=""
        minLength="2"
        maxLength="200"
        />
        <span className="popup__error text-input-information-error"></span>
      </PopupWithForm>
      <PopupWithForm
      title='Новое место'
      name='add-form'
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      children
      >
        <input
        className="popup__input"
        id="text-input-title"
        autoComplete="off"
        name="name"
        type="text"
        placeholder="Название"
        required
        defaultValue=""
        minLength="2"
        maxLength="30"
        />
        <span className="popup__error text-input-title-error"></span>
        <input
        className="popup__input"
        id="url-input"
        autoComplete="off"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        defaultValue=""
        />
        <span className="popup__error url-input-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
