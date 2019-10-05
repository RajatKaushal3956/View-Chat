import React, { Component } from 'react';
import $ from 'jquery';
class ContactsSideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            contacts:[1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,2,3,1,2,3,1,2,3,1,2,3,1,2,3,2,3,1,2,3,1,2,3,1,2,3,1,2,3]
        }
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

    openSideBar = (e) => {
        if ($("#advanced_search_criteria_toggle").hasClass('adv-search-criteria-opened')) {
            this.closeSideBar();
        } else {
            $('#adv_search_criteria_overlay').show();
            $("#advanced_search_criteria_toggle").animate({ 'width': '33.87%' }, '150', 'linear', function () {
                $("#advanced_search_criteria_toggle").addClass("adv-search-criteria-opened");
            });
        }
    }

    closeSideBar = (e) => {
        $("#advanced_search_criteria_toggle").animate({ 'width' : '0'}, '150', 'linear', function () {
            $("#adv_search_criteria_overlay").hide();
            $("#advanced_search_criteria_toggle").removeClass("adv-search-criteria-opened");
        });
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
    }
  render() {
    return (
        <div className={ "contacts-side-bar-overlay"} style={{ position: "fixed", cursor: "pointer", display: 'none'}} id="adv_search_criteria_overlay">
            <div className="advanced-criteria-filter-side-bar adv-search-criteria-animate-opacity" id='advanced_search_criteria_toggle' style={{ cursor: "default", position: 'absolute', width: '20%', height: '100%', background: '#fff', boxShadow: 'rgba(0, 0, 0, 0.2) -6px 0px 10px 10px' }} >
                <div style={{ margin: "0px 0px 8px 20px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 'bold',marginTop:"19px" }}>{'Contacts'}</label>
                </div>
                <div id="contacts-div">
                    {
                        this.state.contacts.map((element,id) => {
                            return(
                                <div key={id} className={'contact-div'}>
                                    <img src={require('../logo.svg')} alt='no-img' style={{width:'25px', height:'25px',display:'inline-block'}}></img>
                                    <div style={{display:'inline-block'}}>{'Anonymous User'}</div>
                                </div>
                            )
                        })
                    }
                </div>    
            </div>
        </div>
    );
  }
}
export default ContactsSideBar;
