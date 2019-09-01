const timestampToDate = function (timestamp) {
  let date = new Date();
  date.setTime(timestamp * 1000);
  return date;
};

/**
 * Gets datetime in format yyyymmddThhmm and parse it into Date object
 * @param receiptTime string containing date and time in format yyyymmddThhmm
 * @returns {null|Date}
 */
const receiptTimeToDate = function (receiptTime) {
  let date = new Date();
  if (receiptTime != null && receiptTime.match(/^\d{4}\d{2}\d{2}T\d{2}\d{2}$/g)) {
    let year = parseInt(receiptTime.substr(0, 4));
    let month = parseInt(receiptTime.substr(4, 2)) - 1;// 0-based month required
    let day = parseInt(receiptTime.substr(6, 2));
    let hour = parseInt(receiptTime.substr(receiptTime.length - 4, 2));
    let minute = parseInt(receiptTime.substr(receiptTime.length - 2, 2));
    date.setFullYear(year, month, day);
    date.setHours(hour, minute);
    return date;
  } else {
    return null;
  }
}

/**
 * Gets Date object and serializes it into string containing date and time in format yyyymmddThhmm
 * @param date The instance of Date class
 * @returns string containing date and time in format yyyymmddThhmm
 */
const dateToReceiptTime = function (date) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString().padStart(2, 0);
  let day = date.getDate().toString().padStart(2, 0);
  let hour = date.getHours().toString().padStart(2, 0);
  let minute = date.getMinutes().toString().padStart(2, 0);
  return `${year}${month}${day}T${hour}${minute}`;
}

Vue.component('receipt-card', {
  props: ['meta'],
  template: `
    <div class="card" v-bind:class="cardStyle">
      <div class="card-header">{{meta.place}}</div>
      <div class="card-body">
        <p class="card-text">
          <p>{{date}}</p>
          <p>{{meta.sum}} рублей.</p>
        </p>
        <a v-bind:href="href" class="btn btn-primary">Открыть</a>
      </div>
    </div>
  `,
  computed: {
    date: function () {
      let timestamp = this.meta.date;
      let date = new Date();
      date.setTime(timestamp * 1000);
      return date;
    },
    href: function () {
      return `/?fn=${this.meta.fn}&i=${this.meta.fd}&fp=${this.meta.fp}&s=${this.meta.sum}&t=${dateToReceiptTime(this.date)}`;
    },
    cardStyle: function () {
      let status = this.meta.status;
      if (status === "LOADED") {
        return ""
      } else if (status === "FAILED") {
        return "border-danger"
      } else if (status === "UNDEFINED") {
        return "border-warning"
      }
    }
  }
})

Vue.component('receipt-meta', {
  props: ["meta", "receiptLoaded"],
  template: `
    <table class="table-sm" v-show="receiptLoaded">
        <tr v-for="(value, name) in metaPostProcessed">
          <th>{{name}}</th>
          <td>{{value}}</td>
        </tr>
      </tbody>
    </table>
  `,
  computed: {
    metaPostProcessed: function () {
      let result = {};
      let meta = this.meta;
      for (let key in meta) {
        if (key === "date") {
          result["Дата"] = timestampToDate(meta["date"]);
        } else if (key === "place") {
          result["Магазин"] = meta["place"];
        } else if (key === "provider") {
          result["Провайдер"] = meta["provider"];
        } else if (key === "sum") {
          result["Сумма"] = meta["sum"];
        } else {
          result[key] = meta[key];
        }
      }
      return result;
    }
  },
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
    cards: [],
    cardsLoaded: false,
    cardsLoading: false,
    currentTab: "TAB_FORM"
  },
  watch: {
    currentTab: function (newValue, oldValue) {
      if (newValue === 'TAB_CARDS') this.loadCardsOnce();
    }
  },
  computed: {
    /**
     * String representing date in format HH:MM
     */
    timeField: {
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
    dateField: {
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
    receiptTime: {
      get: function () {
        return dateToReceiptTime(this.form.date)
      },
      set: function (str) {
        const date = receiptTimeToDate(str);
        if (date != null) {
          this.form.date = date
        }
      }
    },
    receiptLoaded: function () {
      return this.items.length > 0 || Object.keys(this.meta).length > 0
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
    },
    loadCardsOnce: function () {
      if (!this.cardsLoaded && !this.cardsLoading) {
        this.cardsLoading = true;
        let request = loadCards();
        $.when(request).done(function (res) {
          app.cardsLoading = false;
          app.cardsLoaded = true;
        });
      }
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
      app.currentTab = "TAB_TABLE";
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

/**
 * Return ajax future
 */
const loadCards = function () {
  return $.ajax({
    url: "/rest/report",
    type: 'PUT',
    contentType: 'application/json',
    data: '{"meta":{},"items":{"price_min": 50000}}',
    context: document.body,
    success: function (data) {
      console.log("Received recent receipts ... " + data);
      let answer = JSON.parse(data);
      answer = answer.slice(-100).map(it => it.meta).slice(-12).reverse();
      app.cards = answer;
    },
    error: function (xhr) {
      console.log("Could not receive recent receipts!");
      let errorString = JSON.stringify(xhr);
      console.log(errorString);
    }
  });
};

