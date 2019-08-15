var app = new Vue({
    el: "#app",
    data: {
        message: "Hello World"
    }
})

var app2 = new Vue({
    el: "#app-2",
    data: {
        message1: '页面加载于' + new Date().toLocaleString()
    }
})

var app3 = new Vue({
    el: "#app-3",
    data: {
        seen: true
    }
})

var app4 = new Vue({
    el: "#app-4",
    data: {
        todos: [
            { text: "学习" },
            { text: "打球" },
            { text: "上网" }
        ]
    }
})

var app5 = new Vue({
    el: "#app-5",
    data: {
        message: "这是个好消息"
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})


var app6 = new Vue({
    el: "#app-6",
    data: {
        message: "hello"
    },
})

Vue.component('todo-item', {
    props: ['todo'],
    template: "<li>{{todo.id}} --{{todo.text }}</li>"
})

var app7 = new Vue({
    el: "#app-7",
    data: {
        groceryList: [
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其它什么人吃的东西' }
        ]
    }
})

var app8 = new Vue({
    el: "#app-8",
    data: {
        firstName: "Crane",
        lastName: "Jen"
    },
    computed: {
        fullName: {
            get: function () {
                return this.firstName + " " + this.lastName
            },
            set: function (newName) {
                var name = newName.split(" ")
                this.firstName = name[0]
                this.lastName = name[name.length - 1]
            }
        }
    }
})

var app9 = new Vue({
    el: "#app-9",
    data: {
        question: "",
        answer: "No question ask!"
    },
    watch: {
        question: function (newQ, oldQ) {
            this.answer = "Waiting for you stop typing..."
            this.debouncedGetAnswer()
        }
    },
    created: function () {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
                this.answer = 'Questions usually contain a question mark. ;-)'
                return
            }
            this.answer = "thinking"
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                    vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function (error) {
                    vm.answer = 'Error! Could not reach the API. ' + error
                })
        }
    }
})


var app10 = new Vue({
    el: "#app-10",
    data: {
        isActive: true,
        error: null,
    },
    computed: {
        classObject: function () {
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal'
            }
        }
    }
})