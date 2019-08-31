Vue.component('receipt-card', {
  props: ['meta'],
  template:
    '<div class="card">' +
    '  <div class="card-header">{{meta.place}}</div>' +
    '  <div class="card-body">' +
    '    <p class="card-text">' +
    '     <p>' +
    '     {{date}}' +
    '     </p> ' +
    '      <p>' +
    '        {{meta.sum}} рублей.' +
    '      </p>' +
    '    </p>' +
    '    <a v-bind:href="href" class="btn btn-primary">Открыть</a>' +
    '  </div>' +
    '</div>',
  computed: {
    date: function () {
      let timestamp = this.meta.date;
      let date = new Date();
      date.setTime(timestamp * 1000);
      return date;
    },
    datetimestr: function () {
      let date = this.date;
      let year = date.getFullYear().toString();
      let month = (date.getMonth() + 1).toString().padStart(2, 0);
      let day = date.getDate().toString().padStart(2, 0);
      let hour = date.getHours().toString().padStart(2, 0);
      let minute = date.getMinutes().toString().padStart(2, 0);
      return `${year}${month}${day}T${hour}${minute}`;
    },
    href: function () {
      return `/?fn=${this.meta.fn}&i=${this.meta.fd}&fp=${this.meta.fp}&s=${this.meta.sum}&t=${this.datetimestr}`;
    }
  }
})

var app = new Vue({
  el: '#application',
  data: {
    items: [],
    form: {
      fn: "",
      fd: "",
      fp: "",
      summary: "",
      date: new Date()
    },
    meta: {},
    cards: {}
  },
  computed: {
    /**
     * String representing date in format HH:MM
     */
    timeStr: {
      get: function () {
        let hour = this.form.date.getHours().toString().padStart(2, 0);
        let minute = this.form.date.getMinutes().toString().padStart(2, 0);
        return `${hour}:${minute}`;
      },
      set: function (str) {
        if (str != null && str.match(/^\d{2}:\d{2}$/g)) {
          let hour = str.substr(0, 2);
          let minute = str.substr(3, 2);
          this.form.date.setHours(hour, minute)
        }
      }
    },
    /**
     * String representing date in format YYYY-MM-DD
     */
    dateStr: {
      get: function () {
        let date = this.form.date;
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString().padStart(2, 0);
        let day = date.getDate().toString().padStart(2, 0);
        return `${year}-${month}-${day}`;
      },
      set: function (str) {
        if (str != null && str.match(/^\d{4}-\d{2}-\d{2}$/g)) {
          let year = parseInt(str.substr(0, 4));
          let month = parseInt(str.substr(5, 2)) - 1; // 0-based month required
          let day = parseInt(str.substr(8, 2));
          this.form.date.setFullYear(year, month, day)
        }
      }
    },
    /**
     * String representing date in format YYYYMMDDTHHMM (T is just a letter)
     */
    datetime: {
      get: function () {
        let date = this.form.date;
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString().padStart(2, 0);
        let day = date.getDate().toString().padStart(2, 0);
        let hour = date.getHours().toString().padStart(2, 0);
        let minute = date.getMinutes().toString().padStart(2, 0);
        return `${year}${month}${day}T${hour}${minute}`;
      },
      set: function (str) {
        if (str != null && str.match(/^\d{4}\d{2}\d{2}T\d{2}\d{2}$/g)) {
          let year = parseInt(str.substr(0, 4));
          let month = parseInt(str.substr(4, 2)) - 1;// 0-based month required
          let day = parseInt(str.substr(6, 2));
          let hour = parseInt(str.substr(str.length - 4, 2));
          let minute = parseInt(str.substr(str.length - 2, 2));
          this.form.date.setFullYear(year, month, day);
          this.form.date.setHours(hour, minute);
        }
      }
    }
  },
  methods: {
    getQueryParameters: function () {
      return `fn=${app.form.fn}&i=${app.form.fd}&fp=${app.form.fp}&s=${app.form.summary}&t=${app.datetime}`
    },
    setFormFromQueryParameters: function (parameters) {
      this.form.fn = parameters.get("fn");
      this.form.fd = parameters.get("i");
      this.form.fp = parameters.get("fp");
      this.form.summary = parameters.get("s");
      this.datetime = parameters.get("t");
    }
  },
  created: function () {
    this.setFormFromQueryParameters(new URL(window.location.href).searchParams);
  }
});

/**
 * Serializes form and performs request to rest-api to fetch receipt data.
 */
const handleFormSubmit = function () {
  $("#submit").attr('disabled', true);
  setTimeout(function () {
    $("#submit").attr('disabled', false);
  }, 5000);
  $.ajax({
    url: `/rest/get?${app.getQueryParameters()}`,
    context: document.body,
    success: function (data) {
      let answer = JSON.parse(data);
      app.items = answer.items;
      app.meta = answer.meta;
      console.log(JSON.stringify(answer));
    },
    error: function (xhr) {
      alert("Error! Could not perform request");
      let answerString = JSON.stringify(xhr);
      console.log(answerString);
    }
  });
};

/**
 * Serializes form and sets is as query to the address line
 */
const handleShare = function () {
  let url = new URL(window.location.href);
  let link = url.origin + url.pathname + "?" + app.getQueryParameters();
  window.history.pushState(null, null, link);
};

$(document).ready(function () {
});


const loadCards = function () {
  $("#load-cards").attr('disabled', true);
  setTimeout(function () {
    $("#load-cards").attr('disabled', false);
  }, 5000);
  console.log("Отправил запрос на список чеков ... ");
  $.ajax({
    url: "/rest/report",
    type: 'PUT',
    contentType: 'application/json',
    data: '{"meta":{},"items":{"price_min": 50000}}',
    context: document.body,
    success: function (data) {
      console.log("Получил ответ с чеками ... " + data);
      let answer = JSON.parse(data);
      answer = answer.slice(-100).map(it => it.meta).filter(it => it.status === "LOADED").slice(-12).reverse();
      app.cards = answer;
    },
    error: function (xhr) {
      console.log("Не удалось получить список чеков!");
      alert("Error! Could not perform request");
      let answerString = JSON.stringify(xhr);
      console.log(answerString);
    }
  })
};

