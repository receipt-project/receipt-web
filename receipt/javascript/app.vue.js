var app = new Vue({

  el: '#application',

  data: {
    items: [],
    form: {
      fn: "",
      fd: "",
      fp: "",
      summary: "",
      date: moment()
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
        return this.form.date.format("HH:mm");
      },
      set: function (str) {
        if (str != null && str.match(/^\d{2}:\d{2}$/g)) {
          this.form.date.set("hour", str.substr(0, 2));
          this.form.date.set("minute", str.substr(3, 2));
        }
      }
    },

    /**
     * String representing date in format YYYY-MM-DD
     */
    dateField: {
      get: function () {
        return this.form.date.format("YYYY-MM-DD");
      },
      set: function (str) {
        if (str != null && str.match(/^\d{4}-\d{2}-\d{2}$/g)) {
          this.form.date.set("year", parseInt(str.substr(0, 4)));
          this.form.date.set("month", parseInt(str.substr(5, 2)) - 1);
          this.form.date.set("date", parseInt(str.substr(8, 2)));
        }
      }
    },

    /**
     * String representing date in format YYYYMMDDTHHmm (T is just a letter)
     */
    receiptTime: {
      get: function () {
        return this.form.date.format(RECEIPT_DATETIME_FORMAT)
      },
      set: function (str) {
        this.form.date = moment(str, RECEIPT_DATETIME_FORMAT);
      }
    },

    receiptLoaded: function () {
      return this.items.length > 0 || Object.keys(this.meta).length > 0
    }
  },

  methods: {

    getQueryParameters: function () {
      return `fn=${this.form.fn}&i=${this.form.fd}&fp=${this.form.fp}&s=${this.form.summary}&t=${this.receiptTime}`;
    },

    setFormFromQueryParameters: function (parameters) {
      this.form.fn = parameters.get("fn");
      this.form.fd = parameters.get("i");
      this.form.fp = parameters.get("fp");
      this.form.summary = parameters.get("s");
      this.receiptTime = parameters.get("t");
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