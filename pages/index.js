import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');
import './index.css';

class Index extends React.Component {
    constructor(props) {
        super(props);
        let storeurl = 'autochatstore.myshopify.com';
        this.state = {
            social: '',
            whatsapp: false,
            messenger: false,
            whatsappContact: '',
            facebookPage: '',
            storeurl: storeurl,
            initialResponseLength: 0,
            docid: ''
        };

        this.getData = this.getData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.getDefaultValues();
    }

    getDefaultValues() {
        let data = { storeUrl: this.state.storeurl };
        return fetch('http://localhost:4000/getstoreowner', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ initialResponseLength: Object.keys(response).length });
                console.log(response);
                if (Object.keys(response).length !== 0) {
                    this.setState({ docid: response.docId, whatsappContact: response.storeDetails.whatsappContact, facebookPage: response.storeDetails.facebookPage }) // whatsappNumber = response.storeDetails.whatsappContact;
                    //  fbPageId = response.storeDetails.facebookPage;
                    //  console.log(response);
                    console.log(this.state)
                }
            })
    }

    handleSubmit(event) {
        // alert(this.state.facebookPage + this.state.whatsappContact);

        // let count = 0;
        // let docId;
        if (this.state.initialResponseLength === 0 && (this.state.whatsappContact !== '' || this.state.facebookPage !== '')) {
            let updateObject = {
                storeUrl: this.state.storeurl,
                storeDetails: {
                    whatsappContact: this.state.whatsappContact || null,
                    facebookPage: this.state.facebookPage || null,
                },
            }
            console.log("No records found");
            // db.collection("store-admin-data").doc().set(updateObject)
            //     .then(function () {
            //         console.log("Document successfully written!");
            //     })
            //     .catch(function (error) {
            //         console.error("Error writing document: ", error);
            //     });

        } else {
            // let docId;
            // db.collection("store-admin-data").where("storeUrl", "==", storeurl)
            //   .get().then((querySnapshot) => {
            //     querySnapshot.forEach(doc => {
            //       console.log(doc)
            //       docId = doc.id;
            //     })
            //   })
            // console.log(docId);
            // var documentReference = db.collection("store-admin-data").doc(docId);
            if (this.state.whatsappContact !== '') {
                documentReference.update({
                    'storeDetails.whatsappContact': this.state.whatsappContact,
                })
            }
            if (this.state.facebookPage !== '') {
                documentReference.update({
                    'storeDetails.facebookPage': this.state.facebookPage,
                })
            }

        }
        // });

        event.preventDefault();
    }

    handleIconClick = (event) => {
        const id = event.target.id;
        this.setState({
            [id]: !this.state[id]
        });
    }

    handleInputChange(event) {
        console.log(event.target)
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    getData() {
        let data = [];
        if (this.state.whatsapp === true) {
            data.push(
                <div class="form-group row">
                    <label for="whatsapp" class="col-sm-2 col-form-label">Whatsapp Contact</label>
                    <div class="col-sm-7">
                        <input
                            type="text"
                            name="whatsappContact"
                            class="form-control"
                            id='whatsapp'
                            value={this.state.whatsappContact}
                            placeholder={this.state.whatsappContact || 'Enter Phone number with country Code'}
                            onChange={this.handleInputChange} />
                    </div>
                </div>
            )
            data.push(<br />);
        }
        if (this.state.messenger === true) {
            data.push(

                <div class="form-group row">
                    <label for="facebook" class="col-sm-2 col-form-label">Facebook Page</label>
                    <div class="col-sm-7">
                        <input
                            type="text"
                            name="facebookPage"
                            class="form-control"
                            id='whatsapp'
                            value={this.state.facebookPage}
                            placeholder={this.state.whatsappContact}
                            onChange={this.handleInputChange} />
                    </div>
                </div>

                // <label>
                //   Facebook Page:
                //   <input
                //     name="facebookPage"
                //     type="text"
                //     value={this.state.facebookPage}
                //     placeholder=''
                //     onChange={this.handleInputChange} />
                // </label>

            )
            data.push(<br />);
        }
        return data;
    }


    render() {
        return (
            <div>
                <div>
                    <h1 className='page-title'>Get a Free Button for your Shopify Store</h1>
                </div>
                <div>
                    <span className={'icon' + (this.state.whatsapp ? ' whatsapp' : '')}>
                        {/* <i className="fab fa-whatsapp" id='whatsapp' onClick={this.handleIconClick}></i> */}
                        <FontAwesome
                            className='fab fa-whatsapp'
                            id = 'whatsapp'
                            onClick={this.handleIconClick}
                        />
                    </span>
                    <span className={'icon' + (this.state.messenger ? ' messenger' : '')}>
                        {/* <i className="fab fa-facebook-messenger" id='messenger' onClick={this.handleIconClick}></i> */}
                        <FontAwesome
                            className='fab fa-facebook-messenger'
                            id = 'messenger'
                            onClick={this.handleIconClick}
                        />
                    </span>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit} className='form-horizontal'>
                        {this.getData()}
                        <input type="submit" value="Get the ChatWidget" />
                    </form>
                </div>
            </div>
        );
    }


    // render() {
    //     return(
    //         <div> This is sample testing</div>
    //     )
    // }
}

export default Index;
