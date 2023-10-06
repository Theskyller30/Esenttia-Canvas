console.clear();
// END Codepen Console clear

/**
 * This is completely optional and not necessary for the progress bars to work.
 */

const DATA_PROGRESS = "data-progress-circle"
const CLASS_PROGRESS = "progress"
const CLASS_ROOT = `${CLASS_PROGRESS}-circle`
const CLASS_TEXT = `${CLASS_PROGRESS}-circle-text`

const Default = {
    col1: "#ebebeb",
    col2: "#4285f4"
}

class ProgressCircle {
    constructor(element, config = {}, value) {
        const _config = Object.assign({}, Default, config)
        const data_value = element.getAttribute("data-progress-circle")

        value = typeof(value) === "number" ? value : Number(data_value)
        value = (!Number.isNaN(value) ? value : 0)
        value = (value <= 0 ? 0 : (value >= 100 ? 100 : value))

        if (typeof(config.col1) !== "string") {
            const data_col1 = element.getAttribute("data-progress-col1")
            _config.col1 = data_col1 ? data_col1 : _config.col1
        }

        if (typeof(config.col2) !== "string") {
            const data_col2 = element.getAttribute("data-progress-col2")
            _config.col2 = data_col2 ? data_col2 : _config.col2
        }

        this.$el = element
        this.$el.classList.add(CLASS_ROOT)

        this.$value = this.$el.appendChild(document.createElement("div"))
        this.$value.classList.add(CLASS_TEXT)

        this._col1 = _config.col1
        this._col2 = _config.col2
        this._value = value

        this._render()
    }

    get value() { return this._value; }
    get col1() { return this._col1; }
    get col2() { return this._col2; }

    set value(num) {
        let value = Number(num)
        value = (!Number.isNaN(value) ? value : 0)
        value = (value <= 0 ? 0 : (value >= 100 ? 100 : value))

        this._value = value
        this._render()
    }

    set col1(colour) {
        this._col1 = colour;
        this._render()
    }

    set col2(colour) {
        this._col2 = colour;
        this._render()
    }

    _render() {
        const increment = 3.6
        let first = -90 + (increment * (this.value - 50))
        let second = 90 + (increment * this.value)
        let colour = this.value >= 50 ? this.col2 : this.col1

        first = this.value < 50 ? 90 : first
        second = this.value >= 50 ? 270 : second

        this.$value.innerHTML = Math.ceil(this.value)
        this.$el.setAttribute(DATA_PROGRESS, this.value)
        this.$el.style = [
            `--progress-first:${first}deg;`,
            `--progress-second:${second}deg;`,
            `--progress-linear1:${colour};`,
            `--progress-linear2:${this.col2};`,
            `--progress-linear3:${this.col1};`
        ].join("")
    }
}


// -----
const elements = document.querySelectorAll("[data-progress-circle]")
const list = []

elements.forEach((element) => {
    list.push(new ProgressCircle(element))
})


function anime() {
    window.setTimeout(() => {
        list.forEach(function(item) {
            if (item.value >= 100) {
                item.value = 0
            } else {
                item.value += .2
            }
        })

        window.requestAnimationFrame(anime)
    }, 100)
}

window.requestAnimationFrame(anime)