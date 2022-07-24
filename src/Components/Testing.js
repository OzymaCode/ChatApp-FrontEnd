import React, { Component } from 'react';


class App extends Component {





    async postData() {
        try {
            let result = await fetch('https://webhook.site/6f98a3b3-cd1c-4987-aef0-211a1a4c01df', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    key1: 'myusername'
                })
            })

            // console.log('Result: ' + result)
            // console.log(result)


        } catch (e) {
            console.log(e)
        }
    }

    async get() {
        let result = await fetch('/users')
            .then(res => res.json());

        console.log(result)
    }

    async post() {

        let result = await fetch('/users/signup', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: `{
                "username": "Kyle",
                "password": "p1"
            }`
        })

        result.json().then(data => {
            console.log(data)
        })

    }

    async login() {
        let results = await fetch('/users/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: `{
                "username": "Kyle",
                "password": "p1"
            }`
        })

        results.json().then(data => {
            console.log(data)
        })

    }


    render() {
        return (
            <div>
                <h1>Testing</h1><br />
                <button onClick={() => this.get()}>Get</button>
                <button onClick={() => this.post()}>Post</button>
                <button onClick={() => this.login()}>Login</button>
                <hr />
                <form action="testing">
                    <button onClick={() => this.get()}>Get (query)</button>
                    <button onClick={() => this.post()}>Post (query)</button>
                </form>
            </div>
        )
    }
}


export default App;

