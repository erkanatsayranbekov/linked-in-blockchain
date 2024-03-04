// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./TopWeb3.sol";

contract ProfessionalNetworking is Ownable {
    struct UserProfile {
        string name;
        string bio;
        string major;
        string profilePicture;
        address[] friends;
        bool hasTopWeb3NFT;
    }

    struct Post {
        address author;
        string content;
    }

    mapping(address => UserProfile) public profiles;
    mapping(address => mapping(address => bool)) public friendRequestsReceived;
    mapping(address => mapping(address => bool)) public friendRequestsSent; // New mapping for sent friend requests
    mapping(address => uint256) public numFriends;
    address[] public registeredUsers;
    Post[] public posts;

    ERC721 public topWeb3NFT;

    event FriendRequestSent(address indexed from, address indexed to);
    event FriendRequestAccepted(address indexed from, address indexed to);
    event PostCreated(address indexed author, uint256 indexed postId);

    constructor(address _topWeb3NFTAddress, address _owner) Ownable(_owner) {
        topWeb3NFT = ERC721(_topWeb3NFTAddress);
    }

    function isUserRegistered(address _user) external view returns (bool) {
        for (uint256 i = 0; i < registeredUsers.length; i++) {
            if (registeredUsers[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function signUp(string memory _name, string memory _bio, string memory _major, string memory _profilePicture) external {
        require(bytes(_name).length > 0, "Name must not be empty");
        require(bytes(_bio).length > 0, "Bio must not be empty");
        require(bytes(_profilePicture).length > 0, "Profile picture must not be empty");

        profiles[msg.sender] = UserProfile(_name, _bio, _major, _profilePicture, new address[](0), false);
        bool userExists = false;
        for(uint i = 0; i < registeredUsers.length; i++) {
            if (registeredUsers[i] == msg.sender) {
                userExists = true;
                break;
            }
        }
        
        if (!userExists) {
            registeredUsers.push(msg.sender);
        }
    }

    function sendFriendRequest(address _to) external {
        require(msg.sender != _to, "Cannot send friend request to yourself");
        require(profiles[msg.sender].friends.length < 5, "User already has 5 or more friends");
        require(!friendRequestsSent[msg.sender][_to], "Friend request already sent to this user"); // Check if request has already been sent

        friendRequestsSent[msg.sender][_to] = true; // Mark the request as sent
        friendRequestsReceived[_to][msg.sender] = true; // Mark the request as received
        emit FriendRequestSent(msg.sender, _to);
    }


    function acceptFriendRequest(address _from) external {
        require(friendRequestsReceived[msg.sender][_from], "No friend request from this user");
        require(profiles[msg.sender].friends.length < 5, "User already has 5 or more friends");

        profiles[msg.sender].friends.push(_from);
        profiles[_from].friends.push(msg.sender);
        numFriends[msg.sender]++;
        numFriends[_from]++;

        delete friendRequestsReceived[msg.sender][_from]; // Delete the received request
        delete friendRequestsSent[_from][msg.sender]; // Delete the sent request

        emit FriendRequestAccepted(_from, msg.sender);

        if (numFriends[msg.sender] == 3 && !profiles[msg.sender].hasTopWeb3NFT) {
            TOPWEB3NFT(msg.sender).mint(msg.sender, 0); 
            profiles[msg.sender].hasTopWeb3NFT = true;
        }
    }


    function createPost(string memory _content) external {
        require(profiles[msg.sender].hasTopWeb3NFT, "User does not have TOPWEB3 NFT");

        posts.push(Post(msg.sender, _content));
        emit PostCreated(msg.sender, posts.length - 1);
    }

    function getNumPosts() external view returns (uint256) {
        return posts.length;
    }

    function getPost(uint256 _postId) external view returns (address, string memory) {
        require(_postId < posts.length, "Invalid post ID");

        Post memory post = posts[_postId];
        return (post.author, post.content);
    }

    function getFriends() external view returns (address[] memory) {
        return profiles[msg.sender].friends;
    }

    function getFriendRequestsReceived() external view returns (address[] memory) {
        uint256 numRequests = 0;
        for (uint256 i = 0; i < registeredUsers.length; i++) {
            address sender = registeredUsers[i];
            if (friendRequestsReceived[msg.sender][sender]) {
                numRequests++;
            }
        }
        address[] memory requestSenders = new address[](numRequests);
        uint256 index = 0;
        for (uint256 i = 0; i < registeredUsers.length; i++) {
            address sender = registeredUsers[i];
            if (friendRequestsReceived[msg.sender][sender]) {
                requestSenders[index] = sender;
                index++;
            }
        }
        return requestSenders;
    }


    function getAllRegisteredUsers() external view returns (address[] memory, string[] memory, string[] memory, string[] memory, string[] memory) {
        address[] memory addresses = new address[](registeredUsers.length);
        string[] memory names = new string[](registeredUsers.length);
        string[] memory bios = new string[](registeredUsers.length);
        string[] memory majors = new string[](registeredUsers.length);
        string[] memory avatars = new string[](registeredUsers.length);

        for (uint256 i = 0; i < registeredUsers.length; i++) {
            address userAddress = registeredUsers[i];
            addresses[i] = userAddress;
            names[i] = profiles[userAddress].name;
            bios[i] = profiles[userAddress].bio;
            majors[i] = profiles[userAddress].major;
            avatars[i] = profiles[userAddress].profilePicture;
        }

        return (addresses, names, bios, majors, avatars);
    }
}
