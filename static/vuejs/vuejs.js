// import Vue from '../../node_modules/vue/dist/vue.esm'
// Vue.options.delimiters = ['${', '}'];

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

// var token = $('input[name="csrfmiddlewaretoken"]').prop('value');
// console.console(token)

var app2 = new Vue({
    el: "#post",
    delimiters: ['[[', ']]'],
    data: {
        errors: [],
        post: {
            title: null,
            content: null,
        },
        apptitle: "Django",
        posts: null,
    },
    mounted: function () {
        this.showPost()
    },
    methods: {
        addPost() {
            var sp = this;
            // var csrf = document.getElementById("csrf").value;
            axios.post('http://127.0.0.1:8000/create/', {
                content: this.post.title,
                title: this.post.content,
            }).then(resp => (console.log(resp, this.showPost(), this.post = {}))
                // function (response) {
                //     sp.showPost();
                //     sp.post = {};
                //     console.log(response);
                // }
            ).catch(function (error) {
                console.log(error);
                sp.errors.push(error)
            });
        },
        showPost() {
            axios
                .get('http://127.0.0.1:8000/list/')
                .then(response => (this.posts = response.data))
        }
    }
})

