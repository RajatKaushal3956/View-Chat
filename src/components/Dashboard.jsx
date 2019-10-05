import React, { Component } from 'react';
import ContactsSideBar from './ContactsSideBar.jsx';
import $ from 'jquery';
import {FaSearch} from 'react-icons/fa';
import io from 'socket.io-client';
const socketUrl = "http://localhost:5000";
import { COMMUNITY_CHAT,MESSAGE_RECEIVED,MESSAGE_SENT} from '../Events.js';
import { USER_CONNECTED, LOGOUT, TYPING } from '../Events.js';
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            chats:[],
            flag:true,
            activeChat:null,
            user:null,
            socket:null,
            userName:'',
        }
    }

    setActiveChat = (activeChat) =>{
        this.setState({activeChat});
    }

    componentDidMount() {
        // let name = this.props.history
        // const { socket } = this.props;
        // socket.emit(COMMUNITY_CHAT, this.resetChat);
    }
    logoutUser = (e) => {
        document.cookie = 'jwt_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.props.history.goBack();
    }
    sendMessage =(chatId, message) => {
        const { socket } = this.props;
        socket.emit(MESSAGE_SENT, { chatId, message });
    }

    sendTyping = (chatId,isTyping) => {
        const { socket } = this.props;
        socket.emit(TYPING, { chatId, isTyping});
    }

    addChat = (chat,reset) =>{
        const { socket } = this.props;
        const { chats } = this.state;

        const newChat  = reset ?  [chat] : [...chats,chat];
        this.setState({chats:newChat});

        const messageEvent  = `${MESSAGE_RECEIVED}-${chat.id}`;
        const typingEvent  = `${TYPING}-${chat.id}`;

        socket.on(typingEvent);
        socket.on(messageEvent);

    }

    addMessageToChat = (chatId) => {
        return message => {
			const { chats } = this.state
			let newChats = chats.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat
			})

			this.setState({chats:newChats})
		}
    }
    resetChat = (chat) =>{
        return this.addChat(chat,true);
    }
    validation = (e) =>{
        let username = document.getElementById('username').innerHTML,
            password = document.getElementById('password').innerHTML,
            confirm = document.getElementById('confirm_password').innerHTML,
            valid = false;
        if(username){
            valid = true;
        }
        if((password && confirm) && (password === confirm)) {
            valid = valid && true;
        } else {
            valid = false;
        }
        return valid;
    }

    logout = (user) =>{ 
        const { socket } = this.state;
        socket.emit(LOGOUT);
        this.setState({user});
    }

    join = (e) => {
        let data = {
            Username: document.getElementById('username').value,
            Password: document.getElementById('password').value 
        }
        $.ajax({
            url: 'http://localhost/add',
            method:'POST',
            data:{
                data:JSON.stringify(data)
            }
        });
        console.log(data)
    }

    openCloseContacts = (e) => {
        this.refs.ContactsSideBarRef.openSideBar();
    }
    

    componentDidUpdate(){
        if(this.state.flag) {
            $('#message-content').css('position','absolute');
        }
    }

    componentWillMount(){
        let username = document.cookie;
        if(username.indexOf('jwt_token') == -1) {
            // window.location.href = '/';
        } else {
            this.initSocket();
        }
    }

    initSocket = () => {
        const socket = io(socketUrl)

        socket.on('connect',()=>{
            console.log('connected');
        })

        this.setState({socket});
    }

    setUser = (user) =>{
        const {socket} = this.state
        socket.emit(USER_CONNECTED,user);
        this.setState({user});
    }

  render() {
    return (
        <div>
            <div className="chat-window">
                <div style={{backgroundColor: 'rgb(237,237,237)', padding: '15px', width: '40%' , display: 'inline-block'}}>
                    <div style={{display:'flex', justifyContent:'left', alignItems:'center'}}>
                        <img src='https://i.pinimg.com/236x/ea/f2/2e/eaf22e6a189f76ed24054e2ca7feb00f.jpg' alt='no-img' className='profile-pic'></img>
                        <label>{this.state.username}</label>
                        <button style={{ width:'fit-content', height: '35px', marginLeft:'auto', fontWeight: 'bolder'}} onClick={()=>{this.openCloseContacts();}}>
                            {'Contacts'}
                            <ContactsSideBar 
                                ref="ContactsSideBarRef"
                            />
                        </button>
                        <button style={{ width:'fit-content', height: '35px', marginLeft:'10px', fontWeight: 'bolder'}} onClick={()=>{this.logoutUser();}}>
                            {'Logout'}
                        </button>
                    </div>
                    <div style={{width:'100%', border: '1px solid #908285' , borderRadius:'5px', marginTop: '10px' , padding: '15px' , background: 'white'}}>
                        <button className='search-icon'>
                            <i style={{color:'black'}}><FaSearch/></i>
                        </button>
                        <input style={{padding:'6px' , height: '40px' , border:'1px solid #908285', borderRadius:'0 20px 20px 0', outline: '0', width: '91%'}} type="text" placeholder={'Search or start a new chat'}/>
                    </div>
                    <div id="chat-content">
                        {
                            this.state.chats.length ?
                                this.state.chats.map(element => {
                                    return(
                                        <div className={'contact-div'}>
                                            <img src={require('../logo.svg')} alt='no-img' style={{width:'25px', height:'25px',display:'inline-block'}}></img>
                                            <div style={{display:'inline-block'}}>{'Anonymous User'}</div>
                                        </div>
                                    );
                                })
                            :
                            <div style={{display: 'flex',width:'100%',height:'100%', justifyContent:'center', alignItems:'center'}}>
                                <label style={{fontSize:'16px', color: 'slateGrey'}}>{"You Haven't chat with anyone yet. Please select user from contacts"}</label>
                            </div>
                        }          
                    </div>
                </div> 
                <div id="message-content">
                    {
                        this.state.flag ? 
                            <div>
                                <div style={{height:'70px',padding:'10px', display:'flex', justifyContent:'left', alignItems:'center', backgroundColor:'rgb(237,237,237)'}}>
                                    <img src={require('../logo.svg')} alt='no-img' style={{width:'50px', height:'50px',display:'inline-block', border: '1px solid black', borderRadius:'50%'}}></img>
                                    <label style={{fontSize: '30px', marginLeft:'10px'}}>{'Anonymous User'}</label>
                                </div>
                                <div className={'message-body'}>
                   
                                </div>
                                <div className={'send-bar'}>
                                    <input name="message" type="text" style={{width:'92%', height:'35px', margin:'7px'}}placeholder="Message"/>
                                    <button style={{fontWeight: 'bolder', width: 'fit-content', height: '35px'}}>Send</button>
                                </div>
                            </div>
                        :
                        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:':#908285'}}>
                            <div className='welcome-pic'></div>
                        </div>
                    }    
                </div>
            </div>
        </div>
    );
  }
}
export default Dashboard;
