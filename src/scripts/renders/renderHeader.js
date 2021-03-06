import { classNameBtnHidden, classNameProfileHidden, cx } from "../utils";

const signInButton = document.querySelector("#google-sign-in");
const signOutButton = document.querySelector("#google-sing-out");

const profilePhoto = document.querySelector("#profile__photo");
const profileImage = document.querySelector("#profile__image");
const profileEmail = document.querySelector("#profile__email > span");

const renderHeader = (user) => {
  if (user) {
    cx.add(signInButton, classNameBtnHidden);
    cx.remove(signOutButton, classNameBtnHidden);
    profileEmail.textContent = user.email;

    if (user.photoURL) {
      profilePhoto.src = user.photoURL;
      cx.add(profileImage, classNameProfileHidden);
      cx.remove(profilePhoto, classNameProfileHidden);
    }
  } else {
    cx.remove(signInButton, classNameBtnHidden);
    cx.add(signOutButton, classNameBtnHidden);

    profileEmail.textContent = "";
    profilePhoto.src = "";
    cx.add(profilePhoto, classNameProfileHidden);
    cx.remove(profileImage, classNameProfileHidden);
  }
};
export default renderHeader;
