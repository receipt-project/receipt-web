<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 col-sm-8 col-12">
                <form class="main">
                    <fieldset>
                        <legend>Проверка чека</legend>
                        <div class="form-group">
                            <label for="fn">ФН, Фискальный номер</label>
                            <input type="text" class="form-control" id="fn" v-model="form.fn" @keypress="enterNumber" />
                        </div>
                        <div class="form-group">
                            <label for="fd">ФД, Фискальный документ</label>
                            <input type="text" class="form-control" id="fd" v-model="form.fd" @keypress="enterNumber" />
                        </div>
                        <div class="form-group">
                            <label for="fp">ФП, Фискальный признак</label>
                            <input type="text" class="form-control" id="fp" v-model="form.fp" @keypress="enterNumber" />
                        </div>
                        <div class="form-group">
                            <label for="s">Сумма</label>
                            <input type="text" class="form-control" id="s" placeholder="0.00" v-model="form.summary" />
                        </div>
                        <div class="form-group">
                            <label for="time">Время</label>
                            <input type="text" class="form-control" id="time" v-model="timeField" />
                            <input type="date" class="form-control" id="date" v-model="dateField" />
                        </div>
                        <div class="form-group">
                            <input type="button"
                                   class="btn btn-primary btn-block"
                                   value="Отправить"
                                   id="submit"
                                   @click="handleFormSubmit()"
                            />
                            <input type="button"
                                   class="btn btn-secondary btn-block"
                                   value="Поделиться"
                                   id="share"
                                   @click="handleShare()"
                            />
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import axios from "axios";

    export default {
        name: "SearchPage",
        data() {
            return {
                form: {
                    fn: "",
                    fd: "",
                    fp: "",
                    summary: "",
                    date: moment()
                }
            };
        },
        computed: {
            /**
             * String representing date in format HH:MM
             */
            timeField: {
                get() {
                    return this.form.date.format("HH:mm");
                },
                set(str) {
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
                get() {
                    return this.form.date.format("YYYY-MM-DD");
                },
                set(str) {
                    if (str != null && str.match(/^\d{4}-\d{2}-\d{2}$/g)) {
                        this.form.date.set("year", parseInt(str.substr(0, 4)));
                        this.form.date.set("month", parseInt(str.substr(5, 2)) - 1);
                        this.form.date.set("date", parseInt(str.substr(8, 2)));
                    }
                }
            }
        },
        methods: {
            enterNumber($event) {
                const keyCode = $event.keyCode ? $event.keyCode : $event.which;
                if (keyCode < 48 || keyCode > 57) {
                    $event.preventDefault();
                }
            },
            handleShare() {
                // TODO
            },
            handleFormSubmit() {
                axios.post("/api/create", {
                        date: this.form.date.format("YYYYMMDDTHHmm"),
                        fn: this.form.fn,
                        fd: this.form.fd,
                        fp: this.form.fp,
                        sum: parseFloat(this.form.summary)
                    })
                    .then(response => this.$router.push(`/receipt/${response.data}`));
            }
        }
    };
</script>

<style scoped></style>
