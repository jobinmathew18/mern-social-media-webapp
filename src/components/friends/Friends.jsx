import "./friends.css";

export default function Friends({friend}) {
  return (
    <>
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={friend.profilePicture} alt="" />
        <span className="sidebarFriendName">{friend.username}</span>
      </li>
    </>
  );
}
