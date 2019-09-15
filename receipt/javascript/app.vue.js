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