// import Vue from '../../node_modules/vue/dist/vue.esm'
// Vue.options.delimiters = ['${', '}'];

// import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

var app = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        apptitle: "Django Vue Blog",
    }
})

// var postlist = new Vue({
//     el: "#postlist",
//     delimiters: ['[[', ']]'],
//     data: {
//         apptitle: "Django",
//         posts: null,
//         message: ""
//     },
//     mounted() {
//         axios
//             .get('http://127.0.0.1:8000/list/')
//             .then(response => (this.posts = response.data))
//     }
//     // mounted: function () {
//     //     var vm = this
//     //     axios.get('http://127.0.0.1:8000/list')
//     //         .then(function (response) {
//     //             vm.posts = response.data
//     //         })
//     // }
// })

var app2 = new Vue({
    el: "#post",
    delimiters: ['[[', ']]'],
    data: {
        errors: [],
        content: "",
        title: "",
        apptitle: "Django",
        posts: [],
    },
    created: function () {
        this.init()
    },
    methods: {
        submit() {
            var csrftoken = document.getElementById("csrf").value;
            const headers = {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
            axios.post('http://127.0.0.1:8000/create/', {
                content: this.content, title: this.title
            }, { headers: headers }).then(resp => (
                this.posts.unshift(resp.data[0]),
                this.content = "",
                this.title = ""
            )
            ).catch(error => this.errors.push(error));
        },
        init() {
            axios
                .get('http://127.0.0.1:8000/list/')
                .then(response => (this.posts = response.data))
        }
    }
})

