Vue.component('receipt-card', {

  props: ['meta'],

  template: `
    <div class="card" v-bind:class="cardStyle" style="margin-bottom: 20px;">
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
      return moment.unix(this.meta.date).format("DD.MM.YYYY HH:mm");
    },
    href: function () {
      let dateStr = moment.unix(this.meta.date).format(RECEIPT_DATETIME_FORMAT);
      return `/?fn=${this.meta.fn}&i=${this.meta.fd}&fp=${this.meta.fp}&s=${this.meta.sum}&t=${dateStr}`;
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

});