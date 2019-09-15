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

});