import "./friends.css";

export default function Friends({friend}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={PF + friend.profilePicture} alt="" />
        <span className="sidebarFriendName">{friend.username}</span>
      </li>
    </>
  );
}
